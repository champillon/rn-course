import { storiesOf } from '@storybook/react-native'
import React from 'react'
import { View, Text, Button } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import CenterView from '../CenterView'

type ParamsList = {
  Details: undefined
  Home: undefined
}
type ScreenInNavigationProps = {
  navigation: StackNavigationProp<ParamsList>
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  )
}

function HomeScreen({ navigation }: ScreenInNavigationProps) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
    </View>
  )
}

storiesOf('Navigation', module)
  .add('Without tabs', () => {
    const Stack = createStackNavigator()

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  })
  .add('Tabs', () => {
    const Tab = createBottomTabNavigator()
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Details" component={DetailsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  })
  .add('Nesting', () => {
    const Stack = createStackNavigator()
    const Screen1 = () => <Text>Screen1</Text>
    const Screen2 = () => (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    )
    const Tab = createBottomTabNavigator()
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Screen1" component={Screen1} />
          <Tab.Screen name="Screen2" component={Screen2} />
        </Tab.Navigator>
      </NavigationContainer>
    )
  })
