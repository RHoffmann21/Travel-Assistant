import Receipt from '../models/receipt.model.js';

async function getOneReceipt(receiptId){
  try {
    return await Receipt.findById(receiptId);
  } catch (error) {
    throw new Error('Error getting one receipt');
  }
}

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
