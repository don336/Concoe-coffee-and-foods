import Sales from '../model/Sales';
import { v4 as uuidv4 } from 'uuid';
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
      const { orderNumber, customerName, products } = req.body;

      if (!orderNumber || !customerName || !products) {
        return res.status(409).json({
          message: 'All fields are required',
        });
      }

      const validProducts = products.map((product) => {
        const { name, price, quantity } = product;

        if (!name || !price || !quantity) {
          throw new Error('All fields are required');
        }

        return {
          name,
          quantity,
          price,
        };
      });

      const validAmount = validProducts.reduce((sum, product) => {
        return sum + product.price * product.quantity;
      }, 0);

      const sale = await Sales.create({
        saleId: uuidv4(),
        orderNumber,
        customerName,
        products: validProducts,
        totalAmount: validAmount,
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
    try {
      const { id } = req.params;

      const sale = await Sales.findById(id);

      if (!sale) {
        return res.status(400).json({ message: 'Sale Not Found' });
      }

      const { orderNumber, customerName, products, totalAmount } = req.body;

      if (!orderNumber && !customerName && !products && !totalAmount) {
        return res.status(409).json({
          message: 'No valid update data',
        });
      }

      if (orderNumber) sale.orderNumber = orderNumber;
      if (customerName) sale.customerName = customerName;

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
