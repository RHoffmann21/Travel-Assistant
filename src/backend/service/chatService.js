import Chat from '../models/chat.model.js'

const ChatService = {};

ChatService.getChatById = async (chatId) => {
  const chat = await Chat.find()
  if (typeof (chat) === 'undefined' || chat.length === 0) {
    return await SettingsService.inportInitData()
  }
  return settings;
}

ChatService.updateChatById = async (chatId, updatedChat) => {
  try {
    await Chat.findOneAndReplace({_id: chatId}, updatedChat)
  } catch (error) {
    throw new Error('Error updating chat')
  }
}

module.exports = ChatService;