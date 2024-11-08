import React, {
  Dispatch,
  FC,
  SetStateAction,
  memo,
  useEffect,
  useState,
} from 'react';
import {View, StyleSheet, BackHandler} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {
  TabView,
  SceneMap,
  SceneRendererProps,
  NavigationState,
} from 'react-native-tab-view';

import AppText from '@atoms/appText/appText';
import useRetrieveUserTransactions from '@customHooks/useRetrieveUserTransactions';
import AppButton from '@molecules/appButton/appButton';
import {screenNames} from '@navigation/screenNames';
import {colors} from '@utils/colors';
import {currentMonthIncomeExpenseTransactions, width} from '@utils/helper';
import {TUseNavigation} from '@utils/types';

type TRenderTabBarProps = SceneRendererProps & {
  navigationState: NavigationState<{
    key: string;
  }>;
} & {
  setIndex: Dispatch<SetStateAction<number>>;
  index: number;
};

interface IThisMonthComponentProps {
  index: number;
}

const renderTabBar: FC<TRenderTabBarProps> = props => {
  return (
    <View style={styles().renderTabBarContainer}>
      {props.navigationState.routes.map((route, i) => {
        const isFocused = props.index === i;

        return (
          <AppButton
            hitSlop={{
              bottom: moderateScale(5),
              top: moderateScale(5),
            }}
            key={route.key + i.toString()}
            inlineNoUnderLine
            style={styles(isFocused).renderTabBarBtn}
            onPress={() => {
              props.setIndex(i);
            }}
          />
        );
      })}
    </View>
  );
};

const ThisMonthComponent: FC<IThisMonthComponentProps> = ({index}) => {
  const navigation = useNavigation<TUseNavigation>();

  const {transactionsFromStorage} = useRetrieveUserTransactions();

  const {expenses, income} = currentMonthIncomeExpenseTransactions(
    transactionsFromStorage,
  );

  return (
    <View style={styles().thisMonthComponentContainer}>
      {index !== 2 && (
        <AppText style={styles().thisMonthText}>This Month</AppText>
      )}
      {(index === 0 || index === 1) && (
        <View style={styles().youSpendContainer}>
          <AppText style={styles().youSpend}>
            {index === 0 ? 'You Spend 💸' : 'You Earned 💰'}
          </AppText>
          <AppText style={styles().youSpendAmount}>
            EGP {index === 0 ? expenses : income}
          </AppText>
        </View>
      )}

      {index === 2 && (
        <View style={styles().quoteContainer}>
          <AppText style={styles().quote}>
            “Financial freedom is freedom from fear.”
          </AppText>
          <AppText style={styles().author}>-Robert Kiyosaki</AppText>
        </View>
      )}

      {index === 2 && (
        <AppButton
          title={'See the full detail'}
          onPress={() => {
            navigation.navigate(screenNames.FinancialReport);
          }}
          style={styles().BottomButton}
          titleStyle={styles().BottomButtonTitle}
        />
      )}
    </View>
  );
};

const Tab1 = () => <ThisMonthComponent index={0} />;
const Tab2 = () => <ThisMonthComponent index={1} />;
const Tab3 = () => <ThisMonthComponent index={2} />;

const renderScene = SceneMap({
  '1': Tab1,
  '2': Tab2,
  '3': Tab3,
});

const PreFinancialReport = () => {
  const [index, setIndex] = useState(0);

  const [routes] = useState([{key: '1'}, {key: '2'}, {key: '3'}]);

  useEffect(() => {
    const listener = BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', () => null);
      listener.remove();
    };
  }, []);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={e => renderTabBar({...e, setIndex, index})}
      tabBarPosition="top"
      onIndexChange={setIndex}
      initialLayout={{width: width}}
      style={styles(undefined, index).container}
    />
  );
};

export default memo(PreFinancialReport);

const styles = (isFocused?: boolean, index?: number) => {
  const indxHandler = () => {
    if (index === 0) {
      return colors.red100;
    } else if (index === 1) {
      return colors.green;
    } else {
      return colors.violet;
    }
  };

  return StyleSheet.create({
    container: {
      backgroundColor: indxHandler(),
    },
    renderTabBarContainer: {
      marginTop: moderateVerticalScale(19),
      marginHorizontal: moderateScale(13),
      gap: moderateScale(2.25),
      flexDirection: 'row',
      alignItems: 'center',
    },
    renderTabBarBtn: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: isFocused ? colors.white : colors.white24,
      height: moderateVerticalScale(4),
      borderRadius: moderateScale(4),
      marginBottom: moderateVerticalScale(39),
    },

    thisMonthComponentContainer: {
      flex: 1,
      marginHorizontal: moderateScale(16),
      marginBottom: moderateVerticalScale(16),
    },
    thisMonthText: {
      textAlign: 'center',
      fontWeight: '600',
      fontSize: moderateScale(24),
      lineHeight: moderateVerticalScale(29),
      color: colors.white,
      opacity: 0.72,
    },
    youSpendContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    youSpend: {
      fontWeight: '700',
      fontSize: moderateScale(32),
      lineHeight: moderateVerticalScale(39),
      color: colors.white,
      marginBottom: moderateVerticalScale(24),
      textAlign: 'center',
      margin: moderateScale(10),
    },
    youSpendAmount: {
      color: colors.white,
      fontWeight: '700',
      fontSize: moderateScale(64),
      lineHeight: moderateVerticalScale(80),
    },

    quoteContainer: {
      marginTop: '41%',
    },
    quote: {
      fontWeight: '700',
      fontSize: moderateScale(32),
      lineHeight: moderateVerticalScale(39),
      color: colors.white,
      marginBottom: moderateVerticalScale(14),
    },
    author: {
      fontWeight: '600',
      fontSize: moderateScale(24),
      lineHeight: moderateVerticalScale(29),
      color: colors.white,
    },

    BottomButton: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: colors.white,
    },
    BottomButtonTitle: {
      color: colors.violet,
    },
  });
};
