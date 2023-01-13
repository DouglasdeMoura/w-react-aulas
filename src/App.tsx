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
  const { data: tarefas, error, isLoading } = useSWR('/tasks', getTasks)

  return (
    <>
      <h1>Tarefas</h1>
      {isLoading && <p>Carregando...</p>}
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
