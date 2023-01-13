import { Suspense, useState } from 'react'
import useSWR from 'swr'

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

type FormElements = {
  texto: HTMLTextAreaElement
} & HTMLFormControlsCollection

type AdicionarTarefaForm = {
  readonly elements: FormElements
} & HTMLFormElement

function AdicionarTarefa() {
  return (
    <form onSubmit={(e: React.SyntheticEvent<AdicionarTarefaForm>) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
    
      console.log('tipagem do formulário:', e.currentTarget.elements.texto.value)
      console.log('com formData:', formData.get('texto'))
    }}>
      <textarea name="texto" id="texto" /><br />
      <button type="submit">Adicionar</button>
    </form>
  )
}

export default App
