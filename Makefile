build:
	@echo "@ken building server and client..."
	cd server && $(MAKE) build
	cd client && $(MAKE) build

run:
	@echo "@ken running server and client..."
	docker-compose up

stop:
	docker-compose down