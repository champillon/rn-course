import { storiesOf } from '@storybook/react-native'
import React from 'react'
import { View, Text, Button } from 'react-native'
import CenterView from '../CenterView'
import {
  counterStore,
  CounterStore,
  combinedCounterStore,
  CombinedCounterStore,
  CounterStore2,
  taskStore,
  TaskStore,
  ICounterStore,
  ComputedCounterStore,
  computedCounterStore,
  userStore,
  UserStore,
  Task,
} from './MobXStores'
import { observer } from 'mobx-react'
import { runInAction, toJS } from 'mobx'

storiesOf('MobX', module)
  .addDecorator((getStory) => <CenterView>{getStory() as JSX.Element}</CenterView>)
  .add('Counter', () => {
    type ComponentProps = {
      counterStore: CounterStore
    }
    const Component = observer((props: ComponentProps) => {
      return (
        <View>
          <Text>Count: {props.counterStore.count}</Text>
          <Text>Count-NonObserve: {props.counterStore.nonObservableCount}</Text>
          <Button title="Increase" onPress={() => props.counterStore.increase()} />
          <Button title="Increase (Non Action)" onPress={() => props.counterStore.increaseNonAction()} />
        </View>
      )
    })
    return <Component counterStore={counterStore} />
  })
  .add('Two Counter', () => {
    type ComponentProps = {
      counterStore: ICounterStore
    }
    const Component = observer((props: ComponentProps) => {
      return (
        <View>
          <Text>Count: {props.counterStore.count}</Text>
          <Button title="Increase" onPress={() => props.counterStore.increase()} />
        </View>
      )
    })
    const counterStore1 = new CounterStore(3)
    const counterStore2 = new CounterStore2(2)
    return (
      <View>
        <Component counterStore={counterStore1} />
        <Component counterStore={counterStore2} />
      </View>
    )
  })
  .add('Computed', () => {
    type ComponentProps = {
      counterStore: ComputedCounterStore
    }
    const Component = observer((props: ComponentProps) => {
      return (
        <View>
          <Text>Count * 2: {props.counterStore.count * 2}</Text>
          <Text>Something ===================== Something</Text>
          <Text>Count * 2: {props.counterStore.count * 2}</Text>
          <View style={{ marginTop: 30 }}>
            <Text>Count * 2: {props.counterStore.twiceCount}</Text>
            <Text>Count * 2: {props.counterStore.twiceCount}</Text>
            <Text>Count * 2: {props.counterStore.twiceCount}</Text>
            <Text>Count * 2: {props.counterStore.twiceCount}</Text>
          </View>
          <Button
            title="Increase"
            onPress={() => {
              runInAction(() => props.counterStore.count++)
            }}
          />
        </View>
      )
    })
    return <Component counterStore={computedCounterStore} />
  })
  .add('runInAction', () => {
    type ComponentProps = {
      counterStore: CounterStore
    }
    const Component = observer((props: ComponentProps) => {
      return (
        <View>
          <Text>Count: {props.counterStore.count}</Text>
          <Button title="Increase" onPress={() => props.counterStore.count++} />
          <Button title="Increase after 1 secs" onPress={() => props.counterStore.increaseAfter1Sec()} />
          <Button title="Increase in Promise" onPress={() => props.counterStore.increasePromise()} />
        </View>
      )
    })
    return <Component counterStore={counterStore} />
  })
  .add('Combining stores', () => {
    type ComponentProps = {
      counterStore: CounterStore
    }
    const Component = observer((props: ComponentProps) => {
      return (
        <View>
          <Text>Count: {props.counterStore.count}</Text>
          <Button title="Increase" onPress={() => props.counterStore.increase()} />
        </View>
      )
    })
    type CombinedProps = {
      combinedCounterStore: CombinedCounterStore
    }
    const CombinedComponent = observer((props: CombinedProps) => {
      return (
        <View>
          <Component counterStore={props.combinedCounterStore.counterStore1} />
          <Component counterStore={props.combinedCounterStore.counterStore2} />
          <Button title="Super Increase" onPress={() => props.combinedCounterStore.incrementBoth()} />
          <Text>Use super increase {props.combinedCounterStore.combinedCount}</Text>
        </View>
      )
    })

    return <CombinedComponent combinedCounterStore={combinedCounterStore} />
  })
  .add('Using list', () => {
    const Component = observer(({ taskStore }: { taskStore: TaskStore }) => {
      return (
        <View>
          {taskStore.tasks.map((task) => {
            return (
              <View key={task.id} style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>{task.title}</Text>
                <Button onPress={() => taskStore.toggleDone(task.id)} title={task.done ? '✅' : '❌'} />
              </View>
            )
          })}
        </View>
      )
    })
    return <Component taskStore={taskStore} />
  })
  .add('Caveat #1: Understand Observable', () => {
    const TaskRow = observer(({ task, toggle }: { task: any; toggle: any }) => {
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>{task.title}</Text>
          <Button onPress={() => toggle()} title={task.done ? '✅' : '❌'} />
        </View>
      )
    })
    const Component = observer(({ taskStore }: { taskStore: TaskStore }) => {
      return (
        <View>
          {taskStore.tasks.map((task) => {
            return <TaskRow key={task.id} task={task} toggle={() => taskStore.toggleDone(task.id)} />
          })}
        </View>
      )
    })
    return <Component taskStore={taskStore} />
  })
  .add('Caveat #2: Multiple stores', () => {
    const TaskRow = observer(({ task, toggle }: { task: Task; toggle: () => void }) => {
      console.log('===TASK ROW Re-render===')
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>{task.title}</Text>
          <Button onPress={() => toggle()} title={task.done ? '✅' : '❌'} />
        </View>
      )
    })
    const Tasks = observer(({ tasks }: { tasks: Task[] }) => {
      return (
        <View>
          {tasks.map((task) => {
            return <TaskRow key={task.id} task={task} toggle={() => taskStore.toggleDone(task.id)} />
          })}
        </View>
      )
    })
    const Component = observer(({ taskStore, userStore }: { taskStore: TaskStore; userStore: UserStore }) => {
      return (
        <View>
          <Text>Current User: {userStore.name}</Text>
          <Button title="Rename" onPress={() => userStore.toggleName()} />
          {taskStore.tasks.map((task) => {
            return <TaskRow key={task.id} task={task} toggle={() => taskStore.toggleDone(task.id)} />
          })}
          <Tasks tasks={taskStore.tasks}></Tasks>
        </View>
      )
    })
    return <Component taskStore={taskStore} userStore={userStore} />
  })
  .add('Loading data', () => {
    return <Text>Change the main app</Text>
  })
