const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String }
}, { timestamps: true });

// hash password before save
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    } catch (err) {
        next(err);
    }
});

UserSchema.methods.comparePassword = function(pw) {
    return bcrypt.compare(pw, this.password);
};

module.exports = mongoose.model('User', UserSchema);