const mongooser = require ('mongoose');

// creat user blue prints
const Schema = mongooser.Schema;

const userSchema = new Schema({
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