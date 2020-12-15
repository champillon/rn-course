import React, { useEffect } from 'react'
import { View, Text, Button, ActivityIndicator } from 'react-native'
import { observer } from 'mobx-react'
import { makeAutoObservable, runInAction } from 'mobx'

export enum LoadState {
  Init = 'init',
  Loading = 'loading',
  Loaded = 'loaded',
  Error = 'error',
}
type User = {
  name: string
}

export class UserStore {
  public loadState: LoadState = LoadState.Loading
  public users: User[] = []
  constructor() {
    makeAutoObservable(this)
  }

  async load(): Promise<void> {
    this.loadState = LoadState.Loading
    const response = await fetch('https://randomuser.me/api?results=10&nat=us')
    const textResponse = await response.text()
    runInAction(() => {
      this.users = JSON.parse(textResponse).results.map((result: any) => ({
        name: `${result.name.first} ${result.name.last}`,
      }))
      this.loadState = LoadState.Loaded
    })
  }
}

export const userStore = new UserStore()

const Component = observer(({ userStore }: { userStore: UserStore }) => {
  useEffect(() => {
    userStore.load()
  }, [])
  if (userStore.loadState === LoadState.Loading) {
    return (
      <View>
        <Text>Loading...</Text>
        <ActivityIndicator />
      </View>
    )
  }
  return (
    <View>
      {userStore.users.map((user, i) => {
        return (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>User: {user.name}</Text>
          </View>
        )
      })}
      <Button title="Reload" onPress={() => userStore.load()} />
    </View>
  )
})

export default function MobxView() {
  return <Component userStore={userStore} />
}
