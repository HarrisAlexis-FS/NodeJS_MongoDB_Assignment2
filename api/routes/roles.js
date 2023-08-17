const express = require("express");
const router = express.Router();

router.get("/",(req,res,next) => {
res.json({
    message: "Roles-GET"
});
});

router.post("/",(req,res,next) => {
    res.json({
        message: "Roles-POST"
    });
    });

router.get("/:roleId",(req,res,next) => {
    const heroId = req.params.roleId
res.json({
    message: "Roles-GET By Id",
    id: heroId
});
});

router.patch("/:roleId",(req,res,next) => {
    const heroId = req.params.roleId
res.json({
    message: "Roles-PATCH",
    id: heroId
});
});

router.delete("/:roleId",(req,res,next) => {
    const heroId = req.params.roleId
res.json({
    message: "Roles-DELETE",
    id: heroId
});
});



module.exports = router