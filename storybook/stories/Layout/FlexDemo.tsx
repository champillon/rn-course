import { storiesOf } from '@storybook/react-native'
import React, { PropsWithChildren } from 'react'
import { Text, View, StyleSheet } from 'react-native'
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
