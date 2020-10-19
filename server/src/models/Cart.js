const moongose = require('mongoose');

const cartSchema = new moongose.Schema({
    user: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        productId: String,

    }],
    price: Number
}, {
    timestamps: true
})