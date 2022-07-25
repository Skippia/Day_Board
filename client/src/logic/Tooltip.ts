class TooltipConstructor {
    run({
        error,
        messageSuccess,
        messageFail,
    }: {
        error: boolean
        messageSuccess?: string
        messageFail?: string
    }): void {
        if (!error) return this.draw({ status: 'success', message: messageSuccess as string })

        this.draw({ status: 'fail', message: messageFail as string })
    }

    draw({ status, message }: { status: string; message: string }) {
        const tooltipParent = document.createElement('div')
        const tooltipChild = document.createElement('div')

        tooltipParent.innerText = message
        const specialClassPrefix = status === 'fail' ? 'notification--fail' : 'notification--success'
        const timing = status === 'fail' ? 5000 : 2500

        tooltipParent.classList.add('notification', `${specialClassPrefix}-text`)
        tooltipChild.classList.add('notification__child', `${specialClassPrefix}-bg`)

        tooltipParent.append(tooltipChild)
        document.body.append(tooltipParent)

        this.clear(tooltipParent, timing)
    }

    clear(tooltip: HTMLElement | null, timing: number) {
        setTimeout(() => {
            tooltip?.remove()
        }, timing)
    }
}

const Tooltip = new TooltipConstructor()
export { Tooltip }
