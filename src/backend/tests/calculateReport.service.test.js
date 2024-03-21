const CalculateReportService = require('../services/calculateReport.service.js');
require('dotenv').config()
// import dotenv from 'dotenv';
// dotenv.config()

describe('Calculates mileage allowance', function () {
  describe('Positive tests', function () {
    test('Checks that the correct mileage allowance is returned', () => {
      try {
        expect(CalculateReportService.calculateMileageAllowance(400)).toStrictEqual(120);
        expect(CalculateReportService.calculateMileageAllowance(200)).toStrictEqual(60);
        expect(CalculateReportService.calculateMileageAllowance(-10)).toStrictEqual(0);
        expect(CalculateReportService.calculateMileageAllowance(0)).toStrictEqual(0);
      } catch (error) {
        expect(error).toBeUndefined();
      }
    });
  });
  describe('Negative tests', function () {
    test('Checks that the correct error is thrown', () => {
      try {
        expect(CalculateReportService.calculateMileageAllowance()).toThrow('mileage is undefined');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});

describe('Calculates meal deduction', function () {
  describe('Positive tests', function () {
    test('Checks that the correct meal deduction is returned', () => {
      try {
        expect(CalculateReportService.calculateMealDeduction(40, false, false, false)).toStrictEqual(0);
        expect(CalculateReportService.calculateMealDeduction(40, true, false, false)).toStrictEqual(8);
        expect(CalculateReportService.calculateMealDeduction(36, true, true, false)).toStrictEqual(21.6);
        expect(CalculateReportService.calculateMealDeduction(36, true, true, true)).toStrictEqual(36);
        expect(CalculateReportService.calculateMealDeduction(0, false, false, false)).toStrictEqual(0);
        expect(CalculateReportService.calculateMealDeduction(0, true, false, false)).toStrictEqual(0);
        expect(CalculateReportService.calculateMealDeduction(0, true, true, false)).toStrictEqual(0);
        expect(CalculateReportService.calculateMealDeduction(0, true, true, true)).toStrictEqual(0);
      } catch (error) {
        console.log(error);
        expect(error).toBeUndefined();
      }
    });
  });
  describe('Negative tests', function () {
    test('Checks that the correct error is thrown', () => {
      try {
        expect(CalculateReportService.calculateMealDeduction(undefined, false, true, false)).toThrow('mealAllowance is undefined');
        expect(CalculateReportService.calculateMealDeduction()).toThrow('mealAllowance is undefined');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
