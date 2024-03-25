import Chat from '../models/chat.model,js';
import ChatService from './chat.service.js'

async function extractInfoOfOneChat(chatId){
  const chat = await ChatService.getChatById(chatId);
  
}