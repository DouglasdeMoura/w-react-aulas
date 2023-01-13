import { rest } from "msw";

const tasks = [
  {
    id: 1,
    texto: "Comprar pão",
    completa: false,
  },
  {
    id: 2,
    texto: "Pagar a conta de luz",
    completa: false,
  },
  {
    id: 3,
    texto: "Pintar o portão",
    completa: false,
  },
];

export const handlers = [
  rest.get("/tasks", (_req, res, ctx) => res(ctx.status(200), ctx.json(tasks))),
  rest.post("/tasks", (req, res, ctx) =>
    res(
      ctx.status(201),
      ctx.json({
        id: tasks.length + 1,
        texto: req.params.texto,
        completa: false,
      })
    )
  ),
];
