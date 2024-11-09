import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

import AppText from '@atoms/appText/appText';
import {categoryRenderer} from '@utils/categories';
import {colors} from '@utils/colors';
import {
  TCategoryText,
  TFinancialReportFilteredTransactions,
} from '@utils/types';

interface IProps {
  item: TFinancialReportFilteredTransactions;
  progressBarWidth: number;
}

const CategorizedTransactionsComponent: FC<IProps> = ({
  item,
  progressBarWidth,
}) => {
  const categoryData = categoryRenderer(item?.category?.value as TCategoryText);

  return (
    <>
      <View style={styles.warningCategoryContainer}>
        <View style={styles.categoryCircularTextContainer}>
          <View
            style={[
              styles.categoryCircular,
              {
                backgroundColor: categoryData.colorCode,
              },
            ]}
          />
          <AppText style={styles.categoryLabel}>{categoryData.label}</AppText>
        </View>
        <AppText
          style={[
            styles.amount,
            {
              color: item.type === 'Expense' ? colors.red100 : colors.green,
            },
          ]}>
          {item.type === 'Expense' ? '-' : '+'} {item.currency}
          {item.amount}
        </AppText>
      </View>

      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressBar,
            {
              backgroundColor: categoryData.colorCode,
              width: `${progressBarWidth > 100 ? 100 : progressBarWidth}%`,
            },
          ]}
        />
      </View>
    </>
  );
};

export default CategorizedTransactionsComponent;

const styles = StyleSheet.create({
  warningCategoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateVerticalScale(8),
  },

  categoryCircularTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: moderateScale(7),
    borderWidth: moderateScale(1),
    borderColor: colors.baseLight60,
    borderRadius: moderateScale(32),
    paddingVertical: moderateVerticalScale(8),
    paddingEnd: moderateScale(16),
    paddingStart: moderateScale(8),
  },

  categoryCircular: {
    width: moderateScale(14),
    height: moderateScale(14),
    borderRadius: moderateScale(14),
  },
  categoryLabel: {
    fontWeight: '500',
    fontSize: moderateScale(14),
    lineHeight: moderateVerticalScale(17),
    color: colors.baseDark,
  },
  amount: {
    fontWeight: '500',
    fontSize: moderateScale(24),
    lineHeight: moderateVerticalScale(29),
  },
  progressBar: {
    height: moderateVerticalScale(12),
    borderRadius: moderateVerticalScale(24),
    marginBottom: moderateVerticalScale(24),
    backgroundColor: colors.baseLight60,
  },
});
