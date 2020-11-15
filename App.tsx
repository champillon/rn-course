import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, SafeAreaView, Button, ScrollView } from 'react-native'

export default function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal={false}>
        <Text>Hello world!!</Text>
        <Button title="Nice!" onPress={() => null}></Button>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  )
}

// export { default } from './storybook';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
