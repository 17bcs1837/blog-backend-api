const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    }
});

userSchema.methods.comparePassword = async function comparePassword(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

module.exports = mongoose.model("User", userSchema);