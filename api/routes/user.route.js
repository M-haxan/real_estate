import express from 'express';

import { test } from '../controllers/user.controller.js';
const router = express.Router();

// Example user route
router.get('/test', test);
export default router;