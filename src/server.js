import 'dotenv/config';
import app from './app.js';
import connectDB from './config/db.js';

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await connectDB();

        const server = app.listen(PORT, () => {
            console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
            console.log(`✅ Database đã sẵn sàng để phục vụ!`);
        });

        process.on('unhandledRejection', (err) => {
            console.error('💥 UNHANDLED REJECTION! Đang đóng server...');
            console.error(err.name, err.message);
            server.close(() => {
                process.exit(1);
            });
        });

    } catch (error) {
        console.error('❌ Lỗi khởi động server:', error.message);
        process.exit(1);
    }
};

startServer();