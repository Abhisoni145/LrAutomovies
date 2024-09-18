const { mongoose } = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User ',
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'Car',
    },
    note: {
      type: String,
      require: true,
    },
    isStaff: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Note', noteSchema);
