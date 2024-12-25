const express = require('express');
const { generateImage } = require('../../controllers/shop/customizeImage');


const router = express.Router();

router.post('/', generateImage);

module.exports = router;
