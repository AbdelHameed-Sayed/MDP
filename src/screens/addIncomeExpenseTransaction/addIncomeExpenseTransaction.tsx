import React, {useEffect, useRef, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {yupResolver} from '@hookform/resolvers/yup';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

import AppText from '@atoms/appText/appText';
import AppCalendar from '@modals/appCalendar/appCalendar';
import AppButton from '@molecules/appButton/appButton';
import Header from '@molecules/header/header';
import {screenNames} from '@navigation/screenNames';
import ReactHookDropDown from '@organisms/reactHookDropDown/reactHookDropDown';
import ReactHookFormInput from '@organisms/reactHookFormInput/reactHookFormInput';
import {expenseCategoriesData, incomeCategoriesData} from '@utils/categories';
import {colors} from '@utils/colors';
import {isIOS} from '@utils/helper';
import {expenseIncomeSchema} from '@utils/schema';
import {storeUserTransactionsData} from '@utils/secureStorage';
import {
  IScreenParams,
  TUseNavigation,
  TUserTransactionData,
} from '@utils/types';

const AddIncomeExpenseTransaction = () => {
  const navigation = useNavigation<TUseNavigation>();

  const {params} = useRoute<RouteProp<IScreenParams, 'IncomeExpenseParams'>>();

  const amountRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);

  const [shouldOpenCategoryRef, setShouldOpenCategoryRef] = useState(false);

  const [openCalender, setOpenCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors, isValid},
  } = useForm<TUserTransactionData>({
    resolver: yupResolver(expenseIncomeSchema()),
    mode: 'all',
    reValidateMode: 'onChange',
    shouldUseNativeValidation: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      amountRef.current?.focus();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const onSubmit = (values: TUserTransactionData) => {
    delete values.category.icon;
    storeUserTransactionsData({
      ...values,
      type: params.name,
      currency: 'EGP',
    }).finally(() => {
      navigation.navigate(screenNames.Transactions);
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[styles.container, {backgroundColor: params.backgroundColor}]}>
        <View style={[styles.headerContainer]}>
          <Header
            title={params.name}
            titleColor={colors.white}
            backArrowColor={colors.white}
          />
        </View>

        <View style={styles.lowerOuterContainer}>
          <KeyboardAvoidingView
            behavior={isIOS() ? 'position' : 'height'}
            keyboardVerticalOffset={20}>
            <View style={styles.amountContainer}>
              <AppText style={styles.amountText}>How much?</AppText>
              <ReactHookFormInput
                ref={amountRef}
                inline
                style={styles.amountInput}
                name={'amount'}
                placeholder={'0'}
                control={control}
                error={errors.amount?.message}
                keyboardType="numeric"
                currency={'EGP'}
                numeric
                maxLength={9}
                onSubmitEditing={() => {
                  setShouldOpenCategoryRef(true);
                }}
                onEndEditing={() => {
                  if (isIOS()) {
                    setShouldOpenCategoryRef(true);
                  }
                }}
              />
            </View>

            <View style={styles.lowerInputContainer}>
              <View style={styles.inputContainer}>
                <ReactHookDropDown
                  focus={shouldOpenCategoryRef}
                  control={control}
                  name="category"
                  data={
                    params.name === 'Expense'
                      ? expenseCategoriesData
                      : incomeCategoriesData
                  }
                  arrowColor={colors.baseLight}
                  placeholder={'Category'}
                  flatListStyle={styles.dropDownStyle}
                  onBlur={() => {
                    setShouldOpenCategoryRef(false);
                  }}
                  onChangeValue={val => {
                    setValue('category', val, {
                      shouldDirty: true,
                      shouldValidate: true,
                      shouldTouch: true,
                    });
                    descriptionRef.current?.focus();
                  }}
                  error={errors.category?.value?.message}
                />

                <ReactHookFormInput
                  ref={descriptionRef}
                  control={control}
                  name="description"
                  error={errors?.description?.message}
                  placeholder={'Description'}
                  onSubmitEditing={() => {
                    setOpenCalendar(true);
                  }}
                />

                <ReactHookDropDown
                  control={control}
                  name="date"
                  data={[]}
                  hideData
                  arrowColor={colors.baseLight}
                  placeholder={'Pick a date'}
                  passedValue={
                    selectedDate
                      ? {
                          label: selectedDate,
                          value: selectedDate,
                        }
                      : undefined
                  }
                  onPress={() => {
                    setOpenCalendar(true);
                  }}
                  error={errors.date?.message}
                />
              </View>
              <AppButton
                title={'Continue'}
                onPress={handleSubmit(onSubmit) as () => void}
                disabled={!isValid}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
        <AppCalendar
          visible={openCalender}
          setVisible={setOpenCalendar}
          onDaySelect={date => {
            setValue('date', date, {
              shouldDirty: true,
              shouldValidate: true,
              shouldTouch: true,
            });
            setSelectedDate(date);
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddIncomeExpenseTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    rowGap: moderateVerticalScale(8),
  },
  headerContainer: {
    marginHorizontal: moderateScale(16),
    zIndex: 1,
  },

  lowerOuterContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  amountContainer: {
    marginHorizontal: moderateScale(16),
    gap: moderateVerticalScale(3),
  },
  amountText: {
    color: colors.white2,
    fontSize: moderateScale(18),
    fontWeight: '600',
    opacity: 0.64,
  },
  amountInput: {
    marginBottom: moderateVerticalScale(16),
  },

  lowerInputContainer: {
    backgroundColor: colors.white,
    borderTopStartRadius: moderateScale(32),
    borderTopEndRadius: moderateScale(32),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateVerticalScale(24),
    gap: moderateScale(30),
  },

  inputContainer: {
    gap: moderateScale(16),
  },

  dropDownStyle: {
    maxHeight: moderateVerticalScale(100),
  },
});
