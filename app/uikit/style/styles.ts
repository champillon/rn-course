import { ViewStyle } from 'react-native'

export const CoolBorder: ViewStyle = {
  borderColor: 'silver',
  borderWidth: 2,
  borderRadius: 3,
}

export const MyBackground: ViewStyle = {
  backgroundColor: 'white',
}

export const AwesomeShadow: ViewStyle = {
  shadowColor: '#000',
  shadowOffset: {
    width: 10,
    height: 10,
  },
  shadowOpacity: 0.5,
  shadowRadius: 5,

  elevation: 5,
}
