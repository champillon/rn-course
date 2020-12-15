import { storiesOf } from '@storybook/react-native'
import React, { useEffect } from 'react'
import { View, Text, Button, ActivityIndicator } from 'react-native'
import CenterView from '../CenterView'
import {
  counterStore,
  CounterStore,
  combinedCounterStore,
  CombinedCounterStore,
  CounterStore2,
  taskStore,
  TaskStore,
  UserStore,
  userStore,
  LoadState,
} from './MobXStores'
import { observer } from 'mobx-react'

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
          <Button title="Increase" onPress={() => props.counterStore.increase()} />
        </View>
      )
    })
    return <Component counterStore={counterStore} />
  })

  .add('Two Counter', () => {
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
    return <View />
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
  .add('Computed props', () => {
    return <View />
  })
  .add('Async', () => {
    return <Text>Change the main app</Text>
  })
