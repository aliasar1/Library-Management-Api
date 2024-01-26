const asyncHandler = require('express-async-handler');
const Customer = require('../models/customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerCustomer = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const customerAvailable = await Customer.findOne({ email });

    if (customerAvailable) {
        res.status(400);
        throw new Error("Customer already registered");
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const newCustomer = new Customer({
        username,
        email,
        password: hashedPass,
        booksIssued: [],
    });

    try {
        await newCustomer.save();
        res.status(201).json({ _id: newCustomer._id, email: newCustomer.email, message: "Registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error saving customer to the database", error: error.message });
    }
});


const loginCustomer = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const customer = await Customer.findOne({email});
    if(customer && (await bcrypt.compare(password, customer.password))){
        const accessToken = jwt.sign({
            customer: {
                    username: customer.username,
                    email: customer.email,
                    id: customer.id,
                },
            }, process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "365d"}
        );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Email or password is not valid.");
    }
});

const currentCustomer = asyncHandler(async (req, res) => {
    res.json(req.customer);
});

module.exports = {registerCustomer, loginCustomer, currentCustomer};