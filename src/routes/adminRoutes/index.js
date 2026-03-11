import express from 'express';

// Lùi 2 cấp để ra src/
import * as StaffController from '../../controllers/StaffController.js';
import * as StaffMiddleware from '../../middlewares/StaffMiddleware.js';
import * as OTPCodeController from '../../controllers/OtpCodeController.js';
const router = express.Router();

router.get(
    '/get-all-staffs', 
    // StaffMiddleware.protect, 
    StaffController.getAllStaffs
);

router.post(
    '/staff-login', 
    StaffController.staffLogin
);

router.get(
    '/check-staff-login', 
    StaffMiddleware.protect, 
    (req, res) => {
        res.status(200).json({ success: true, data: req.user });
    }
)

router.post(
    '/create-staff', 
    StaffMiddleware.protect, 
    StaffController.createStaff
);

router.post(
    '/send-otp', 
    StaffMiddleware.protect, 
    OTPCodeController.sendOtp
);

export default router;