import Jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import User from '../model/user';

class UserController {
  static async registeration(req, res) {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(422).json({
        message: 'Please fillout the required fields',
      });
    }
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(409).json({ message: 'Email has been taken' });
    }

    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return res.status(409).json({ message: 'Username has been taken' });
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPwd = await bcrypt.hash(password, salt);

    try {
      const user = await User.create({
        userId: uuidv4(),
        name,
        username,
        email,
        password: encryptedPwd,
      });
      const accessToken = await Jwt.sign(
        {
          userId: user.userId,
          name: user.name,
          email: user.email,
          username: user.username,
        },
        process.env.TOKEN_SECRET
      );

      res.cookie('token', accessToken, { expire: new Date() + 1 });

      return res.status(201).json({
        message: 'User Registered!',
        accessToken,
        user,
      });
    } catch (error) {
      return res.status(400).json({
        msg: error.message,
      });
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(422).json({
          message: 'Please fillout all necessary fields',
        });
      }

      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return res.status(400).json({
          message: 'User not found please register and try again',
        });
      }

      const passVerif = await bcrypt.compare(password, existingUser.password);

      if (!passVerif) {
        return res.status(401).json({
          message: 'Please Check Password and try again',
        });
      }

      const accessToken = await Jwt.sign(
        {
          _id: existingUser._id,
          name: existingUser.name,
          email: existingUser.email,
          username: existingUser.username,
        },
        process.env.TOKEN_SECRET
      );

      res.cookie('token', accessToken, { expire: new Date() + 1 });

      const { username } = existingUser;

      return res.status(201).json({
        message: "You're logged in",
        accessToken,
        user: {
          username,
          email,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: 'server error',
        error: error.message,
      });
    }
  }
  static async getAccountInfo(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById({ _id: id });

      if (!user) {
        return res.status(400).json({
          message: 'User not Found',
        });
      }
      const { name, email, Bio, dateCreated, role } = user;
      return res.status(200).json({
        message: 'User found',
        user: {
          name,
          email,
          Bio,
          dateCreated,
          role,
        },
      });
    } catch (error) {
      return res.status(500).json({
        message: 'server error',
        error: error.message,
      });
    }
  }

  static async updateAccountInfo(req, res) {
    const { id } = req.params;
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(400).json({
        message: 'User not Found',
      });
    }

    try {
      const { name, username, email, password } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        { _id: id },
        {
          $set: {
            name,
            username,
            email,
            password,
          },
        },
        { new: true }
      );

      return res.status(200).json({
        message: 'User Updated',
        updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'server error',
        error: error.message,
      });
    }
  }
  static async deleteAccount(req, res) {
    const { id } = req.params;
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(400).json({
        message: 'User not Found',
      });
    }

    try {
      const updatedUser = await User.findByIdAndDelete({ userId: id });

      return res.status(200).json({
        message: 'User Deleted',
        updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: 'server error',
        error: error.message,
      });
    }
  }
}

export default UserController;
