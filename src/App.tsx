import { Button, Stack, Textarea, Title } from '@mantine/core'
import { Suspense } from 'react'
import useSWRImmutable from 'swr/immutable'
import useSWRMutation from 'swr/mutation'
import { z } from 'zod'
import { useForm, zodResolver } from '@mantine/form'
import { useDeleteTask } from './hooks/use-delete-task'
import { useUpdateTask } from './hooks/use-update-task'

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
  const { data: tarefas, error } = useSWRImmutable<Tarefa[]>('/tasks')

  return (
    <>
      {error && <p>Erro ao carregar tarefas</p>}
      {tarefas ? (
        <ul>
          {tarefas.map((tarefa) => (
            <TarefaAcoes key={tarefa.id} {...tarefa} />
          ))}
        </ul>
      ) : null}
    </>
  )
}

type TarefaAcoesProps = Tarefa

function TarefaAcoes(props: TarefaAcoesProps) {
  const { trigger: completarTarefa, isMutating: isCompletandoTarefa } =
    useUpdateTask()

  const { trigger: excluirTarefa, isMutating: isExcluindoTarefa } =
    useDeleteTask()

  return (
    <li key={props.id}>
      {props.texto} {props.completa && <span>✅</span>}
      <Button
        size="xs"
        variant="outline"
        onClick={() => completarTarefa({ ...props, completa: true })}
        loading={isCompletandoTarefa}
        data-testid={`completar-tarefa-${props.id}`}
      >
        Completar
      </Button>{' '}
      <Button
        size="xs"
        color="red"
        onClick={() => excluirTarefa({ id: props.id })}
        loading={isExcluindoTarefa}
        data-testid={`excluir-tarefa-${props.id}`}
      >
        Excluir
      </Button>
    </li>
  )
}

const schema = z.object({
  texto: z.string().min(2, { message: 'Texto é obrigatório' }),
})

function AdicionarTarefa() {
  const { trigger, isMutating } = useSWRMutation(
    '/tasks',
    async (url, { arg }) => {
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(arg),
      })
    },
  )

  const form = useForm({
    initialValues: {
      texto: '',
    },
    validate: zodResolver(schema),
  })

  return (
    <form
      onSubmit={form.onSubmit((data) => {
        trigger(data).then(() => {
          form.reset()
        })
      })}
    >
      <Stack>
        <Textarea
          label="Insira a nova tarefa"
          {...form.getInputProps('texto')}
        />
        <Button type="submit" loading={isMutating}>
          Adicionar
        </Button>
      </Stack>
    </form>
  )
}

export default App
