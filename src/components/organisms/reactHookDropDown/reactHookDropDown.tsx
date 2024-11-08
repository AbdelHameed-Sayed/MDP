import React, {FC, memo} from 'react';
import {StyleSheet, View} from 'react-native';

import {Control, Controller} from 'react-hook-form';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

import AppText from '@atoms/appText/appText';
import AppDropDown, {
  IAppDropDownProps,
} from '@organisms/appDropDown/appDropDown';
import {colors} from '@utils/colors';
import fonts from '@utils/fonts';

interface IProps extends IAppDropDownProps {
  control: Control<any, any>;
  name: string;
  error?: string;
}

const ReactHookDropDown: FC<IProps> = ({control, name, error, ...props}) => {
  return (
    <Controller
      shouldUnregister
      control={control}
      rules={{
        maxLength: 100,
      }}
      render={({field: {onChange, value, onBlur}}) => {
        return (
          <View>
            <AppDropDown
              onChangeValue={onChange}
              passedValue={value}
              onBlur={onBlur}
              {...props}
            />
            {error && <AppText style={styles.error}>{error}</AppText>}
          </View>
        );
      }}
      name={name}
    />
  );
};

export default memo(ReactHookDropDown);

const styles = StyleSheet.create({
  error: {
    color: colors.yellow,
    marginHorizontal: moderateScale(9),
    marginTop: moderateVerticalScale(1),
    fontSize: moderateScale(14),
    fontFamily: fonts.normal,
    textAlign: 'left',
  },
});
