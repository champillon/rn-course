import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import React, { useState } from 'react'
import {
  TextInput,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Button,
} from 'react-native'
import CenterView from '../CenterView'
import { Header, Section } from '../Helpers/Helpers'

const OnChangeText = () => {
  const [text, setText] = useState('')
  const onChangeText = (text: string) => {
    action('OnChange fired with')(text)
    setText(text)
  }
  return (
    <View>
      <Text>With OnChange:</Text>
      <TextInput
        value={text}
        onChangeText={onChangeText}
        style={{ height: 25, width: 300, backgroundColor: 'silver' }}
      />
    </View>
  )
}

storiesOf('TextInput', module)
  .addDecorator((getStory) => <CenterView>{getStory() as JSX.Element}</CenterView>)
  .add('Default', () => (
    <View>
      <Text>Enter:</Text>
      <TextInput placeholder="Enter text here" style={{ backgroundColor: 'silver' }} />
    </View>
  ))
  .add('Multiline', () => {
    return (
      <View>
        <Text>Enter:</Text>
        <TextInput multiline style={{ height: 200, width: 300, backgroundColor: 'silver' }} />
      </View>
    )
  })
  .add('Keyboard Type', () => {
    return (
      <View>
        <Section>
          <Header>Default</Header>
          <TextInput style={{ height: 25, width: 300, backgroundColor: 'silver' }} />
        </Section>
        <Section>
          <Header>Number Pad</Header>
          <TextInput keyboardType="number-pad" style={{ height: 25, width: 300, backgroundColor: 'silver' }} />
        </Section>
        <Section>
          <Header>Decimal Pad</Header>
          <TextInput keyboardType="decimal-pad" style={{ height: 25, width: 300, backgroundColor: 'silver' }} />
        </Section>
        <Section>
          <Header>Numeric</Header>
          <TextInput keyboardType="numeric" style={{ height: 25, width: 300, backgroundColor: 'silver' }} />
        </Section>
        <Section>
          <Header>Email Address</Header>
          <TextInput keyboardType="email-address" style={{ height: 25, width: 300, backgroundColor: 'silver' }} />
        </Section>
        <Section>
          <Header>Phone Pad</Header>
          <TextInput keyboardType="phone-pad" style={{ height: 25, width: 300, backgroundColor: 'silver' }} />
        </Section>
      </View>
    )
    // Types: https://lefkowitz.me/visual-guide-to-react-native-textinput-keyboardtype-options/
  })
  .add('OnChange Event', () => {
    return <OnChangeText />
  })
  // Advance Topics
  .add('Handling space', () => {
    return (
      <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <Section>
          <Header>Input</Header>
          <TextInput style={{ height: 25, width: 300, backgroundColor: 'silver' }} />
        </Section>
        <Section>
          <Header>Input</Header>
          <TextInput style={{ height: 25, width: 300, backgroundColor: 'silver' }} />
        </Section>
        <Section>
          <Header>Input</Header>
          <TextInput style={{ height: 25, width: 300, backgroundColor: 'silver' }} />
        </Section>
        <Section>
          <Header>Input</Header>
          <TextInput style={{ height: 25, width: 300, backgroundColor: 'silver' }} />
        </Section>
        <Section>
          <Header>Input</Header>
          <TextInput style={{ height: 25, width: 300, backgroundColor: 'silver' }} />
        </Section>
        <Section>
          <Header>Input</Header>
          <TextInput style={{ height: 25, width: 300, backgroundColor: 'silver' }} />
        </Section>
        <Section>
          <Header>Input</Header>
          <TextInput style={{ height: 25, width: 300, backgroundColor: 'silver' }} />
        </Section>
        <Section>
          <Header>Input</Header>
          <TextInput style={{ height: 25, width: 300, backgroundColor: 'silver' }} />
        </Section>
      </KeyboardAvoidingView>
    )
  })
  .add('Handling exit #1', () => {
    const dismissKeyboard = () => {
      Keyboard.dismiss()
    }
    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={{ width: '100%', height: '100%' }}>
          <TextInput placeholder="Enter here" style={{ height: 25, backgroundColor: 'silver' }} />
          <Button title="Press!" onPress={() => Keyboard.dismiss()} />
        </View>
      </TouchableWithoutFeedback>
    )
  })
  .add('Handling exit #2', () => {
    return (
      <ScrollView scrollEnabled={false}>
        <TextInput style={{ height: 25, marginTop: 40, width: 300, backgroundColor: 'silver' }} />
        <Button title="Press!" onPress={() => null} />
      </ScrollView>
    )
  })
