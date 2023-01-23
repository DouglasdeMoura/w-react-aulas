import { Button, Stack, Textarea, Title } from '@mantine/core'
import { Suspense } from 'react'
import useSWRImmutable from 'swr/immutable'
import useSWRMutation from 'swr/mutation'
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
  const { data: tarefas, error} = useSWRImmutable<Tarefa[]>('/tasks')
  
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
  const { trigger, isMutating } = useSWRMutation('/tasks', async (url, { arg }) => {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(arg),
    })
  })

  const form = useForm({
    initialValues: {
      texto: '',
    },
    validate: zodResolver(schema),
  })

  return (
    <form onSubmit={form.onSubmit((data) => {
      trigger(data).then(() => {
        form.reset()
      })
    })}>
      <Stack>
        <Textarea label="Insira a nova tarefa" {...form.getInputProps('texto')} />
        <Button type="submit" loading={isMutating}>Adicionar</Button>
      </Stack>
    </form>
  )
}

export default App
