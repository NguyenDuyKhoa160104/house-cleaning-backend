// src/models/Staff.js
import mongoose from 'mongoose';
import { STAFF_STATUS, STAFF_ROLES } from '../utils/constants.js';

const staffSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: Object.values(STAFF_ROLES), // Trở thành: ['MANAGER', 'STAFF']
        default: STAFF_ROLES.STAFF
    },
    fullName: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        default: "https://default-avatar-link.com/avatar.png"
    },
    
    status: {
        type: String,
        enum: Object.values(STAFF_STATUS), // Trở thành: ['ACTIVE', 'INACTIVE', 'BANNED']
        default: STAFF_STATUS.ACTIVE
    }
}, {
    timestamps: true
});

const Staff = mongoose.model('Staff', staffSchema);

export default Staff;