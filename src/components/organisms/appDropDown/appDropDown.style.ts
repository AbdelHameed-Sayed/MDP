import {StyleSheet} from 'react-native';

import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

import {colors} from '@utils/colors';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  buttonContainer: {
    minWidth: moderateScale(109),
    justifyContent: 'space-between',
    borderWidth: moderateScale(1),
    borderColor: colors.baseLight60,
    flexDirection: 'row',
    columnGap: moderateScale(4),
    alignItems: 'center',
  },
  buttonContainerRegular: {
    borderRadius: moderateScale(16),
    height: moderateVerticalScale(56),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateVerticalScale(12),
  },
  buttonContainerExtreme: {
    paddingVertical: moderateVerticalScale(8),
    paddingRight: moderateScale(8),
    paddingLeft: moderateScale(16),
    flexDirection: 'row-reverse',
    borderRadius: moderateScale(40),
  },

  displayFlex: {
    display: 'flex',
  },
  displayNone: {
    display: 'none',
  },

  textContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: moderateScale(7),
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  textStyle: {
    color: colors.baseDark,
    fontSize: moderateScale(14),
    fontWeight: '500',
    lineHeight: moderateVerticalScale(18),
  },

  placeholderStyle: {
    color: colors.baseLight,
  },

  arrowIconContainerStyle: {
    paddingHorizontal: moderateScale(5),
    height: moderateVerticalScale(24),
    justifyContent: 'center',
  },

  innerContentContainer: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  },

  flatListStyle: {
    position: 'absolute',
    width: '100%',
    borderWidth: moderateScale(1),
    borderColor: colors.baseLight60,
    zIndex: 3,
  },
  flatListStyleExtreme: {
    backgroundColor: colors.lightYellow2,
  },
  flatListStyleRegular: {
    backgroundColor: colors.white,
    borderRadius: moderateScale(16),
  },

  contentContainerStyle: {
    flex: 1,
  },
  flatListItems: {
    position: 'relative',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: moderateScale(7),
  },

  itemSeparator: {
    height: moderateVerticalScale(1),
    width: '90%',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    backgroundColor: colors.lightViolet,
  },

  empty: {
    marginVertical: moderateVerticalScale(16),
    alignItems: 'center',
  },

  checkArrow: {
    position: 'absolute',
    start: moderateScale(15),
    width: moderateScale(25),
    height: moderateVerticalScale(25),
  },
});

export default styles;
