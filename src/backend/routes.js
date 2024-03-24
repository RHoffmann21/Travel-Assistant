import express from 'express';
// import { ensureLoggedIn } from './lib/auth';
import TravelExpenseReportController from './controller/travelExpenseReport.controller.js';
import SettingsService from './service/settings.service.js';

const router = express.Router();


// tries to get profile of a user if exists
// router.get('api/auth/profile');
// router.get('api/auth');
// router.get('api/auth/login');
// router.get('api/auth/logout');

// to view  
router.get('api/v1/travelExpenses', TravelExpenseReportController.getTravelExpenseReports);
// router.get('api/v1/travelExpenses/:travelExpenseId');
// router.post('api/v1/travelExpenses/:travelExpenseId');
// router.delete('api/v1/travelExpenses/:travelExpenseId');

router.get('/api/v1/settings', SettingsService.getSettings);

export default router;
