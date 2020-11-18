import React from 'react'
import PropTypes from 'prop-types'
import { TouchableHighlight } from 'react-native'

type ButtonProps = {
  onPress: () => void
  children: JSX.Element
}

export default function Button({ onPress, children }: ButtonProps): JSX.Element {
  return <TouchableHighlight onPress={onPress}>{children}</TouchableHighlight>
}

Button.defaultProps = {
  children: null,
  onPress: () => null,
}

Button.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
}
