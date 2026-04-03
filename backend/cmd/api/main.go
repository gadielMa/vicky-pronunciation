package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gadielMa/vicky-pronunciation/cmd/api/handlers"
	"github.com/gadielMa/vicky-pronunciation/internal"
	"github.com/gadielMa/vicky-pronunciation/storage"
	_ "github.com/lib/pq"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		log.Fatal("DATABASE_URL environment variable is required")
	}

	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatalf("opening database: %v", err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		log.Fatalf("pinging database: %v", err)
	}
	log.Println("database connected")

	userRepo, err := storage.NewPostgresUserRepository(db)
	if err != nil {
		log.Fatalf("creating user repository: %v", err)
	}

	authSvc, err := internal.NewAuthService(userRepo)
	if err != nil {
		log.Fatalf("creating auth service: %v", err)
	}

	authHandler, err := handlers.NewAuthHandler(authSvc)
	if err != nil {
		log.Fatalf("creating auth handler: %v", err)
	}

	mux := http.NewServeMux()

	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintln(w, `{"status":"ok"}`)
	})

	mux.HandleFunc("POST /api/auth/register",
		authHandler.Register)
	mux.HandleFunc("POST /api/auth/login",
		authHandler.Login)
	mux.HandleFunc("POST /api/auth/forgot-password",
		authHandler.ForgotPassword)
	mux.HandleFunc("POST /api/auth/reset-password",
		authHandler.ResetPassword)
	mux.HandleFunc("POST /api/auth/resend-confirmation",
		authHandler.ResendConfirmation)

	corsHandler := withCORS(mux)

	log.Printf("server listening on :%s", port)
	if err := http.ListenAndServe(":"+port, corsHandler); err != nil {
		log.Fatalf("server error: %v", err)
	}
}

// withCORS wraps a handler to add CORS headers that allow the frontend
// development server at http://localhost:5173 to make cross-origin requests.
func withCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		w.Header().Set("Access-Control-Allow-Methods",
			"GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers",
			"Content-Type, Authorization")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}
