import { useState, useRef, useEffect, createContext, useContext } from 'react'
import { useMessage } from './store/messagesStore'
import { useDialog } from './store/dialogsStore'
import { useUser, mainUser } from './store/usersStore'
import type { MessageType } from './store/messagesStore'
import type { DialogType } from './store/dialogsStore'
import type { UserType } from './store/usersStore'
import './App.css'
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";

import { RegPage } from './/pages/RegPage'
import { LoginPage } from './/pages/LoginPage'

interface AppContextType {
    currentChatId: string
    setCurrentChatId: React.Dispatch<React.SetStateAction<string>>
}

const AppContext = createContext<AppContextType>({
    currentChatId: "chat1",
    setCurrentChatId: () => {}
})

const ChatPage = () => {
    return (
        <div className="app">
            <DialogsSidebar />
            <ChatMain />
        </div>
    )
}

function App() {
    const [currentChatId, setCurrentChatId] = useState<string>("chat1")

    return (
      <BrowserRouter>
      <AppContext.Provider value={{
            currentChatId: currentChatId,
            setCurrentChatId: setCurrentChatId
        }}>
        
            <Routes>
              <Route path='/chat' element={<ChatPage/>}/>
              <Route path='/registration' element={<RegPage/>}/>
              <Route path='/login' element={<LoginPage/>}/>
            </Routes>      
        </AppContext.Provider>
      </BrowserRouter>
        
    )
}

const DialogsSidebar = () => {
    const { dialogs } = useDialog()
    const { setCurrentChatId, currentChatId } = useContext(AppContext)
    const [search, setSearch] = useState<string>("")
    const [showModal, setShowModal] = useState<boolean>(false)
    
    const filteredChats = dialogs.filter((chat: DialogType) => 
        chat.userName.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="chats-sidebar">
            <div className="poisk">
                <input 
                    type="text" 
                    placeholder="Поиск..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="chats-list">
                {filteredChats.map((chat: DialogType) => (
                    <Chat 
                        key={chat.id}
                        id={chat.id}
                        userId={chat.userId}
                        userName={chat.userName}
                        lastMessage={chat.lastMessage}
                        lastTime={chat.lastTime}
                        isOnline={chat.isOnline}
                        isActive={currentChatId === chat.id}
                        onClick={() => setCurrentChatId(chat.id)}
                    />
                ))}
            </div>

            <button className="new-chat-btn" onClick={() => setShowModal(true)}>
                Новый чат
            </button>

            {showModal && (
                <ModalUsers onClose={() => setShowModal(false)} />
            )}
        </div>
    )
}

interface ChatProps {
    id: string
    userId: string
    userName: string
    lastMessage: string
    lastTime: string
    isOnline: boolean
    isActive: boolean
    onClick: () => void
}

const Chat = (props: ChatProps) => {
    return (
        <div 
            className={`chat-item ${props.isActive ? 'active' : ''}`}
            onClick={props.onClick}
        >
            <div className="chat-avatar">
                <div className={`status ${props.isOnline ? 'online' : 'offline'}`}></div>
            </div>
            <div>
                <div className="chat-name">{props.userName}</div>
                <div className="last-message">{props.lastMessage}</div>
            </div>
            <div className="chat-time">{props.lastTime}</div>
        </div>
    )
}

interface ModalUsersProps {
    onClose: () => void
}

const ModalUsers = ({ onClose }: ModalUsersProps) => {
    const { dialogs, addDialog } = useDialog()
    const { users, getAvailableUsers } = useUser()
    const { setCurrentChatId } = useContext(AppContext)
    
    const availableUsers = getAvailableUsers(dialogs, mainUser.id)

    const handleCreateChat = (user: UserType) => {
        const existingChat = dialogs.find((chat: DialogType) => chat.userId === user.id)
        if (existingChat) {
            setCurrentChatId(existingChat.id)
            onClose()
            return
        }

        const newChat: DialogType = {
            id: `chat_${Date.now()}`,
            userId: user.id,
            userName: user.name,
            lastMessage: "Новый чат",
            lastTime: "только что",
            isOnline: user.isOnline
        }

        addDialog(newChat)
        setCurrentChatId(newChat.id)
        onClose()
    }

    return (
        <div className="modal">
            <div className="modal-header">
                <h3>Выберите собеседника</h3>
                <button onClick={onClose}>×</button>
            </div>
            <div className="modal-users">
                {availableUsers.map((user: UserType) => (
                    <div 
                        key={user.id}
                        className="modal-user"
                        onClick={() => handleCreateChat(user)}
                    >
                        <div className={`status ${user.isOnline ? 'online' : 'offline'}`}></div>
                        <div>
                            <div className="user-name">{user.name}</div>
                            <div className="user-status">{user.isOnline ? 'online' : 'offline'}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const ChatMain = () => {
    const { currentChatId } = useContext(AppContext)
    const { dialogs } = useDialog()
    const { users } = useUser()
    const { messages } = useMessage()
    const activeChat = dialogs.find((chat: DialogType) => chat.id === currentChatId)
    const recipient = users.find((user: UserType) => user.id === activeChat?.userId)
    const chatMessages = messages.filter((msg: MessageType) => msg.chatId === currentChatId)
    
    if (!activeChat || !recipient) {
        return (
            <div className="chat-main">
                <div className="no-chat">Выберите чат</div>
            </div>
        )
    }

    return (
        <div className="chat-main">
            <ChatHeader user={recipient} />
            <MessagesArea messages={chatMessages} />
            <InputPanel chatId={currentChatId} recipient={recipient} />
        </div>
    )
}

interface ChatHeaderProps {
    user: UserType
}

const ChatHeader = ({ user }: ChatHeaderProps) => {
    return (
        <div className="chat-header">
            <div className="user-info">
                <div className={`status ${user.isOnline ? 'online' : 'offline'}`}></div>
                <div>
                    <div className="user-name">{user.name}</div>
                    <div className="user-status">{user.isOnline ? 'в сети' : 'не в сети'}</div>
                </div>
            </div>
        </div>
    )
}

interface MessagesAreaProps {
    messages: MessageType[]
}

const MessagesArea = ({ messages }: MessagesAreaProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    return (
        <div className="messages-area">
            {messages.map((msg: MessageType) => (
                <MessageBubble 
                    key={msg.id}
                    text={msg.text}
                    time={msg.time}
                    isSent={msg.senderId === mainUser.id}
                />
            ))}
            <div ref={messagesEndRef} />
        </div>
    )
}

interface MessageBubbleProps {
    text: string
    time: string
    isSent: boolean
}

const MessageBubble = ({ text, time, isSent }: MessageBubbleProps) => {
    return (
        <div className={`message ${isSent ? 'sent' : 'received'}`}>
            <div className="message-bubble">
                <div className="message-text">{text}</div>
                <div className="message-time">{time}</div>
            </div>
        </div>
    )
}

interface InputPanelProps {
    chatId: string
    recipient: UserType
}

const InputPanel = ({ chatId, recipient }: InputPanelProps) => {
    const [newMessage, setNewMessage] = useState<string>("")
    const { addMessage } = useMessage()
    const { updateDialog } = useDialog()

    const sendMessage = () => {
        if (!newMessage.trim()) return
        
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const message: MessageType = {
            id: Date.now().toString(),
            text: newMessage,
            senderId: mainUser.id,
            recipientId: recipient.id,
            chatId: chatId,
            time
        }

        addMessage(message)
        updateDialog(chatId, {
            lastMessage: newMessage,
            lastTime: time
        })
        setNewMessage("")
    }

    return (
        <div className="input-panel">
            <input 
                type="text" 
                placeholder="Введите сообщение..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage} disabled={!newMessage.trim()}>
                Отправить
            </button>
        </div>
    )
}

export default App