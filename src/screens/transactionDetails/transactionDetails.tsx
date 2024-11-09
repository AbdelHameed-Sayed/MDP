import React from 'react';
import {View, StyleSheet} from 'react-native';

import {RouteProp, useRoute} from '@react-navigation/native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

import AppText from '@atoms/appText/appText';
import Header from '@molecules/header/header';
import {colors} from '@utils/colors';
import fonts from '@utils/fonts';
import {IScreenParams} from '@utils/types';

const TransactionDetails = () => {
  const {
    params: {fullItemDetails},
  } = useRoute<RouteProp<IScreenParams, 'TransactionDetailsParams'>>();

  const backgroundColorHandler = () => {
    if (fullItemDetails.type === 'Expense') {
      return colors.red100;
    }
    if (fullItemDetails.type === 'Income') {
      return colors.green;
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.topContainer,
          {backgroundColor: backgroundColorHandler()},
        ]}>
        <Header
          title={'Transaction Detail'}
          backArrowColor={colors.white}
          titleColor={colors.white}
        />
        <AppText style={styles.topAmount}>
          {fullItemDetails.currency} {fullItemDetails.amount}
        </AppText>
        <View style={styles.topDateContainer}>
          <AppText style={styles.topDate}>{fullItemDetails.date}</AppText>
        </View>
      </View>

      <View style={styles.middleContainer}>
        <View style={styles.middleInnerContainer}>
          <AppText style={styles.middleInnerContainerTopText}>Type</AppText>
          <AppText style={styles.middleInnerContainerBottomText}>
            {fullItemDetails.type}
          </AppText>
        </View>
        <View style={styles.middleInnerContainer}>
          <AppText style={styles.middleInnerContainerTopText}>Category</AppText>
          <AppText style={styles.middleInnerContainerBottomText}>
            {fullItemDetails.category.label}
          </AppText>
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.bottomContainer}>
        <AppText style={styles.description}>Description</AppText>
        <AppText style={styles.descriptionContent}>
          {fullItemDetails.description}
        </AppText>
      </View>
    </View>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    position: 'relative',
  },

  topContainer: {
    flex: 1,
    backgroundColor: colors.red100,
    maxHeight: moderateVerticalScale(229),
    borderBottomEndRadius: moderateScale(16),
    borderBottomStartRadius: moderateScale(16),
    padding: moderateScale(16),
    paddingTop: 0,
  },
  topAmount: {
    fontWeight: '700',
    fontSize: moderateScale(48),
    lineHeight: moderateVerticalScale(80),
    textAlign: 'center',
    color: colors.white2,
  },

  topDateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: moderateScale(12),
  },
  topDate: {
    fontWeight: '500',
    fontSize: moderateScale(13),
    lineHeight: moderateVerticalScale(16),
    textAlign: 'center',
    color: colors.white2,
    fontFamily: fonts.normal,
  },

  middleContainer: {
    marginHorizontal: moderateScale(16),
    borderWidth: moderateScale(1),
    borderColor: colors.baseLight60,
    borderRadius: moderateScale(12),
    marginTop: moderateVerticalScale(-30),
    backgroundColor: colors.white,
    paddingHorizontal: moderateScale(26),
    paddingVertical: moderateVerticalScale(12),
    flexDirection: 'row',
    gap: moderateScale(39),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateVerticalScale(17),
  },
  middleInnerContainer: {
    alignItems: 'center',
    rowGap: moderateScale(9),
  },
  middleInnerContainerTopText: {
    fontWeight: '500',
    fontSize: moderateScale(14),
    lineHeight: moderateVerticalScale(18),
    color: colors.baseLight,
  },
  middleInnerContainerBottomText: {
    fontWeight: '600',
    fontSize: moderateScale(16),
    lineHeight: moderateVerticalScale(19),
    color: colors.baseDark2,
  },

  separator: {
    borderWidth: moderateScale(1),
    borderColor: colors.lightGray3,
    borderStyle: 'dashed',
    marginHorizontal: moderateScale(16),
    marginBottom: moderateVerticalScale(14),
  },

  bottomContainer: {
    marginHorizontal: moderateScale(16),
  },
  description: {
    fontWeight: '600',
    fontSize: moderateScale(16),
    lineHeight: moderateVerticalScale(19),
    color: colors.baseLight,
    marginBottom: moderateVerticalScale(15),
  },
  descriptionContent: {
    fontWeight: '500',
    fontSize: moderateScale(16),
    lineHeight: moderateVerticalScale(19),
    color: colors.baseDark2,
    marginBottom: moderateVerticalScale(16),
  },
});
