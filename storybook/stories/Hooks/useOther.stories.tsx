import { storiesOf } from '@storybook/react-native'
import React, { useRef, useReducer } from 'react'
import { Header, Section } from '../Helpers/Helpers'
import { View, Text, Button } from 'react-native'
import CenterView from '../CenterView'
import { ScrollView, TextInput } from 'react-native-gesture-handler'

storiesOf('Other hooks', module)
  .addDecorator((getStory) => <CenterView>{getStory() as JSX.Element}</CenterView>)
  .add('useReducer', () => {
    type TwoCountState = {
      count1: number
      count2: number
    }
    type Action = {
      type: 'INC_1' | 'INC_2'
    }
    const reducer = (state: TwoCountState, action: Action) => {
      switch (action.type) {
        case 'INC_1':
          return { ...state, count1: state.count1 + 1 }
        case 'INC_2':
          return { ...state, count2: state.count2 + 1 }
        default:
          return state
      }
    }
    const Component = () => {
      const [state, dispatch] = useReducer(reducer, {
        count1: 0,
        count2: 0,
      })
      return (
        <View>
          <Section>
            <Header>First Count</Header>
            <Text>Count: {state.count1}</Text>
            <Button title="Increase" onPress={() => dispatch({ type: 'INC_1' })} />
          </Section>
          <Section>
            <Header>Second Count</Header>
            <Text>Count: {state.count2}</Text>
            <Button title="Increase" onPress={() => dispatch({ type: 'INC_2' })} />
          </Section>
        </View>
      )
    }
    return <Component />
  })
  .add('useReducer use case', () => {
    return <View />
  })
  .add('useRefs', () => {
    function TextInputWithFocusButton() {
      const inputEl = useRef<TextInput>(null)
      const focus = () => {
        if (!inputEl) {
          return
        }
        const input = inputEl.current as any
        input.focus()
      }
      const unFocus = () => {
        if (!inputEl) {
          return
        }
        const input = inputEl.current as any
        input.blur()
      }
      return (
        <View>
          <TextInput ref={inputEl} placeholder="Enter here" />
          <Button title="Focus" onPress={focus} />
          <Button title="UnFocus" onPress={unFocus} />
        </View>
      )
    }
    return <TextInputWithFocusButton />
  })
