import { localStorageKey } from '@/constants/localStorage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type OpenUIComponentLibrary = 'chat' | 'standard'

interface OpenUISettingsState {
  enabled: boolean
  componentLibrary: OpenUIComponentLibrary
  setEnabled: (enabled: boolean) => void
  setComponentLibrary: (componentLibrary: OpenUIComponentLibrary) => void
}

type OpenUISettingsPersistedSlice = Pick<
  OpenUISettingsState,
  'enabled' | 'componentLibrary'
>

const defaultOpenUISettings: OpenUISettingsPersistedSlice = {
  enabled: false,
  componentLibrary: 'chat',
}

const openUIStorage = createJSONStorage<OpenUISettingsPersistedSlice>(
  () => localStorage
)

export const useOpenUISettings = create<OpenUISettingsState>()(
  persist<
    OpenUISettingsState,
    [],
    [],
    OpenUISettingsPersistedSlice
  >(
    (set) => ({
      ...defaultOpenUISettings,
      setEnabled: (enabled) => set({ enabled }),
      setComponentLibrary: (componentLibrary) => set({ componentLibrary }),
    }),
    {
      name: localStorageKey.openUI,
      storage: openUIStorage,
      partialize: (state) => ({
        enabled: state.enabled,
        componentLibrary: state.componentLibrary,
      }),
    }
  )
)
