import { Suspense } from 'react'
import useSWR from 'swr'

type Tarefa = {
  id: number
  texto: string
  completa: boolean
}

const getTasks = () =>
  fetch("/tasks")
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
  
      return res.json()
    })
    .then((data) => data as Tarefa[])

function App() {
  return (
    <>
      <h1>Tarefas</h1>
      <Suspense fallback={<Loading>Carregando tarefas</Loading>}>
        <Tarefas />
      </Suspense>
    </>
  )
}

function Loading({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>
}

function Tarefas() {
  const { data: tarefas, error} = useSWR('/tasks', getTasks, { suspense: true })

  return (
    <>
      {error && <p>Erro ao carregar tarefas</p>}
      <ul>
        {tarefas?.map((tarefa) => (
          <li key={tarefa.id}>{tarefa.texto}</li>
        ))}
      </ul>
    </>
  )
}

export default App
