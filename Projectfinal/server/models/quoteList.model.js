const mongoose = require("mongoose");


// define Schema Class
const Schema = mongoose.Schema;

    // Create a Schema
   const  quotes = new Schema({
      quote:  String, 
      source: String,
      citation: String,
      image : String,
      year : String
    });
    
    
    // Make a Model
    const QuoteModel = mongoose.model('quotes', quotes);
  
    // export the model
    module.exports = QuoteModel;

  
  
  