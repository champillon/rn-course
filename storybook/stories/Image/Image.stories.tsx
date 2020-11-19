import { storiesOf } from '@storybook/react-native'
import React from 'react'
import { Image, View } from 'react-native'
import CenterView from '../CenterView'
import { Header, Section } from '../Helpers/Helpers'

storiesOf('Image', module)
  .addDecorator((getStory) => <CenterView>{getStory() as JSX.Element}</CenterView>)
  .add('Image from web', () => (
    <Image
      style={{
        width: 68,
        height: 68,
      }}
      source={{
        uri: 'https://reactnative.dev/img/tiny_logo.png',
      }}
    />
  ))
  .add('Image from local', () => {
    return <Image source={require('../../../assets/sample-img.jpeg')} />
  })
  .add('Resize mode', () => (
    <View>
      <Section>
        <Header>Default</Header>
        <Image
          style={{
            width: 200,
            height: 60,
          }}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
      </Section>
      <Section>
        <Header>Center</Header>
        <Image
          style={{
            width: 200,
            height: 40,
            resizeMode: 'center',
          }}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
      </Section>
      <Section>
        <Header>Contain</Header>
        <Image
          style={{
            width: 200,
            height: 40,
            resizeMode: 'contain',
          }}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
      </Section>
      <Section>
        <Header>Cover</Header>
        <Image
          style={{
            width: 200,
            height: 40,
            resizeMode: 'cover',
          }}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
      </Section>
    </View>
  ))
