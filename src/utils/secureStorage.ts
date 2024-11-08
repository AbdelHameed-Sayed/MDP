import EncryptedStorage from 'react-native-encrypted-storage';

import {TUserTransactionsData} from './types';

const storedDataNames = {
  userTransactionsData: 'userTransactionsData',
};

async function storeUserTransactionsData(data: TUserTransactionsData) {
  try {
    const isDataExists = await retrieveUserTransactionsData();

    if (isDataExists) {
      await EncryptedStorage.setItem(
        storedDataNames.userTransactionsData,
        JSON.stringify([...isDataExists, data]),
      );
    } else {
      await EncryptedStorage.setItem(
        storedDataNames.userTransactionsData,
        JSON.stringify([data]),
      );
    }
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

async function retrieveUserTransactionsData() {
  try {
    const userTransactionsData = await EncryptedStorage.getItem(
      storedDataNames.userTransactionsData,
    );

    if (userTransactionsData) {
      return JSON.parse(userTransactionsData) as TUserTransactionsData[];
    }
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

async function removeUserTransactionsData() {
  try {
    await EncryptedStorage.removeItem(storedDataNames.userTransactionsData);
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

async function clearAllData() {
  try {
    await EncryptedStorage.clear();
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
}

export {
  storeUserTransactionsData,
  retrieveUserTransactionsData,
  removeUserTransactionsData,
  clearAllData,
  storedDataNames,
};
