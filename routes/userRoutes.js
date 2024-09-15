const express = require('express');
const { registerUser } = require('../controllers/userController');
const upload = require('../middlewares/uploadMiddleware'); // Import middleware multer untuk file upload

const router = express.Router();

// Tambahkan middleware upload untuk menangani file upload
router.post('/register', upload.fields([
    { name: 'suratIzinUsaha', maxCount: 1 },
    { name: 'npwp', maxCount: 1 },
    { name: 'ktp', maxCount: 1 }
]), registerUser);

module.exports = router;
