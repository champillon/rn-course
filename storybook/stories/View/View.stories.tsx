import { storiesOf } from '@storybook/react-native'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import CenterView from '../CenterView'

type CircleViewProps = {
  radius: number
}
function CircleView(props: CircleViewProps): JSX.Element {
  const style = StyleSheet.create({
    main: {
      borderRadius: props.radius / 2,
      width: props.radius,
      height: props.radius,
      backgroundColor: 'red',
    },
  })
  return <View style={style.main} />
}

storiesOf('View', module)
  .addDecorator((getStory) => <CenterView>{getStory() as JSX.Element}</CenterView>)
  .add('red view', () => <View style={{ backgroundColor: 'red', width: 50, height: 50 }} />)
  .add('views within view', () => (
    <View style={{ backgroundColor: 'red' }}>
      <View style={{ backgroundColor: 'blue', height: 50, width: 50 }} />
      <View style={{ backgroundColor: 'green', height: 50, width: 50 }} />
    </View>
  ))
  .add('Text within view', () => (
    <View>
      <Text>Hello</Text>
    </View>
  ))
  .add('Circle view', () => <CircleView radius={70} />)
