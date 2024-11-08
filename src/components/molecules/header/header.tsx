import React, {FC} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

import {Arrow, Close} from '@assets/index';
import AppText from '@atoms/appText/appText';
import AppButton from '@molecules/appButton/appButton';
import {colors} from '@utils/colors';

export interface HeaderIprops {
  leftElement?: {
    type: 'back' | 'custom' | 'hide';
    onPress?: () => void;
    customElement?: JSX.Element;
  };
  title: string;
  titleColor?: string;
  backArrowColor?: string;
  rightElement?: {
    type: 'cancel' | 'custom' | 'hide';
    onPress?: () => void;
    customElement?: JSX.Element;
  };
  containerStyle?: ViewStyle;
}

const Header: FC<HeaderIprops> = ({
  leftElement = {
    type: 'back',
  },
  title,
  titleColor,
  backArrowColor,
  rightElement = {
    type: 'hide',
    onPress: () => {
      return;
    },
  },
  containerStyle,
}) => {
  const navigation = useNavigation();

  const leftElementRenderingHandler = () => {
    if (leftElement?.type !== 'hide') {
      if (leftElement?.type === 'back') {
        return (
          <AppButton
            hitSlop={{
              bottom: moderateScale(5),
              left: moderateScale(5),
              right: moderateScale(5),
              top: moderateScale(5),
            }}
            inline
            style={styles.zindex}
            onPress={leftElement?.onPress ?? navigation.goBack}>
            <Arrow
              stroke={backArrowColor ?? colors.baseDark}
              transform={[{rotate: '0deg'}]}
            />
          </AppButton>
        );
      } else {
        return (
          <AppButton
            onPress={() => {
              leftElement.onPress?.();
            }}
            inlineNoUnderLine>
            {leftElement?.customElement}
          </AppButton>
        );
      }
    } else {
      return <View style={styles.empty} />;
    }
  };

  const rightElementRenderingHandler = () => {
    if (rightElement?.type !== 'hide') {
      if (rightElement.type === 'cancel') {
        return (
          <AppButton
            inline
            style={styles.zindex}
            onPress={rightElement.onPress as () => void}>
            <Close color={colors.baseDark} />
          </AppButton>
        );
      } else {
        return (
          <AppButton
            style={styles.zindex}
            onPress={() => {
              rightElement.onPress?.();
            }}
            inlineNoUnderLine>
            {rightElement.customElement}
          </AppButton>
        );
      }
    } else {
      return <View style={styles.empty} />;
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {leftElementRenderingHandler()}

      <AppText style={[styles.title, titleColor ? {color: titleColor} : null]}>
        {title}
      </AppText>

      {rightElementRenderingHandler()}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: moderateVerticalScale(64),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: moderateScale(18),
    fontWeight: '600',
    lineHeight: moderateVerticalScale(22),
    color: colors.baseDark,
  },
  empty: {
    flex: 0.075,
  },
  zindex: {
    zIndex: 3,
  },
});
