import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'
import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SuggestInput } from './SuggestInput'

function Harness({ options }: { options: string[] }) {
  const [value, setValue] = useState('')
  return (
    <>
      <SuggestInput value={value} onChange={setValue} options={options} className="" />
      <button>elsewhere</button>
    </>
  )
}

const tracks = ['Motorsport Ranch - Cresson', 'Eagles Canyon Raceway']

describe('SuggestInput', () => {
  it('offers matching past values to pick from', async () => {
    render(<Harness options={tracks} />)
    await userEvent.type(screen.getByRole('combobox'), 'eagles')
    await userEvent.click(screen.getByRole('option', { name: 'Eagles Canyon Raceway' }))
    expect(screen.getByRole('combobox')).toHaveValue('Eagles Canyon Raceway')
  })

  it('snaps a differently formatted spelling to the existing value on blur', async () => {
    render(<Harness options={tracks} />)
    await userEvent.type(screen.getByRole('combobox'), 'motorsport ranch cresson')
    await userEvent.click(screen.getByText('elsewhere'))
    expect(screen.getByRole('combobox')).toHaveValue('Motorsport Ranch - Cresson')
  })

  it('nudges toward a near match and keeps a new value if ignored', async () => {
    render(<Harness options={['1.7 mile']} />)
    await userEvent.type(screen.getByRole('combobox'), '1.7')
    await userEvent.click(screen.getByText('elsewhere'))
    expect(screen.getByRole('combobox')).toHaveValue('1.7')
    await userEvent.click(screen.getByRole('button', { name: /Did you mean “1.7 mile”/ }))
    expect(screen.getByRole('combobox')).toHaveValue('1.7 mile')
  })

  it('lists every option again when you come back to a filled field', async () => {
    render(<Harness options={tracks} />)
    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'eagles')
    await userEvent.click(screen.getByRole('option', { name: 'Eagles Canyon Raceway' }))
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

    await userEvent.click(screen.getByText('elsewhere'))
    await userEvent.click(input)
    expect(screen.getAllByRole('option').map(o => o.textContent)).toEqual(tracks)

    // Typing narrows it again.
    await userEvent.clear(input)
    await userEvent.type(input, 'ranch')
    expect(screen.getAllByRole('option').map(o => o.textContent)).toEqual(['Motorsport Ranch - Cresson'])
  })

  it('reopens the list on a tap right after choosing, without leaving the field', async () => {
    render(<Harness options={tracks} />)
    const input = screen.getByRole('combobox')
    await userEvent.click(input)
    await userEvent.click(screen.getByRole('option', { name: 'Motorsport Ranch - Cresson' }))
    await userEvent.click(input)
    expect(screen.getAllByRole('option')).toHaveLength(2)
  })
})

