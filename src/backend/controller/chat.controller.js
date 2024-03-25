import ChatService from '../service/chat.service.js'

async function getOneChat (req, res, next) {
  const chatId = req.params.chatId;
  try {
    return await ChatService.getChatById(chatId);
  } catch (error) {
    throw new Error('Error getting one chat');
  }
}

async function updateOneChat (req, res, next) {
  const chatId = req.params.chatId;
  try {
    return await ChatService.updateChatById(chatId, req.body);
  } catch (error) {
    throw new Error('Error updating one chat');
  }
}

export default { getOneChat, updateOneChat }