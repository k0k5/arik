import { create } from 'zustand'

export type DialogType = {
    id: string
    userId: string
    userName: string
    lastMessage: string
    lastTime: string
    isOnline: boolean
}

interface DialogsStore {
    dialogs: DialogType[]
    addDialog: (newDialog: DialogType) => void
    updateDialog: (dialogId: string, updates: Partial<DialogType>) => void
}

export const useDialog = create<DialogsStore>((set) => ({
    dialogs: [
        { 
            id: "chat1", 
            userId: "1", 
            userName: "Володя", 
            lastMessage: "Привет! Как дела?", 
            lastTime: "12:40", 
            isOnline: true 
        },
        { 
            id: "chat2", 
            userId: "2", 
            userName: "Мария", 
            lastMessage: "", 
            lastTime: "", 
            isOnline: false 
        },
        { 
            id: "chat3", 
            userId: "3", 
            userName: "Алексей", 
            lastMessage: "", 
            lastTime: "", 
            isOnline: true 
        }
    ],
    
    addDialog: (newDialog: DialogType) => {
        set((state) => ({ 
            dialogs: [...state.dialogs, newDialog] 
        }))
    },
    
    updateDialog: (dialogId: string, updates: Partial<DialogType>) => {
        set((state) => ({
            dialogs: state.dialogs.map((dialog: DialogType) => 
                dialog.id === dialogId 
                    ? { ...dialog, ...updates } 
                    : dialog
            )
        }))
    }
}))
