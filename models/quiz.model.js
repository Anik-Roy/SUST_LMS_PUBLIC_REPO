const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quizSchema = new Schema({
    // title: this.state.title,
    // instruction: this.state.instruction,
    // quiz_questions: this.state.quizQuestions,
    // startingDate: this.state.startingDate,
    // dueDate: this.state.dueDate,
    // acceptingQuiz: this.state.acceptingQuiz,
    // author_id: this.props.userId,
    // class_id: clsId
    title: { type: String, required: true },
    instruction: { type: String, required: false },
    quiz_questions: { type: Array, required: true },
    startingDate: { type: String, required: true },
    acceptingQuiz: { type: String, required: true },
    author_id: { type: String, required: true },
    class_id: { type: String, required: true }
}, {
  timestamps: true,
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;