import useDarkModeImpl from '@fisch0920/use-dark-mode'

const noopStorage = {
  getItem: () => null,
  setItem: () => {}
} as unknown as WindowLocalStorage

export function useDarkMode() {
  const darkMode = useDarkModeImpl(false, {
    classNameDark: 'dark-mode',
    storageProvider: typeof window !== 'undefined' ? window.localStorage as unknown as WindowLocalStorage : noopStorage
  })

  return {
    isDarkMode: darkMode.value,
    toggleDarkMode: darkMode.toggle
  }
}
