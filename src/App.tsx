import { useEffect, useState } from "react"

type Tarefa = {
  id: number
  texto: string
  completa: boolean
}

const getTasks = (callback?: (tarefa: Tarefa[]) => void) =>
  fetch("/tasks")
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
  
      return res.json()
    })
    .then((tarefas) => {
      callback?.(tarefas)
    })

function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([])

  useEffect(() => {
    let ignore = false;

    getTasks(setTarefas)

      return () => {
        ignore = true;
      };
  }, [])

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
