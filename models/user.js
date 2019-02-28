const mongooser = require('mongoose');

// creat user blue prints
const Schema = mongooser.Schema;

// encrypt password
const bcrypt = require('bcrypt-node.js');

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
UserSchema.method.comparePassword = function (password) {
    // password you pass, (this password is from db)
    return bcrypt.compareSync(password, this.password);
};