import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// Import router tổng (trạm trung chuyển)
import globalRoutes from './routes/index.js';

const app = express();

// --- 1. MIDDLEWARES HỆ THỐNG ---
app.use(helmet()); // Bảo mật HTTP headers
app.use(cors());   // Cho phép gọi API từ domain khác
app.use(morgan('dev')); // Log request ra terminal
app.use(express.json()); // Đọc body JSON
app.use(express.urlencoded({ extended: true }));

// --- 2. ĐỊNH NGHĨA ROUTES ---
// Mọi đường dẫn bắt đầu bằng /api sẽ được đẩy vào đây
app.use('/api', globalRoutes);

// --- 3. XỬ LÝ LỖI 404 ---
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: `Không tìm thấy đường dẫn: ${req.originalUrl} trên server này!`
    });
});

export default app;