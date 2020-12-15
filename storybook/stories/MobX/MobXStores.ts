import { makeObservable, observable, makeAutoObservable, action } from 'mobx'

export class CounterStore {
  count = 0
  constructor(initialCount: number) {
    this.count = initialCount
    makeAutoObservable(this)
  }

  increase(): void {
    this.count += 1
  }
}

export class CounterStore2 {
  count = 0

  constructor(initialCount: number) {
    this.count = initialCount
    makeObservable(this, {
      increase: action,
      count: observable,
    })
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
    makeAutoObservable(this)
  }

  incrementBoth(): void {
    this.counterStore1.increase()
    this.counterStore2.increase()
    this.combinedCount++
  }
}

type Task = {
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

type User = {
  name: string
}

export class UserStore {
  public loadState: LoadState = LoadState.Loading
  public users: User[] = []
  constructor() {
    makeAutoObservable(this)
  }

  async load(): Promise<void> {
    // this.loadState = LoadState.Loading
    const response = await fetch('https://randomuser.me/api?results=10')
    const textResponse = await response.text()
    this.users = JSON.parse(textResponse).results.map((result: any) => ({
      name: `${result.name.first} ${result.name.last}`,
    }))
    this.loadState = LoadState.Loaded
  }
}

export const userStore = new UserStore()
