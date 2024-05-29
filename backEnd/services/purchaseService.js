// services/purchaseService.js
const Compra = require('../models/purchase');

class PurchaseService {
  async createPurchase(purchaseData) {
    try {
      const newPurchase = await Compra.create(purchaseData);
      return newPurchase;
    } catch (error) {
      throw new Error('Erro ao criar compra: ' + error.message);
    }
  }

  async getPurchaseById(purchaseId) {
    try {
      const purchase = await Compra.findByPk(purchaseId);
      if (!purchase) {
        throw new Error('Compra não encontrada.');
      }
      return purchase;
    } catch (error) {
      throw new Error('Erro ao obter compra: ' + error.message);
    }
  }

  async getAllPurchases() {
    try {
      const purchases = await Compra.findAll();
      return purchases;
    } catch (error) {
      throw new Error('Erro ao obter compras: ' + error.message);
    }
  }

  async updatePurchase(purchaseId, updateData) {
    try {
      const [rowsUpdated] = await Compra.update(updateData, { where: { id: purchaseId } });
      if (rowsUpdated === 0) {
        throw new Error('Compra não encontrada.');
      }
      const updatedPurchase = await Compra.findByPk(purchaseId);
      return updatedPurchase;
    } catch (error) {
      throw new Error('Erro ao atualizar compra: ' + error.message);
    }
  }

  async deletePurchase(purchaseId) {
    try {
      const rowsDeleted = await Compra.destroy({ where: { id: purchaseId } });
      if (rowsDeleted === 0) {
        throw new Error('Compra não encontrada.');
      }
      return true;
    } catch (error) {
      throw new Error('Erro ao deletar compra: ' + error.message);
    }
  }
}

module.exports = new PurchaseService();
