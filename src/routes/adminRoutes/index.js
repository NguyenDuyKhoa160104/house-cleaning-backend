import express from 'express';

// Lùi 2 cấp để ra src/
import * as StaffController from '../../controllers/StaffController.js';
import * as StaffMiddleware from '../../middlewares/StaffMiddleware.js';

const router = express.Router();

router.get(
    '/get-all-staffs', 
    // StaffMiddleware.protect, 
    StaffController.getAllStaffs
);

export default router;