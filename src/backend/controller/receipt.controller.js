import ReceiptService from '../service/receipt.service.js'

async function getOneReceipt(req, res, next){
  const receiptId = req.params.receiptId;
  try {
    return res.send(await ReceiptService.getOneReceipt(receiptId));
  } catch (error) {
    throw new Error('Error getting one Receipt', error);
  }
}

async function saveNewReceipt(req, res, next){
  const { body } = req;
  try {
    return res.send(await ReceiptService.saveNewReceipt(body.receipt));
  } catch (error) {
    throw new Error('Error saving new receipt', error);
  }
}

export default { getOneReceipt, saveNewReceipt };
