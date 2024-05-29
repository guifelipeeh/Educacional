const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/purchaseController');
const sessionMiddleware = require('../middleware/sessionMiddleware');

router.post('/compras', sessionMiddleware, purchaseController.createPurchase);
router.get('/compras/:id', sessionMiddleware, purchaseController.getPurchaseById);
router.get('/compras', sessionMiddleware, purchaseController.getAllPurchases);
router.put('/compras/:id', sessionMiddleware, purchaseController.updatePurchase);
router.delete('/compras/:id', sessionMiddleware, purchaseController.deletePurchase);

module.exports = router;
