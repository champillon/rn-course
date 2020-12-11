import { storiesOf } from '@storybook/react-native'
import React from 'react'
import { ActivityIndicator, View, Text, Button } from 'react-native'
import CenterView from '../CenterView'
import { makeObservable, observable, makeAutoObservable } from 'mobx'
import { observer } from 'mobx-react'

class CounterStore {
  count = 0
  constructor(initialCount: number) {
    this.count = initialCount
    makeAutoObservable(this)
  }

  increase() {
    this.count += 1
  }
}

class CombinedCounterStore {
  counterStore1: CounterStore
  counterStore2: CounterStore
  combinedCount = 0

  constructor(counterStore1: CounterStore, counterStore2: CounterStore) {
    this.counterStore1 = counterStore1
    this.counterStore2 = counterStore2
    makeAutoObservable(this)
  }

  incrementBoth() {
    this.counterStore1.increase()
    this.counterStore2.increase()
    this.combinedCount++
  }
}

const combinedCounterStore = new CombinedCounterStore(new CounterStore(0), new CounterStore(0))

const counterStore = new CounterStore(0)
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
    const counterStore2 = new CounterStore(2)
    return (
      <View>
        <Component counterStore={counterStore1} />
        <Component counterStore={counterStore2} />
      </View>
    )
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
