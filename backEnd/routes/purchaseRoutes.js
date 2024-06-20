const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/compras', authMiddleware, purchaseController.createPurchase);
router.get('/compras/:id', authMiddleware, purchaseController.getPurchaseById);
router.get('/compras', authMiddleware, purchaseController.getAllPurchases);
router.put('/compras/:id', authMiddleware, purchaseController.updatePurchase);
router.delete('/compras/:id', authMiddleware, purchaseController.deletePurchase);

module.exports = router;
