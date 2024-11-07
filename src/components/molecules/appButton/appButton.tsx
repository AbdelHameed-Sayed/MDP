import React, {FC, forwardRef, ReactNode} from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
} from 'react-native';

import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

import AppText from '@atoms/appText/appText';
import {colors} from '@utils/colors';

export interface IAppButtonProps extends PressableProps {
  onPress: () => void;
  title?: string;
  style?: StyleProp<PressableProps & TextStyle>;
  titleStyle?: StyleProp<PressableProps & TextStyle>;
  inline?: boolean;
  inlineNoUnderLine?: boolean;
  borderedTransparent?: boolean;
  children?: ReactNode;
}

const AppButton: FC<IAppButtonProps> = forwardRef<View, IAppButtonProps>(
  (
    {
      onPress,
      title,
      style,
      titleStyle,
      inline,
      inlineNoUnderLine,
      borderedTransparent,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Pressable
        ref={ref}
        onPress={onPress}
        style={({pressed}) => [
          {
            opacity: pressed ? 0.75 : 1,
          },
          inline || inlineNoUnderLine ? null : styles.button,
          borderedTransparent && [styles.button, styles.borderedTransparent],
          props.disabled && styles.disabled,
          style,
        ]}
        {...props}>
        {title ? (
          <AppText
            style={[
              inline ? styles.inlineText : styles.text,
              (inlineNoUnderLine || borderedTransparent) &&
                styles.inlineNoUnderlineText,
              titleStyle,
            ]}>
            {title}
          </AppText>
        ) : null}
        {children}
      </Pressable>
    );
  },
);

export default AppButton;

const styles = StyleSheet.create({
  button: {
    height: moderateVerticalScale(56),
    borderRadius: moderateScale(16),
    backgroundColor: colors.violet,
    justifyContent: 'center',
    alignItems: 'center',
  },

  borderedTransparent: {
    flexDirection: 'row-reverse',
    backgroundColor: 'transparent',
    borderWidth: moderateScale(1),
    borderColor: colors.baseLight60,
  },

  disabled: {
    opacity: 0.5,
  },

  text: {
    color: colors.white2,
    fontSize: moderateScale(18),
    fontWeight: '600',
  },

  inlineText: {
    color: colors.violet,
    textDecorationLine: 'underline',
  },

  inlineNoUnderlineText: {
    color: colors.violet,
  },
});
