import Otp from '../models/OtpCode.js';
import Staff from '../models/Staff.js';

export const sendOtp = async (req, res) => {
    try {
        const { phoneNumber } = req.body;

        // 1. Kiểm tra xem số điện thoại này đã có tài khoản chưa
        const existingStaff = await Staff.findOne({ phoneNumber });
        if (existingStaff) {
            return res.status(400).json({ success: false, message: 'Số điện thoại này đã được đăng ký!' });
        }

        // 2. Tạo mã OTP ngẫu nhiên 6 số
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // 3. Lưu OTP vào database (Xóa OTP cũ của số này nếu có)
        await Otp.deleteMany({ phoneNumber });
        await Otp.create({ phoneNumber, otp });

        // 4. Gửi OTP (Ở đây bạn sẽ tích hợp dịch vụ SMS như Twilio, Esms...)
        console.log(`🔑 OTP cho ${phoneNumber} là: ${otp}`); 

        res.status(200).json({
            success: true,
            message: 'Mã OTP đã được gửi tới số điện thoại!'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};