import Reciept from '../models/reciept.model.js';

async function getOneReciept(recieptId){
  try {
    return await Reciept.findById(recieptId);
  } catch (error) {
    throw new Error('Error getting one reciept');
  }
}

async function createNewReciept(reciept) {
  try {
    return await new Reciept(reciept).save();
  } catch (error) {
    throw new Error('Error creating new reciept');
  }
}

export default { getOneReciept, createNewReciept };
