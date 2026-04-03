package internal

import "context"

// AuthService defines the authentication operations available in the domain.
// It orchestrates registration, login, and account recovery flows.
//
// All methods:
//   - Accept only basic data types as parameters.
//   - Return domain errors for invalid input (caller should map to HTTP 400).
//   - Return wrapped infrastructure errors for all other failures.
type AuthService interface {

	// Register creates a new user account with the given credentials.
	// For simplicity, the user is automatically confirmed upon registration.
	//
	//   - ctx is the context for cancellation and timeouts. Will be passed to
	//     dependencies and must be honored.
	//   - email is the email address for the new account. It's required and
	//     must be unique in the system.
	//   - password is the plain-text password for the new account. It's
	//     required and must be at least 8 characters.
	//
	// It returns an error if the email is already taken, if the input is
	// invalid, or if the operation fails.
	//
	// Guarantees:
	//   - Safe for concurrent use.
	//   - Either the user is fully created or the operation fails.
	//   - Failed operations won't leave partial state.
	Register(ctx context.Context, email, password string) error

	// Login authenticates a user and returns a signed JWT token.
	//
	//   - ctx is the context for cancellation and timeouts. Will be passed to
	//     dependencies and must be honored.
	//   - email is the email address of the account. It's required.
	//   - password is the plain-text password to verify. It's required.
	//
	// It returns a signed JWT string on success, or an error if the
	// credentials are invalid or the operation fails.
	//
	// Guarantees:
	//   - Safe for concurrent use.
	//   - The returned token is valid for 24 hours.
	Login(ctx context.Context, email, password string) (string, error)

	// ForgotPassword generates a password reset token for the account
	// with the given email. The token is returned directly (mock behavior:
	// no email is sent).
	//
	//   - ctx is the context for cancellation and timeouts. Will be passed to
	//     dependencies and must be honored.
	//   - email is the email address of the account. It's required.
	//
	// It returns the reset token string, or an error if the account is not
	// found or the operation fails.
	//
	// Guarantees:
	//   - Safe for concurrent use.
	ForgotPassword(ctx context.Context, email string) (string, error)

	// ResetPassword sets a new password for the user identified by the
	// given reset token.
	//
	//   - ctx is the context for cancellation and timeouts. Will be passed to
	//     dependencies and must be honored.
	//   - token is the password reset token previously issued. It's required.
	//   - newPassword is the new plain-text password to set. It's required
	//     and must be at least 8 characters.
	//
	// It returns an error if the token is invalid or expired, if the new
	// password is invalid, or if the operation fails.
	//
	// Guarantees:
	//   - Safe for concurrent use.
	//   - Either the password is fully updated or the operation fails.
	ResetPassword(ctx context.Context, token, newPassword string) error

	// ResendConfirmation generates a new email confirmation token for the
	// account with the given email. The token is returned directly (mock
	// behavior: no email is sent).
	//
	//   - ctx is the context for cancellation and timeouts. Will be passed to
	//     dependencies and must be honored.
	//   - email is the email address of the account. It's required.
	//
	// It returns the confirmation token string, or an error if the account
	// is not found or the operation fails.
	//
	// Guarantees:
	//   - Safe for concurrent use.
	ResendConfirmation(ctx context.Context, email string) (string, error)
}
