.PHONY: dev build test migrate

dev:
	docker compose up --build

build:
	docker compose build

test:
	cd backend && go test ./...

migrate:
	docker compose run --rm backend ./migrate up

lint:
	cd backend && go vet ./...
	cd frontend && npm run build -- --noEmit 2>/dev/null || true
