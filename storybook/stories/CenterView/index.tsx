import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import style from './style'

type CenterViewProps = {
  children: JSX.Element
}
export default function CenterView({ children }: CenterViewProps): JSX.Element {
  return <View style={style.main}>{children}</View>
}

CenterView.defaultProps = {
  children: null,
}

CenterView.propTypes = {
  children: PropTypes.node,
}
