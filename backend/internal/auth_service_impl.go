package internal

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"errors"
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

// authService is the default implementation of AuthService.
type authService struct {
	// users is the repository of all user accounts.
	users UserRepository
}

// NewAuthService creates a new AuthService backed by the given repository.
//
//   - users is the user repository used to persist and retrieve accounts.
//     It's required.
//
// It returns the created service, or an error if any dependency is invalid.
func NewAuthService(users UserRepository) (AuthService, error) {
	if users == nil {
		return nil, errors.New("users repository is required")
	}
	return &authService{users: users}, nil
}

// Register implements AuthService.
func (s *authService) Register(
	ctx context.Context,
	email, password string,
) error {
	if email == "" {
		return errors.New("email is required")
	}

	existing, err := s.users.FindByEmail(ctx, email)
	if err != nil {
		return fmt.Errorf("checking existing user: %w", err)
	}
	if existing != nil {
		return errors.New("email is already registered")
	}

	user, err := NewUser(email, time.Now())
	if err != nil {
		return fmt.Errorf("creating user entity: %w", err)
	}

	if err := user.SetPassword(password); err != nil {
		return fmt.Errorf("setting password: %w", err)
	}

	// Auto-confirm: no email sending for now.
	user.Confirm()

	if err := s.users.Add(ctx, user); err != nil {
		return fmt.Errorf("persisting user: %w", err)
	}

	return nil
}

// Login implements AuthService.
func (s *authService) Login(
	ctx context.Context,
	email, password string,
) (string, error) {
	if email == "" {
		return "", errors.New("email is required")
	}
	if password == "" {
		return "", errors.New("password is required")
	}

	user, err := s.users.FindByEmail(ctx, email)
	if err != nil {
		return "", fmt.Errorf("finding user: %w", err)
	}
	if user == nil {
		return "", errors.New("invalid email or password")
	}

	if !user.VerifyPassword(password) {
		return "", errors.New("invalid email or password")
	}

	token, err := generateJWT(user.ID(), user.Email())
	if err != nil {
		return "", fmt.Errorf("generating token: %w", err)
	}

	return token, nil
}

// ForgotPassword implements AuthService.
func (s *authService) ForgotPassword(
	ctx context.Context,
	email string,
) (string, error) {
	if email == "" {
		return "", errors.New("email is required")
	}

	user, err := s.users.FindByEmail(ctx, email)
	if err != nil {
		return "", fmt.Errorf("finding user: %w", err)
	}
	if user == nil {
		return "", errors.New("no account found with that email")
	}

	token, err := generateSecureToken()
	if err != nil {
		return "", fmt.Errorf("generating reset token: %w", err)
	}

	expiresAt := time.Now().Add(1 * time.Hour)
	if err := user.SetResetToken(token, expiresAt); err != nil {
		return "", fmt.Errorf("setting reset token: %w", err)
	}

	if err := s.users.Update(ctx, user); err != nil {
		return "", fmt.Errorf("persisting reset token: %w", err)
	}

	return token, nil
}

// ResetPassword implements AuthService.
func (s *authService) ResetPassword(
	ctx context.Context,
	token, newPassword string,
) error {
	if token == "" {
		return errors.New("reset token is required")
	}

	user, err := s.users.FindByResetToken(ctx, token)
	if err != nil {
		return fmt.Errorf("finding user by reset token: %w", err)
	}
	if user == nil {
		return errors.New("invalid or expired reset token")
	}

	if !user.VerifyResetToken(token) {
		return errors.New("invalid or expired reset token")
	}

	if err := user.SetPassword(newPassword); err != nil {
		return fmt.Errorf("setting new password: %w", err)
	}

	user.ClearResetToken()

	if err := s.users.Update(ctx, user); err != nil {
		return fmt.Errorf("persisting new password: %w", err)
	}

	return nil
}

// ResendConfirmation implements AuthService.
func (s *authService) ResendConfirmation(
	ctx context.Context,
	email string,
) (string, error) {
	if email == "" {
		return "", errors.New("email is required")
	}

	user, err := s.users.FindByEmail(ctx, email)
	if err != nil {
		return "", fmt.Errorf("finding user: %w", err)
	}
	if user == nil {
		return "", errors.New("no account found with that email")
	}

	token, err := generateSecureToken()
	if err != nil {
		return "", fmt.Errorf("generating confirmation token: %w", err)
	}

	if err := user.SetConfirmToken(token); err != nil {
		return "", fmt.Errorf("setting confirmation token: %w", err)
	}

	if err := s.users.Update(ctx, user); err != nil {
		return "", fmt.Errorf("persisting confirmation token: %w", err)
	}

	return token, nil
}

// generateJWT creates a signed JWT token for the given user.
//
//   - userID is the unique identifier to embed as a claim.
//   - email is the user's email address to embed as a claim.
//
// It returns the signed token string, or an error if signing fails.
// The token expires in 24 hours. The secret is read from the JWT_SECRET
// environment variable.
func generateJWT(userID, email string) (string, error) {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		return "", errors.New("JWT_SECRET environment variable is not set")
	}

	claims := jwt.MapClaims{
		"user_id": userID,
		"email":   email,
		"exp":     time.Now().Add(24 * time.Hour).Unix(),
		"iat":     time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	signed, err := token.SignedString([]byte(secret))
	if err != nil {
		return "", fmt.Errorf("signing token: %w", err)
	}

	return signed, nil
}

// generateSecureToken produces a cryptographically secure random hex string.
//
// It returns the token string, or an error if the random source fails.
func generateSecureToken() (string, error) {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return "", fmt.Errorf("reading random bytes: %w", err)
	}
	return hex.EncodeToString(b), nil
}
