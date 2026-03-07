import Staff from '../models/Staff.js';

// Khai báo export const ngay trước tên hàm
export const getAllStaffs = async (req, res) => {
    try {
        const staffs = await Staff.find().select('-password');
        res.status(200).json({ success: true, total: staffs.length, data: staffs });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi server!', error: error.message });
    }
};

// Sau này có hàm mới cũng cứ export const
// export const createStaff = async (req, res) => { ... };