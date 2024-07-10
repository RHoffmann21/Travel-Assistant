import ReceiptService from "../service/receipt.service.js";

/**
 * @description This function retrieves a requested receipt
 * @param {*} req the request argument to the middleware
 * @param {*} res the response argument to the middleware
 * @param {*} next the callback argument to the middleware
 * @returns the requested receipt
 */
async function getOneReceipt (req, res, next) {
  return res.send(await ReceiptService.getOneReceipt(req.params.receiptId));
}

export default { getOneReceipt }
