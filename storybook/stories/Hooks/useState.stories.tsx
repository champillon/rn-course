import { storiesOf } from '@storybook/react-native'
import React, { useState } from 'react'
import { View, Text, Button, TextInput } from 'react-native'
import { Header, Section } from '../Helpers/Helpers'
import CenterView from '../CenterView'

const TextBoxComponent = () => {
  const [text, setText] = useState('')
  return (
    <View>
      <Section>
        <Header>Text Animation</Header>
        <Text>You typed: {text == 'Chris' ? 'Awesome guy!' : text}</Text>
        <TextInput placeholder="Type something" value={text} onChangeText={(text) => setText(text)} />
      </Section>

      <Section>
        <Header>Locked Text</Header>
        <TextInput style={{}} placeholder="Type something" value={'Lock'} />
      </Section>
    </View>
  )
}
storiesOf('Hooks/useState', module)
  .addDecorator((getStory) => <CenterView>{getStory() as JSX.Element}</CenterView>)
  .add('Simple counter', () => {
    const Component = () => {
      const [count, setCount] = useState(0)
      return (
        <View>
          <Text>Count: {count}</Text>
          <Button title="Increase" onPress={() => setCount(count + 1)} />
        </View>
      )
    }
    return <Component />
  })
  .add('TextBox + Validation', () => {
    return <TextBoxComponent />
  })
  .add('Multiple useState', () => {
    const Component = () => {
      const [count1, setCount1] = useState(0)
      const [count2, setCount2] = useState(0)
      return (
        <View>
          <Section>
            <Header>First Count</Header>
            <Text>Count: {count1}</Text>
            <Button title="Increase" onPress={() => setCount1(count1 + 1)} />
          </Section>
          <Section>
            <Header>Second Count</Header>
            <Text>Count: {count2}</Text>
            <Button title="Increase" onPress={() => setCount2(count2 + 1)} />
          </Section>
        </View>
      )
    }
    return <Component />
  })
  .add('Functional setState', () => {
    // setState can received function
    // Signature is prevState => result
    // Example: setCount(prevCount => prevCount + 1)
    // Why?

    const Component = () => {
      const [count, setCount] = useState(0)

      const delayedIncreaseCountIncorrectly = () => {
        setTimeout(() => setCount(count + 1), 500)
      }
      const delayedDecreaseCountIncorrectly = () => {
        setTimeout(() => setCount(count - 1), 500)
      }

      const delayedIncreaseCountCorrectly = () => {
        setTimeout(() => setCount((prevCount) => prevCount + 1), 500)
      }
      const delayedDecreaseCountCorrectly = () => {
        setTimeout(() => setCount((prevCount) => prevCount - 1), 500)
      }
      return (
        <View>
          <Section>
            <Header>Don&apos;t</Header>
            <Text>Count: {count}</Text>
            <Button title="Increase" onPress={delayedIncreaseCountIncorrectly} />
            <Button title="Decrease" onPress={delayedDecreaseCountIncorrectly} />
          </Section>
          <Section>
            <Header>Do</Header>
            <Text>Count: {count}</Text>
            <Button title="Increase" onPress={delayedIncreaseCountCorrectly} />
            <Button title="Decrease" onPress={delayedDecreaseCountCorrectly} />
          </Section>
        </View>
      )
    }
    return <Component />
  })
  .add('Mutate does not works', () => {
    const Component = () => {
      const [data, setData] = useState({
        count: 0,
      })
      return (
        <View>
          <Text>Count: {data.count}</Text>
          <Button
            title="Increase Mutate"
            onPress={() => {
              data.count = data.count + 1
              setData(data)
            }}
          />
          <Button
            title="Increase Functional Mutate"
            onPress={() => {
              setData((prevData) => {
                prevData.count++
                return prevData
              })
            }}
          />
        </View>
      )
    }
    return <Component />
  })
  .add('Functional initialState', () => {
    // use can received function
    // Result of function gonna be initial state
    // For expensive calculation

    const Component = () => {
      const [count, setCount] = useState(() => Math.round(Math.random() * 100))
      return (
        <View>
          <Text>Count: {count}</Text>
          <Button title="Increase" onPress={() => setCount(count + 1)} />
        </View>
      )
    }
    return <Component />
  })
  .add('Quest and Anti-Pattern', () => {
    return <AntiPatternComponent />
  })

type MyTextInputProps = {
  initialValue: string
}
const MyTextInput = ({ initialValue }: MyTextInputProps) => {
  const [value, setValue] = useState(initialValue)
  return <TextInput value={value} onChangeText={(newText) => setValue(newText)} />
}

const AntiPatternComponent = () => {
  const [data, setData] = useState({ value: 'Hello world' })
  return (
    <View>
      <Section>
        <Header>Props update does not override state</Header>
        <View>
          <MyTextInput initialValue={data.value} />
          <Button title="Reload data" onPress={() => setData({ value: 'Hello world' })} />
        </View>
      </Section>
    </View>
  )
}
