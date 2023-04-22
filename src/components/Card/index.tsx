import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IWorks from '../../intefaces/IWorks';
import styles from './styles';
import { deviceHeight } from '../../constants/device';

export interface ICard {
  data: IWorks;
}

export const MARGIN_BOTTOM = 12
export const CARD_HEIGHT =  deviceHeight * 0.1 + MARGIN_BOTTOM ;

const Card = ({data}: ICard) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{data.title}</Text>
    </View>
  );
};

export default Card;
