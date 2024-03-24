import RecieptService from '../service/reciept.service.js'

async function getOneReciept(req, res, next){
  const recieptId = req.params.recieptId;
  try {
    return res.send(await RecieptService.getOneReciept(recieptId));
  } catch (error) {
    throw new Error('Error getting one Reciept', error);
  }
}

async function saveNewReciept(req, res, next){
  const { body } = req;
  try {
    return res.send(await RecieptService.saveNewReciept(body.reciept));
  } catch (error) {
    throw new Error('Error saving new reciept', error);
  }
}

export default { getOneReciept, saveNewReciept };
