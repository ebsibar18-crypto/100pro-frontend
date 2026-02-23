import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTodoStore, type TodoItem } from './todoStore'

function TodoCard({
  todo,
  onToggleDone,
  onView,
  onDelete,
  onArchive,
}: {
  todo: TodoItem
  onToggleDone: (id: string) => void
  onView: (id: string) => void
  onDelete: (id: string) => void
  onArchive: (id: string) => void
}) {
  return (
    <article className="todo-card">
      <label className="todo-main">
        <input
          type="checkbox"
          checked={todo.isDone}
          onChange={() => onToggleDone(todo.id)}
          aria-label={`${todo.title} 완료 상태 변경`}
        />
        <span>{todo.title}</span>
      </label>
      <div className="todo-actions">
        <button type="button" onClick={() => onView(todo.id)}>
          상세보기
        </button>
        <button type="button" onClick={() => onArchive(todo.id)}>
          보관
        </button>
        <button type="button" onClick={() => onDelete(todo.id)}>
          삭제
        </button>
      </div>
    </article>
  )
}

export function HomePage() {
  const navigate = useNavigate()
  const { todos, toggleDone, removeTodo, archiveTodo } = useTodoStore()
  const activeTodos = useMemo(() => todos.filter((todo) => !todo.archived), [todos])
  const canAdd = activeTodos.length < 5

  return (
    <section className="screen">
      <header className="screen-header home-header">
        <h1 className="home-logo">5늘할일</h1>
        <p>오늘 기준 {dayjs().format('YYYY.MM.DD')}</p>
      </header>
      <p className="helper-text">오늘에만 집중해요. 최대 5개까지만 등록할 수 있어요.</p>

      <section className="todo-section">
        <h2>오늘 할 일</h2>
        {activeTodos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onToggleDone={toggleDone}
            onView={(id) => navigate(`/todo/${id}`)}
            onDelete={removeTodo}
            onArchive={archiveTodo}
          />
        ))}
        {canAdd ? (
          <button type="button" className="todo-add-card" onClick={() => navigate('/compose')}>
            오늘 할 일 작성하러 가기 +
          </button>
        ) : null}
      </section>
    </section>
  )
}
