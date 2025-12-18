import { create } from 'zustand'

// Тип сообщения
export type MessageType = {
    id: string
    text: string
    senderId: string
    recipientId: string
    chatId: string
    time: string
}

// Хранилище сообщений
interface MessagesStore {
    messages: MessageType[]
    addMessage: (newMessage: MessageType) => void
}

// Создаем хранилище
export const useMessage = create<MessagesStore>((set) => ({
    // Сообщения по умолчанию
    messages: [
        { 
            id: "1", 
            text: "Привет! Как дела?", 
            senderId: "1", 
            recipientId: "me", 
            chatId: "chat1", 
            time: "12:40" 
        },
        { 
            id: "2", 
            text: "Привет! Всё отлично!", 
            senderId: "me", 
            recipientId: "1", 
            chatId: "chat1", 
            time: "12:41" 
        },
    ],
    
    // Добавить сообщение
    addMessage: (newMessage: MessageType) => {
        set((state) => ({ 
            messages: [...state.messages, newMessage] 
        }))
    },
}))