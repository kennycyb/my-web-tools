import { render, within } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import Calculator from '../Calculator'

describe('Calculator', () => {
  test('renders with initial display of 0', () => {
    const view = render(<Calculator />)
    const root = within(view.container)

    expect(root.getByRole('heading', { name: /Calculator/i })).toBeInTheDocument()
    const display = root.getByText('0', { selector: '.display-value' })
    expect(display).toBeInTheDocument()
  })

  test('inputs single digit numbers', async () => {
    const user = userEvent.setup()
    const view = render(<Calculator />)
    const root = within(view.container)

    const btn5 = root.getByRole('button', { name: '5' })
    await user.click(btn5)

    const display = root.getByText('5', { selector: '.display-value' })
    expect(display).toBeInTheDocument()
  })

  test('inputs multiple digit numbers', async () => {
    const user = userEvent.setup()
    const view = render(<Calculator />)
    const root = within(view.container)

    await user.click(root.getByRole('button', { name: '1' }))
    await user.click(root.getByRole('button', { name: '2' }))
    await user.click(root.getByRole('button', { name: '3' }))

    const display = root.getByText('123', { selector: '.display-value' })
    expect(display).toBeInTheDocument()
  })

  test('performs addition', async () => {
    const user = userEvent.setup()
    const view = render(<Calculator />)
    const root = within(view.container)

    await user.click(root.getByRole('button', { name: '5' }))
    await user.click(root.getByRole('button', { name: '+' }))
    await user.click(root.getByRole('button', { name: '3' }))
    await user.click(root.getByRole('button', { name: '=' }))

    const display = root.getByText('8', { selector: '.display-value' })
    expect(display).toBeInTheDocument()
  })

  test('performs subtraction', async () => {
    const user = userEvent.setup()
    const view = render(<Calculator />)
    const root = within(view.container)

    await user.click(root.getByRole('button', { name: '9' }))
    await user.click(root.getByRole('button', { name: '-' }))
    await user.click(root.getByRole('button', { name: '4' }))
    await user.click(root.getByRole('button', { name: '=' }))

    const display = root.getByText('5', { selector: '.display-value' })
    expect(display).toBeInTheDocument()
  })

  test('performs multiplication', async () => {
    const user = userEvent.setup()
    const view = render(<Calculator />)
    const root = within(view.container)

    await user.click(root.getByRole('button', { name: '6' }))
    await user.click(root.getByRole('button', { name: '×' }))
    await user.click(root.getByRole('button', { name: '7' }))
    await user.click(root.getByRole('button', { name: '=' }))

    expect(root.getByText('42')).toBeInTheDocument()
  })

  test('performs division', async () => {
    const user = userEvent.setup()
    const view = render(<Calculator />)
    const root = within(view.container)

    await user.click(root.getByRole('button', { name: '8' }))
    await user.click(root.getByRole('button', { name: '÷' }))
    await user.click(root.getByRole('button', { name: '2' }))
    await user.click(root.getByRole('button', { name: '=' }))

    const display = root.getByText('4', { selector: '.display-value' })
    expect(display).toBeInTheDocument()
  })

  test('handles decimal numbers', async () => {
    const user = userEvent.setup()
    const view = render(<Calculator />)
    const root = within(view.container)

    await user.click(root.getByRole('button', { name: '3' }))
    await user.click(root.getByRole('button', { name: '.' }))
    await user.click(root.getByRole('button', { name: '1' }))
    await user.click(root.getByRole('button', { name: '4' }))

    const display = root.getByText('3.14', { selector: '.display-value' })
    expect(display).toBeInTheDocument()
  })

  test('clears display', async () => {
    const user = userEvent.setup()
    const view = render(<Calculator />)
    const root = within(view.container)

    await user.click(root.getByRole('button', { name: '5' }))
    await user.click(root.getByRole('button', { name: '6' }))
    await user.click(root.getByRole('button', { name: 'C' }))

    const display = root.getByText('0', { selector: '.display-value' })
    expect(display).toBeInTheDocument()
  })

  test('toggles sign', async () => {
    const user = userEvent.setup()
    const view = render(<Calculator />)
    const root = within(view.container)

    await user.click(root.getByRole('button', { name: '5' }))
    await user.click(root.getByRole('button', { name: '±' }))

    expect(root.getByText('-5', { selector: '.display-value' })).toBeInTheDocument()

    await user.click(root.getByRole('button', { name: '±' }))
    expect(root.getByText('5', { selector: '.display-value' })).toBeInTheDocument()
  })

  test('calculates percentage', async () => {
    const user = userEvent.setup()
    const view = render(<Calculator />)
    const root = within(view.container)

    await user.click(root.getByRole('button', { name: '5' }))
    await user.click(root.getByRole('button', { name: '0' }))
    await user.click(root.getByRole('button', { name: '%' }))

    const display = root.getByText('0.5', { selector: '.display-value' })
    expect(display).toBeInTheDocument()
  })

  test('chains multiple operations', async () => {
    const user = userEvent.setup()
    const view = render(<Calculator />)
    const root = within(view.container)

    // 2 + 3 = 5, then × 4 = 20
    await user.click(root.getByRole('button', { name: '2' }))
    await user.click(root.getByRole('button', { name: '+' }))
    await user.click(root.getByRole('button', { name: '3' }))
    await user.click(root.getByRole('button', { name: '×' }))
    expect(root.getByText('5', { selector: '.display-value' })).toBeInTheDocument()

    await user.click(root.getByRole('button', { name: '4' }))
    await user.click(root.getByRole('button', { name: '=' }))

    const display = root.getByText('20', { selector: '.display-value' })
    expect(display).toBeInTheDocument()
  })

  test('prevents multiple decimal points', async () => {
    const user = userEvent.setup()
    const view = render(<Calculator />)
    const root = within(view.container)

    await user.click(root.getByRole('button', { name: '3' }))
    await user.click(root.getByRole('button', { name: '.' }))
    await user.click(root.getByRole('button', { name: '1' }))
    await user.click(root.getByRole('button', { name: '.' }))
    await user.click(root.getByRole('button', { name: '4' }))

    // Should be 3.14, not 3.1.4
    const display = root.getByText('3.14', { selector: '.display-value' })
    expect(display).toBeInTheDocument()
  })
})
