const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Hero = require("../models/hero")

// ------------------GET--------------------------

router.get("/",(req,res,next) => {
    Hero.find()
    .then(heroes => {
        res.status(200).json(heroes)
    })
    .catch(err => {
        console.log(err.message);
        res.status(200).json({
            error: {
                message: err.message
            }
        })
    })

});

// ------------------POST-------------------------

router.post("/",(req,res,next) => {
   
    const newHero = new Hero({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        role: req.body.role
    });

//write to db
    newHero.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            message: "Hero Saved",
            hero:{
                name: result.name,
                role:result.role,
                id: result._id,
            metadata: {
                method: req.method,
                hostname: req.hostname
                }
            }
        })
    })
    .catch(err => {
        console.log(err.message);
        res.status(200).json({
            error: {
                message: err.message
            }
        })
    })

    });

// ----------------------GET By Id----------------------

router.get("/:heroId",(req,res,next) => {
    const heroId = req.params.heroId

    Hero.findById(heroId)
    .then(hero => {
        if(!hero) {
            return res.status(404).json({message: 'item not found'});
        }
        res.status(200).json(hero);
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({
            message: "Error finding Id"
        });
    });
});

//-----------------------PATCH By Id---------------------
router.patch("/:heroId",(req,res,next) => {
    const heroId = req.params.heroId

    const updatedHero = {
        name: req.body.name,
        role: req.body.role
    }

    Hero.updateOne({
        _id: heroId
    }, {
        $set: updatedHero
    }).then(result => {
        res.status(200).json({
            message: "Updated Hero",
            hero: {
                name: result.name, 
                role: result.role, 
                id: result._id},
            metadata: {
                host: req.hostname,
                method: req.method
            }
        })
    })
    .catch(err => {
        res.status(200).json({
            error: {
                message: err.message
            }
        });
    });
});

//------------------------Delete By Id----------------------------

router.delete("/:heroId",(req,res,next) => {
    const heroId = req.params.heroId

    Hero.findByIdAndRemove(heroId)
    .then(hero => {
        if(!hero) {
            return res.status(404).json({
                message: "Item not found"
            });
        }
        res.status(200).json({
            message: "Hero Deleted"
        })
   
    });
});



module.exports = router