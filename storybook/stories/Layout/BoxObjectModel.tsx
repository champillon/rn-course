import { storiesOf } from '@storybook/react-native'
import React, { PropsWithChildren } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import CenterView from '../CenterView'

storiesOf('Layout', module)
  .addDecorator((getStory) => <CenterView>{getStory() as JSX.Element}</CenterView>)
  .add('BoxObjectModel', () => {
    const styles = StyleSheet.create({
      parent: {
        backgroundColor: 'silver',
        opacity: 0.5,
      },
      child: {
        backgroundColor: 'blue',
        margin: 20,
        borderWidth: 30,
        borderColor: 'green',
        padding: 30,
        paddingLeft: 10,
        width: 300,
        height: 500,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      },
      content: {
        color: 'red',
        fontSize: 24,
        borderColor: 'black',
        borderWidth: 1,
      },
    })
    const Content = () => <Text style={styles.content}>I am Content</Text>
    const ParentView = ({ children }: PropsWithChildren<unknown>) => <View style={styles.parent}>{children}</View>
    const ChildView = ({ children }: PropsWithChildren<unknown>) => <View style={styles.child}>{children}</View>
    return (
      <ParentView>
        <ChildView>
          <Content />
        </ChildView>
      </ParentView>
    )
  })
