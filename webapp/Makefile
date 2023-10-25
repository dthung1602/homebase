checktype:
	pyright webapp user product

lint:
	ruff webapp user product --fix

format:
	black webapp user product
	isort webapp user product

test:
	python manage.py test

before-commit: checktype lint format test
