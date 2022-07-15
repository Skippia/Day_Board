import { fireEvent, render, screen, waitFor } from '@testing-library/vue'
import { fn, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import DatePicker from '~/organisms/DatePicker.vue'
import TestComponent from '~/pages/test/index.vue'
import '@testing-library/jest-dom'

// setActivePinia(createPinia())

describe('Data Picker', () => {
  beforeEach(() => {
    render(TestComponent)
  })
  /*  it('primary loading (single mode by default)', async () => {
    const { getByTestId } = render(DatePicker, { global: { plugins: [createTestingPinia({ createSpy: fn })] } })

    await waitFor(() => {
      const $activeEl = getByTestId('active-day')
      console.log($activeEl)
      expect($activeEl).toBeInTheDocument()
    })
  }) */
  /*  it('switch mode single --> multi', async () => {
    const { getByText } = render(DatePicker, { global: { plugins: [createTestingPinia({ createSpy: fn })] } })

    await nextTick()

    const $activeEl = getByText('27')

    await fireEvent.click($activeEl)

    expect($activeEl).toHaveClass('bg-emerald-500/40')
  }) */
  /* ` it('switch mode multi --> single', async () => {
    const $switchBtn = screen.getByRole('switch-color')
    await fireEvent.click($switchBtn)

    const $activeEl = screen.getByRole('active-color')

    screen.debug()

    expect($activeEl).toBeInTheDocument()
  })` */
  // it('change day', async () => {

  // })
  // it('single other month', async () => {

  // })
  // it('multi different months', async () => {

  // })
})
