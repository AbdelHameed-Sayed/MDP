import React, {FC, memo, useCallback, useEffect, useRef, useState} from 'react';
import {Animated, BackHandler, TextStyle, View, ViewStyle} from 'react-native';

import {FlatList} from 'react-native-gesture-handler';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

import {CheckArrow, DropDownArrow} from '@assets/index';
import AppText from '@atoms/appText/appText';
import AppButton, {IAppButtonProps} from '@molecules/appButton/appButton';
import {colors} from '@utils/colors';

import styles from './appDropDown.style';

interface IListEmptyProps {
  emptyText?: string;
}

type TLabelValueObject = {
  label: string;
  value: string;
  icon?: React.JSX.Element;
};
export interface IAppDropDownProps extends IListEmptyProps {
  data: TLabelValueObject[];
  initialValue?: TLabelValueObject;
  placeholder?: string;
  style?: ViewStyle;
  flatListStyle?: ViewStyle;
  textStyle?: TextStyle;
  openListTextStyle?: TextStyle;
  placeholderStyle?: TextStyle;
  arrowIcon?: React.JSX.Element;
  // eslint-disable-next-line no-unused-vars
  onChangeValue?: (value: TLabelValueObject) => void;
  // eslint-disable-next-line no-unused-vars
  getCurrentValue?: (value: TLabelValueObject | null) => void;
  arrowColor?: string;
  openDirection?: 'top' | 'bottom';
  initialNumToRender?: number;
  extremeStyle?: boolean;
  flatListItemsStyle?: TextStyle;
  containerStyle?: ViewStyle;
  passedValue?: TLabelValueObject;
  onPress?: () => void;
  closeOnBackPressed?: boolean;
  focus?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  hideData?: boolean;
  contentContainerStyle?: ViewStyle;
  disabled?: boolean;
  reset?: boolean;
  checkedBackgroundColor?: string;
  CheckArrowColor?: string;
  checkType?: 'backgroundColor' | 'correctArrow';
}

const ItemSeparatorComponent = () => {
  return <View style={styles.itemSeparator} />;
};

const ListEmptyComponent: FC<IListEmptyProps> = ({emptyText}) => {
  return (
    <View style={styles.empty}>
      <AppText style={[styles.textStyle, styles.placeholderStyle]}>
        {emptyText}
      </AppText>
    </View>
  );
};

const AppDropDown: FC<IAppDropDownProps> = ({
  data,
  initialValue,
  placeholder,
  style,
  flatListStyle,
  textStyle,
  openListTextStyle,
  placeholderStyle,
  arrowColor,
  arrowIcon,
  onChangeValue,
  getCurrentValue,
  openDirection = 'bottom',
  initialNumToRender,
  extremeStyle = false,
  flatListItemsStyle,
  containerStyle,
  passedValue,
  onPress,
  closeOnBackPressed = true,
  focus,
  onFocus,
  onBlur,
  emptyText = 'Sorry, its empty!',
  hideData = false,
  contentContainerStyle,
  disabled = false,
  reset,
  checkedBackgroundColor,
  CheckArrowColor,
  checkType = 'correctArrow',
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<TLabelValueObject | null>(
    initialValue ?? null,
  );

  const AnimatedAppButton: FC<Animated.AnimatedProps<IAppButtonProps>> =
    Animated.createAnimatedComponent(AppButton);

  const animatedRotation = useRef(new Animated.Value(0));

  const handleAnimation = useCallback(() => {
    const toValue = open ? 0 : 1;

    !open && setOpen(true);
    Animated.timing(animatedRotation.current, {
      toValue: toValue,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      if (open) {
        setOpen(false);
        onBlur?.();
      }
    });
  }, [onBlur, open]);

  const rotateInterpolate = animatedRotation.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const borderRadiusInterpolate = animatedRotation.current.interpolate({
    inputRange: [0, 1],
    outputRange: [40, 0],
  });

  useEffect(() => {
    focus && !open && handleAnimation();
  }, [focus, handleAnimation, open]);

  useEffect(() => {
    if (open) {
      onFocus?.();
    }
  }, [onFocus, open]);

  useEffect(() => {
    getCurrentValue?.(value);
  }, [getCurrentValue, value]);

  useEffect(() => {
    if (reset) {
      setValue(null);
    }
  }, [reset]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        closeOnBackPressed && open && setOpen(false);
        return true;
      },
    );

    return () => backHandler.remove();
  }, [closeOnBackPressed, open]);

  useEffect(() => {
    if (passedValue) {
      setValue(passedValue);
    }
  }, [passedValue]);

  return (
    <View style={[styles.container, containerStyle]}>
      <AnimatedAppButton
        disabled={disabled}
        style={[
          styles.buttonContainer,
          extremeStyle
            ? styles.buttonContainerExtreme
            : styles.buttonContainerRegular,
          open &&
            extremeStyle &&
            (openDirection === 'bottom'
              ? {
                  borderBottomStartRadius: borderRadiusInterpolate,
                  borderBottomEndRadius: borderRadiusInterpolate,
                }
              : {
                  borderTopStartRadius: borderRadiusInterpolate,
                  borderTopEndRadius: borderRadiusInterpolate,
                }),
          style,
        ]}
        onPress={() => {
          handleAnimation();
          onPress?.();
        }}
        inlineNoUnderLine>
        <AppText key={value?.label}>
          <View style={styles.textContainerStyle}>
            {value?.icon}
            <AppText
              style={[
                styles.textStyle,
                !value &&
                  !initialValue && {
                    ...styles.placeholderStyle,
                    ...placeholderStyle,
                  },
                textStyle,
              ]}>
              {value?.label ?? initialValue?.label ?? placeholder}
            </AppText>
          </View>
        </AppText>
        <Animated.View
          style={[
            styles.arrowIconContainerStyle,
            !hideData && {transform: [{rotate: rotateInterpolate}]},
          ]}>
          {arrowIcon ?? <DropDownArrow stroke={arrowColor ?? colors.violet} />}
        </Animated.View>
      </AnimatedAppButton>

      <Animated.View
        style={[
          styles.flatListStyle,
          open && !hideData ? styles.displayFlex : styles.displayNone,
          extremeStyle
            ? styles.flatListStyleExtreme
            : styles.flatListStyleRegular,
          openDirection === 'top'
            ? {
                bottom: extremeStyle
                  ? moderateVerticalScale(41)
                  : moderateVerticalScale(60),
              }
            : {
                top: extremeStyle
                  ? moderateVerticalScale(41)
                  : moderateVerticalScale(60),
              },
          {
            opacity: animatedRotation.current,
          },
          flatListStyle,
        ]}>
        <FlatList
          contentContainerStyle={[
            styles.contentContainerStyle,
            contentContainerStyle,
          ]}
          nestedScrollEnabled
          data={data ?? []}
          initialNumToRender={initialNumToRender}
          ListEmptyComponent={<ListEmptyComponent emptyText={emptyText} />}
          renderItem={({item, index}) => {
            return (
              <View style={styles.innerContentContainer}>
                <AppButton
                  key={index.toString() + item.label}
                  title={item.label}
                  inlineNoUnderLine
                  style={[
                    styles.flatListItems,
                    {
                      paddingVertical: extremeStyle
                        ? moderateScale(3)
                        : moderateScale(10),
                    },
                    item.value === value?.value && {
                      backgroundColor:
                        checkType === 'backgroundColor'
                          ? checkedBackgroundColor ?? colors.yellow
                          : undefined,
                    },
                    flatListItemsStyle,
                  ]}
                  titleStyle={[styles.textStyle, openListTextStyle]}
                  onPress={() => {
                    onChangeValue?.(item);
                    setValue(item);
                    handleAnimation();
                  }}>
                  {item.icon}
                </AppButton>
                {item.value === value?.value && checkType === 'correctArrow' ? (
                  <CheckArrow
                    stroke={CheckArrowColor ?? colors.green}
                    style={[styles.checkArrow]}
                  />
                ) : null}
              </View>
            );
          }}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      </Animated.View>
    </View>
  );
};

export default memo(AppDropDown);
