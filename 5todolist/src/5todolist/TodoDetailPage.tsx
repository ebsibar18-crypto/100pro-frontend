import dayjs from 'dayjs'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useTodoStore } from './todoStore'

export function TodoDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const todo = useTodoStore((state) => state.todos.find((item) => item.id === id))

  if (!id || !todo) return <Navigate to="/home" replace />

  return (
    <section className="screen detail-screen">
      <article className="detail-card">
        <header className="detail-header">
          <button type="button" className="icon-button" onClick={() => navigate('/home')}>
            ←
          </button>
          <button type="button" className="icon-button">
            ...
          </button>
        </header>
        <h1 className="detail-title">{todo.title}</h1>
        <p className="detail-date">{dayjs(todo.createdAt).format('YYYY.MM.DD dddd')}</p>
        <section className="detail-emoji-box">
          <p>대표 이모티콘 영역</p>
          <p>({todo.isDone ? '완료' : '미완료'})</p>
        </section>
        <p className="detail-memo">{todo.memo || '작성된 메모가 없습니다.'}</p>
        <section className="detail-stickers">
          <div />
          <div />
          <div />
        </section>
      </article>
    </section>
  )
}
