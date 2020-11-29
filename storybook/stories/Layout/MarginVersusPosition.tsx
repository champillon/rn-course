import { storiesOf } from '@storybook/react-native'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import CenterView from '../CenterView'

storiesOf('Layout', module)
  .addDecorator((getStory) => <CenterView>{getStory() as JSX.Element}</CenterView>)
  .add('Excersise', () => {
    const style = StyleSheet.create({
      mainView: {
        justifyContent: 'flex-start',
        ...StyleSheet.absoluteFillObject,
        // alignItems: 'flex-start',
      },
      header: {
        fontSize: 24,
        borderColor: 'silver',
        textAlign: 'center',
        borderWidth: 1,
      },
      viewOne: {
        width: 24,
        height: 24,
        backgroundColor: 'red',
      },
      viewTwo: {
        width: 24,
        height: 24,
        marginLeft: 40,
        backgroundColor: 'silver',
      },
      viewThree: {
        width: 24,
        height: 24,
        backgroundColor: 'blue',
      },
      viewTwoTwo: {
        width: 24,
        height: 24,
        left: 40,
        backgroundColor: 'silver',
      },
      container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
      },
    })
    return (
      <View style={style.mainView}>
        <Text style={style.header}>App</Text>
        <View style={style.container}>
          <View style={style.viewOne} />
          <View style={style.viewTwo} />
          <View style={style.viewThree} />
        </View>
        <View style={style.container}>
          <View style={style.viewOne} />
          <View style={style.viewTwoTwo} />
          <View style={style.viewThree} />
        </View>
        <View style={style.container}>
          <View style={style.viewOne} />
          <View style={style.viewOne} />
          <View style={style.viewThree} />
        </View>
      </View>
    )
  })
