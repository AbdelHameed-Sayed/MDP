import React, {FC, memo} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

import {LinearGradient, vec} from '@shopify/react-native-skia';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {Pie, PolarChart} from 'victory-native';

import AppText from '@atoms/appText/appText';
import {colors} from '@utils/colors';

interface IProps {
  data: {
    value: number;
    color: string;
    label: string;
  }[];
  chartContainer?: ViewStyle;
  title?: string;
}

function calculateGradientPoints(
  radius: number,
  startAngle: number,
  endAngle: number,
  centerX: number,
  centerY: number,
) {
  // Calculate the midpoint angle of the slice for a central gradient effect
  const midAngle = (startAngle + endAngle) / 2;

  // Convert angles from degrees to radians
  const startRad = (Math.PI / 180) * startAngle;
  const midRad = (Math.PI / 180) * midAngle;

  // Calculate start point (inner edge near the pie's center)
  const startX = centerX + radius * 0.5 * Math.cos(startRad);
  const startY = centerY + radius * 0.5 * Math.sin(startRad);

  // Calculate end point (outer edge of the slice)
  const endX = centerX + radius * Math.cos(midRad);
  const endY = centerY + radius * Math.sin(midRad);

  return {startX, startY, endX, endY};
}

const PieChartComponent: FC<IProps> = ({data, chartContainer, title}) => {
  return (
    <View style={styles.container}>
      {title ? (
        <View style={styles.spendFrequencyContainer}>
          <AppText style={styles.spendFrequencyText}>
            {'Total is: \n'}
            {title}
          </AppText>
        </View>
      ) : null}
      <View style={[styles.chartContainer, chartContainer]}>
        <PolarChart
          data={data}
          labelKey={'label'}
          valueKey={'value'}
          colorKey={'color'}>
          <Pie.Chart innerRadius={'79%'}>
            {({slice}) => {
              const {startX, startY, endX, endY} = calculateGradientPoints(
                slice.radius,
                slice.startAngle,
                slice.endAngle,
                slice.center.x,
                slice.center.y,
              );

              return (
                <>
                  <Pie.Slice>
                    <LinearGradient
                      start={vec(startX, startY)}
                      end={vec(endX, endY)}
                      colors={[slice.color]}
                      positions={[0, 1]}
                    />
                  </Pie.Slice>
                </>
              );
            }}
          </Pie.Chart>
        </PolarChart>
      </View>
    </View>
  );
};

export default memo(PieChartComponent);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },

  spendFrequencyContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: '45%',
    transform: [{translateY: '-45%'}],
  },
  spendFrequencyText: {
    color: colors.black,
    fontSize: moderateScale(23),
    fontWeight: '700',
    lineHeight: moderateVerticalScale(28),
    textAlign: 'center',
  },

  chartContainer: {
    height: moderateVerticalScale(192),
    marginBottom: moderateVerticalScale(24),
  },
});
