import mongoose from 'mongoose';

const otpCodeSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, index: { expires: 300 } } // Tự xóa sau 5 phút (300s)
});

export default mongoose.model('OtpCode', otpCodeSchema);