const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

app.post('/saveFeedData', (req, res) => {
  const feedData = req.body; // Feed data yang diterima dari frontend

  // Simpan data feed ke file feedData.json di dalam folder public
  const filePath = path.join(__dirname, 'public', 'feedData.json');
  
  // Coba baca data feed yang ada
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading feed data.' });
    }
    
    const feeds = JSON.parse(data);
    // Tambahkan feed baru ke dalam array
    const updatedFeeds = [...feeds, ...feedData];

    // Tulis data yang sudah diperbarui ke file JSON
    fs.writeFile(filePath, JSON.stringify(updatedFeeds, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to save feed data.' });
      }
      res.status(200).json({ message: 'Feed data saved successfully.' });
    });
  });
});

