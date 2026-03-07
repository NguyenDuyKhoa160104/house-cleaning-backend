// src/seeders/StaffSeeder.js
import 'dotenv/config';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectDB from '../config/db.js';
import Staff from '../models/Staff.js';

// Import các hằng số vừa tạo
import { STAFF_STATUS, STAFF_ROLES } from '../utils/constants.js';

const seedStaffs = async () => {
    try {
        // 1. Kết nối Database
        await connectDB();

        // 2. Xóa hết dữ liệu nhân viên cũ để reset từ đầu
        console.log('Đang xóa dữ liệu cũ...');
        await Staff.deleteMany();

        // 3. Mã hóa mật khẩu chung là "123456" cho tất cả tài khoản mẫu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);

        // 4. Chuẩn bị danh sách nhân viên mẫu dùng các hằng số (Constants)
        const sampleStaffs = [
            {
                phoneNumber: '0987654321',
                password: hashedPassword,
                role: STAFF_ROLES.MANAGER,          
                fullName: 'Quản Lý Trần Văn A',
                status: STAFF_STATUS.ACTIVE         
            },
            {
                phoneNumber: '0123456789',
                password: hashedPassword,
                role: STAFF_ROLES.STAFF,           
                fullName: 'Nhân Viên Dọn Dẹp B',
                status: STAFF_STATUS.ACTIVE         
            },
            {
                phoneNumber: '0111222333',
                password: hashedPassword,
                role: STAFF_ROLES.STAFF,
                fullName: 'Nhân Viên Giặt Sofa C',
                status: STAFF_STATUS.INACTIVE       
            },
            {
                phoneNumber: '0999888777',
                password: hashedPassword,
                role: STAFF_ROLES.STAFF,
                fullName: 'Nhân Viên Vi Phạm D',
                status: STAFF_STATUS.BANNED        
            }
        ];

        // 5. Đẩy dữ liệu vào Database
        await Staff.insertMany(sampleStaffs);
        console.log('✅ Đã nạp dữ liệu Staff mẫu thành công!');

        // 6. Đóng kết nối và thoát script
        process.exit();

    } catch (error) {
        console.error('❌ Lỗi khi nạp dữ liệu:', error);
        process.exit(1);
    }
};

seedStaffs();