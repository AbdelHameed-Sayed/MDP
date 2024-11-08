import React from 'react';

import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';

import {
  Food,
  PassiveIncome,
  Salary,
  Transportation,
  Shopping,
  Subscription,
} from '@assets/index';

import {colors} from './colors';
import {TCategoryText} from './types';

export const categoriesObject = {
  Food: 'Food',
  Salary: 'Salary',
  PassiveIncome: 'Passive Income',
  Shopping: 'Shopping',
  Subscription: 'Subscription',
  Transportation: 'Transportation',
};
export const categoriesArray = Object.values(categoriesObject);

export const categoryRenderer = (category: TCategoryText, props?: object) => {
  switch (category) {
    case categoriesObject.Food:
      return {
        icon: <Food {...props} />,
        categoryText: category,
        label: category,
        value: category,
        colorCode: colors.red100,
      };
    case categoriesObject.PassiveIncome:
      return {
        icon: <PassiveIncome {...props} />,
        categoryText: category,
        label: category,
        value: category,
        colorCode: colors.baseDark2,
      };
    case categoriesObject.Salary:
      return {
        icon: <Salary {...props} />,
        categoryText: category,
        label: category,
        value: category,
        colorCode: colors.green,
      };

    case categoriesObject.Transportation:
      return {
        icon: <Transportation {...props} />,
        categoryText: category,
        label: category,
        value: category,
        colorCode: colors.blue,
      };
    case categoriesObject.Shopping:
      return {
        icon: <Shopping {...props} />,
        categoryText: category,
        label: category,
        value: category,
        colorCode: colors.yellow,
      };
    case categoriesObject.Subscription:
    default:
      return {
        icon: <Subscription {...props} />,
        categoryText: category,
        label: category,
        value: category,
        colorCode: colors.violet,
      };
  }
};

export const categoriesData = categoriesArray.map(category => {
  const cat = categoryRenderer(category as TCategoryText);

  return {
    label: cat.label,
    value: cat.value,
    icon: React.cloneElement(cat.icon, {
      width: moderateScale(25),
      height: moderateVerticalScale(25),
    }),
  };
});

export const expenseCategoriesData = categoriesData.filter(category => {
  if (
    category.value === categoriesObject.PassiveIncome ||
    category.value === categoriesObject.Salary
  ) {
    return null;
  }
  return category;
});

export const incomeCategoriesData = categoriesData.filter(category => {
  if (
    category.value === categoriesObject.PassiveIncome ||
    category.value === categoriesObject.Salary
  ) {
    return category;
  }
  return null;
});
