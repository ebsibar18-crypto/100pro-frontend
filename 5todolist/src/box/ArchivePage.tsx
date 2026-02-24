import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTodoStore } from '../5todolist/todoStore'

export function ArchivePage() {
  const navigate = useNavigate()
  const todos = useTodoStore((state) => state.todos)
  const removeTodo = useTodoStore((state) => state.removeTodo)
  const restoreTodo = useTodoStore((state) => state.restoreTodo)
  const [menuTodoId, setMenuTodoId] = useState<string | null>(null)

  const archivedTodos = useMemo(() => todos.filter((todo) => todo.archived), [todos])
  const activeArchived = useMemo(
    () => archivedTodos.filter((todo) => !todo.isDone),
    [archivedTodos],
  )
  useEffect(() => {
    if (!menuTodoId) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return
      if (event.target.closest('.archive-actions-wrap')) return
      setMenuTodoId(null)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [menuTodoId])

  return (
    <section className="screen archive-screen">
      <header className="screen-header archive-header">
        <h1>보관함</h1>
      </header>

      <section className="archive-section">
        {activeArchived.map((todo) => (
          <article
            key={todo.id}
            className="todo-card archive-card archive-card-clickable"
            onClick={() => {
              setMenuTodoId(null)
              navigate(`/todo/${todo.id}`, { state: { from: 'archive' } })
            }}
          >
            <p className="archive-title">{todo.title}</p>
            <div className="archive-actions-wrap">
              <button
                type="button"
                className="archive-more-button"
                aria-label={`${todo.title} 메뉴 열기`}
                onClick={(event) => {
                  event.stopPropagation()
                  setMenuTodoId((current) => (current === todo.id ? null : todo.id))
                }}
              >
                ...
              </button>
              {menuTodoId === todo.id ? (
                <div className="archive-menu" onClick={(event) => event.stopPropagation()}>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      restoreTodo(todo.id)
                      setMenuTodoId(null)
                    }}
                  >
                    오늘 할일
                  </button>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      removeTodo(todo.id)
                      setMenuTodoId(null)
                    }}
                  >
                    삭제
                  </button>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </section>
  )
}
