import mongoose from 'mongoose';

const { Schema } = mongoose;

const classSchema = new Schema(
  {
    day: {
      type: [{
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      }],
      required: true,
    },
    hour: {
      type: String,
      require: true,
    },
    trainer: {
      type: Schema.Types.ObjectId,
      ref: 'Trainers',
      require: true,
    },
    activity: {
      type: Schema.Types.ObjectId,
      ref: 'Activity',
      require: true,
    },
    slots: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Class', classSchema);
