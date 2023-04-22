import {StyleSheet, Text, TouchableOpacityBase, View} from 'react-native';
import React, {useState} from 'react';
import Animated, {
  SharedValue,
  runOnJS,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedReaction,
} from 'react-native-reanimated';
import Card, {CARD_HEIGHT, ICard} from '../Card';
import IWorks from '../../intefaces/IWorks';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import styles from './styles';

type Props = {
  data: IWorks;
  cardsPostition: SharedValue<number[]>;
  scrollY: SharedValue<number>;
  cardsCount: number;
};

// As animacoes são executadas em threads diferentes do react native

const MovableCard = ({data, cardsCount, cardsPostition, scrollY}: Props) => {
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(cardsPostition.value[data.id] * CARD_HEIGHT);

  function objectMove(postions: number[], from: number, to: number) {
    'worklet';
    const newPostions = Object.assign({}, postions);
    for (const id in newPostions) {
      if (postions[id] === from) {
        newPostions[id] = to;
      }

      if (postions[id] === to) {
        newPostions[id] = from;
      }
    }

    return newPostions;
  }

  // monitorando a mudanca da posicao do item para executar a animacao
  useAnimatedReaction(
    () => cardsPostition.value[data.id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          top.value = withSpring(currentPosition * CARD_HEIGHT);
        }
      }
    },
    [moving]
  );

  const longPressGesture = Gesture.LongPress()
    .onStart(() => {
      runOnJS(setMoving)(true);
    })
    .minDuration(200);

  const panGesture = Gesture.Pan()
    .manualActivation(true)
    .onTouchesMove((_, state) => {
      moving ? state.activate() : state.fail();
    })
    .onUpdate(event => {
      // posicao do elemente + posicao do scroll
      const positionY = event.absoluteY + scrollY.value;
      top.value = positionY - CARD_HEIGHT;

      const startPostionList = 0;
      const finalPositionList = cardsCount - 1;
      const currentPostion = Math.floor(positionY / CARD_HEIGHT);

      ('worklet');
      const newPostion = Math.max(
        startPostionList,
        Math.min(currentPostion, finalPositionList),
      );

      if (newPostion !== cardsPostition.value[data.id]) {
        cardsPostition.value = objectMove(
          cardsPostition.value,
          cardsPostition.value[data.id],
          newPostion,
        );
      }
    })
    .onFinalize(() => {
      const newPosition = cardsPostition.value[data.id] * CARD_HEIGHT;
      top.value = withSpring(newPosition)
    
      runOnJS(setMoving)(false)
    
    }).simultaneousWithExternalGesture(longPressGesture);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      top: top.value - CARD_HEIGHT,
      opacity: withSpring(moving ? 1 : 0.4),
      zIndex: moving ? 1 : 0,
    };
  }, [moving]);

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      {/* Chamando 2 funcs no gestureDetector */}
      {/* o metodo de longPress ira ativar o metodo de arrastar por isso usar o .Race */}
      <GestureDetector gesture={Gesture.Race(panGesture, longPressGesture)}>
        <Card data={data} />
      </GestureDetector>
    </Animated.View>
  );
};

export default MovableCard;
