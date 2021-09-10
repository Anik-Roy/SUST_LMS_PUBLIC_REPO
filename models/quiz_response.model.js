const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quizResponseSchema = new Schema({
    // user_answer: {...submitted_data},
    // total_correct,
    // total_wrong,
    // user_id: this.props.userId,
    // quiz_id: quizId
    user_answer: { type: Array, required: false },
    total_correct: { type: Number, required: false },
    total_wrong: { type: Number, required: false },
    user_id: { type: String, required: true },
    quiz_id: { type: String, required: true }
}, {
  timestamps: true,
});

const QuizResponse = mongoose.model('QuizResponse', quizResponseSchema);

module.exports = QuizResponse;