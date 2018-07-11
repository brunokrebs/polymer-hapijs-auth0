# Polymer, HapiJS, and Auth0

## Backend

Make a `./backend/.env` file (you can also copy it from [`./backend/.env.template`](./backend/.env.template)):

```sh
AUTH0_AUDIENCE=http://localhost:3000
AUTH0_DOMAIN=snapkicks.eu.auth0.com
HOST=localhost
PORT=3000
REDIS_HOST=localhost
REDIS_PORT=6379
SSL=false
```

Then, replace the values on this file with your own Auth0 config values. After that, you can run the backend with these commands:

```sh
npm install
docker-compose up -d
npm start
```

## Website:

Need to set Auth0 params in `src/components/my-app.js`:

```
domain=".auth0.com"
clientid="XYZ"
audience="API_ID"
```

```sh
npm install
npm start
```

Go to: http://127.0.0.1:8081 in a web browser
