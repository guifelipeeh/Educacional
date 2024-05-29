// controllers/purchaseController.js
const PurchaseService = require('../services/purchaseService');

exports.createPurchase = async (req, res) => {
  try {
    const newPurchase = await PurchaseService.createPurchase(req.body);
    res.status(201).json(newPurchase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPurchaseById = async (req, res) => {
  try {
    const purchase = await PurchaseService.getPurchaseById(req.params.id);
    res.status(200).json(purchase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllPurchases = async (req, res) => {
  try {
    const purchases = await PurchaseService.getAllPurchases();
    res.status(200).json(purchases);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePurchase = async (req, res) => {
  try {
    const updatedPurchase = await PurchaseService.updatePurchase(req.params.id, req.body);
    res.status(200).json(updatedPurchase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deletePurchase = async (req, res) => {
  try {
    await PurchaseService.deletePurchase(req.params.id);
    res.status(200).json({ message: 'Compra deletada com sucesso.' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
