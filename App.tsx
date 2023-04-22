import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import List from './src/screens/List'

const App = () => {
  return (
    <GestureHandlerRootView  style={{ flex: 1 }}>
      <List />
    </GestureHandlerRootView>
  )
}

export default App