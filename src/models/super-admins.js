import mongoose from 'mongoose';

const { Schema } = mongoose;

const superAdminsSchema = new Schema({
  firebaseUid: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    minLength: 3,
    maxLength: 25,
    required: true,
  },
  email: {
    type: String,
    minLength: 8,
    maxLength: 25,
    required: true,
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 16,
    required: true,
  },
});

export default mongoose.model('SuperAdmin', superAdminsSchema);
