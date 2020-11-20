import React from 'react'
import PropTypes from 'prop-types'
import { View, ViewStyle } from 'react-native'
import style from './style'

type CenterViewProps = {
  children: JSX.Element
  style?: ViewStyle
}
export default function CenterView({ children, style: styleProps }: CenterViewProps): JSX.Element {
  return <View style={[style.main, styleProps]}>{children}</View>
}

CenterView.defaultProps = {
  children: null,
}

CenterView.propTypes = {
  children: PropTypes.node,
}
