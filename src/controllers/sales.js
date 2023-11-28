import { v4 as uuidv4 } from 'uuid';
import Sales from '../model/Sales';
import Customers from '../model/Customers';
import { funcToId } from '../utils/objectId';

class SalesController {
  static async getSales(req, res) {
    try {
      const foundSales = await Sales.find().populate({
        path: 'customerId',
        model: 'Customers',
      });

      if (foundSales.length === 0) {
        return res.status(400).json({ message: 'No Sales Found' });
      }

      return res
        .status(200)
        .json({ message: 'Sales Found', Sales: foundSales });
    } catch (error) {
      return res.status(500).json({
        message: 'Server Error',
        Error: error.message,
      });
    }
  }

  static async getSale(req, res) {
    try {
      const { id } = req.params;
      const sale = await Sales.findById({ _id: id }).populate({
        path: 'customerId',
        model: 'Customers',
      });
      if (!sale) {
        return res.status(400).json({ message: 'Sale not found' });
      }

      return res.status(200).json({ message: 'Sale Found', Sales: sale });
    } catch (error) {
      return res.status(500).json({
        message: 'Server Error',
        Error: error.message,
      });
    }
  }

  static async postSale(req, res) {
    try {
      const { customerId } = req.params;

      const customer = await Customers.findOne({
        customerId,
      });

      if (!customer) {
        return res.status(400).json('Not a registered customer');
      }
      const { name, quantity, price } = req.body;

      const customerObjectId = funcToId(customer._id);
      const sale = await Sales.create({
        saleId: uuidv4(),
        customerId: customerObjectId,
        name,
        quantity,
        price,
      });

      return res.status(201).json({
        message: 'Sale Added',
        sale: sale,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server Error',
        error: error.message,
      });
    }
  }

  static async updateSale(req, res) {
    const custId = req.params.customerId;
    const customer = await Customers.findOne({ customerId: custId });

    if (!customer) {
      return res.status(400).json('Not a registered customer');
    }
    try {
      const { id } = req.params;

      const sale = await Sales.findById(id);

      if (!sale) {
        return res.status(400).json({ message: 'Sale Not Found' });
      }

      const { orderNumber, products, totalAmount } = req.body;

      if (!orderNumber && !products && !totalAmount) {
        return res.status(409).json({
          message: 'No valid update data',
        });
      }

      if (orderNumber) sale.orderNumber = orderNumber;

      if (products && Array.isArray(products)) {
        const validProducts = [];
        let validAmount = 0;

        for (const product of products) {
          const { name, price, quantity } = product;

          if (!name || !price || !quantity) {
            return res.status(409).json({
              message: 'All fields are required',
            });
          }

          validProducts.push({
            name,
            quantity,
            price,
          });

          validAmount += price * quantity;
        }

        sale.products = validProducts;
        sale.totalAmount = validAmount;
      }
      const updatedSale = await sale.save();

      return res.status(200).json({
        message: 'Sale Updated',
        updatedSale,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server Error',
        Error: error.message,
      });
    }
  }

  static async deleteSale(req, res) {
    try {
      const { id } = req.params;

      const sale = Sales.findById({ _id: id });

      if (!sale) {
        return res.status(400).json({ message: 'Sale not found' });
      }

      const deletedSale = await Sales.findByIdAndDelete({ _id: id });

      return res.status(200).json({
        message: 'Sale Deleted',
        deletedSale,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server Error',
        Error: error.message,
      });
    }
  }
}

export default SalesController;
