import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

import {Calendar, CalendarProps, DateData} from 'react-native-calendars';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

import {Close} from '@assets/index';
import AppModal from '@atoms/appModal/AppModal';
import AppButton from '@molecules/appButton/appButton';
import {colors} from '@utils/colors';
import {formatDate} from '@utils/helper';

interface IProps extends CalendarProps {
  // eslint-disable-next-line no-unused-vars
  onDaySelect?: (date: DateData['dateString']) => void;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  onBlur?: () => void;
}

const AppCalendar: FC<IProps> = ({
  initialDate = formatDate(new Date()),
  onDaySelect,
  visible,
  setVisible,
  onBlur,
  ...props
}) => {
  const animatedOpacity = useRef(new Animated.Value(0));

  const [selectedDate, setSelectedDate] = useState(initialDate);

  const marked = useMemo(
    () => ({
      [selectedDate]: {
        selected: true,
        selectedColor: colors.violet,
        selectedTextColor: colors.white,
      },
    }),
    [selectedDate],
  );

  const animationHandler = useCallback(
    (isVisible = visible) => {
      Animated.timing(animatedOpacity.current, {
        toValue: isVisible ? 1 : 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        !isVisible && setVisible(false);
      });
    },
    [setVisible, visible],
  );

  useEffect(() => {
    animationHandler();
  }, [animationHandler]);

  return (
    <AppModal visible={visible}>
      <Animated.View
        style={[styles.animated, {opacity: animatedOpacity.current}]}>
        <View style={styles.backDrop}>
          <View style={styles.container}>
            <View style={styles.closeContainer}>
              <AppButton
                inlineNoUnderLine
                style={styles.closeBtn}
                onPress={() => {
                  animationHandler(false);
                  onBlur?.();
                }}>
                <Close
                  style={styles.close}
                  width={moderateVerticalScale(19)}
                  height={moderateVerticalScale(19)}
                />
              </AppButton>
            </View>
            <Calendar
              initialDate={initialDate}
              disableAllTouchEventsForDisabledDays={true}
              disableAllTouchEventsForInactiveDays={true}
              minDate={props.minDate}
              firstDay={props.firstDay ?? 5}
              markedDates={marked}
              hideExtraDays
              enableSwipeMonths
              onDayPress={(date: DateData) => {
                setSelectedDate(date.dateString);
                onDaySelect?.(date.dateString);
                animationHandler(false);
                onBlur?.();
              }}
              theme={{
                arrowColor: colors.violet2,
                todayTextColor: colors.violet,
                monthTextColor: colors.violet2,
                calendarBackground: colors.lightViolet2,
                dayTextColor: colors.violet2,
                textSectionTitleColor: colors.violet2,
              }}
              {...props}
            />
          </View>
        </View>
      </Animated.View>
    </AppModal>
  );
};

export default AppCalendar;

const styles = StyleSheet.create({
  animated: {
    flex: 1,
  },

  container: {
    marginHorizontal: moderateScale(16),
  },

  backDrop: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: colors.backdrop,
    position: 'relative',
  },

  closeContainer: {
    position: 'absolute',
    zIndex: 3,
    end: moderateScale(-10),
    top: moderateVerticalScale(-10),
  },

  closeBtn: {
    width: moderateVerticalScale(24),
    height: moderateVerticalScale(24),
    borderRadius: moderateVerticalScale(16),
    backgroundColor: colors.lightViolet,
    justifyContent: 'center',
    alignItems: 'center',
  },
  close: {
    flex: 1,
    color: colors.black,
  },
});
