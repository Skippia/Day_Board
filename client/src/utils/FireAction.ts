interface IFireAction {
  isFireElement: (target: HTMLElement) => boolean
  actionOnFire: Function
  failurePreCondition?: (...args: any[]) => boolean
  fireActionWatcher: (e: Event) => void
}

class FireAction implements IFireAction {
  isFireElement: (target: HTMLElement) => boolean
  actionOnFire: Function
  failurePreCondition: (...args: any[]) => boolean

  constructor({
    isFireElement,
    actionOnFire,
    failurePreCondition,
  }: {
    isFireElement: (target: HTMLElement) => boolean
    actionOnFire: Function
    failurePreCondition: (...args: any[]) => boolean
  }) {
    this.isFireElement = isFireElement
    this.actionOnFire = actionOnFire
    this.failurePreCondition = failurePreCondition
  }

  init() {
    return this.fireActionWatcher.bind(this)
  }

  fireActionWatcher(e: Event) {
    const target = e.target as HTMLElement
    if (!this.isFireElement(target))
      return
    if (this.failurePreCondition && this.failurePreCondition(target))
      return

    this.actionOnFire(target)
  }
}

export { FireAction }
