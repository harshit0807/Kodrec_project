const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  question: String,
  answer: String,
  correctness_score: Number,
  sentiment: String,
  keywords: [String]
});

module.exports = mongoose.model('Answer', answerSchema);
