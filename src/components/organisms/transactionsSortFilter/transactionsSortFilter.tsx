import React, {FC, memo, RefObject, useMemo, useState} from 'react';
import {View, ViewStyle} from 'react-native';

import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

import AppText from '@atoms/appText/appText';
import AppCalendar from '@modals/appCalendar/appCalendar';
import AppButton from '@molecules/appButton/appButton';
import {colors} from '@utils/colors';
import {TPressedButtonActions} from '@utils/types';

import styles from './transactionsSortFilter.style';

interface IBottomSheetViewFiltersProps {
  style?: ViewStyle;
  bottomSheetRef: RefObject<BottomSheetMethods>;
  setPressedButtons: React.Dispatch<
    React.SetStateAction<TPressedButtonActions>
  >;
  pressedButtons: TPressedButtonActions;
  onApplyPress?: () => void;
}

export const defaultPressedButtons: TPressedButtonActions = {
  filter: {income: false, expense: false, date: ''},
  sort: {newest: true, oldest: false, income: false, expense: false},
};

const TransactionsSortFilter: FC<IBottomSheetViewFiltersProps> = ({
  style,
  pressedButtons,
  setPressedButtons,
  bottomSheetRef,
  onApplyPress,
}) => {
  const [openCalender, setOpenCalendar] = useState(false);

  const disabledSortIncomeExpense = useMemo(() => {
    return (
      (pressedButtons.filter.income || pressedButtons.filter.expense) &&
      (!pressedButtons.filter.income || !pressedButtons.filter.expense)
    );
  }, [pressedButtons.filter.expense, pressedButtons.filter.income]);

  return (
    <View style={style}>
      <View style={styles.filterResetContainer}>
        <AppText style={styles.filter}>Filter Transaction </AppText>
        <AppButton
          style={styles.reset}
          titleStyle={styles.resetTitle}
          title={'Reset'}
          onPress={() => {
            setPressedButtons(defaultPressedButtons);
          }}
        />
      </View>
      <View style={styles.bottomSheetGroup}>
        <AppText style={styles.filterBy}>Filter By</AppText>
        <View style={styles.bottomSheetInnerBtnsContainer}>
          <AppButton
            title={'Income'}
            onPress={() => {
              setPressedButtons(prev => {
                if (prev.filter.income) {
                  return {
                    ...prev,
                    filter: {...prev.filter, income: false},
                  };
                } else {
                  return {
                    ...prev,
                    filter: {...prev.filter, income: true},
                    sort: {
                      ...prev.sort,
                      income: false,
                      expense: false,
                    },
                  };
                }
              });
            }}
            style={[
              styles.bottomSheetInnerBtns,
              pressedButtons.filter.income && styles.pressedButton,
            ]}
            titleStyle={[
              styles.bottomSheetInnerBtnsTitle,
              pressedButtons.filter.income && styles.pressedButtonTitle,
            ]}
          />
          <AppButton
            title={'Expense'}
            onPress={() => {
              setPressedButtons(prev => {
                if (prev.filter.expense) {
                  return {
                    ...prev,
                    filter: {...prev.filter, expense: false},
                  };
                } else {
                  return {
                    ...prev,
                    filter: {...prev.filter, expense: true},
                    sort: {
                      ...prev.sort,
                      income: false,
                      expense: false,
                    },
                  };
                }
              });
            }}
            style={[
              styles.bottomSheetInnerBtns,
              pressedButtons.filter.expense && styles.pressedButton,
            ]}
            titleStyle={[
              styles.bottomSheetInnerBtnsTitle,
              pressedButtons.filter.expense && styles.pressedButtonTitle,
            ]}
          />
          <AppButton
            title={'Date'}
            onPress={() => {
              setOpenCalendar(true);
            }}
            style={[
              styles.bottomSheetInnerBtns,
              pressedButtons.filter.date && styles.pressedButton,
            ]}
            titleStyle={[
              styles.bottomSheetInnerBtnsTitle,
              pressedButtons.filter.date && styles.pressedButtonTitle,
            ]}
          />
        </View>
      </View>

      <View style={styles.bottomSheetGroup}>
        <AppText style={styles.filterBy}>Sort By </AppText>
        <View style={styles.bottomSheetInnerBtnsContainer}>
          <AppButton
            title={'Newest'}
            onPress={() => {
              setPressedButtons(prev => {
                if (!prev.sort.newest && !prev.sort.oldest) {
                  return {
                    ...prev,
                    sort: {...prev.sort, newest: true},
                  };
                } else {
                  return {
                    ...prev,
                    sort: {...prev.sort, newest: true, oldest: false},
                  };
                }
              });
            }}
            style={[
              styles.bottomSheetInnerBtns,
              pressedButtons.sort.newest && styles.pressedButton,
            ]}
            titleStyle={[
              styles.bottomSheetInnerBtnsTitle,
              pressedButtons.sort.newest && styles.pressedButtonTitle,
            ]}
          />
          <AppButton
            title={'Oldest'}
            onPress={() => {
              setPressedButtons(prev => {
                if (!prev.sort.oldest && !prev.sort.newest) {
                  return {
                    ...prev,
                    sort: {...prev.sort, oldest: true},
                  };
                } else {
                  return {
                    ...prev,
                    sort: {...prev.sort, oldest: true, newest: false},
                  };
                }
              });
            }}
            style={[
              styles.bottomSheetInnerBtns,
              pressedButtons.sort.oldest && styles.pressedButton,
            ]}
            titleStyle={[
              styles.bottomSheetInnerBtnsTitle,
              pressedButtons.sort.oldest && styles.pressedButtonTitle,
            ]}
          />

          <AppButton
            title={'Income'}
            onPress={() => {
              setPressedButtons(prev => {
                if (!prev.sort.income && !prev.sort.expense) {
                  return {
                    ...prev,
                    sort: {...prev.sort, income: true},
                  };
                } else if (prev.sort.income && !prev.sort.expense) {
                  return {
                    ...prev,
                    sort: {...prev.sort, income: false},
                  };
                } else {
                  return {
                    ...prev,
                    sort: {...prev.sort, income: true, expense: false},
                  };
                }
              });
            }}
            style={[
              styles.bottomSheetInnerBtns,
              pressedButtons.sort.income && styles.pressedButton,
            ]}
            titleStyle={[
              styles.bottomSheetInnerBtnsTitle,
              pressedButtons.sort.income && styles.pressedButtonTitle,
            ]}
            disabled={disabledSortIncomeExpense}
          />
          <AppButton
            title={'Expense'}
            onPress={() => {
              setPressedButtons(prev => {
                if (!prev.sort.expense && !prev.sort.income) {
                  return {
                    ...prev,
                    sort: {...prev.sort, expense: true},
                  };
                } else if (prev.sort.expense && !prev.sort.income) {
                  return {
                    ...prev,
                    sort: {...prev.sort, expense: false},
                  };
                } else {
                  return {
                    ...prev,
                    sort: {...prev.sort, expense: true, income: false},
                  };
                }
              });
            }}
            style={[
              styles.bottomSheetInnerBtns,
              pressedButtons.sort.expense && styles.pressedButton,
            ]}
            titleStyle={[
              styles.bottomSheetInnerBtnsTitle,
              pressedButtons.sort.expense && styles.pressedButtonTitle,
            ]}
            disabled={disabledSortIncomeExpense}
          />
        </View>
      </View>

      <AppButton
        style={styles.applyBtn}
        title={'Apply'}
        onPress={() => {
          onApplyPress?.();
          bottomSheetRef.current?.close();
        }}
      />

      <AppCalendar
        visible={openCalender}
        setVisible={setOpenCalendar}
        onDaySelect={date => {
          setPressedButtons(prev => {
            return {
              ...prev,
              filter: {...prev.filter, date: date ?? ''},
            };
          });
        }}
        initialDate={pressedButtons.filter.date}
        markedDates={{
          [pressedButtons.filter.date]: {
            selected: true,
            selectedColor: colors.violet,
            selectedTextColor: colors.white,
          },
        }}
      />
    </View>
  );
};

export default memo(TransactionsSortFilter);
