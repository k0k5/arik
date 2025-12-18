import { create } from 'zustand'
import type { DialogType } from './dialogsStore'

// Тип пользователя
export type UserType = {
    id: string
    name: string
    isOnline: boolean
}

// Хранилище пользователей
interface UsersStore {
    users: UserType[]
    getAvailableUsers: (dialogs: DialogType[], currentUserId: string) => UserType[]
}

// Начальные пользователи
const initialState = {
    users: [
        { id: "me", name: "Вы", isOnline: true },
        { id: "1", name: "Володя", isOnline: true },
        { id: "2", name: "Мария", isOnline: false },
        { id: "3", name: "Алексей", isOnline: true },
        { id: "4", name: "Екатерина", isOnline: true },
        { id: "5", name: "Дмитрий", isOnline: false }
    ]
}

// Создаем хранилище
export const useUser = create<UsersStore>((set, get) => ({
    ...initialState,
    
    // Получить пользователей для нового чата
    getAvailableUsers: (dialogs: DialogType[], currentUserId: string) => {
        const state = get()
        return state.users.filter((user: UserType) => 
            !dialogs.some((dialog: DialogType) => dialog.userId === user.id) && 
            user.id !== currentUserId
        )
    }
}))

// Текущий пользователь (я)
export const mainUser: UserType = { id: "me", name: "Вы", isOnline: true }