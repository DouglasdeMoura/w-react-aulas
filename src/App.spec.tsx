import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from './utils/test-utils'
import App from './App'

describe('<App />', () => {
  it.skip('deve renderizar os componentes com o formulário de adição de tarefas e a lista de tarefas atual', async () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Tarefas' })).toBeInTheDocument()
    expect(screen.getByLabelText('Insira a nova tarefa')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Adicionar' })
    ).toBeInTheDocument()

    await waitForElementToBeRemoved(() =>
      screen.getByText('Carregando tarefas')
    )

    await waitFor(() => {
      expect(screen.getByText('Comprar pão')).toBeInTheDocument()
    })

    expect(screen.getByText('Pagar a conta de luz')).toBeInTheDocument()
    expect(screen.getByText('Pintar o portão')).toBeInTheDocument()
  })

  it.skip('deve adicionar uma nova tarefa', async () => {
    const { user } = render(<App />)

    const input = screen.getByLabelText('Insira a nova tarefa')
    const button = screen.getByRole('button', { name: 'Adicionar' })

    user.type(input, 'Estudar React')
    user.click(button)

    await waitFor(() => {
      expect(screen.getByText('Estudar React')).toBeInTheDocument()
    })
  })

  it.skip('deve excluir uma tarefa', async () => {
    const { user } = render(<App />)

    const button = screen.getByTestId('excluir-tarefa-1')

    await user.click(button)

    expect(screen.queryByText('Pagar a conta de luz')).not.toBeInTheDocument()
  })

  it.skip('deve completar uma tarefa', async () => {
    const { user } = render(<App />)

    const button = screen.getByTestId('completar-tarefa-2')

    await user.click(button)

    expect(screen.getByText('Pagar a conta de luz ✅')).toBeInTheDocument()
  })
})
