const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Path ke user.json
const userFilePath = path.join(__dirname, 'public', 'user.json');

// API untuk membaca user.json
app.get('/users', (req, res) => {
  fs.readFile(userFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Failed to read user data');
    }
    res.json(JSON.parse(data || '[]'));
  });
});

// API untuk menambahkan user baru
app.post('/users', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  // Baca data user saat ini
  fs.readFile(userFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Failed to read user data');
    }

    const users = JSON.parse(data || '[]');

    // Cek apakah username sudah ada
    if (users.some((user) => user.username === username)) {
      return res.status(400).send('Username is already taken');
    }

    // Tambahkan user baru
    users.push({ username, password });

    // Tulis data baru ke user.json
    fs.writeFile(userFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Failed to save user data');
      }
      res.status(201).send('User registered successfully');
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
