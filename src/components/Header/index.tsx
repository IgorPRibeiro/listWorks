import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import styles from './styles'

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>
    </View>
  )
}

export default Header

