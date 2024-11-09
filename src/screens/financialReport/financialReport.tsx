import React, {useMemo, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

import {PieChart} from '@assets/index';
import useRetrieveUserTransactions from '@customHooks/useRetrieveUserTransactions';
import AppButton from '@molecules/appButton/appButton';
import Header from '@molecules/header/header';
import AppDropDown from '@organisms/appDropDown/appDropDown';
import CategorizedTransactionsComponent from '@organisms/categorizedTransactionsComponent/categorizedTransactionsComponent';
import PieChartComponent from '@organisms/pieChartComponent/pieChartComponent';
import {colors} from '@utils/colors';
import {
  financialReportFilteredTransactions,
  pieChartDataHandler,
} from '@utils/helper';
import {TPeriods, TTransaction, TUseNavigation} from '@utils/types';

const periods = [
  {value: 'Today', label: 'Today'},
  {value: 'Month', label: 'Month'},
];

const FinancialReport = () => {
  const navigation = useNavigation<TUseNavigation>();

  const {transactionsFromStorage} = useRetrieveUserTransactions();

  const [selectedButton, setSelectedButton] = useState<TTransaction>('Expense');
  const [selectedPeriod, setSelectedPeriod] = useState(periods.at(-1));

  const financialReportFilteredTransactionsArray = useMemo(() => {
    return financialReportFilteredTransactions(
      transactionsFromStorage,
      selectedButton,
      selectedPeriod?.value as TPeriods,
    );
  }, [selectedButton, selectedPeriod?.value, transactionsFromStorage]);

  const allReducedPrice = useMemo(() => {
    return financialReportFilteredTransactionsArray.reduce(
      (acc, cur) => acc + cur.amount,
      0,
    );
  }, [financialReportFilteredTransactionsArray]);

  const pieChartData = useMemo(() => {
    return pieChartDataHandler(financialReportFilteredTransactionsArray);
  }, [financialReportFilteredTransactionsArray]);

  return (
    <View style={styles.container}>
      <Header
        title={'Financial Report'}
        leftElement={{
          type: 'back',
          onPress() {
            navigation.pop(2);
          },
        }}
      />

      <View style={styles.topButtonsContainer}>
        <AppDropDown
          data={periods}
          extremeStyle
          checkType="backgroundColor"
          initialValue={selectedPeriod}
          flatListStyle={styles.headerFlatList}
          checkedBackgroundColor={colors.lightViolet}
          getCurrentValue={value => {
            if (value) {
              setSelectedPeriod(value);
            }
          }}
        />
        <View style={styles.pieChart}>
          <PieChart fill={colors.white} />
        </View>
      </View>

      <PieChartComponent
        data={
          pieChartData.length < 1
            ? [{color: colors.baseLight61, label: 'Empty', value: 0.1}]
            : pieChartData
        }
        title={`EGP ${allReducedPrice}`}
      />

      <View style={styles.incomeExpenseButtonsContainer}>
        <AppButton
          onPress={() => {
            setSelectedButton('Expense');
          }}
          style={[
            styles.incomeExpenseButtons,
            selectedButton !== 'Expense' && styles.transparentBackground,
          ]}
          titleStyle={[
            styles.expenseIncomeButtonTitle,
            selectedButton !== 'Expense' && {color: colors.black},
          ]}
          title={'Expenses'}
        />
        <AppButton
          onPress={() => {
            setSelectedButton('Income');
          }}
          style={[
            styles.incomeExpenseButtons,
            selectedButton !== 'Income' && styles.transparentBackground,
          ]}
          titleStyle={[
            styles.expenseIncomeButtonTitle,
            selectedButton !== 'Income' && {color: colors.black},
          ]}
          title={'Income'}
        />
      </View>

      <FlatList
        data={financialReportFilteredTransactionsArray}
        renderItem={({item}) => {
          const progressBarWidth = Math.ceil(
            (Number(item.amount) / allReducedPrice) * 100,
          );

          return (
            <CategorizedTransactionsComponent
              item={item}
              progressBarWidth={progressBarWidth}
            />
          );
        }}
      />
    </View>
  );
};

export default FinancialReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
  },

  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateVerticalScale(16),
  },

  pieChart: {
    backgroundColor: colors.violet,
    borderRadius: moderateScale(8),
    width: moderateScale(48),
    height: moderateScale(48),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },

  incomeExpenseButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.baseLight60,
    height: moderateVerticalScale(56),
    borderRadius: moderateScale(32),
    padding: moderateScale(4),
    marginBottom: moderateVerticalScale(20),
  },
  incomeExpenseButtons: {
    flex: 1,
    borderRadius: moderateScale(32),
    height: moderateVerticalScale(48),
  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
  expenseIncomeButtonTitle: {
    fontWeight: '500',
    fontSize: moderateScale(16),
    lineHeight: moderateVerticalScale(19),
  },

  headerFlatList: {
    backgroundColor: colors.white,
  },
});
