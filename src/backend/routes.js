import express from 'express';
// import { ensureLoggedIn } from './lib/auth';
import TravelExpenseReportController from './controller/travelExpenseReport.controller.js';

const router = express.Router();


// tries to get profile of a user if exists
// router.get('api/auth/profile');
// router.get('api/auth');
// router.get('api/auth/login');
// router.get('api/auth/logout');

// to view  
router.get('/api/v1/travelExpenseReports', TravelExpenseReportController.getTravelExpenseReports);
router.post('/api/v1/travelExpenseReports/create', TravelExpenseReportController.createTravelExpenseReport);
router.get('/api/v1/travelExpenseReports/:travelExpenseReportId', TravelExpenseReportController.getOneTravelExpenseReport);
// router.post('api/v1/travelExpenseReports/:travelExpenseId');
// router.delete('api/v1/travelExpenseReports/:travelExpenseId');
router.post('/api/v1/travelExpenseReports/:travelExpenseReportId/chat', TravelExpenseReportController.updateTravelExpenseReportChat);

export default router;
