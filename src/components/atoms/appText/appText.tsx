import React, {FC} from 'react';
import {Text, StyleSheet, StyleProp, TextStyle, TextProps} from 'react-native';

import {moderateScale} from 'react-native-size-matters';

import {colors} from '@utils/colors';
import fonts from '@utils/fonts';

interface IProps extends TextProps {
  style?: StyleProp<TextStyle>;
}

const AppText: FC<IProps> = ({children, style, ...props}) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  text: {
    color: colors.baseDark,
    fontSize: moderateScale(16),
    fontFamily: fonts.semiBold,
    fontWeight: '500',
  },
});
