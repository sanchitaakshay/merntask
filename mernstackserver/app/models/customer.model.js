const mongoose = require('mongoose');
 
const CustomerSchema = mongoose.Schema({
  taxyear: String,
  date: String,
  jurisdiction: String,
  name: String,
  parcelid:String,
  status:String,
  letter:String,
  tvalue:String,
  hvalue:String,

    
});

module.exports = mongoose.model('Customer', CustomerSchema);