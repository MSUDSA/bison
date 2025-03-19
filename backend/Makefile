.PHONY: virtualenv

run: 
	cd .. && \
	docker-compose down && \
	docker-compose build && \
	docker-compose up -d && \
	docker-compose logs -f
stop:
	cd .. && \
	docker-compose down

push:
	cd ../scripts && \
		./docker_push.sh

