import React, {FC, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {moderateVerticalScale} from 'react-native-size-matters';

import {Add, RoundedExpense, RoundedIncome} from '@assets/index';
import AppButton from '@molecules/appButton/appButton';
import {screenNames} from '@navigation/screenNames';
import {colors} from '@utils/colors';
import {TUseNavigation} from '@utils/types';

interface IProps {
  // eslint-disable-next-line no-unused-vars
  visibility?: (isVisible: boolean) => void;
}

const AddModal: FC<IProps> = ({visibility}) => {
  const navigation = useNavigation<TUseNavigation>();

  const [isVisible, setIsVisible] = useState(false);

  const animatedRotation = useRef(new Animated.Value(0)).current;
  const animatedVisibility = useRef(new Animated.Value(0)).current;
  const animatedButtonsTranslate = useRef(new Animated.Value(0)).current;
  const animatedIncomeOrExpensesTranslate = useRef(
    new Animated.Value(0),
  ).current;
  const animatedBackgroundColor = useRef(new Animated.Value(0)).current;

  const rotateInterpolate = animatedRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  const interpolatedBackgroundColor = animatedBackgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', colors.violet10],
  });

  const handleTap = () => {
    visibility?.(!isVisible);

    const toValue = isVisible ? 0 : 1;
    const buttonsTranslateToValue = isVisible ? 0 : -74;
    const incomeOrExpensesTranslateToValue = isVisible ? 0 : 74;

    const duration = 500;

    Animated.parallel([
      Animated.timing(animatedRotation, {
        toValue,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(animatedVisibility, {
        toValue,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(animatedButtonsTranslate, {
        toValue: buttonsTranslateToValue,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(animatedIncomeOrExpensesTranslate, {
        toValue: incomeOrExpensesTranslateToValue,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(animatedBackgroundColor, {
        toValue,
        duration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsVisible(!isVisible);
    });
  };

  return (
    <>
      <AppButton
        inlineNoUnderLine
        style={[styles.btnsContainer, styles.addBtn]}
        onPress={handleTap}>
        <Animated.View
          style={[
            styles.addIcon,
            {
              transform: [{rotate: rotateInterpolate}],
            },
          ]}>
          <Add />
        </Animated.View>
      </AppButton>

      <Animated.View
        style={[styles.overlay, {backgroundColor: interpolatedBackgroundColor}]}
      />
      <Animated.View
        style={[
          styles.btnsContainer,
          {
            opacity: animatedVisibility,
            transform: [{translateY: animatedButtonsTranslate}],
          },
        ]}
        pointerEvents={isVisible ? 'auto' : 'none'}>
        <View style={styles.incomeExpenseContainer}>
          <Animated.View
            style={{
              transform: [
                {
                  translateX: animatedButtonsTranslate,
                },
              ],
            }}>
            <AppButton
              inlineNoUnderLine
              onPress={() => {
                handleTap();
                navigation.navigate(screenNames.AddIncomeExpenseTransaction, {
                  name: 'Income',
                  backgroundColor: colors.green,
                });
              }}>
              <RoundedIncome />
            </AppButton>
          </Animated.View>
          <Animated.View
            style={{
              transform: [
                {
                  translateX: animatedIncomeOrExpensesTranslate,
                },
              ],
            }}>
            <AppButton
              inlineNoUnderLine
              onPress={() => {
                handleTap();
                navigation.navigate(screenNames.AddIncomeExpenseTransaction, {
                  name: 'Expense',
                  backgroundColor: colors.red100,
                });
              }}>
              <RoundedExpense />
            </AppButton>
          </Animated.View>
        </View>
      </Animated.View>
    </>
  );
};

export default AddModal;

const styles = StyleSheet.create({
  addBtn: {
    zIndex: 3,
  },
  addIcon: {
    position: 'absolute',
  },

  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },

  btnsContainer: {
    position: 'absolute',
    bottom: moderateVerticalScale(74),
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 3,
  },

  incomeExpenseContainer: {
    flexDirection: 'row',
    top: moderateVerticalScale(40),
  },
});
