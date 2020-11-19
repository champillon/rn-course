import { storiesOf } from '@storybook/react-native'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import CenterView from '../CenterView'

storiesOf('ActivityIndicator', module)
  .addDecorator((getStory) => <CenterView>{getStory() as JSX.Element}</CenterView>)
  .add('Various sizes', () => (
    <View>
      <ActivityIndicator size="large" />
      <ActivityIndicator size="small" />
    </View>
  ))
