import { storiesOf } from '@storybook/react-native'
import React, { PropsWithChildren } from 'react'
import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native'
import CenterView from '../CenterView'

storiesOf('Layout', module)
  .addDecorator((getStory) => <CenterView>{getStory() as JSX.Element}</CenterView>)
  .add('Flex', () => {
    const styles = StyleSheet.create({
      parent: {
        backgroundColor: 'silver',
        opacity: 0.5,
        flexDirection: 'column',
      },
      child: {
        borderWidth: 1,
        borderColor: 'gray',
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
      },
    })
    const ParentView = ({ children }: PropsWithChildren<unknown>) => <View style={styles.parent}>{children}</View>
    const ChildView = ({ children }: PropsWithChildren<unknown>) => <View style={styles.child}>{children}</View>
    return (
      <ParentView>
        <ChildView>
          <Text>1</Text>
        </ChildView>
        <ChildView>
          <Text>2</Text>
        </ChildView>
        <ChildView>
          <Text>3</Text>
        </ChildView>
      </ParentView>
    )
  })
  .add('Flex grow and shrink', () => {
    const styles = StyleSheet.create({
      parent: {
        backgroundColor: 'silver',
        opacity: 0.5,
        flexDirection: 'column',
        alignItems: 'baseline',
        height: 600,
        width: 200,
        justifyContent: 'flex-start',
      },
      child: {
        borderWidth: 1,
        borderColor: 'gray',
        width: 100,
        // height: 100,
        flex: 1,
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
      },
    })
    const ParentView = ({ children }: PropsWithChildren<unknown>) => <View style={styles.parent}>{children}</View>
    const ChildView = ({ children }: PropsWithChildren<unknown>) => <View style={styles.child}>{children}</View>
    const SpecialChild = ({ children }: PropsWithChildren<unknown>) => (
      <View style={{ ...styles.child, flexGrow: 2 }}>{children}</View>
    )
    return (
      <ParentView>
        <ChildView>
          <Text>1</Text>
        </ChildView>
        <SpecialChild>
          <Text>2</Text>
        </SpecialChild>
        <ChildView>
          <Text>3</Text>
        </ChildView>
      </ParentView>
    )
  })
  .add('Baseline', () => {
    return (
      <View
        style={{
          paddingTop: 40,
          flexDirection: 'row',
          alignItems: 'baseline',
          borderColor: 'black',
          borderWidth: 1,
        }}
      >
        <Text style={{ fontSize: 24 }}>M</Text>
        <Text style={{ fontSize: 20 }}>M</Text>
        <Text style={{ fontSize: 16 }}>M</Text>
        <Text style={{ fontSize: 12 }}>M</Text>
        <Text style={{ fontSize: 8 }}>M</Text>
      </View>
    )
  })
