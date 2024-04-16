import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userFirstName: { type: String, required: true },
  userSubjectId: { type: String, required: true },
  isSupervisor: { type: Boolean, required: true},
  isAuditor: { type: Boolean, required: true},
  userEmail: { type: String, required: true },
  userSupervisorSubjectId: { type: String },
  picture: { type: String }
});
export default mongoose.model('User', userSchema);
