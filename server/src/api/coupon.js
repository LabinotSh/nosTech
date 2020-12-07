const express = require('express');
const asyncHandler = require('express-async-handler');
const Coupon = require('../models/Coupon');
const router = express.Router();

router.get('/', asyncHandler(async(req,res)=> {
    const coupons = await Coupon.find()
    res.send(coupons)
}))

router.get('/:id', asyncHandler(async(req,res)=> {
    const {id} = req.params
    const coupon = await Coupon.findById(id)
    if(coupon) {
        res.send(coupon)
    }else {
        res.status(404)
        throw new Error("Indvalid or expired coupon")
    }
}))

router.put('/:id', asyncHandler(async(req,res) => {
    const {id} = req.params
    const coupon = await Coupon.findById(id)
    if(coupon) {
        coupon.hasExpired = true;
        console.log(coupon)
    }

    await coupon.save()
    res.send(coupon)
}))

router.post('/', asyncHandler(async(req,res)=> {
    const value = req.body.value

    const coupon = await Coupon.create({
        value
    })
    if(coupon) {
        res.status(201).json({
            message: "Coupon Created",
            coupon
        })
    } else {
        res.status(400)
        throw new Error('Failed ot create coupon')
    }
}))

module.exports = router