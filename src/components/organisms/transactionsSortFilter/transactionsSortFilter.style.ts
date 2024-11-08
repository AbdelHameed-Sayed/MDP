import {StyleSheet} from 'react-native';

import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

import {colors} from '@utils/colors';

const styles = StyleSheet.create({
  filterResetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateVerticalScale(16),
  },
  filter: {
    fontWeight: '600',
    color: colors.black,
  },
  reset: {
    paddingVertical: moderateVerticalScale(8),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(40),
    height: moderateVerticalScale(32),
    backgroundColor: colors.lightViolet,
  },
  resetTitle: {
    fontSize: moderateScale(14),
    lineHeight: moderateVerticalScale(18),
    fontWeight: '500',
    color: colors.violet,
  },

  bottomSheetGroup: {
    marginBottom: moderateVerticalScale(16),
  },
  pressedButton: {
    backgroundColor: colors.lightViolet,
  },
  pressedButtonTitle: {
    color: colors.violet,
  },
  filterBy: {
    color: colors.baseDark2,
    fontWeight: '600',
    marginBottom: moderateVerticalScale(16),
  },
  bottomSheetInnerBtnsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: moderateScale(8),
  },
  bottomSheetInnerBtns: {
    paddingVertical: moderateVerticalScale(12),
    paddingHorizontal: moderateScale(24),
    borderRadius: moderateScale(24),
    height: moderateVerticalScale(42),
    width: moderateScale(110),
    backgroundColor: 'transparent',
    borderWidth: moderateScale(1),
    borderColor: colors.lightGray,
  },
  bottomSheetInnerBtnsTitle: {
    fontSize: moderateScale(14),
    lineHeight: moderateVerticalScale(18),
    fontWeight: '500',
    color: colors.baseDark2,
  },

  applyBtn: {
    marginTop: moderateVerticalScale(25),
    marginBottom: moderateVerticalScale(30),
  },
});

export default styles;
