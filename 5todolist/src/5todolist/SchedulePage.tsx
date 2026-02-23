import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useTodoStore } from './todoStore'

export function SchedulePage() {
  const todos = useTodoStore((state) => state.todos)
  const activeTodos = useMemo(() => todos.filter((todo) => !todo.archived), [todos])
  const summary = useMemo(
    () => ({
      total: activeTodos.length,
      undone: activeTodos.filter((todo) => !todo.isDone).length,
      done: activeTodos.filter((todo) => todo.isDone).length,
    }),
    [activeTodos],
  )

  return (
    <section className="screen">
      <header className="screen-header home-header">
        <h1>오늘 일정</h1>
        <p>{dayjs().format('YYYY.MM.DD')}</p>
      </header>
      <section className="schedule-summary">
        <article className="summary-card">
          <p>전체</p>
          <strong>{summary.total}</strong>
        </article>
        <article className="summary-card">
          <p>미완료</p>
          <strong>{summary.undone}</strong>
        </article>
        <article className="summary-card">
          <p>완료</p>
          <strong>{summary.done}</strong>
        </article>
      </section>
    </section>
  )
}
