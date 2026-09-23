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
})
