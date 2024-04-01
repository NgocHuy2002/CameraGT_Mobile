import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux as reduxPlugin } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

const reactotron = Reactotron.configure({
  host: Constants.expoConfig?.extra?.LOCAL_IP,
  onConnect: () => {
    console.log = Reactotron.log;
  },
});

reactotron.useReactNative({
  networking: {
    ignoreUrls: /\/(logs|symbolicate)$/,
  },
});
reactotron.setAsyncStorageHandler(AsyncStorage);

reactotron.use(reduxPlugin());
reactotron.use(sagaPlugin());

if (__DEV__) {
  reactotron.connect();
  reactotron.clear();
}

export default reactotron;
