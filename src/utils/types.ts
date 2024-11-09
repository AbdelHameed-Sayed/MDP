import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type TUseNavigation = NativeStackNavigationProp<ParamListBase>;

interface ITransaction {
  Income: 'Income';
  Expense: 'Expense';
}

export type TTransaction = ITransaction['Income'] | ITransaction['Expense'];

export interface IScreenParams extends ParamListBase {
  IncomeExpenseParams: {
    name: TTransaction;
    backgroundColor: string;
  };

  TransactionDetailsParams: {
    fullItemDetails: TUserTransactionsData;
  };
}

export type TCategoryText =
  | 'Food'
  | 'Passive Income'
  | 'Salary'
  | 'Shopping'
  | 'Subscription'
  | 'Transportation';

export type TLabelValueObject = {
  label: string;
  value: string;
  icon?: React.JSX.Element;
};

export type TUserTransactionData = {
  amount: string;
  category: TLabelValueObject;
  description: string;
  date: string;
};
export type TUserTransactionsData = TUserTransactionData & {
  type: TTransaction;
  currency: string;
};

export type TUserTransactionsDataAsSection = {
  title: string;
  data: TUserTransactionsData[];
};

export type TPressedButtonActions = {
  filter: {
    income: boolean;
    expense: boolean;
    date: string;
  };
  sort: {
    newest: boolean;
    oldest: boolean;
    income: boolean;
    expense: boolean;
  };
};

export type TPeriods = 'Today' | 'Week' | 'Month';

export type TFinancialReportFilteredTransactions = {
  category: TLabelValueObject;
  amount: number;
  currency: string;
  type: TTransaction;
};
