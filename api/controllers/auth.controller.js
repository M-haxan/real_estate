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
