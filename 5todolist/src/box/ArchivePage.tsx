import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTodoStore } from '../5todolist/todoStore'

export function ArchivePage() {
  const navigate = useNavigate()
  const todos = useTodoStore((state) => state.todos)
  const toggleDone = useTodoStore((state) => state.toggleDone)
  const removeTodo = useTodoStore((state) => state.removeTodo)
  const restoreTodo = useTodoStore((state) => state.restoreTodo)
  const [menuTodoId, setMenuTodoId] = useState<string | null>(null)

  const archivedTodos = useMemo(() => todos.filter((todo) => todo.archived), [todos])
  const activeArchived = useMemo(
    () => archivedTodos.filter((todo) => !todo.isDone),
    [archivedTodos],
  )
  const doneArchived = useMemo(
    () => archivedTodos.filter((todo) => todo.isDone),
    [archivedTodos],
  )

  return (
    <section className="screen archive-screen">
      <header className="screen-header archive-header">
        <h1>보관함</h1>
      </header>

      <section className="archive-section">
        {activeArchived.map((todo) => (
          <article key={todo.id} className="todo-card archive-card">
            <label className="todo-main">
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => toggleDone(todo.id)}
              />
              <span>{todo.title}</span>
            </label>
            <div className="archive-actions-wrap">
              <button
                type="button"
                className="archive-more-button"
                onClick={() => setMenuTodoId((current) => (current === todo.id ? null : todo.id))}
              >
                ...
              </button>
              {menuTodoId === todo.id ? (
                <div className="archive-menu">
                  <button type="button" onClick={() => navigate(`/todo/${todo.id}`)}>
                    상세보기
                  </button>
                  <button type="button" onClick={() => restoreTodo(todo.id)}>
                    복원
                  </button>
                  <button type="button" onClick={() => removeTodo(todo.id)}>
                    삭제
                  </button>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </section>

      <section className="archive-section archive-done-block">
        {doneArchived.map((todo) => (
          <article key={todo.id} className="todo-card archive-done-card">
            <label className="todo-main">
              <input
                type="checkbox"
                checked={todo.isDone}
                onChange={() => toggleDone(todo.id)}
              />
              <span>{todo.title}</span>
            </label>
          </article>
        ))}
      </section>
    </section>
  )
}
