import { Suspense, useState } from 'react'
import useSWR from 'swr'
import { z } from 'zod'

type Tarefa = {
  id: number
  texto: string
  completa: boolean
}

function App() {
  return (
    <>
      <h1>Tarefas</h1>
      <AdicionarTarefa />
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
  const { data: tarefas, error} = useSWR<Tarefa[]>('/tasks')

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

const schema = z.object({
  texto: z.string().min(2, { message: 'Texto é obrigatório' }),
})

function AdicionarTarefa() {
  const [error, setError] = useState<string | undefined>()

  return (
    <form onSubmit={(e) => {
      e.preventDefault()

      const formData = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)))  
      
      if (!formData.success) {
        setError('Texto é obrigatório')
      }
    }}>
      <div>
        <textarea name="texto" id="texto" />
        {error ? <p>{error}</p> : null}
      </div>
      <button type="submit">Adicionar</button>
    </form>
  )
}

export default App
