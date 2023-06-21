import mongoose from 'mongoose';

const { Schema } = mongoose;

const subscriptionSchema = new Schema({
  classes: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  member: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('Subscription', subscriptionSchema);
