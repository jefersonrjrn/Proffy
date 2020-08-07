import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppLoading } from 'expo'; // a splash art de quando o app ta carregando

import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import AppStack from './src/routes/AppStack';

export default function App() {

  let [fontsLoaded] = useFonts({ // fontsLoaded=true quando terminar de carregar as fontes
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) { // Enquanto as fontes não carregam, mostro a splash art
    return <AppLoading />;
  } else {

    return (
      <>
        <AppStack />
        <StatusBar style="light" />
      </>
    );
  }
}

