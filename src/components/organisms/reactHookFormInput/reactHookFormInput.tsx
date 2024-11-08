import React, {RefObject, forwardRef, memo} from 'react';
import {StyleSheet, TextInput, View, TextInputProps} from 'react-native';

import {type Control, Controller} from 'react-hook-form';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

import AppText from '@atoms/appText/appText';
import {colors} from '@utils/colors';
import fonts from '@utils/fonts';

interface IProps extends TextInputProps {
  placeholder: string;
  name: string;
  control: Control<any, any>;
  error: string | undefined;
  nextInputRef?: RefObject<TextInput>;
  ref?: React.ForwardedRef<TextInput>;
  forceLowerCase?: boolean;
  trimValueCase?: boolean;
  inline?: boolean;
  numeric?: boolean;
  currency?: string;
}

const ReactHookFormInput = forwardRef<TextInput, IProps>(
  function ReactHookFormInputWithForwardRef(
    {
      placeholder,
      name,
      control,
      error,
      style,
      nextInputRef,
      forceLowerCase,
      trimValueCase,
      inline,
      numeric,
      currency,
      ...props
    },
    ref,
  ) {
    const textValueHandler = (
      text: string,
      forceLowerCaseTheValue = false,
      trimValueCaseTheValue = false,
      number = false,
    ) => {
      if (forceLowerCaseTheValue && !trimValueCaseTheValue) {
        return text.toLowerCase();
      } else if (!forceLowerCaseTheValue && trimValueCaseTheValue) {
        return text.trim();
      } else if (forceLowerCaseTheValue && trimValueCaseTheValue) {
        return text.toLowerCase().trim();
      } else if (number) {
        if (!text || text === '0') {
          return '';
        }
        return text.replace(/[^\d.]|(\..*)\./g, '');
      } else {
        return text;
      }
    };

    return (
      <View style={style}>
        <Controller
          control={control}
          render={({field: {onBlur, onChange, value}}) => {
            return (
              <TextInput
                style={inline ? styles.inline : styles.textInput}
                onBlur={onBlur}
                onChangeText={text =>
                  onChange(
                    textValueHandler(
                      text,
                      forceLowerCase,
                      trimValueCase,
                      numeric,
                    ),
                  )
                }
                value={
                  currency && value ? `${currency} ${String(value)}` : value
                }
                placeholderTextColor={inline ? colors.white2 : colors.baseLight}
                ref={ref}
                onSubmitEditing={() => nextInputRef?.current?.focus()}
                returnKeyType="next"
                placeholder={`${currency ?? ''} ${placeholder}`}
                {...props}
              />
            );
          }}
          name={name}
        />
        {error && <AppText style={styles.error}>{error}</AppText>}
      </View>
    );
  },
);

export default memo(ReactHookFormInput);

const styles = StyleSheet.create({
  textInput: {
    color: colors.baseDark,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateVerticalScale(8),
    height: moderateVerticalScale(56),
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(16),
    borderColor: colors.baseLight60,
    fontSize: moderateScale(16),
    fontWeight: '400',
    lineHeight: moderateVerticalScale(18),
  },
  inline: {
    color: colors.white2,
    fontSize: moderateScale(64),
    fontWeight: '600',
  },

  error: {
    color: colors.yellow,
    marginHorizontal: moderateScale(9),
    marginTop: moderateVerticalScale(1),
    fontSize: moderateScale(14),
    fontFamily: fonts.normal,
    textAlign: 'left',
  },
});
