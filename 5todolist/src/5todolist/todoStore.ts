import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type TodoItem = {
  id: string
  title: string
  memo: string
  isDone: boolean
  archived: boolean
  createdAt: string
}

type TodoState = {
  todos: TodoItem[]
  addTodo: (title: string, memo?: string) => { ok: boolean; reason?: string }
  toggleDone: (id: string) => void
  removeTodo: (id: string) => void
  archiveTodo: (id: string) => void
  restoreTodo: (id: string) => void
}

const MAX_TODOS = 5

const seedTodos: TodoItem[] = [
  {
    id: '1',
    title: '오늘 할 일 1',
    memo: '대표 메모를 여기서 확인할 수 있어요.',
    isDone: false,
    archived: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: '오늘 할 일 2',
    memo: '완료하면 체크박스를 눌러보세요.',
    isDone: false,
    archived: true,
    createdAt: new Date().toISOString(),
  },
]

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: seedTodos,
      addTodo: (title: string, memo = '') => {
        const activeCount = get().todos.filter((todo) => !todo.archived).length
        if (activeCount >= MAX_TODOS) {
          return { ok: false, reason: '오늘 할 일은 최대 5개까지 가능합니다.' }
        }
        const cleanTitle = title.trim()
        if (!cleanTitle) {
          return { ok: false, reason: '할 일 제목을 입력해주세요.' }
        }
        const newTodo: TodoItem = {
          id: crypto.randomUUID(),
          title: cleanTitle,
          memo: memo.trim(),
          isDone: false,
          archived: false,
          createdAt: new Date().toISOString(),
        }
        set((state) => ({ todos: [newTodo, ...state.todos] }))
        return { ok: true }
      },
      toggleDone: (id: string) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
          ),
        })),
      removeTodo: (id: string) =>
        set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
      archiveTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, archived: true } : todo,
          ),
        })),
      restoreTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, archived: false } : todo,
          ),
        })),
    }),
    { name: 'five-todo-store' },
  ),
)
