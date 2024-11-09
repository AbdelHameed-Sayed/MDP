import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

import AppText from '@atoms/appText/appText';
import AppButton from '@molecules/appButton/appButton';
import {screenNames} from '@navigation/screenNames';
import {categoryRenderer} from '@utils/categories';
import {colors} from '@utils/colors';
import {
  TCategoryText,
  TUseNavigation,
  TUserTransactionsData,
} from '@utils/types';

interface IProps {
  fullItemDetails: TUserTransactionsData;
}

const TransactionComponent: FC<IProps> = ({fullItemDetails}) => {
  const navigation = useNavigation<TUseNavigation>();

  const {icon, categoryText} = categoryRenderer(
    fullItemDetails.category.value as TCategoryText,
  );

  return (
    <AppButton
      inlineNoUnderLine
      onPress={() => {
        navigation.navigate(screenNames.TransactionDetails, {fullItemDetails});
      }}
      style={styles.container}>
      {icon}
      <View style={styles.textContainer}>
        <View>
          <AppText style={styles.textCategory}>{categoryText}</AppText>
          <AppText
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.textDescription}>
            {fullItemDetails.description.length > 10
              ? `${fullItemDetails.description.slice(0, 15)}...`
              : fullItemDetails.description}
          </AppText>
        </View>
        <View>
          <AppText
            style={[
              styles.amount,
              {
                color:
                  fullItemDetails.type === 'Expense'
                    ? colors.red100
                    : colors.green,
              },
            ]}>
            {fullItemDetails.type === 'Expense' ? '-' : '+'}{' '}
            {fullItemDetails.currency} {fullItemDetails.amount}
          </AppText>
          <View style={styles.dateTime}>
            <AppText style={styles.time}>{fullItemDetails.date}</AppText>
          </View>
        </View>
      </View>
    </AppButton>
  );
};

export default TransactionComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white2,
    paddingHorizontal: moderateScale(16.5),
    paddingVertical: moderateVerticalScale(14.5),
    borderRadius: moderateScale(24),
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(9),
    marginVertical: moderateVerticalScale(4),
  },

  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textCategory: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    marginBottom: moderateVerticalScale(13),
  },
  textDescription: {
    fontSize: moderateScale(13),
    fontWeight: '500',
    color: colors.baseLight,
    maxWidth: moderateScale(170),
  },

  amount: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginBottom: moderateVerticalScale(13),
    alignSelf: 'flex-end',
  },
  time: {
    fontSize: moderateScale(13),
    fontWeight: '500',
    color: colors.baseLight,
    alignSelf: 'flex-end',
  },
  dateTime: {
    flexDirection: 'row',
    gap: moderateScale(7),
    justifyContent: 'flex-end',
  },
});
