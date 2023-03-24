import Coffee from "../model/Coffee";

class coffeeController {
  static async getPlantsInfo(req, res) {
    try {
      const plants = await Coffee.find();
      if (!plants) {
        return res.status(400).json({
          message: "No coffe Info found",
        });
      }
      return res.status(200).json({
        message: "Plants Found",
        plants,
      });
    } catch (error) {
      return res.status(500).json({
        message: "server Error",
        error: error.message,
      });
    }
  }

  static async getPlantInfo(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(422).json({
          message: "Invalid Parameters",
        });
      }
      const plantInfo = await Coffee.findOne({ id });
      if (!plantInfo) {
        return res.status(400).json({
          message: "Plant Info found!",
        });
      }
      return res.status(200).json({
        message: "Plant Information Found",
        plantInfo,
      });
    } catch (error) {
      return res.status(500).json({
        message: "server Error",
        error: error.message,
      });
    }
  }

  static async postPlantInfo(req, res) {
    try {
      const { variety, age, location, yield, coffeeType } = req.body;

      if (!variety || !age || !location || !yield || !coffeeType) {
        return res.status(422).json({
          message: "Fill all required Fields",
        });
      }

      const newPlant = await Coffee.create({
        variety,
        age,
        location,
        yield,
        coffeeType,
      });

      res.status(201).json({
        message: "Plant Added to the database",
        newPlant,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Server Error",
        error: error.message,
      });
    }
  }

  static async updatePlantInfo(req, res) {
    try {
      const { id } = req.params;
      const plantInfo = await Coffee.findById({ _id: id });

      if (!plantInfo) {
        return res.status(400).json({
          message: "Plant not found!",
        });
      }
      const { variety, age, location, yield, coffeeType } = req.body;
      const updatedPlant = Coffee.updateOne(
        { _id: id },
        {
          $set: {
            variety,
            age,
            location,
            yield,
            coffeeType,
          },
        },
        { new: true }
      );

      return res.status(201).json({
        message: "Plant Updated",
        updatedPlant,
      });
    } catch (error) {
      return res.status(500).json({
        message: "server Error",
        error: error.message,
      });
    }
  }
}

export default coffeeController;
