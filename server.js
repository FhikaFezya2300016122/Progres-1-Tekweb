const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();

// Konfigurasi CORS yang lebih luas
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware untuk parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Konfigurasi Multer untuk upload gambar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Batasan 5MB
});

// Path file data feed
const FEED_DATA_PATH = path.join(__dirname, 'feedData.json');

// Fungsi utilitas untuk membaca dan menulis data
const readFeedData = () => {
    try {
        const data = fs.readFileSync(FEED_DATA_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { feeds: [] };
    }
};

const writeFeedData = (data) => {
    fs.writeFileSync(FEED_DATA_PATH, JSON.stringify(data, null, 2));
};

// Endpoint untuk menambah feed
app.post('/api/addFeed', upload.single('image'), (req, res) => {
    try {
        const { caption, category, tags } = req.body;
        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({ message: 'Gambar diperlukan' });
        }

        const feedData = readFeedData();
        
        const newFeed = {
            id: Date.now().toString(),
            image: `/uploads/${imageFile.filename}`,
            caption: caption || 'Tanpa Caption',
            category: category || 'Umum',
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            uploadedAt: new Date().toISOString()
        };

        feedData.feeds.push(newFeed);
        writeFeedData(feedData);

        res.status(201).json({
            message: 'Feed berhasil ditambahkan',
            feed: newFeed
        });
    } catch (error) {
        console.error('Error menambah feed:', error);
        res.status(500).json({ message: 'Gagal menambah feed' });
    }
});

// Endpoint untuk mendapatkan feeds
app.get('/api/feeds', (req, res) => {
    const { query, category } = req.query;
    const feedData = readFeedData();

    let filteredFeeds = feedData.feeds;

    // Filter berdasarkan kategori
    if (category) {
        filteredFeeds = filteredFeeds.filter(feed => 
            feed.category.toLowerCase() === category.toLowerCase()
        );
    }

    // Filter berdasarkan query
    if (query) {
        const lowercaseQuery = query.toLowerCase();
        filteredFeeds = filteredFeeds.filter(feed => 
            feed.caption.toLowerCase().includes(lowercaseQuery) ||
            feed.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
            feed.category.toLowerCase().includes(lowercaseQuery)
        );
    }

    // Urutkan dari yang terbaru
    filteredFeeds.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

    res.json(filteredFeeds);
});

// Endpoint untuk menghapus feed
app.delete('/api/feeds/:id', (req, res) => {
    try {
        const feedId = req.params.id;
        const feedDataPath = path.join(__dirname, 'feedData.json');

        // Baca data feed
        let feedData = JSON.parse(fs.readFileSync(feedDataPath, 'utf8'));

        // Temukan feed yang akan dihapus
        const feedIndex = feedData.feeds.findIndex(feed => feed.id === feedId);

        if (feedIndex === -1) {
            return res.status(404).json({ message: 'Feed tidak ditemukan' });
        }

        // Ambil detail feed yang akan dihapus
        const feedToDelete = feedData.feeds[feedIndex];

        // Konstruksi path lengkap file gambar
        const imagePath = path.join(__dirname, feedToDelete.image.replace(/^\/uploads/, 'uploads'));

        // Hapus file gambar jika ada
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }

        // Hapus feed dari array
        feedData.feeds.splice(feedIndex, 1);

        // Simpan kembali data feed
        fs.writeFileSync(feedDataPath, JSON.stringify(feedData, null, 2));

        res.status(200).json({ 
            message: 'Feed berhasil dihapus',
            deletedFeed: feedToDelete 
        });
    } catch (error) {
        console.error('Error menghapus feed:', error);
        res.status(500).json({ 
            message: 'Gagal menghapus feed', 
            error: error.message 
        });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});