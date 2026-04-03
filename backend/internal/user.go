package internal

import (
	"errors"
	"time"

	"golang.org/x/crypto/bcrypt"
)

// User represents a registered user in the system. It encapsulates all
// identity and authentication-related state for a single account.
//
// All fields are private and only accessible through accessor methods.
// All mutations go through methods that enforce business invariants.
type User struct {
	// id is the unique identifier assigned to this user.
	id string

	// attributes holds all mutable state of the user.
	attributes userAttributes
}

// userAttributes groups all mutable attributes of a User entity.
type userAttributes struct {
	// id mirrors the root id for storage convenience.
	id string

	// email is the user's unique email address.
	email string

	// passwordHash stores the bcrypt hash of the user's password.
	passwordHash string

	// confirmed indicates whether the user has confirmed their email.
	confirmed bool

	// confirmToken is the token sent to the user for email confirmation.
	// It is nil when the user is already confirmed.
	confirmToken *string

	// resetToken is the token sent to the user for password reset.
	// It is nil when no reset is in progress.
	resetToken *string

	// resetExpiresAt is the expiry time of the reset token.
	// It is nil when no reset is in progress.
	resetExpiresAt *time.Time

	// createdAt is the timestamp when the user was created.
	createdAt time.Time
}

// NewUser creates and validates a new User entity. The id field is left empty
// and will be assigned by the repository upon persistence.
//
//   - email is the user's email address. It's required and must not be empty.
//   - createdAt is the timestamp of creation. It's required.
//
// It returns the created user, or an error if any invariant is violated.
func NewUser(email string, createdAt time.Time) (*User, error) {
	if email == "" {
		return nil, errors.New("user email cannot be empty")
	}

	return &User{
		id: "",
		attributes: userAttributes{
			id:        "",
			email:     email,
			confirmed: false,
			createdAt: createdAt,
		},
	}, nil
}

// ReconstructUser rebuilds a User entity from persisted storage data.
// It does not perform business validation — it trusts the stored state.
//
//   - id is the unique identifier of the user. It's required.
//   - email is the user's email address. It's required.
//   - passwordHash is the bcrypt-hashed password. It's required.
//   - confirmed indicates whether the email was confirmed.
//   - confirmToken is the optional email confirmation token.
//   - resetToken is the optional password reset token.
//   - resetExpiresAt is the optional expiry time of the reset token.
//   - createdAt is when the user was originally created.
//
// It returns the reconstructed user, or an error if required fields are empty.
func ReconstructUser(
	id, email, passwordHash string,
	confirmed bool,
	confirmToken, resetToken *string,
	resetExpiresAt *time.Time,
	createdAt time.Time,
) (*User, error) {
	if id == "" {
		return nil, errors.New("user id cannot be empty")
	}
	if email == "" {
		return nil, errors.New("user email cannot be empty")
	}

	return &User{
		id: id,
		attributes: userAttributes{
			id:             id,
			email:          email,
			passwordHash:   passwordHash,
			confirmed:      confirmed,
			confirmToken:   confirmToken,
			resetToken:     resetToken,
			resetExpiresAt: resetExpiresAt,
			createdAt:      createdAt,
		},
	}, nil
}

// ID returns the unique identifier of the user.
func (u *User) ID() string {
	return u.id
}

// Email returns the user's email address.
func (u *User) Email() string {
	return u.attributes.email
}

// PasswordHash returns the bcrypt hash of the user's password.
func (u *User) PasswordHash() string {
	return u.attributes.passwordHash
}

// Confirmed reports whether the user has confirmed their email address.
func (u *User) Confirmed() bool {
	return u.attributes.confirmed
}

// ConfirmToken returns the email confirmation token, or nil if the user
// is already confirmed or no token was set.
func (u *User) ConfirmToken() *string {
	return u.attributes.confirmToken
}

// ResetToken returns the password reset token, or nil if no reset is
// currently in progress.
func (u *User) ResetToken() *string {
	return u.attributes.resetToken
}

// ResetExpiresAt returns the expiry time of the reset token, or nil if
// no reset is currently in progress.
func (u *User) ResetExpiresAt() *time.Time {
	return u.attributes.resetExpiresAt
}

// CreatedAt returns the timestamp when the user was created.
func (u *User) CreatedAt() time.Time {
	return u.attributes.createdAt
}

// SetPassword hashes and stores the provided plain-text password.
//
//   - password is the plain-text password to hash. It must not be empty
//     and must be at least 8 characters long.
//
// It returns an error if the password is invalid or hashing fails.
func (u *User) SetPassword(password string) error {
	if password == "" {
		return errors.New("password cannot be empty")
	}
	if len(password) < 8 {
		return errors.New("password must be at least 8 characters")
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return errors.New("failed to hash password")
	}

	u.attributes.passwordHash = string(hash)
	return nil
}

// VerifyPassword checks whether the provided plain-text password matches
// the stored hash.
//
//   - password is the plain-text password to verify. It's required.
//
// It returns true if the password matches, false otherwise.
func (u *User) VerifyPassword(password string) bool {
	if password == "" || u.attributes.passwordHash == "" {
		return false
	}
	err := bcrypt.CompareHashAndPassword(
		[]byte(u.attributes.passwordHash),
		[]byte(password),
	)
	return err == nil
}

// Confirm marks the user's email as confirmed and clears the confirmation
// token.
func (u *User) Confirm() {
	u.attributes.confirmed = true
	u.attributes.confirmToken = nil
}

// SetConfirmToken assigns a new email confirmation token to the user.
//
//   - token is the confirmation token to assign. It must not be empty.
//
// It returns an error if the token is empty.
func (u *User) SetConfirmToken(token string) error {
	if token == "" {
		return errors.New("confirm token cannot be empty")
	}
	u.attributes.confirmToken = &token
	return nil
}

// SetResetToken assigns a password reset token with an expiry time.
//
//   - token is the reset token to assign. It must not be empty.
//   - expiresAt is when the token expires. It must be in the future.
//
// It returns an error if any argument is invalid.
func (u *User) SetResetToken(token string, expiresAt time.Time) error {
	if token == "" {
		return errors.New("reset token cannot be empty")
	}
	if !expiresAt.After(time.Now()) {
		return errors.New("reset token expiry must be in the future")
	}

	u.attributes.resetToken = &token
	u.attributes.resetExpiresAt = &expiresAt
	return nil
}

// VerifyResetToken checks whether the provided token matches the stored
// reset token and has not expired.
//
//   - token is the reset token to verify. It's required.
//
// It returns true if the token is valid and not expired, false otherwise.
func (u *User) VerifyResetToken(token string) bool {
	if u.attributes.resetToken == nil || u.attributes.resetExpiresAt == nil {
		return false
	}
	if *u.attributes.resetToken != token {
		return false
	}
	return time.Now().Before(*u.attributes.resetExpiresAt)
}

// ClearResetToken removes the password reset token and its expiry time.
func (u *User) ClearResetToken() {
	u.attributes.resetToken = nil
	u.attributes.resetExpiresAt = nil
}
