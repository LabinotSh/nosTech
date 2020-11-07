const moongose = require('mongoose');
const bcrypt = require('bcryptjs');

const ROLE = {
    ADMIN: 'admin',
    USER: 'user'
}

const userSchema = new moongose.Schema({
    name: {
        type: String,
        lowercase: true,
    },
    surname: {
        type: String,
        lowercase: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: ROLE.USER,
        enum: [ROLE.USER,ROLE.ADMIN]
    },
    username: {
        type: String,
        required: true,
    },
    confirmed: {
        type:Boolean,
        default: false
    },
    courses:[{
        type: moongose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
    refreshTokens: [{
        type: String
    }]
},{
    timestamps: true
});





// userSchema.pre("save", async function (next) {
//     const user = this;

//     try {
//         if (!user.isModified("password")) next();

//         let hash = await bcrypt.hash(user.password, 13);
//         user.password = hash;

//         next();
//     } catch (e) {
//         console.error(e);
//         next(e);
//     }
// });

// userSchema.methods.comparePassword = async function (password) {
//     try {
//         let result = await bcrypt.compare(password, this.password);

//         return result;
//     } catch (e) {
//         console.error(e);

//         return false;
//     }
// };
const User = moongose.model('User', userSchema);


module.exports = User;