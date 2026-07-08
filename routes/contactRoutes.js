const express = require('express');
const contactController = require('../controllers/contactController');

const router = express.Router();

router.get('/favorites', contactController.listFavorites);
router.get('/stats', contactController.getStats);

router.get('/', contactController.listContacts);
router.get('/:id', contactController.getContact);

router.post('/:id/favorite', contactController.addFavorite);
router.delete('/:id/favorite', contactController.deleteFavorite);
router.patch('/:id/favorite', contactController.toggleFavorite);

router.put('/:id/note', contactController.updateNote);

module.exports = router;