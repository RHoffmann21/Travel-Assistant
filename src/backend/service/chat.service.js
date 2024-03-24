import Chat from '../models/chat.model.js'

async function getChatById(chatId) {
  const chat = await Chat.find();
  if (typeof (chat) === 'undefined' || chat.length === 0) {
    return await SettingsService.inportInitData();
  }
  return settings;
}

async function updateChatById (chatId, updatedChat) {
  try {
    await Chat.findOneAndReplace({_id: chatId}, updatedChat);
  } catch (error) {
    throw new Error('Error updating chat');
  }
}

async function createNewChat(chat){
  try {
    return new Chat(chat).save();
  } catch (error) {
    throw new Error('Error creating ne chat', error)
  }
}

export default { getChatById, updateChatById, createNewChat };