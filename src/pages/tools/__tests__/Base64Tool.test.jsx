import { render, screen, within } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import Base64Tool from '../Base64Tool'

describe('Base64Tool', () => {
  test('renders and shows initial state', () => {
    const view = render(<Base64Tool />)

    const root = within(view.container)
    expect(root.getByRole('heading', { name: /BASE64 Encoder \/ Decoder/i })).toBeInTheDocument()

    const textarea = root.getByRole('textbox')
    expect(textarea).toHaveAttribute('placeholder', 'Enter text to encode...')

    const convertBtn = root.getByRole('button', { name: /convert/i })
    expect(convertBtn).toBeDisabled()
  })

  test('encodes input text to base64', async () => {
    const user = userEvent.setup()
    const view = render(<Base64Tool />)

    const root = within(view.container)
    const textarea = root.getByRole('textbox')
    const convertBtn = root.getByRole('button', { name: /convert/i })

    await user.type(textarea, 'hello')
    expect(convertBtn).toBeEnabled()

    await user.click(convertBtn)

    expect(root.getByText(/Result:/)).toBeInTheDocument()
    // Result is rendered inside <pre>
    const pre = root.getByText('aGVsbG8=')
    expect(pre).toBeInTheDocument()
    expect(root.queryByText(/Invalid input/)).not.toBeInTheDocument()
  })

  test('decodes base64 string to text', async () => {
    const user = userEvent.setup()
    const view = render(<Base64Tool />)

    const root = within(view.container)
    const select = root.getByRole('combobox')
    await user.selectOptions(select, 'decode')

    const textarea = root.getByRole('textbox')
    expect(textarea).toHaveAttribute('placeholder', 'Enter BASE64 to decode...')

    await user.clear(textarea)
    await user.type(textarea, 'aGVsbG8=')
    const convertBtn = root.getByRole('button', { name: /convert/i })

    await user.click(convertBtn)

    expect(root.getByText(/Result:/)).toBeInTheDocument()
    const pre = root.getByText('hello')
    expect(pre).toBeInTheDocument()
    expect(root.queryByText(/Invalid input/)).not.toBeInTheDocument()
  })

  test('shows error for invalid base64 on decode', async () => {
    const user = userEvent.setup()
    const view = render(<Base64Tool />)

    const root = within(view.container)
    const select = root.getByRole('combobox')
    await user.selectOptions(select, 'decode')

    const textarea = root.getByRole('textbox')
    await user.type(textarea, '!!')

    const convertBtn = root.getByRole('button', { name: /convert/i })
    await user.click(convertBtn)

    expect(root.getByText(/Invalid input for BASE64 decode\./i)).toBeInTheDocument()
    // No result section
    expect(root.queryByText(/Result:/)).not.toBeInTheDocument()
  })

  test('switching modes updates placeholder', async () => {
    const user = userEvent.setup()
    const view = render(<Base64Tool />)

    const root = within(view.container)
    const select = root.getByRole('combobox')
    const textarea = root.getByRole('textbox')

    expect(textarea).toHaveAttribute('placeholder', 'Enter text to encode...')
    await user.selectOptions(select, 'decode')
    expect(textarea).toHaveAttribute('placeholder', 'Enter BASE64 to decode...')
    await user.selectOptions(select, 'encode')
    expect(textarea).toHaveAttribute('placeholder', 'Enter text to encode...')
  })
})
