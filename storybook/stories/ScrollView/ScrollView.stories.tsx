import { storiesOf } from '@storybook/react-native'
import React, { useState } from 'react'
import { ScrollView, View, Text, Button } from 'react-native'
import CenterView from '../CenterView'

const arrayOfConsequtiveNumbers = (count: number) => Array.from(Array(count).keys())

const get100Texts = () => {
  return arrayOfConsequtiveNumbers(100).map((_, i) => {
    return (
      <View key={i}>
        <Text>Text {i}</Text>
      </View>
    )
  })
}

storiesOf('ScrollView', module)
  .addDecorator((getStory) => <CenterView>{getStory() as JSX.Element}</CenterView>)
  .add('Default', () => <ScrollView style={{ width: '100%', paddingLeft: 10 }}>{get100Texts()}</ScrollView>)
  .add('No bounces', () => (
    <ScrollView bounces={false} style={{ width: '100%', paddingLeft: 10 }}>
      {get100Texts()}
    </ScrollView>
  ))
  .add('Zoomable', () => {
    const ZoomableScroll = () => {
      const [zoomScale, setZoomScale] = useState(1)
      const increaseZoom = () => {
        setZoomScale(zoomScale + 1)
      }
      const decreaseZoom = () => {
        setZoomScale(zoomScale - 1)
      }
      return (
        <View style={{ width: '100%' }}>
          <ScrollView
            minimumZoomScale={0.5}
            maximumZoomScale={20}
            zoomScale={zoomScale}
            style={{ height: '50%', paddingLeft: 10 }}
          >
            {get100Texts()}
          </ScrollView>
          <Button title="Zoom In" onPress={increaseZoom} />
          <Button title="Zoom Out" onPress={decreaseZoom} />
        </View>
      )
    }
    return <ZoomableScroll />
    // 🤔 Can you create Reset Zoom button?
  })
  .add('ContentContainerStyle', () => (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={{ width: '100%' }}>
      {get100Texts()}
    </ScrollView>
  ))
  .add('Multiple ScrollView', () => (
    <View style={{ width: '100%', flexDirection: 'row' }}>
      <ScrollView>{get100Texts()}</ScrollView>
      <ScrollView style={{ paddingLeft: 10 }}>{get100Texts()}</ScrollView>
    </View>
  ))
  .add('Paging', () => (
    <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={{ width: '100%' }} pagingEnabled>
      {get100Texts()}
    </ScrollView>
  ))
  .add('Snapping', () => {
    const itemHeight = 150
    const getSnappingItems = () => {
      return arrayOfConsequtiveNumbers(100).map((_, i) => (
        <View style={{ height: itemHeight, borderWidth: 1, borderColor: 'silver' }} key={i}>
          <Text>Text {i}</Text>
        </View>
      ))
    }
    const snappingOffsets = arrayOfConsequtiveNumbers(100).map((i) => i * itemHeight)
    return (
      <ScrollView
        contentContainerStyle={{ alignItems: 'center' }}
        style={{ width: '100%' }}
        snapToOffsets={snappingOffsets}
      >
        {getSnappingItems()}
      </ScrollView>
    )
    // 🤔 How does it work with Zoom?
    // 🤔 Snapping exactly on top does not look well. Can you layout it better? 😁
  })

// ScrollView will render every component upfront
