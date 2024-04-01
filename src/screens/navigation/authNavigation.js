import { useNavigation } from '@react-navigation/core';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';

import { ROUTER } from '@constants/router';

import ChangePasswordForNew from '@containers/Auth/ChangePassword';
import ChangeOldPassword from '@containers/Auth/ChangePassword/changePassword';
import ForgetScreen from '@containers/Auth/ForgetPassword';
import LoginScreen from '@containers/Auth/Login';
import { OTPScreen } from '@containers/Auth/OTPScreen';
import AccountInfo from '@containers/Auth/Register/Account_Info';
import { RegisterBy } from '@containers/Auth/Register/RegisterByPhone';
import RegisterScreen from '@containers/Auth/Register/RegisterScreen';
import { selectToken } from '@containers/Auth/saga/selectors';
import { LanguageScreen } from '@containers/ChangeLanguage';
import MenuScreen from '@containers/MenuScreen';
import { SuccessScreen } from '@containers/SuccessScreen';
import UserInfo from '@containers/UserInfo';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={ROUTER.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTER.REGISTER} component={RegisterScreen} />
      <Stack.Screen name={ROUTER.REGISTER_BY} component={RegisterBy} />
      <Stack.Screen name={ROUTER.OTP} component={OTPScreen} />
      <Stack.Screen name={ROUTER.MENU} component={MenuScreen} />
      <Stack.Screen
        name={ROUTER.CHANGE_PASSWORD}
        component={ChangePasswordForNew}
      />
      <Stack.Screen
        name={ROUTER.CHANGE_OLD_PASSWORD}
        component={ChangeOldPassword}
      />
      <Stack.Screen name={ROUTER.ACCOUNT_INFO} component={AccountInfo} />
      <Stack.Screen name={ROUTER.USER_INFO} component={UserInfo} />
      <Stack.Screen name={ROUTER.CHANGE_LAUGUAGE} component={LanguageScreen} />
      <Stack.Screen name={ROUTER.SUCCESS} component={SuccessScreen} />
      <Stack.Screen name={ROUTER.FORGET_PASSWORD} component={ForgetScreen} />
    </Stack.Navigator>
  );
}
