import { useState } from "react"

type Tarefa = {
  id: number
  texto: string
  completa: boolean
}

function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([])

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
