import React from 'react'
import { View, Text, TextStyle } from 'react-native'

type HeaderProps = {
  children: string
  style?: TextStyle
}
export const Header = (props: HeaderProps): JSX.Element => {
  const overrideStyle = props.style || {}
  return <Text style={{ fontSize: 20, fontWeight: 'bold', ...overrideStyle }}>{props.children}</Text>
}

type SectionProps = {
  children: React.ReactNode
}
export const Section = ({ children }: SectionProps): JSX.Element => {
  return <View style={{ marginTop: 30 }}>{children}</View>
}
