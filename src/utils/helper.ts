import {Dimensions, Platform} from 'react-native';

import {
  TPressedButtonActions,
  TUserTransactionsData,
  TUserTransactionsDataAsSection,
} from './types';

export const isAndroid = () => Platform.OS === 'android';
export const isIOS = () => Platform.OS === 'ios';
export const {width, height} = Dimensions.get('window');

export const formatDate = (
  date: Date,
  separator = '-',
  length = 2,
  paddingItem = '0',
) => {
  return `${date.getFullYear()}${separator}${(date.getMonth() + 1)
    .toString()
    .padStart(length, paddingItem)}${separator}${date
    .getDate()
    .toString()
    .padStart(length, paddingItem)}`;
};

export const isToday = (date: string): boolean => {
  const inputDate = new Date(date);
  const today = new Date();
  return (
    inputDate.getDate() === today.getDate() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getFullYear() === today.getFullYear()
  );
};

export const isYesterday = (date: string): boolean => {
  const inputDate = new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    inputDate.getDate() === yesterday.getDate() &&
    inputDate.getMonth() === yesterday.getMonth() &&
    inputDate.getFullYear() === yesterday.getFullYear()
  );
};

export const groupByDate = (
  data: TUserTransactionsData[],
  defaultSort = true,
): TUserTransactionsDataAsSection[] => {
  const groupedData = data.reduce<Record<string, TUserTransactionsData[]>>(
    (acc, item) => {
      const {date} = item;
      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(item);
      return acc;
    },
    {},
  );

  const sections = Object.keys(groupedData).map(date => ({
    title: date,
    data: groupedData[date],
  }));

  if (defaultSort) {
    sections.sort(
      (a, b) => new Date(b.title).getTime() - new Date(a.title).getTime(),
    );
  }

  return sections;
};

export const filterAndSortTransactions = (
  transactions: TUserTransactionsData[],
  pressedButtons: TPressedButtonActions,
): TUserTransactionsDataAsSection[] => {
  const {filter, sort} = pressedButtons;

  let filteredTransactions = transactions.filter(item => {
    const matchesIncome = filter.income ? item.type === 'Income' : true;
    const matchesExpense = filter.expense ? item.type === 'Expense' : true;
    const matchesDate = filter.date ? item.date === filter.date : true;

    if (filter.income && filter.expense && filter.date) {
      return (item.type === 'Income' || item.type === 'Expense') && matchesDate;
    }
    if (filter.income && filter.expense) {
      return item.type === 'Income' || item.type === 'Expense';
    }
    if (filter.income && filter.date) {
      return matchesIncome && matchesDate;
    }
    if (filter.expense && filter.date) {
      return matchesExpense && matchesDate;
    }

    return matchesIncome && matchesExpense && matchesDate;
  });

  filteredTransactions.sort((a, b) => {
    if (sort.newest) {
      const dateComparison =
        new Date(b.date).getTime() - new Date(a.date).getTime();
      if (dateComparison !== 0) {
        return dateComparison;
      }
    } else if (sort.oldest) {
      const dateComparison =
        new Date(a.date).getTime() - new Date(b.date).getTime();
      if (dateComparison !== 0) {
        return dateComparison;
      }
    }

    if (sort.income && a.type !== b.type) {
      return a.type === 'Income' ? -1 : 1;
    } else if (sort.expense && a.type !== b.type) {
      return a.type === 'Expense' ? -1 : 1;
    }

    return 0;
  });

  return groupByDate(filteredTransactions, false);
};
