import React, {FC, memo} from 'react';
import {Modal} from 'react-native';

interface Iprops {
  visible: boolean;
  children: JSX.Element | JSX.Element[];
}
const AppModal: FC<Iprops> = ({visible = false, children}) => {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      {children}
    </Modal>
  );
};

export default memo(AppModal);
