const mongoose = require('mongoose');

// creat user blue prints
const Schema = mongoose.Schema;

// encrypt password
const bcrypt = require('bcrypt-nodejs');
const crypto =require('crypto');

const UserSchema = new Schema({
    email: { type: String, unique: true, lowercase: true},
    name: String,
    password: String,
    picture: String,
    isSeller: { type: Boolean, default: false},
    address: {
        add1: String,
        add2: String,
        city: String,
        state: String,
        country: String,
        postalCode: String,
    },
    created: {type: Date, default: Date.now}
});

// before saving encrypt the password
UserSchema.pre('save', function(next) {
    var user = this;
    // if password is changed (new do call back else encryption)
    if(!user.isModified('password')) return next();
    bcrypt.hash(user.password, null, null, function(err, hash){
        if (err) return next(err);
        user.password = hash;
        next();
    });
});


// Custom Function for Password Comparison
UserSchema.methods.comparePassword = function(password) {
    // password you pass, (this password is from db)
    return bcrypt.compareSync(password, this.password);
};

// Custom Fuction for Avatar
UserSchema.methods.gravatar = function(size) {
    // size doesn't exists
    if (!this.size) size = 200;
    if (!this.email){
     return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
    }else {
        // email exists
        var md5= crypto.createHash('md5').update(this.email).digest('hex');
        return 'https://gravatar.com/avatar/' + md5 + '?s' + size + '&d=retro'; 
    }    
}

module.exports = mongoose.model('User', UserSchema);