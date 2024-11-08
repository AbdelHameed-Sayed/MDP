import React, {FC, PropsWithChildren, RefObject} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

import BottomSheet, {
  BottomSheetProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {moderateVerticalScale, moderateScale} from 'react-native-size-matters';

import AppModal from '@atoms/appModal/AppModal';
import {colors} from '@utils/colors';

interface IProps extends BottomSheetProps {
  openBottomSheet: boolean;
  contentContainer?: ViewStyle;
  bottomSheetRef: RefObject<BottomSheetMethods>;
}

const backdropComponent = () => <View style={styles.backDrop} />;

const AppBottomSheet: FC<PropsWithChildren<IProps>> = ({
  snapPoints,
  backgroundStyle,
  handleStyle,
  containerStyle,
  handleIndicatorStyle,
  contentContainer,
  openBottomSheet,
  bottomSheetRef,
  children,
  ...props
}) => {
  return (
    <AppModal visible={openBottomSheet}>
      <GestureHandlerRootView style={styles.flex1}>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          backdropComponent={backdropComponent}
          backgroundStyle={[styles.backgroundStyle, backgroundStyle]}
          handleStyle={[styles.handleStyle, handleStyle]}
          containerStyle={containerStyle}
          handleIndicatorStyle={[
            styles.handleIndicatorStyle,
            handleIndicatorStyle,
          ]}
          {...props}>
          <BottomSheetView style={[styles.contentContainer, contentContainer]}>
            {children}
          </BottomSheetView>
        </BottomSheet>
      </GestureHandlerRootView>
    </AppModal>
  );
};

export default AppBottomSheet;

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },

  handleStyle: {
    paddingTop: moderateVerticalScale(16),
    paddingBottom: moderateVerticalScale(24),
  },

  handleIndicatorStyle: {
    backgroundColor: colors.violet40,
    width: moderateScale(36),
    height: moderateVerticalScale(5),
  },

  backgroundStyle: {
    backgroundColor: colors.white,
    borderRadius: 0,
    borderTopStartRadius: moderateScale(24),
    borderTopEndRadius: moderateScale(24),
  },

  backDrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.backdrop2,
  },

  contentContainer: {
    flex: 1,
    marginBottom: moderateVerticalScale(16),
  },
});
