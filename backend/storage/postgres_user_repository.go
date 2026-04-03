package storage

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"time"

	"github.com/gadielMa/vicky-pronunciation/internal"
	_ "github.com/lib/pq"
)

// PostgresUserRepository is a PostgreSQL-backed implementation of
// internal.UserRepository.
type PostgresUserRepository struct {
	// db is the underlying database connection pool.
	db *sql.DB
}

// NewPostgresUserRepository creates a new PostgresUserRepository connected
// to the given database.
//
//   - db is the open PostgreSQL connection pool. It's required.
//
// It returns the created repository, or an error if db is nil.
func NewPostgresUserRepository(db *sql.DB) (*PostgresUserRepository, error) {
	if db == nil {
		return nil, errors.New("db is required")
	}
	return &PostgresUserRepository{db: db}, nil
}

// Add implements internal.UserRepository.
func (r *PostgresUserRepository) Add(
	ctx context.Context,
	user *internal.User,
) error {
	query := `
		INSERT INTO users (email, password_hash, confirmed, confirm_token,
		                   reset_token, reset_expires_at, created_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING id`

	var id string
	err := r.db.QueryRowContext(
		ctx, query,
		user.Email(),
		user.PasswordHash(),
		user.Confirmed(),
		user.ConfirmToken(),
		user.ResetToken(),
		user.ResetExpiresAt(),
		user.CreatedAt(),
	).Scan(&id)
	if err != nil {
		return fmt.Errorf("inserting user: %w", err)
	}

	// Reconstruct to populate the ID returned by the DB.
	reconstructed, err := internal.ReconstructUser(
		id,
		user.Email(),
		user.PasswordHash(),
		user.Confirmed(),
		user.ConfirmToken(),
		user.ResetToken(),
		user.ResetExpiresAt(),
		user.CreatedAt(),
	)
	if err != nil {
		return fmt.Errorf("reconstructing user after insert: %w", err)
	}

	*user = *reconstructed
	return nil
}

// Get implements internal.UserRepository.
func (r *PostgresUserRepository) Get(
	ctx context.Context,
	id string,
) (*internal.User, error) {
	query := `
		SELECT id, email, password_hash, confirmed, confirm_token,
		       reset_token, reset_expires_at, created_at
		FROM users WHERE id = $1`

	row := r.db.QueryRowContext(ctx, query, id)
	user, err := scanUser(row)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("querying user by id: %w", err)
	}
	return user, nil
}

// FindByEmail implements internal.UserRepository.
func (r *PostgresUserRepository) FindByEmail(
	ctx context.Context,
	email string,
) (*internal.User, error) {
	query := `
		SELECT id, email, password_hash, confirmed, confirm_token,
		       reset_token, reset_expires_at, created_at
		FROM users WHERE email = $1`

	row := r.db.QueryRowContext(ctx, query, email)
	user, err := scanUser(row)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("querying user by email: %w", err)
	}
	return user, nil
}

// FindByConfirmToken implements internal.UserRepository.
func (r *PostgresUserRepository) FindByConfirmToken(
	ctx context.Context,
	token string,
) (*internal.User, error) {
	query := `
		SELECT id, email, password_hash, confirmed, confirm_token,
		       reset_token, reset_expires_at, created_at
		FROM users WHERE confirm_token = $1`

	row := r.db.QueryRowContext(ctx, query, token)
	user, err := scanUser(row)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("querying user by confirm token: %w", err)
	}
	return user, nil
}

// FindByResetToken implements internal.UserRepository.
func (r *PostgresUserRepository) FindByResetToken(
	ctx context.Context,
	token string,
) (*internal.User, error) {
	query := `
		SELECT id, email, password_hash, confirmed, confirm_token,
		       reset_token, reset_expires_at, created_at
		FROM users WHERE reset_token = $1`

	row := r.db.QueryRowContext(ctx, query, token)
	user, err := scanUser(row)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, nil
	}
	if err != nil {
		return nil, fmt.Errorf("querying user by reset token: %w", err)
	}
	return user, nil
}

// Update implements internal.UserRepository.
func (r *PostgresUserRepository) Update(
	ctx context.Context,
	user *internal.User,
) error {
	query := `
		UPDATE users
		SET email          = $1,
		    password_hash  = $2,
		    confirmed      = $3,
		    confirm_token  = $4,
		    reset_token    = $5,
		    reset_expires_at = $6
		WHERE id = $7`

	_, err := r.db.ExecContext(
		ctx, query,
		user.Email(),
		user.PasswordHash(),
		user.Confirmed(),
		user.ConfirmToken(),
		user.ResetToken(),
		user.ResetExpiresAt(),
		user.ID(),
	)
	if err != nil {
		return fmt.Errorf("updating user: %w", err)
	}
	return nil
}

// scanUser reads a single user row from a sql.Row into a User entity.
//
//   - row is the database row to scan. It's required.
//
// It returns the scanned user, or an error (including sql.ErrNoRows).
func scanUser(row *sql.Row) (*internal.User, error) {
	var (
		id             string
		email          string
		passwordHash   string
		confirmed      bool
		confirmToken   sql.NullString
		resetToken     sql.NullString
		resetExpiresAt sql.NullTime
		createdAt      time.Time
	)

	err := row.Scan(
		&id, &email, &passwordHash, &confirmed,
		&confirmToken, &resetToken, &resetExpiresAt, &createdAt,
	)
	if err != nil {
		return nil, err
	}

	var confirmTokenPtr *string
	if confirmToken.Valid {
		confirmTokenPtr = &confirmToken.String
	}

	var resetTokenPtr *string
	if resetToken.Valid {
		resetTokenPtr = &resetToken.String
	}

	var resetExpiresAtPtr *time.Time
	if resetExpiresAt.Valid {
		resetExpiresAtPtr = &resetExpiresAt.Time
	}

	return internal.ReconstructUser(
		id, email, passwordHash, confirmed,
		confirmTokenPtr, resetTokenPtr, resetExpiresAtPtr,
		createdAt,
	)
}
