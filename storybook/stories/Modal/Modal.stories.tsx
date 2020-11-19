import { storiesOf } from '@storybook/react-native'
import React, { useState } from 'react'
import { Modal, Button, View, ModalProps } from 'react-native'
import CenterView from '../CenterView'

const SimpleModal = (props: ModalProps) => {
  const [visible, setVisible] = useState(false)
  return (
    <View>
      <Modal visible={visible} {...props}>
        <View>
          <Button title="Close this modal" onPress={() => setVisible(false)}></Button>
        </View>
      </Modal>
      <Button title="Open" onPress={() => setVisible(true)} />
    </View>
  )
}

const VariousAnimationModals = (props: ModalProps) => {
  const [fadeVisible, setFadeVisible] = useState(false)
  const [slideVisible, setSlideVisible] = useState(false)
  return (
    <View>
      <Modal visible={fadeVisible} {...props} animationType="fade">
        <View>
          <Button title="Close this modal" onPress={() => setFadeVisible(false)}></Button>
        </View>
      </Modal>
      <Button title="Fade" onPress={() => setFadeVisible(true)} />
      <Modal visible={slideVisible} {...props} animationType="slide">
        <View>
          <Button title="Close this modal" onPress={() => setSlideVisible(false)}></Button>
        </View>
      </Modal>
      <Button title="Slide" onPress={() => setSlideVisible(true)} />
    </View>
  )
}

storiesOf('Modal', module)
  .addDecorator((getStory) => <CenterView>{getStory() as JSX.Element}</CenterView>)
  .add('Simple', () => <SimpleModal />)
  .add('Various Animation', () => <VariousAnimationModals />)

// Memory Caveat
