const moongose = require('mongoose');

const orderSchema = new moongose.Schema({
    user: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    courses: [{
        courseName: String,
        price: Number,
        image: String,
        course: {
            type: moongose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        }

    }],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    paymentOption: String,
    paymentStatus: String,
}, {
    timestamps: true
})

const Order = moongose.model('Order', orderSchema);
module.exports = Order;