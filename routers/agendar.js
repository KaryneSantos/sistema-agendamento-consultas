const express = require('express');
const router = express.Router();

router.get('/inicial', (req, res) => {
    res.render('agendar');
});

module.exports = router;