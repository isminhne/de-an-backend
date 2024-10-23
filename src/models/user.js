import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  phone: {
    type: String,
  },
}, {
  timestamps: true,
});

UserSchema.statics.createUser = async function ({
  username,
  email,
  password,
  phone
}) {
  return await this.create({
    username,
    email,
    password: await bcrypt.hash(password, 10),
    phone
  });
}

UserSchema.methods.verifyPassword = function (password) {
  return this.password && bcrypt.compare(password, this.password);
}

export default mongoose.model('User', UserSchema, 'users');