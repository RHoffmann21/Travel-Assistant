import Receipt from '../models/receipt.model.js';

/**
 * @description this function is getting a receipt with given receiptId
 * @param {*} receiptId the receiptId of the receipt
 * @returns the receipt
 */
async function getOneReceipt(receiptId){
  try {
    return await Receipt.findById(receiptId);
  } catch (error) {
    throw new Error('Error getting one receipt');
  }
}

/**
 * @description this function is creating or retrieving a receipt if available
 * @param {*} receipt the given receipt or information
 * @returns thr receipt
 */
async function createNewReceipt(receipt) {
  try {
    const existingReceipt = await getOneReceipt(receipt)
    if(!receipt){
      const base64Receipt = receipt.split(',')[1];
      const buffer = Buffer.from(base64Receipt, 'base64');
      receipt = await new Receipt({ receipt: buffer});
      return await receipt.save();
    } else {
      return existingReceipt
    }
  } catch (error) {
    throw new Error('Error creating new receipt');
  }
}

export default { getOneReceipt, createNewReceipt };
