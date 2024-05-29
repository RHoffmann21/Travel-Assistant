import Receipt from '../models/receipt.model.js';
import dtsLogger from 'dts-node-logger';

/**
 * @description this function is getting a receipt with given receiptId
 * @param {*} receiptId the receiptId of the receipt
 * @returns the found receipt
 */
async function getOneReceipt(receiptId){
  try {
    return await Receipt.findById(receiptId);
  } catch (error) {
    dtsLogger.error('Error getting one receipt', error);
  }
}

/**
 * @description this function is creating or retrieving a receipt if available
 * @param {*} receipt the given receipt or information
 * @returns thr found receipt
 */
async function createNewReceipt(receipt) {
  try {
    if(receipt.toString().startsWith('data:image/png;base64,')){
      const base64Receipt = receipt.split(',')[1];
      const buffer = Buffer.from(base64Receipt, 'base64');
      receipt = await new Receipt({ receipt: buffer});
      return await receipt.save();
    } else {
      return await getOneReceipt(receipt)
    }
  } catch (error) {
    dtsLogger.error('Error creating new receipt', error);
  }
}

export default { getOneReceipt, createNewReceipt };
