import {useEffect, useState} from 'react';

import {retrieveUserTransactionsData} from '@utils/secureStorage';
import {TUserTransactionsData} from '@utils/types';

const useRetrieveUserTransactions = () => {
  const [transactions, setTransactions] = useState<TUserTransactionsData[]>([]);

  useEffect(() => {
    retrieveUserTransactionsData().then(trs => {
      if (trs) {
        setTransactions(trs);
      }
    });
  }, []);

  return {
    transactionsFromStorage: transactions,
  };
};

export default useRetrieveUserTransactions;
