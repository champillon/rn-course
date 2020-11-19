import { storiesOf } from '@storybook/react-native'
import React from 'react'
import { useFonts } from 'expo-font'
import { Text, View } from 'react-native'
import { Section, Header } from '../Helpers/Helpers'
import CenterView from '../CenterView'

function CustomFontText(): JSX.Element {
  // Need to install `expo install expo-font` first
  const [fontLoaded, fontLoadError] = useFonts({
    admiration_pain: require('../../../assets/admiration_pain.ttf'),
  })
  if (!fontLoaded) {
    return <View />
  }
  if (fontLoadError) {
    return <Text>fontLoadError.message</Text>
  }

  // After font loaded
  // PS. All assets need to be loaded (Image and font)
  return <Text style={{ fontFamily: 'admiration_pain', fontSize: 40 }}>Custom Hello world</Text>
}

storiesOf('Text', module)
  .addDecorator((getStory) => <CenterView>{getStory() as JSX.Element}</CenterView>)
  .add('Simple text', () => <Text>Hello world!</Text>)
  .add('Fonted text', () => <Text style={{ fontFamily: 'Cochin', fontSize: 40 }}>Hello world!</Text>)
  // Let's emphasize this
  .add('Custom font text', () => <CustomFontText />)
  .add('Nested text', () => {
    return (
      <Text>
        Hello <Text style={{ fontWeight: 'bold' }}>World!</Text>
      </Text>
    )
  })
  .add('Nested Text vs Nested View', () => {
    return (
      <View>
        <Section>
          <Header>Multiple texts inside a view</Header>
          <View>
            <Text>I am Chris.</Text>
            <Text>I am awesome!!</Text>
          </View>
        </Section>
        <Section>
          <Header>Multiple texts in text</Header>
          <Text>
            <Text>I am Chris.</Text>
            <Text>I am awesome!!</Text>
          </Text>
        </Section>
      </View>
    )
  })
  .add('Number of lines and ellipsis', () => {
    return (
      <View>
        <Section>
          <Header>Default ellipsis</Header>
          <Text style={{ maxWidth: 200 }} numberOfLines={2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum
          </Text>
        </Section>
        <Section>
          <Header>Head ellipsis</Header>
          <Text style={{ maxWidth: 200 }} numberOfLines={2} ellipsizeMode="head">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum
          </Text>
        </Section>
        <Section>
          <Header>Middle ellipsis</Header>
          <Text style={{ maxWidth: 200 }} numberOfLines={2} ellipsizeMode="middle">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum
          </Text>
        </Section>
        <Section>
          <Header>Tail ellipsis</Header>
          <Text style={{ maxWidth: 200 }} numberOfLines={2} ellipsizeMode="tail">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum
          </Text>
        </Section>
        <Section>
          <Header>Clip ellipsis</Header>
          <Text style={{ maxWidth: 200 }} numberOfLines={2} ellipsizeMode="clip">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum
          </Text>
        </Section>
      </View>
    )
  })
