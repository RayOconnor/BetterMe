module.exports = function () {
  var mongoose = require('mongoose');

  var RegimenSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: String,
    start: {type: Date, required: true},
    end: {type: Date, required: true},
    dateCreated: {type: Date, required: true},
    frequencyScope: {type: String, enum: ['D', 'W', 'M'], default: 'W'},
    frequencyNumber: Number,
    cadettes: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
    _coach: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}
  }, {collection: 'regimen'});

  return RegimenSchema;
};