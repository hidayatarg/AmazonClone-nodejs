const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create category blueprints
const CategorySchema = new Schema({
    // attributes
    name: { type: String, unique: true, lowercase: true },
    created: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Category', CategorySchema);