import {StyleSheet} from 'react-native';

import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

import {colors} from '@utils/colors';
import fonts from '@utils/fonts';

const styles = StyleSheet.create({
  emptyList: {
    textAlign: 'center',
    color: colors.baseLight,
  },

  container: {
    flex: 1,
    backgroundColor: colors.white,
    gap: moderateVerticalScale(16),
    zIndex: 3,
  },
  containerZIndex: {
    zIndex: 0,
  },

  innerContainer: {
    marginHorizontal: moderateScale(16),
    marginTop: moderateVerticalScale(12),
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  filterIndicator: {
    width: moderateScale(5.5),
    height: moderateScale(5.5),
    borderRadius: moderateScale(5.5),
    backgroundColor: colors.violet,
    position: 'absolute',
    top: moderateVerticalScale(3),
    end: moderateScale(3),
  },
  seeFinancial: {
    backgroundColor: colors.lightViolet,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingStart: moderateScale(16),
    paddingEnd: moderateScale(20),
    paddingVertical: moderateVerticalScale(8),
    height: moderateVerticalScale(48),
    borderRadius: moderateScale(8),
    marginTop: moderateVerticalScale(8),
    marginBottom: moderateVerticalScale(4),
  },
  seeFinancialTitle: {
    color: colors.violet,
    fontSize: moderateScale(16),
    lineHeight: moderateVerticalScale(19),
    fontWeight: '400',
    fontFamily: fonts.normal,
  },
  seeFinancialArrow: {
    transform: [{rotate: '270deg'}, {scale: 1.125}],
  },

  flatListContainer: {
    justifyContent: 'center',
    paddingBottom: moderateVerticalScale(4),
  },
  flex1: {
    flex: 1,
  },

  sectionHeader: {
    fontSize: moderateScale(18),
    lineHeight: moderateVerticalScale(22),
    fontWeight: '600',
    color: colors.baseDark2,
    marginVertical: moderateVerticalScale(4),
    marginHorizontal: moderateScale(16),
  },

  handleStyle: {
    paddingBottom: moderateVerticalScale(16),
  },
  contentContainer: {
    marginHorizontal: moderateScale(16),
  },
  AnimatedBottomSheetViews: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default styles;
