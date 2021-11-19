const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '/../public', '/index.html'));
});

router.get('(/[a-zA-Z0-9@.]+)+', (req,res) => {
    res.sendFile(path.join(__dirname, '/../public', '/index.html'));
});

module.exports = router;