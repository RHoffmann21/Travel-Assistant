import express from 'express';
import TravelExpenseReportController from './controller/travelExpenseReport.controller.js';
import AuthController from './controller/auth.controller.js';
import Auth from './lib/auth.js';
import ReceiptController from './controller/receipt.controller.js';

const router = express.Router();


router.get('/api/auth/profile', AuthController.getUser);
router.use('/api/auth', Auth.authRouter);

router.get('/api/v1/travelExpenseReports', AuthController.ensureLoggedIn, TravelExpenseReportController.getTravelExpenseReports);
router.post('/api/v1/travelExpenseReports/create', AuthController.ensureLoggedIn, TravelExpenseReportController.createTravelExpenseReport);
router.get('/api/v1/travelExpenseReports/audit', AuthController.ensureLoggedIn, AuthController.ensureIsAuditor, TravelExpenseReportController.getTravelExpenseReportsToAudit);
router.get('/api/v1/travelExpenseReports/validate', AuthController.ensureLoggedIn, AuthController.ensureIsSupervisor, TravelExpenseReportController.getTravelExpenseReportsToValidate);

router.get('/api/v1/travelExpenseReports/:travelExpenseReportId', AuthController.ensureLoggedIn, TravelExpenseReportController.getOneTravelExpenseReport);
router.post('/api/v1/travelExpenseReports/:travelExpenseReportId/chat', AuthController.ensureLoggedIn, TravelExpenseReportController.updateTravelExpenseReportChat);

router.get('/api/v1/travelExpenseReports/:travelExpenseReportId/audit', AuthController.ensureLoggedIn, AuthController.ensureIsAuditor, TravelExpenseReportController.getOneTravelExpenseReport);
router.post('/api/v1/travelExpenseReports/:travelExpenseReportId/audit', AuthController.ensureLoggedIn, AuthController.ensureIsAuditor, TravelExpenseReportController.updateOneTravelExpenseReport);

router.get('/api/v1/travelExpenseReports/:travelExpenseReportId/validate', AuthController.ensureLoggedIn, AuthController.ensureIsSupervisor, TravelExpenseReportController.getOneTravelExpenseReport);
router.post('/api/v1/travelExpenseReports/:travelExpenseReportId/validate', AuthController.ensureLoggedIn, AuthController.ensureIsSupervisor, TravelExpenseReportController.updateOneTravelExpenseReport);

router.post('/api/v1/travelExpenseReports/:travelExpenseReportId/convert', AuthController.ensureLoggedIn, TravelExpenseReportController.convertTravelExpenseReport);

router.delete('/api/v1/travelExpenseReports/:travelExpenseReportId', AuthController.ensureLoggedIn, TravelExpenseReportController.deleteTravelExpenseReport);

router.get('/api/v1/travelExpenseReports/questions/firstQuestion', AuthController.ensureLoggedIn, TravelExpenseReportController.getFirstQuestion);

router.get('/api/v1/receipt/:receiptId', AuthController.ensureLoggedIn, ReceiptController.getOneReceipt);

export default router;
