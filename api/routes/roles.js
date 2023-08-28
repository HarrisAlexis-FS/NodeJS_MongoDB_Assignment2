const express = require("express");
const Role = require("../models/role")
const router = express.Router();
require("../models/hero");
const Messages = require("../../messages/messages")
const mongoose = require("mongoose");
const messages = require("../../messages/messages");


//---------------POST------------------

router.post("/",(req,res,next) => {


    Role.find({
        role: req.body.role
    })
    .exec()
    .then(result => {
        console.log(result);
        if(result.length > 0){
            return res.status(406).json(messages.role_exists)
        }
    
    
        const newRole = new Role({
            _id: new mongoose.Types.ObjectId(),
            role: req.body.role
        });
    
        
        newRole.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: messages.role_saved,
                metadata: {
                    method: req.method,
                    hostname: req.hostname
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
    
        })
        
    
    });
    
    



//-----------GET-----------------------

router.get("/",(req,res,next) => {
    Role.find()
    .then(roles => {
        res.status(200).json({roles: roles})
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

//-------------GET BY ID_________________

router.get("/:roleId",(req,res,next) => {
    const roleId = req.params.roleId;
    Role.findById(roleId)
    .exec()
    .then(role => {
        if(!role){
            console.log(role);
            return res.status(404).json({
                message: Messages.role_not_found,
            })
        }

res.status(201).json({
    role: role
})
    })
res.json({
    role: res.role,
    id: roleId
})
.catch(err => {
    res.status(500).json({
        error: {
            message: err.messge
        }
    })
})


});

//---------------------------Patch By Id--------------
router.patch("/:roleId",(req,res,next) => {
    const roleId = req.params.roleId

    const updatedRole = {
        role: req.body.role
    }

    Role.updateOne({
        _id: roleId
    }, {
        $set: updatedRole
    }).then(result => {
        res.status(200).json({
            message: "Updated Role",
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

//---------------Delete by Id------------------

router.delete("/:roleId",(req,res,next) => {
    const roleId = req.params.roleId

    Role.deleteOne({
        _id: roleId
    })
    .exec()
    .then(result => {
        res.status(200).json({
            message: "Role Deleted",
            request:{
                method: "GET",
                url:"http://localhost:3001/roles/" + roleId
            }
        })
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
    })
});



module.exports = router