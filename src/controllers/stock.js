import Stock from '../model/Stock';
import { v4 as uuidv4 } from 'uuid';
class stockController {
  static async getAllStock(req, res) {
    try {
      const stock = await Stock.find();
      if (stock.length === 0) {
        throw new Error('No available Stock');
      }

      return res.status(200).json({ message: 'Stock Found', stock });
    } catch (error) {
      return res.status(500).json({
        message: 'Server Error',
        Error: error.message,
      });
    }
  }

  static async getStock(req, res) {
    try {
      const { id } = req.params;

      const stock = await Stock.findOne({ _id: id });

      if (!stock) {
        throw new Error('Stock not found');
      }

      return res.status(200).json({ message: 'Stock Found', stock });
    } catch (error) {
      return res.status(500).json({
        message: 'Server Error',
        Error: error.message,
      });
    }
  }

  static async postStock(req, res) {
    try {
      const { name, quantity, unit, price } = req.body;

      if (!name || !quantity || !unit || !price) {
        throw new Error('All fields required');
      }

      const newstock = await Stock.create({
        stockId: uuidv4(),
        name,
        unit,
        quantity,
        price,
      });

      return res.status(201).json({
        message: 'Stock Added',
        newstock,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server Error',
        Error: error.message,
      });
    }
  }

  static async updateStock(req, res) {
    try {
      const { id } = req.params;
      const { name, unit, quantity, price } = req.body;

      if (!name && !unit && !quantity && !price) {
        throw new Error('At least one field is required');
      }

      const updateStock = await Stock.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            name,
            quantity,
            price,
            unit,
          },
          new: true,
        }
      );
      return res.status(201).json({
        message: 'Stock Updated',
        updateStock,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server Error',
        Error: error.message,
      });
    }
  }

  static async deletestock(req, res) {
    try {
      const { id } = req.params;
      const stock = await Stock.findOne({ _id: id });

      if (!stock) {
        throw new Error('Stock not found');
      }
      const deleteStock = await Stock.findOneAndDelete({ _id: id });

      return res
        .status(200)
        .json({ message: 'Stock deleted', deletedstock: deleteStock });
    } catch (error) {
      return res.status(500).json({
        message: 'Server Error',
        Error: error.message,
      });
    }
  }
}

export default stockController;
