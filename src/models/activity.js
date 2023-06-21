import mongoose from 'mongoose';

const { Schema } = mongoose;

const activitySchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: 20,
    unique: true,
    required: true,
  },
  description: {
    type: String,
    minLength: 5,
    maxLength: 250,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model('Activity', activitySchema);
