package handlers

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/gadielMa/vicky-pronunciation/internal"
)

// AuthHandler holds the HTTP handlers for authentication endpoints.
type AuthHandler struct {
	// auth is the service used to execute authentication operations.
	auth internal.AuthService
}

// NewAuthHandler creates a new AuthHandler.
//
//   - auth is the authentication service. It's required.
//
// It returns the created handler, or an error if auth is nil.
func NewAuthHandler(auth internal.AuthService) (*AuthHandler, error) {
	if auth == nil {
		return nil, errors.New("auth service is required")
	}
	return &AuthHandler{auth: auth}, nil
}

// Register handles POST /api/auth/register.
// It expects a JSON body with "email" and "password".
// On success it returns HTTP 201.
func (h *AuthHandler) Register(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if err := h.auth.Register(r.Context(), body.Email, body.Password); err != nil {
		if isDomainError(err) {
			writeError(w, http.StatusBadRequest, err.Error())
			return
		}
		writeError(w, http.StatusInternalServerError, "registration failed")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	_ = json.NewEncoder(w).Encode(map[string]string{
		"message": "account created successfully",
	})
}

// Login handles POST /api/auth/login.
// It expects a JSON body with "email" and "password".
// On success it returns HTTP 200 with { token, user: { id, email } }.
func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	token, err := h.auth.Login(r.Context(), body.Email, body.Password)
	if err != nil {
		if isDomainError(err) {
			writeError(w, http.StatusBadRequest, err.Error())
			return
		}
		writeError(w, http.StatusInternalServerError, "login failed")
		return
	}

	// We need the user data for the response. Fetch email from the body
	// since Login returns only the token.
	writeJSON(w, http.StatusOK, map[string]any{
		"token": token,
		"user": map[string]string{
			"email": body.Email,
		},
	})
}

// ForgotPassword handles POST /api/auth/forgot-password.
// It expects a JSON body with "email".
// Returns the reset token directly (mock: no email is sent).
func (h *AuthHandler) ForgotPassword(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Email string `json:"email"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	token, err := h.auth.ForgotPassword(r.Context(), body.Email)
	if err != nil {
		if isDomainError(err) {
			writeError(w, http.StatusBadRequest, err.Error())
			return
		}
		writeError(w, http.StatusInternalServerError, "forgot password failed")
		return
	}

	writeJSON(w, http.StatusOK, map[string]string{
		"message":     "reset token generated (mock: no email sent)",
		"reset_token": token,
	})
}

// ResetPassword handles POST /api/auth/reset-password.
// It expects a JSON body with "token" and "password".
func (h *AuthHandler) ResetPassword(w http.ResponseWriter, r *http.Request) {
	var body struct {
		Token    string `json:"token"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	if err := h.auth.ResetPassword(
		r.Context(), body.Token, body.Password,
	); err != nil {
		if isDomainError(err) {
			writeError(w, http.StatusBadRequest, err.Error())
			return
		}
		writeError(w, http.StatusInternalServerError, "reset password failed")
		return
	}

	writeJSON(w, http.StatusOK, map[string]string{
		"message": "password reset successfully",
	})
}

// ResendConfirmation handles POST /api/auth/resend-confirmation.
// It expects a JSON body with "email".
// Returns the confirm token directly (mock: no email is sent).
func (h *AuthHandler) ResendConfirmation(
	w http.ResponseWriter,
	r *http.Request,
) {
	var body struct {
		Email string `json:"email"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeError(w, http.StatusBadRequest, "invalid request body")
		return
	}

	token, err := h.auth.ResendConfirmation(r.Context(), body.Email)
	if err != nil {
		if isDomainError(err) {
			writeError(w, http.StatusBadRequest, err.Error())
			return
		}
		writeError(w, http.StatusInternalServerError,
			"resend confirmation failed")
		return
	}

	writeJSON(w, http.StatusOK, map[string]string{
		"message":       "confirmation token generated (mock: no email sent)",
		"confirm_token": token,
	})
}

// writeJSON encodes v as JSON and writes it to w with the given status code.
func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

// writeError writes a JSON error response with the given status and message.
func writeError(w http.ResponseWriter, status int, message string) {
	writeJSON(w, status, map[string]string{"error": message})
}

// isDomainError reports whether the error originates from domain validation.
// Domain errors are those returned directly by entity or service methods as
// plain errors (not wrapped infrastructure errors). This heuristic checks
// for known domain error prefixes or uses a type assertion if available.
//
// For simplicity, all errors returned by AuthService are treated as domain
// errors unless they wrap another error with context.
func isDomainError(err error) bool {
	if err == nil {
		return false
	}
	// Unwrap: if the error wraps another, it's an infrastructure error.
	return errors.Unwrap(err) == nil
}
