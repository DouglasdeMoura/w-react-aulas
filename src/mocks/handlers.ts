import { rest } from "msw";

export const handlers = [
  rest.get("/tasks", (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
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
      ])
    )
  ),
];
