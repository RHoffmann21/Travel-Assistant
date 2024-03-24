import CalculateReportService from '../service/calculateReport.service.js';
import dotenv from 'dotenv';
import SettingsService from '../service/settings.service.js';
dotenv.config()
beforeAll(async () => {
  await SettingsService.importSettingsData();
});

describe('Calculates mileage allowance', function () {
  describe('Positive tests', function () {
    test('Checks that the correct mileage allowance is returned', async () => {
      try {
        expect(await CalculateReportService.calculateMileageAllowance(200)).toStrictEqual(60);
        expect(await CalculateReportService.calculateMileageAllowance(-10)).toStrictEqual(0);
        expect(await CalculateReportService.calculateMileageAllowance(0)).toStrictEqual(0);
        expect(await CalculateReportService.calculateMileageAllowance(400)).toStrictEqual(120);
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });
  });
  describe('Negative tests', function () {
    test('Checks that the correct error is thrown', async () => {
      try {
        expect(await CalculateReportService.calculateMileageAllowance()).toThrow('mileage is undefined');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});

describe('Calculates meal deduction', function () {
  describe('Positive tests', function () {
    test('Checks that the correct meal deduction is returned', async () => {
      try {
        expect(await CalculateReportService.calculateMealDeduction(36, true, true, false)).toStrictEqual(21.6);
        expect(await CalculateReportService.calculateMealDeduction(40, true, false, false)).toStrictEqual(8);
        expect(await CalculateReportService.calculateMealDeduction(40, false, false, false)).toStrictEqual(0);
        expect(await CalculateReportService.calculateMealDeduction(36, true, true, true)).toStrictEqual(36);
        expect(await CalculateReportService.calculateMealDeduction(0, false, false, false)).toStrictEqual(0);
        expect(await CalculateReportService.calculateMealDeduction(0, true, false, false)).toStrictEqual(0);
        expect(await CalculateReportService.calculateMealDeduction(0, true, true, false)).toStrictEqual(0);
        expect(await CalculateReportService.calculateMealDeduction(0, true, true, true)).toStrictEqual(0);
      } catch (error) {
        console.log(error);
        expect(error).toBeUndefined();
      }
    });
  });
  describe('Negative tests', function () {
    test('Checks that the correct error is thrown', async () => {
      try {
        expect(await CalculateReportService.calculateMealDeduction()).toThrow('mealAllowance is undefined');
        expect(await CalculateReportService.calculateMealDeduction(undefined, false, true, false)).toThrow('mealAllowance is undefined');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
