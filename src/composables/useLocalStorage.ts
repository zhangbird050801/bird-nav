import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  options: {
    serializer?: {
      read: (value: string) => T
      write: (value: T) => string
    }
  } = {}
): [Ref<T>, (value: T) => void] {
  const {
    serializer = {
      read: JSON.parse,
      write: JSON.stringify
    }
  } = options

  const storedValue = localStorage.getItem(key)
  const initialValue = storedValue !== null 
    ? serializer.read(storedValue)
    : defaultValue

  const state = ref(initialValue) as Ref<T>

  const setValue = (value: T) => {
    state.value = value
  }

  watch(
    state,
    (newValue) => {
      if (newValue === undefined || newValue === null) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, serializer.write(newValue))
      }
    },
    { deep: true }
  )

  return [state, setValue]
}
