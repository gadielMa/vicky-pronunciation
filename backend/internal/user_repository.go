package internal

import "context"

// UserRepository represents the collection of all users in the system.
// Implementations must honor the guarantees documented on each method.
type UserRepository interface {

	// Add persists a new user to the repository.
	//
	//   - ctx is the context for cancellation and timeouts. Will be passed to
	//     dependencies and must be honored.
	//   - user is the user to add. It's required.
	//
	// It returns an error if the user cannot be persisted (e.g., duplicate
	// email).
	//
	// Guarantees:
	//   - Safe for concurrent use.
	//   - Either the user is fully added or the operation fails.
	//   - Failed operations won't leave partial state.
	Add(ctx context.Context, user *User) error

	// Get returns the user with the given ID.
	//
	//   - ctx is the context for cancellation and timeouts. Will be passed to
	//     dependencies and must be honored.
	//   - id is the unique identifier of the user. It's required.
	//
	// It returns nil if no user with the given ID exists, or an error if the
	// operation fails.
	//
	// Guarantees:
	//   - Safe for concurrent use.
	//   - Returns nil or the user with the provided id.
	Get(ctx context.Context, id string) (*User, error)

	// FindByEmail returns the user with the given email address.
	//
	//   - ctx is the context for cancellation and timeouts. Will be passed to
	//     dependencies and must be honored.
	//   - email is the email address to look up. It's required.
	//
	// It returns nil if no user with that email exists, or an error if the
	// operation fails.
	//
	// Guarantees:
	//   - Safe for concurrent use.
	//   - Returns nil or the user with the provided email.
	FindByEmail(ctx context.Context, email string) (*User, error)

	// FindByConfirmToken returns the user associated with the given
	// email confirmation token.
	//
	//   - ctx is the context for cancellation and timeouts. Will be passed to
	//     dependencies and must be honored.
	//   - token is the confirmation token to look up. It's required.
	//
	// It returns nil if no user has that token, or an error if the operation
	// fails.
	//
	// Guarantees:
	//   - Safe for concurrent use.
	//   - Returns nil or the matching user.
	FindByConfirmToken(ctx context.Context, token string) (*User, error)

	// FindByResetToken returns the user associated with the given password
	// reset token.
	//
	//   - ctx is the context for cancellation and timeouts. Will be passed to
	//     dependencies and must be honored.
	//   - token is the reset token to look up. It's required.
	//
	// It returns nil if no user has that token, or an error if the operation
	// fails.
	//
	// Guarantees:
	//   - Safe for concurrent use.
	//   - Returns nil or the matching user.
	FindByResetToken(ctx context.Context, token string) (*User, error)

	// Update persists changes made to an existing user.
	//
	//   - ctx is the context for cancellation and timeouts. Will be passed to
	//     dependencies and must be honored.
	//   - user is the user whose state should be saved. It's required.
	//
	// It returns an error if the operation fails.
	//
	// Guarantees:
	//   - Safe for concurrent use.
	//   - Either the user is fully updated or the operation fails.
	//   - Failed operations won't leave partial state.
	Update(ctx context.Context, user *User) error
}
