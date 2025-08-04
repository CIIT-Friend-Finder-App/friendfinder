//define global providers
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Slot } from 'expo-router';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AuthProvider from '../providers/AuthProvider';

export default function RootLayout() {
  
  const [loadingFont] = useFonts({

    'HelveticaNeueRoman': require('../../fonts/HelveticaNeueRoman.otf'),
    'HelveticaNeueHeavy': require('../../fonts/HelveticaNeueHeavy.otf'),
    'HelveticaNeueBlack': require('../../fonts/HelveticaNeueBlack.otf'),
  });

  useEffect(() => {
    if (loadingFont) {
      SplashScreen.hideAsync();
    }
  }, [loadingFont]);

  if (!loadingFont) {
    return null;
  }

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <AuthProvider>
                <Slot/>
            </AuthProvider>
        </GestureHandlerRootView>
    );
}