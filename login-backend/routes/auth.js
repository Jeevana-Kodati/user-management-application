const router = require('express').Router();
const Alien = require('../models/Alien');
const jwt = require('jsonwebtoken');
const CryptoJs = require('crypto-js');


router.post('/register', async (req, res) => {
    const existingUsername = await Alien.findOne({ username: req.body.username });
    if (existingUsername) {
        return res.status(400).json("Username already taken");
    }

    const existingEmail = await Alien.findOne({ email: req.body.email });
    if (existingEmail) {
        return res.status(400).json("Email already registered");
    }

    const newAlien = new Alien({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });

    try {
        const savedAlien = await newAlien.save();
        res.status(200).json(savedAlien);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const alien = await Alien.findOne({ username: req.body.username });

        if (!alien) {
            return res.status(401).json("Wrong username");
        }

        const originalPassword = CryptoJs.AES.decrypt(alien.password, process.env.PASS_SEC).toString(CryptoJs.enc.Utf8);
        if (originalPassword !== req.body.password) {
            return res.status(401).json("Wrong password");
        }

        const accessToken = jwt.sign(
            {
                id: alien._id,
                role: alien.role,
            }, process.env.JWT_SEC, { expiresIn: "1d" });

        const { role, username, _id, ...others } = alien._doc;
        res.status(200).json({ _id, role, username, accessToken });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
