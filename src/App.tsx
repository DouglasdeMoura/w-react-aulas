import { useState } from "react"

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

function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>(() => {
    getTasks().then((tasks) => setTarefas(tasks))
    return []
  })

  return (
    <>
      <h1>Tarefas</h1>
      
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>{tarefa.texto}</li>
        ))}
      </ul>
    </>
  )
}

export default App
