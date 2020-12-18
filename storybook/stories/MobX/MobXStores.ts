import { makeObservable, observable, makeAutoObservable, action, computed, runInAction } from 'mobx'

export interface ICounterStore {
  count: number
  increase: () => void
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms)
  })
}
export class CounterStore implements ICounterStore {
  count = 0
  nonObservableCount = 0
  constructor(initialCount: number) {
    this.count = initialCount
    this.nonObservableCount = initialCount
    makeObservable(this, {
      increase: action,
      count: observable,
      increaseAfter1Sec: action,
    })
  }

  increase(): void {
    this.count += 1
    this.nonObservableCount += 1
  }

  increaseNonAction(): void {
    this.nonObservableCount += 1
  }

  increaseAfter1Sec(): void {
    setTimeout(() => {
      runInAction(() => {
        this.count++
      })
    }, 1000)
  }

  async increasePromise(): Promise<void> {
    await delay(500)
    this.count++
  }
}

export class CounterStore2 implements ICounterStore {
  count = 0

  constructor(initialCount: number) {
    this.count = initialCount
    makeAutoObservable(this)
  }

  increase(): void {
    this.count += 1
  }
}

export class CombinedCounterStore {
  counterStore1: CounterStore
  counterStore2: CounterStore
  combinedCount = 0

  constructor(counterStore1: CounterStore, counterStore2: CounterStore) {
    this.counterStore1 = counterStore1
    this.counterStore2 = counterStore2
    makeObservable(this, {
      incrementBoth: action,
    })
  }

  incrementBoth(): void {
    this.counterStore1.increase()
    this.counterStore2.increase()
    this.combinedCount++
  }
}

export class ComputedCounterStore implements ICounterStore {
  count = 0
  constructor(initialCount: number) {
    this.count = initialCount
    makeObservable(this, {
      increase: action,
      count: observable,
      twiceCount: computed,
    })
  }

  increase(): void {
    this.count += 1
  }

  get twiceCount(): number {
    console.log('Start calculating.....')
    return this.count * 2
  }
}

export const computedCounterStore = new ComputedCounterStore(0)

export type Task = {
  title: string
  done: boolean
  id: string
}

export class TaskStore {
  constructor(public tasks: Task[]) {
    makeAutoObservable(this)
  }

  addTask(task: Task): void {
    this.tasks.push(task)
  }

  removeTask(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId)
  }

  toggleDone(taskId: string): void {
    const task = this.tasks.find((task) => task.id === taskId)
    if (!task) {
      return
    }
    task.done = !task.done
  }

  // Computed
  public get taskCount(): number {
    return this.tasks.length
  }
}

export class UserStore {
  name = 'Chris'
  constructor() {
    makeAutoObservable(this)
  }

  toggleName(): void {
    if (this.name === 'Chris') {
      this.name = 'Awa'
    } else {
      this.name = 'Chris'
    }
  }
}

export const userStore = new UserStore()

export const combinedCounterStore = new CombinedCounterStore(new CounterStore(0), new CounterStore(0))

export const counterStore = new CounterStore(0)

export const counterStore2 = new CounterStore2(0)

export const taskStore = new TaskStore([
  { title: 'Do the dish', done: false, id: 'task1' },
  { title: 'Clean the house', done: false, id: 'task2' },
])

export enum LoadState {
  Init = 'init',
  Loading = 'loading',
  Loaded = 'loaded',
  Error = 'error',
}
