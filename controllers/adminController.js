const asyncHandler = require('express-async-handler');
const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const userAvailable = await Admin.findOne({email});

    if(userAvailable){
        res.status(400);
        throw new Error("Admin already registered");
    }

    // Hashed Pass
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await Admin.create({
       username: username, email: email, password: hashedPass
    });
    if(user){
        res.status(201).json({_id: user.id, email: user.email});   
    }
    else{
        res.status(400);
        throw new Error("Admin data not valid");
    }
    res.json({message: "Registered successfully"});
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const user = await Admin.findOne({email});
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
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

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = {registerUser, loginUser, currentUser};