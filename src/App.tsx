import { Button, Stack, Textarea, Title } from '@mantine/core'
import { Suspense } from 'react'
import useSWR from 'swr'
import { z } from 'zod'
import { useForm, zodResolver } from '@mantine/form'

type Tarefa = {
  id: number
  texto: string
  completa: boolean
}

function App() {
  return (
    <>
      <Title>Tarefas</Title>
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
  const form = useForm({
    initialValues: {
      texto: '',
    },
    validate: zodResolver(schema),
  })

  return (
    <form onSubmit={form.onSubmit(({ texto }) => {
      console.log(texto)
    })}>
      <Stack>
        <Textarea placeholder="Insira a nova tarefa" {...form.getInputProps('texto')} />
        <Button type="submit">Adicionar</Button>
      </Stack>
    </form>
  )
}

export default App
