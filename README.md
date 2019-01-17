# desktop-app.herokuapp.com

> Small web app to put online your TV-Series watchlist and dishes recipes

## Quick Start

```bash
# Install dependencies for server
npm install

# Install dependencies for client
npm run client-install

# Run the client & server with concurrently
npm run dev

# Run the Express server only
npm run server

# Run the React client only
npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
```

In ./config folder you need to create keys_dev.js file that looks like this:

```
module.exports = {
  mongoURI: 'YOUR_OWN_MONGO_URI',
  secret: 'YOUR_OWN_SECRET'
};
```

In ./client folder you need to create .env file that looks like this:

```
REACT_APP_OMDB_API_KEY='YOUR_OWN_OMDB_API_KEY'
```

## App Info

### Author

Giedrius Blažulionis
[giedrius.io](http://www.giedrius.io)

### Version

1.0.1

### License

This project is licensed under the MIT License
