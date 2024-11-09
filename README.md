# Expense Mate

This is a simple personal finance tracker app built using React Native CLI. It allows users to add transactions (income/expense), view a list of transactions, and get a summary of their finances. The app also features a pie chart for expense categorization and stores transaction data safely locally.

## Features

- **Add Transactions**: Users can choose transaction type (income/expense) and input transaction details such as amount, category, date, and description.
- **Transaction List**: The user can view a list of all added transactions with sorting and filtering options based on date and type, also he can view full transaction details.
- **pre-financial and financial report**: Display the total income and expenses for the current month, along with a pie chart showing expenses by category.
- **Local Data Persistence**: Transactions data are saved safely locally using react-native-encrypted-storage.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/AbdelHameed-Sayed/MDP.git
    ```
2. Install dependencies:
    ```bash
    cd MDP
    ```
    ```bash
    yarn
    ```
    OR
    ```bash
    npm install
    ```

3. Run the app:
    - For iOS:
      ```bash
      cd ios && pod install && cd ..
      ```
      ```bash
      yarn ios
      ```
    - For Android:
      ```bash
      yarn android
      ```

## App Structure

- **App.tsx**: The main entry point where navigation is handled.
- **Navigation**: This is for handling app navigation.
- **Components**: Contains reusable components based on an atomic structure like `AppButton`, `AppText`, and `PieChartComponent`.
- **Screens**: Contains screen components such as `Transactions` and `FinintialReport`.
- **CustomHooks**: Custom hook to retrieve transaction data from local storage.
- **Assets**: This is for handling fonts and SVGs.
- **Utils**: Helper functions for data handling and calculations.
