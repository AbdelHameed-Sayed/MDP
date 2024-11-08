import React, {useEffect, useState, useRef, useMemo} from 'react';
import {SectionList, View} from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';

import {DropDownArrow, Filter} from '@assets/index';
import AppText from '@atoms/appText/appText';
import AddModal from '@modals/addModal/addModal';
import AppButton from '@molecules/appButton/appButton';
import AppBottomSheet from '@organisms/appBottomSheet/appBottomSheet';
import TransactionComponent from '@organisms/transactionComponent/transactionComponent';
import TransactionsSortFilter, {
  defaultPressedButtons,
} from '@organisms/transactionsSortFilter/transactionsSortFilter';
import {colors} from '@utils/colors';
import {
  filterAndSortTransactions,
  groupByDate,
  isToday,
  isYesterday,
} from '@utils/helper';
import {retrieveUserTransactionsData} from '@utils/secureStorage';
import {
  TUserTransactionsData,
  TUserTransactionsDataAsSection,
} from '@utils/types';

import styles from './transactions.style';

const ListEmptyComponent = () => {
  return (
    <AppText style={styles.emptyList}>No recent transactions exist</AppText>
  );
};
const Transactions = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [transactionsFromStorage, setTransactionsFromStorage] = useState<
    TUserTransactionsData[]
  >([]);
  const [transactions, setTransactions] = useState<
    TUserTransactionsDataAsSection[]
  >([]);
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  const [pressedButtons, setPressedButtons] = useState(defaultPressedButtons);

  useEffect(() => {
    retrieveUserTransactionsData().then(trs => {
      if (trs) {
        setTransactionsFromStorage(trs);
        setTransactions(groupByDate(trs));
      }
    });
  }, []);

  const showAppliedFilterIndicator = useMemo(
    () =>
      Object.values(pressedButtons?.filter).includes(true) ||
      Object.values(pressedButtons?.sort).filter(s => s === true).length > 1 ||
      !pressedButtons?.sort.newest,
    [pressedButtons?.filter, pressedButtons?.sort],
  );

  return (
    <>
      <View
        style={[styles.container, isAddModalOpen && styles.containerZIndex]}>
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <AppButton
              inlineNoUnderLine
              onPress={() => {
                setOpenBottomSheet(true);
              }}>
              <Filter />
              {showAppliedFilterIndicator && (
                <View style={styles.filterIndicator} />
              )}
            </AppButton>
          </View>

          <AppButton
            style={styles.seeFinancial}
            titleStyle={styles.seeFinancialTitle}
            title={'See your financial report'}
            onPress={() => {}}>
            <DropDownArrow
              style={styles.seeFinancialArrow}
              stroke={colors.violet}
            />
          </AppButton>
        </View>

        <SectionList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.flatListContainer,
            transactions.length <= 0 && styles.flex1,
          ]}
          sections={transactions}
          keyExtractor={(_, index) => String(index)}
          renderSectionHeader={({section: {title}}) => {
            let convertedTitle = title;
            if (isToday(title)) {
              convertedTitle = 'Today' as never;
            }
            if (isYesterday(title)) {
              convertedTitle = 'Yesterday' as never;
            }
            return (
              <AppText style={styles.sectionHeader}>{convertedTitle}</AppText>
            );
          }}
          renderItem={({item}) => {
            return (
              <TransactionComponent
                fullItemDetails={{
                  amount: item.amount,
                  category: item.category,
                  date: item.date,
                  description: item.description,
                  type: item.type,
                  currency: item.currency,
                }}
              />
            );
          }}
          ListEmptyComponent={ListEmptyComponent}
        />
      </View>
      <AddModal
        visibility={isVisible => {
          setIsAddModalOpen(isVisible);
        }}
      />

      <AppBottomSheet
        bottomSheetRef={bottomSheetRef}
        handleStyle={styles.handleStyle}
        openBottomSheet={openBottomSheet}
        snapPoints={['55%']}
        animateOnMount
        detached
        enablePanDownToClose
        onClose={() => {
          setTransactions(
            filterAndSortTransactions(transactionsFromStorage, pressedButtons),
          );
          setOpenBottomSheet(false);
        }}
        contentContainer={styles.contentContainer}
        animationConfigs={{duration: 500}}
        overDragResistanceFactor={0.125}>
        <View style={styles.AnimatedBottomSheetViews}>
          <TransactionsSortFilter
            bottomSheetRef={bottomSheetRef}
            setPressedButtons={setPressedButtons}
            pressedButtons={pressedButtons}
          />
        </View>
      </AppBottomSheet>
    </>
  );
};

export default Transactions;