const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    hasExpired: {
        type:Boolean,
        required:true,
        default:false
    },
    value: {
        type:Number,
        required:true
    }

}, {
    timestamps:true
}
)

const Coupon = mongoose.model('Coupon',couponSchema)
module.exports = Coupon