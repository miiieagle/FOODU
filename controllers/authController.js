const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const otpGenerator = require('otp-generator');
const sendEmail = require('../utils/email');
const StatusCodes = require('../utils/statusCodes');

//Registers a new user and sends an OTP to their email.

const register = async (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        error.statusCode = StatusCodes.BAD_REQUEST;
        return next(error);
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            const error = new Error('User already exists');
            error.statusCode = StatusCodes.CONFLICT;
            return next(error);
        }

        const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
        const hashedOtp = await bcrypt.hash(otp, 10);

        user = new User({ name, email, password, otp: hashedOtp });
        await user.save();

        await sendEmail(email, 'OTP Verification', `Your OTP is ${otp}`);

        res.status(StatusCodes.CREATED).json({ message: 'User registered, OTP sent to email' });
    } catch (err) {
        next(err);
    }
};

//Verifies the OTP sent to the user's email.
 
const verifyOtp = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        otp: Joi.string().length(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        error.statusCode = StatusCodes.BAD_REQUEST;
        return next(error);
    }

    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('Invalid email');
            error.statusCode = StatusCodes.NOT_FOUND;
            return next(error);
        }

        const isMatch = await bcrypt.compare(otp, user.otp);
        if (!isMatch) {
            const error = new Error('Invalid OTP');
            error.statusCode = StatusCodes.UNAUTHORIZED;
            return next(error);
        }

        user.otp = undefined;
        await user.save();

        const payload = { userId: user.id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(StatusCodes.OK).json({
            message: 'Welcome to FOODU! Enjoy our delicious offerings.',
            slogan: 'Savor the Flavor!',
            token
        });
    } catch (err) {
        next(err);
    }
};

//Initiates the login process by sending an OTP to the user's email.

const loginRequestOtp = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        error.statusCode = StatusCodes.BAD_REQUEST;
        return next(error);
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('Invalid email or password');
            error.statusCode = StatusCodes.UNAUTHORIZED;
            return next(error);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error('Invalid email or password');
            error.statusCode = StatusCodes.UNAUTHORIZED;
            return next(error);
        }

        const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
        const hashedOtp = await bcrypt.hash(otp, 10);

        user.otp = hashedOtp;
        await user.save();

        await sendEmail(email, 'OTP Verification', `Your OTP is ${otp}`);

        res.status(StatusCodes.OK).json({ message: 'OTP sent to your email' });
    } catch (err) {
        next(err);
    }
};

//Verifies the OTP sent during the login process and issues a JWT token.
const verifyLoginOtp = async (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        otp: Joi.string().length(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        error.statusCode = StatusCodes.BAD_REQUEST;
        return next(error);
    }

    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('Invalid email');
            error.statusCode = StatusCodes.NOT_FOUND;
            return next(error);
        }

        const isMatch = await bcrypt.compare(otp, user.otp);
        if (!isMatch) {
            const error = new Error('Invalid OTP');
            error.statusCode = StatusCodes.UNAUTHORIZED;
            return next(error);
        }

        user.otp = undefined;
        await user.save();

        const payload = { userId: user.id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(StatusCodes.OK).json({
            message: 'Welcome back to FOODU!',
            slogan: 'Savor the Flavor!',
            token
        });
    } catch (err) {
        next(err);
    }
};

//Promotes a user to admin.
 
const promoteToAdmin = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = StatusCodes.NOT_FOUND;
            return next(error);
        }

        user.role = 'admin';
        await user.save();

        res.status(StatusCodes.OK).json({ message: `${email} is now an admin` });
    } catch (err) {
        next(err);
    }
};

module.exports = { register, verifyOtp, loginRequestOtp, verifyLoginOtp, promoteToAdmin };
