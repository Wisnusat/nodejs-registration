const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const fs = require('fs');

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone, businessName, businessType, businessAddress } = req.body;
    
    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        // Delete uploaded files if they exist
        if (req.files) {
            Object.keys(req.files).forEach(fieldName => {
                req.files[fieldName].forEach(file => {
                    fs.unlinkSync(file.path); // Delete the file
                });
            });
        }

        res.status(400);
        throw new Error('Email already registered');
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inisialisasi objek dokumen
    let documents = {};
    if (req.files) {
        if (req.files.suratIzinUsaha) {
            documents.suratIzinUsaha = {
                fileName: req.files.suratIzinUsaha[0].originalname,
                filePath: req.files.suratIzinUsaha[0].path,
            };
        }
        if (req.files.npwp) {
            documents.npwp = {
                fileName: req.files.npwp[0].originalname,
                filePath: req.files.npwp[0].path,
            };
        }
        if (req.files.ktp) {
            documents.ktp = {
                fileName: req.files.ktp[0].originalname,
                filePath: req.files.ktp[0].path,
            };
        }
    }

    // Buat user baru
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
        businessName,
        businessType,
        businessAddress,
        documents
    });

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            businessName: user.businessName,
            businessType: user.businessType,
        }
    });
});

module.exports = {
    registerUser,
};
