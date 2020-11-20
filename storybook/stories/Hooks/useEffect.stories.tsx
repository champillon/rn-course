import { storiesOf } from '@storybook/react-native'
import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import CenterView from '../CenterView'

const TimerComponent = () => {
  const [secs, setSecs] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => setSecs((prevSecs) => prevSecs + 1), 1000)
    // Return any clear
    return () => clearInterval(interval)
  })
  return (
    <View>
      <Text>Time elapsed: {secs} secs</Text>
    </View>
  )
}

const StartableTimerComponent = () => {
  const [secs, setSecs] = useState(0)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    if (!started) {
      return
    }
    const interval = setInterval(() => setSecs((prevSecs) => prevSecs + 1), 1000)
    // Return any clear
    return () => clearInterval(interval)
  }, [started])
  return (
    <View>
      <Text>Time elapsed: {secs} secs</Text>
      <Button title="Toggle" onPress={() => setStarted((prevStarted) => !prevStarted)} />
    </View>
  )
}

type User = {
  name: string
}
const UserComponent = () => {
  const [users, setUsers] = useState<User[] | null>(null)
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://randomuser.me/api?results=10')
      const data = (await response.json()).results.map((result: any) => ({
        name: `${result.name.first} ${result.name.last}`,
      }))
      setUsers(data)
    }
    fetchUsers()
  }, [])

  if (!users) {
    return <Text>Loading...</Text>
  }

  return (
    <View>
      {users.map((user) => (
        <Text key={user.name}>Name: {user.name}</Text>
      ))}
    </View>
  )
}
storiesOf('Hooks/useEffect', module)
  .addDecorator((getStory) => <CenterView>{getStory() as JSX.Element}</CenterView>)
  .add('Simple timer', () => {
    return <TimerComponent />
  })
  .add('Load data', () => {
    return <UserComponent />
  })
  .add('Memoized', () => {
    return <StartableTimerComponent />
  })
  .add('Custom Hooks', () => {
    return <TimerHooksComponent />
  })
  .add('Quest', () => {
    // Implement useRandomUser
    return null
  })

const useTimer = () => {
  const [secs, setSecs] = useState(0)
  const [started, setStarted] = useState(false)
  useEffect(() => {
    if (!started) {
      return
    }
    const interval = setInterval(() => setSecs((prevSecs) => prevSecs + 1), 1000)
    // Return any clear
    return () => clearInterval(interval)
  }, [started])

  const toggleStart = () => setStarted((prevStart) => !prevStart)
  return { secs, toggleStart }
}

const TimerHooksComponent = () => {
  const { secs, toggleStart } = useTimer()
  return (
    <View>
      <Text>Time elapsed: {secs} secs</Text>
      <Button title="Toggle" onPress={() => toggleStart()} />
    </View>
  )
}
