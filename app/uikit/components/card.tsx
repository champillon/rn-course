import * as Styles from '../style/styles'
import React, { PropsWithChildren } from 'react'
import { View, StyleSheet } from 'react-native'

const cardStyles = StyleSheet.create({
  midSize: {
    width: 100,
    height: 100,
  },
  largeSize: {
    width: 300,
    height: 300,
  },
})

type CardProps = {
  size: 'medium' | 'large'
}

export default function Card({ size, children }: PropsWithChildren<CardProps>): JSX.Element {
  const sizeStyle = size === 'medium' ? cardStyles.midSize : cardStyles.largeSize
  return <View style={[Styles.AwesomeShadow, Styles.CoolBorder, Styles.MyBackground, sizeStyle]}>{children}</View>
}
