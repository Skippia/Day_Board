class TooltipConstructor {
  run({
    error,
    messageSuccess,
    messageFail,
  }: {
    error: boolean
    messageSuccess: string
    messageFail: string
  }): void {
    if (!error)
      return this.draw({ status: 'success', message: messageSuccess })

    this.draw({ status: 'fail', message: messageFail })
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
