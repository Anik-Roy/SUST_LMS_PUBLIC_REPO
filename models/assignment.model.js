const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
    // title: this.state.title,
    // instruction: this.state.instruction,
    // assignmentFileUrl: downloadURL,
    // assignmentMarks: this.state.assignmentMarks,
    // name,
    // type,
    // startingDate: this.state.startingDate,
    // dueDate: this.state.dueDate,
    // author_id: this.props.userId,
    // class_id: clsId
    title: { type: String, required: true },
    instruction: { type: String, required: false },
    assignmentFileUrl: { type: String, required: true },
    assignmentMarks: { type: String, required: true },
    name: { type: String, required: false },
    type: { type: String, required: false },
    startingDate: { type: String, required: true },
    dueDate: { type: String, required: true },
    author_id: { type: String, required: true },
    class_id: { type: String, required: true }
}, {
  timestamps: true,
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;