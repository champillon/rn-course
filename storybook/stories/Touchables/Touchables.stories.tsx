import { storiesOf } from '@storybook/react-native'
import { action } from '@storybook/addon-actions'
import React, { useState } from 'react'
import { View, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import CenterView from '../CenterView'

storiesOf('Touchables', module)
  .addDecorator((getStory) => <CenterView>{getStory() as JSX.Element}</CenterView>)
  .add('TouchableHighlights', () => {
    return (
      <TouchableHighlight activeOpacity={0.5} underlayColor="gray" onPress={() => action('Press')()}>
        <View>
          <Text>Press me</Text>
        </View>
      </TouchableHighlight>
    )
  })
  .add('TouchableOpacity', () => {
    return (
      <TouchableOpacity onPress={() => action('Press')()}>
        <View>
          <Text>Press me</Text>
        </View>
      </TouchableOpacity>
    )
  })
  .add('TouchableWithoutFeedback', () => {
    return (
      <TouchableWithoutFeedback onPress={() => action('Press')()}>
        <View>
          <Text>Press me</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  })
