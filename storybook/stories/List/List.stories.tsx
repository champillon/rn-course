import { storiesOf } from '@storybook/react-native'
import React from 'react'
import { FlatList, View, Text, ListRenderItem, SectionList, StyleSheet } from 'react-native'
import dayjs from 'dayjs'
import CenterView from '../CenterView'
import Constants from 'expo-constants'
import { arrayOfConsequtiveNumbers } from '../../../Helpers/Utils'

storiesOf('FlatList', module)
  .addDecorator((getStory) => <CenterView>{getStory() as JSX.Element}</CenterView>)
  .add('Simple', () => {
    type Item = {
      id: number
      name: string
    }
    const items = arrayOfConsequtiveNumbers(1000).map(
      (i: number): Item => ({
        id: i,
        name: `Random person ${i}`,
      }),
    )
    const renderItem: ListRenderItem<Item> = ({ item }) => {
      return (
        <View>
          <Text>Their name is {item.name}</Text>
        </View>
      )
    }
    return <FlatList data={items} renderItem={renderItem} />
  })
  .add('SectionList', () => {
    const DATA = [
      {
        title: 'Main dishes',
        data: ['Pizza', 'Burger', 'Risotto'],
      },
      {
        title: 'Sides',
        data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
      },
      {
        title: 'Drinks',
        data: ['Water', 'Coke', 'Beer'],
      },
      {
        title: 'Desserts',
        data: ['Cheese Cake', 'Ice Cream'],
      },
    ]

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        marginHorizontal: 16,
      },
      item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
      },
      header: {
        fontSize: 32,
        backgroundColor: '#fff',
      },
      title: {
        fontSize: 24,
      },
    })
    type ItemProps = {
      title: string
    }
    const Item = ({ title }: ItemProps) => (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    )

    return (
      <View style={styles.container}>
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={(d) => <Item title={d.item} />}
          renderSectionHeader={({ section: { title } }) => <Text style={styles.header}>{title}</Text>}
        />
      </View>
    )
  })
  .add('Do and dont', () => {
    // Don't calculate on renderItems
    type Task = {
      id: string
      title: string
      dueDate: Date
    }
    const tasks: Task[] = [
      { id: 'task1', title: 'Do the dish', dueDate: dayjs().add(1, 'day').toDate() },
      { id: 'task2', title: 'Clean the room', dueDate: dayjs().add(2, 'day').toDate() },
      { id: 'task3', title: 'Shopping grocery', dueDate: dayjs().add(3, 'day').toDate() },
    ]
    // Don't: Computation in render function

    const renderItemDont: ListRenderItem<Task> = ({ item }) => {
      // Computation
      const durationHours = Math.round(dayjs(item.dueDate).diff(dayjs()) / 1000 / 60 / 60)

      return (
        <View>
          <View>
            <Text>Do: {item.title}</Text>
          </View>
          <View>
            <Text>Within: {durationHours} hour(s)</Text>
          </View>
        </View>
      )
    }
    const dont = () => <FlatList data={tasks} renderItem={renderItemDont} />

    // Do: Precompute
    type PrecomputedTask = {
      title: string
      durationHours: number
    }
    const precomputedTasks: PrecomputedTask[] = tasks.map((task) => ({
      title: task.title,
      durationHours: Math.round(dayjs(task.dueDate).diff(dayjs()) / 1000 / 60 / 60),
    }))
    const renderItemsDo: ListRenderItem<PrecomputedTask> = ({ item }) => {
      return (
        <View>
          <View>
            <Text>Do: {item.title}</Text>
          </View>
          <View>
            <Text>Within: {item.durationHours} hour(s)</Text>
          </View>
        </View>
      )
    }
    const pleaseDo = () => <FlatList data={precomputedTasks} renderItem={renderItemsDo} />
    return (
      <View>
        {dont()}
        {pleaseDo()}
      </View>
    )
  })
