import React, {useEffect, useState, useRef} from 'react';
import * as Animatable from 'react-native-animatable';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Animated,
} from 'react-native';
import {lightPalettes} from '../types/Palettes';

export default function SplashPage({navigation}, props) {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor={lightPalettes.accent} />
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}>
        <Animatable.Text
          style={{
            color: lightPalettes.accent,
            fontSize: 36,
            fontWeight: 'bold',
          }}
          animation="flash"
          easing="ease-in-out"
          iterationCount="infinite"
          duration={5000}>
          SwitchDeals
        </Animatable.Text>
      </View>
    </SafeAreaView>
  );
}
