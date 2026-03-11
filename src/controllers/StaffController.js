import Staff from '../models/Staff.js';
import Otp from '../models/OtpCode.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { STAFF_STATUS } from '../utils/constants.js';

// Khai báo export const ngay trước tên hàm
export const getAllStaffs = async (req, res) => {
    try {
        const staffs = await Staff.find().select('-password');
        res.status(200).json({ success: true, total: staffs.length, data: staffs });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi server!', error: error.message });
    }
};

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
};

export const staffLogin = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        // 1. Kiểm tra đầu vào
        if (!phoneNumber || !password) {
            return res.status(400).json({ success: false, message: 'Vui lòng nhập đầy đủ SĐT và mật khẩu!' });
        }

        // 2. Tìm staff và lấy cả password (vì model để select: false)
        const staff = await Staff.findOne({ phoneNumber }).select('+password');
        if (!staff) {
            return res.status(401).json({ success: false, message: 'Thông tin đăng nhập không chính xác!' });
        }

        // 3. Kiểm tra mật khẩu đã băm (Bcrypt)
        const isPasswordCorrect = await bcrypt.compare(password, staff.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ success: false, message: 'Thông tin đăng nhập không chính xác!' });
        }

        // 4. Kiểm tra trạng thái tài khoản
        if (staff.status !== STAFF_STATUS.ACTIVE) {
            return res.status(403).json({ success: false, message: 'Tài khoản đã bị khóa hoặc ngừng hoạt động!' });
        }

        // 5. Tạo token và gửi về client
        const token = signToken(staff._id);

        // Xóa password khỏi object trả về
        staff.password = undefined;

        res.status(200).json({
            success: true,
            message: 'Đăng nhập thành công!',
            token,
            data: staff
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi server!', error: error.message });
    }
};

// --- [POST] /api/admin/create-staff ---
export const createStaff = async (req, res) => {
    try {
        const { phoneNumber, password, fullName, role, otp } = req.body;

        // 1. Kiểm tra đầu vào cơ bản
        if (!phoneNumber || !password || !otp) {
            return res.status(400).json({ success: false, message: 'Vui lòng nhập đủ SĐT, mật khẩu và mã OTP!' });
        }

        // 2. Xác thực OTP
        const lastOtp = await Otp.findOne({ phoneNumber }).sort({ createdAt: -1 });

        if (!lastOtp || lastOtp.otp !== otp) {
            return res.status(400).json({ success: false, message: 'Mã OTP không chính xác hoặc đã hết hạn!' });
        }

        // 3. Kiểm tra lại một lần nữa xem SĐT đã tồn tại chưa (đề phòng race condition)
        const existingStaff = await Staff.findOne({ phoneNumber });
        if (existingStaff) {
            return res.status(400).json({ success: false, message: 'Số điện thoại đã được đăng ký!' });
        }

        // 4. Mã hóa mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 5. Tạo nhân viên mới
        const newStaff = await Staff.create({
            phoneNumber,
            password: hashedPassword,
            fullName,
            role,
            status: STAFF_STATUS.ACTIVE
        });

        // 6. Xóa OTP sau khi đã sử dụng xong
        await Otp.deleteMany({ phoneNumber });

        // 7. Trả về kết quả (Ẩn password)
        newStaff.password = undefined;
        res.status(201).json({
            success: true,
            message: 'Tạo tài khoản nhân viên thành công!',
            data: newStaff
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Sau này có hàm mới cũng cứ export const
// export const createStaff = async (req, res) => { ... };