import jwt from 'jsonwebtoken';
import Staff from '../models/Staff.js';

export const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ success: false, message: 'Bạn chưa đăng nhập!' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const currentUser = await Staff.findById(decoded.id);

        if (!currentUser || currentUser.status !== STAFF_STATUS.ACTIVE) {
            return res.status(403).json({
                success: false,
                message: 'Tài khoản không hợp lệ hoặc đã bị vô hiệu hóa!'
            });
        }

        req.user = currentUser;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Token không hợp lệ hoặc đã hết hạn!' });
    }
};