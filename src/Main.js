import FontAwesomeIcons from '@expo/vector-icons/FontAwesome';
import FontAwesome5Icons from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Application from 'expo-application';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Updates from 'expo-updates';
import moment from 'moment';
import 'moment/locale/vi';
import React from 'react';
import { LogBox } from 'react-native';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { ImageAssets } from '@constants/assets';

import App from '@containers/App/App';

import Alert from '@modules/Alert/Alert';

import configureStore from './store.config';
import usePushNotification from './usePushNotification';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const fonts = {
  ...MaterialIcons.font,
  ...FontAwesomeIcons.font,
  ...FontAwesome5Icons.font,
  ...MaterialCommunityIcons.font,
};

const images = [...Object.values(ImageAssets)];

const { store, persistor } = configureStore();

moment.updateLocale('vi', {
  calendar: {
    sameDay: '[Hôm nay] HH:mm',
    nextDay: '[Hôm mai] HH:mm',
    nextWeek: 'L HH:mm',
    lastDay: '[Hôm qua] HH:mm',
    lastWeek: 'L HH:mm',
    sameElse: 'L HH:mm',
  },
});

SplashScreen.preventAutoHideAsync();

export default function Main() {
  const { expoPushToken } = usePushNotification();
  console.log(expoPushToken);
  const [isReady, setReady] = React.useState(false);

  Updates.useUpdateEvents((event) => {
    if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
      Alert.showConfirmTitle(
        Application.applicationName,
        'Bản cập nhật mới đã có sẵn, bạn có muốn khởi động lại ứng dụng không?',
        Updates.reloadAsync,
      );
    }
  });

  React.useEffect(() => {
    loadResources();
  }, []);

  const loadResources = React.useCallback(async () => {
    try {
      await Promise.all([loadFonts(fonts), loadImages(images)]);
    } catch (error) {
      console.warn(error);
    } finally {
      setReady(true);
    }
  }, []);

  const loadFonts = React.useCallback((assets) => {
    return Font.loadAsync(assets);
  }, []);

  const loadImages = React.useCallback((assets) => {
    return Asset.loadAsync(assets);
  }, []);

  if (isReady) {
    return (
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </StoreProvider>
    );
  }
  return null;
}
