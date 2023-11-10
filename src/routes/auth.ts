import express from 'express';
import { verifyGoogleToken } from '../controllers/authController';

const router = express.Router();

router.post('/verify', verifyGoogleToken);

export default router;