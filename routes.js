const express = require("express");
const router = express.Router();
const User = require("./config");
const firebase = require('./db');
const Users= require('./models/user');
const firestore = firebase.firestore();


router.post("/create", async (req, res) => {
    try {
        const requestBody = req.body;
        const { email, password } = requestBody;

       // const addUser = await firestore.collection('users').doc().set(requestBody);

        res.status(201).send({ status: true, msg: "User Added Successfully" });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error.message });
    }
});

module.exports = router;