const router = require('express').Router();
const Alien = require('../models/Alien');
const { verifyTokenAndAdmin } = require("./verifyToken");


// getting all aliens
router.get('/allaliens', verifyTokenAndAdmin, async (req, res) => {
    try {
        const aliens = await Alien.find();
        res.status(200).json(aliens);
    }
    catch (err) {
        res.status(500).json(err);
    }

})

//updating alien
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {

        const updatedAlien = await Alien.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            }, { new: true }
        );
        res.status(200).json(updatedAlien);
    } catch (err) {
        res.status(500).json(err);
    }
})

// get alien by id 
router.get("/find/:id", async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id);

        res.status(200).json(alien);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete alien by id 

router.delete('/delete/:id', verifyTokenAndAdmin, async (req, res) => {

    try {
        const deletedAlien = await Alien.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedAlien);
    } catch (err) {
        res.status(500).json(err);
    }

})
module.exports = router;