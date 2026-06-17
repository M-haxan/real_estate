import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try{
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validate = await User.findOne({ email });
        if (!validate) {
            return next(errorHandler(404, 'User not found'));
        }
        const isMatch = await bcrypt.compare(password, validate.password);
        if (!isMatch) {
            return next(errorHandler(401, 'Invalid credentials'));
        }
        const token = jwt.sign({ id: validate._id }, process.env.JWT_SECRET);
        const {password: pass, ...rest} = validate._doc;
        res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
    } catch (error) {
        next(error);
    }
}

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};