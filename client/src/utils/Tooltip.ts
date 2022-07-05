class TooltipConstructor {
  run({
    error,
    message_success,
    message_fail,
  }: {
    error: boolean
    message_success: string
    message_fail: string
  }): void {
    if (!error)
      return this.draw({ status: 'success', message: message_success })

    this.draw({ status: 'fail', message: message_fail })
  }

  draw({ status, message }: { status: string; message: string }) {
    const tooltip = document.createElement('div')
    tooltip.innerText = message
    const specialClass = status === 'fail' ? 'notification--fail' : 'notification--success'
    const timing = status === 'fail' ? 5000 : 2500
    tooltip.classList.add('notification', specialClass)
    document.body.append(tooltip)

    this.clear(tooltip, timing)
  }

  clear(tooltip: HTMLElement | null, timing: number) {
    setTimeout(() => {
      tooltip?.remove()
    }, timing)
  }
}

const Tooltip = new TooltipConstructor()
export { Tooltip }
