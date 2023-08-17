import Customers from '../model/Customers';
import { v4 as uuidv4 } from 'uuid';
class customerController {
  static async getCustomers(req, res) {
    try {
      const customers = await Customers.find();

      if (customers.length === 0) {
        return res.status(400).json({ message: 'No Customers Found' });
      }

      return res.status(200).json({
        message: 'Customers Found!',
        customers,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server Error',
        Error: error.message,
      });
    }
  }

  static async getCustomer(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      const customer = await Customers.findOne({ customerId: id });

      if (!customer) {
        return res.status(400).json('Customer not Found');
      }

      return res.status(200).json({
        message: 'Customer Found',
        customer,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server Error',
        Error: error.message,
      });
    }
  }

  static async postCustomer(req, res) {
    try {
      const { name, email, dateOfBirth } = req.body;
      if (!name || !email || !dateOfBirth) {
        return res.status(422).json({ message: 'All fields required' });
      }
      const customer = await Customers.create({
        customerId: uuidv4(),
        name,
        email,
        dateOfBirth,
      });

      return res.status(201).json({
        message: 'Customer Added',
        customer,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server Error',
        Error: error.message,
      });
    }
  }

  static async updateCustomer(req, res) {
    try {
      const { id } = req.params;
      const { name, email, dateOfBirth } = req.body;

      const newCustomer = await Customers.findOneAndUpdate(
        { customerId: id },
        {
          $set: {
            name,
            email,
            dateOfBirth,
          },
        },
        { new: true }
      );

      return res.status(201).json({
        message: 'Customer Updated',
        newCustomer,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server Error',
        Error: error.message,
      });
    }
  }

  static async deleteCustomer(req, res) {
    try {
      const { id } = req.params;
      const customer = await Customers.findOne({ customerId: id });

      if (!customer) {
        return res.status(400).json({
          message: 'No customer found',
        });
      }

      await Customers.deleteOne({ customerId: id });
      return res.status(200).json({
        message: 'Customer deleted!',
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Server Error',
        Error: error.message,
      });
    }
  }
}

export default customerController;
