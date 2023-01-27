import { rest } from 'msw'

const tasks = [
  {
    id: 1,
    texto: 'Comprar pão',
    completa: false,
  },
  {
    id: 2,
    texto: 'Pagar a conta de luz',
    completa: false,
  },
  {
    id: 3,
    texto: 'Pintar o portão',
    completa: false,
  },
]

export const handlers = [
  rest.get('*/tasks', (_req, res, ctx) =>
    res(ctx.status(200), ctx.json(tasks)),
  ),
  rest.post('*/tasks', async (req, res, ctx) => {
    const body = await req.json()

    const novaTarefa = {
      id: tasks.length + 1,
      texto: body?.texto,
      completa: false,
    }

    tasks.push(novaTarefa)

    return res(ctx.status(201), ctx.json(novaTarefa))
  }),
  rest.delete('*/tasks/:id', (req, res, ctx) => {
    const id = Number(req.params.id)

    const index = tasks.findIndex((task) => task.id === id)

    tasks.splice(index, 1)

    return res(ctx.status(204))
  }),
  rest.post('*/tasks/:id', async (req, res, ctx) => {
    const id = Number(req.params.id)

    const body = await req.json()

    const index = tasks.findIndex((task) => task.id === id)

    const task = tasks[index]

    const taskAtualizada = {
      ...task,
      texto: body?.texto,
      completa: body?.completa,
    }

    tasks[index] = taskAtualizada

    return res(ctx.status(200), ctx.json(taskAtualizada))
  }),
]
