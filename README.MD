#How to start projects:

##Backend:

Make .env file:

```sh
PORT=3000
HOST=localhost
SSL=false
REDIS_HOST=localhost
REDIS_PORT 6379
```

Setup Auth0 details in `src/server.js`:

```
key: jwksRsa.hapiJwt2Key({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: "auth0.com/.well-known/jwks.json"
}),
verifyOptions: {
  audience: 'API_NAME',
  issuer: "auth0.com/",
  algorithms: ['RS256']
},
```

Need to use this repo:
`https://github.com/clarkie/node-jwks-rsa/`
For JWT to work in Hapi 17.

Run:

```sh
npm install
docker-compose up -d
npm start
```


##Website:

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
