import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import styles from './styles';
import Card, {CARD_HEIGHT} from '../../components/Card';
import works from '../../utils/works';
import Header from '../../components/Header';
import MovableCard from '../../components/MovableCard';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

const List = () => {
  const scrollY = useSharedValue(0);
  const cardsPostition = useSharedValue(listToObject(works));

  const handleScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  function listToObject(list: typeof works) {
    const listOfcards = Object.values(list);

    const object: any = {};

    listOfcards.forEach((card, index) => {
      object[card.id] = index;
    });

    return object;
  }

  return (
    <View style={styles.page}>
      <Header />
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.listContainer}
        onScroll={handleScroll}
        // trabalhando com as dimenssoes dentro do limete do scroll
        contentContainerStyle={{height: works.length * CARD_HEIGHT}}
        // pega a informaçao do envento mais rapido
        scrollEventThrottle={16}>
        {works.map(item => (
          <MovableCard
            data={item}
            key={item.id}
            scrollY={scrollY}
            cardsPostition={cardsPostition}
            cardsCount={works.length}
          />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default List;
