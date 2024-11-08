import * as Yup from 'yup';

export const expenseIncomeSchema = () =>
  Yup.object().shape({
    amount: Yup.string()
      .test('Is great than zero', 'Amount must be greater than 0', value => {
        return Number(value) > 0;
      })
      .required('Amount is required'),
    category: Yup.object().shape({
      label: Yup.string().required(),
      value: Yup.string().required('Category is required'),
    }),
    description: Yup.string().required('Description is required'),
    date: Yup.string().required('Date is required'),
  });
