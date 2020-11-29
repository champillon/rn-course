import { storiesOf } from '@storybook/react-native'
import React from 'react'
import CenterView from '../CenterView'
import Card from '../../../app/uikit/components/card'

storiesOf('Sample', module)
  .addDecorator((getStory) => <CenterView>{getStory() as JSX.Element}</CenterView>)
  .add('Mid-size Card', () => <Card size="medium"></Card>)
  .add('Large-size Card', () => <Card size="large"></Card>)
