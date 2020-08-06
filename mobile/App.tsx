import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Landing from './src/pages/Landing';
import { AppLoading } from 'expo'; // a splash art de quando o app ta carregando

import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

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
        <Landing />
        <StatusBar style="light" />
      </>
    );
  }
}

