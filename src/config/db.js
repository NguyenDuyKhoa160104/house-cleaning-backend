// src/config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB with URI:', process.env.MONGO_URI);
        // Kết nối với Database thông qua biến môi trường
        const conn = await mongoose.connect(process.env.MONGO_URI);
        
        console.log(`✅ Database đã kết nối thành công: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Lỗi kết nối Database: ${error.message}`);
        // Nếu không kết nối được DB thì nên ép dừng luôn ứng dụng (exit code 1)
        process.exit(1); 
    }
};

export default connectDB;