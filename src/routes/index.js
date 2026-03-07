// src/routes/index.js
import express from 'express';

// Import 3 module routes con (nhớ có đuôi .js)
import adminRoutes from './adminRoutes/index.js';
import clientRoutes from './clientRoutes/index.js';
import cleanerRoutes from './cleanerRoutes/index.js';

const router = express.Router();

// ==========================================
// GẮN TIỀN TỐ CHO TỪNG NHÓM ROUTE
// ==========================================

// Bất kỳ request nào bắt đầu bằng /admin sẽ được đẩy vào adminRoutes xử lý
router.use('/admin', adminRoutes);

// Bất kỳ request nào bắt đầu bằng /client sẽ được đẩy vào clientRoutes xử lý
router.use('/client', clientRoutes);

// Bất kỳ request nào bắt đầu bằng /cleaner sẽ được đẩy vào cleanerRoutes xử lý
router.use('/cleaner', cleanerRoutes);

export default router;