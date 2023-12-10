import { v4 as uuidv4 } from 'uuid';
import Crop from '../model/Crop';
// import User from "../model/User";

class cropController {
  static async getCrops(req, res) {
    try {
      const crops = await Crop.find().populate('userId');

      if (crops.length === 0) {
        return res.status(404).json({ message: 'No Crops Found' });
      }

      return res.status(200).json({
        message: 'Expected Crops',
        crops,
      });
    } catch (error) {
      res.status(500).json({
        Error: error.message,
      });
    }
  }

  static async getCrop(req, res) {
    try {
      const { id } = req.params;
      const foundCrop = await Crop.findById(id).populate('userId');

      if (!foundCrop) {
        return res.status(400).json({
          message: 'Crop not found in the database',
        });
      }

      return res.status(200).json({
        message: 'Crop Found!',
        foundCrop,
      });
    } catch (error) {
      res.status(500).json({
        Error: error.message,
      });
    }
  }

  static async postCrop(req, res) {
    try {
      const { cropType, season, acreage, expectedYields } = req.body;

      if (!cropType || !season || !acreage || !expectedYields) {
        return res.status(422).json({
          message: 'Please fillout all the required Fields',
        });
      }

      const crop = await Crop.create({
        cropId: uuidv4(),
        cropType,
        season,
        acreage,
        expectedYields,
      });

      return res.status(201).json({
        message: 'Crop Added to the DataBase!',
        crop,
      });
    } catch (error) {
      res.status(500).json({
        Error: error.message,
      });
    }
  }

  static async updateCrop(req, res) {
    try {
      const { id } = req.params;
      const { cropType, season, acreage, expectedYields } = req.body;

      const foundCrop = await Crop.findById({ _id: id });

      if (!foundCrop) {
        throw new Error('Crop Not Found');
      }

      const newCrop = await Crop.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            cropType,
            season,
            acreage,
            expectedYields,
          },
        },
        { new: true }
      );

      return res.status(200).json({
        message: 'Crop Updated!',
        newCrop,
      });
    } catch (error) {
      res.status(500).json({
        Error: error.message,
      });
    }
  }

  static async deleteCrop(req, res) {
    try {
      const { id } = req.params;
      const foundCrop = await Crop.findById({ _id: id });

      if (!foundCrop) {
        return res.status(400).json({
          message: 'No crop found',
        });
      }

      await Crop.deleteOne({ _id: id }); // Use _id instead of cropId
      return res.status(200).json({
        message: 'Crop deleted!',
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  }
}

export default cropController;
