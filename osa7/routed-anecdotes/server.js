const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const router = jsonServer.router('db.json');

// Middleware to handle JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the frontend build (assuming you have a build folder for the frontend)
app.use(express.static(path.join(__dirname, 'build')));

// Use the JSON Server router for /api routes
app.use('/api', router);

// For any other routes, serve the frontend index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
