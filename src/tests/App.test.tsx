import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'



describe('App', () => {
  it('renderiza sem quebrar', () => {
    render(<App/>)
    expect(document.body).toBeTruthy()
  })
})