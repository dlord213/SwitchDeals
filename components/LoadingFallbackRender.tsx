import {View, ActivityIndicator} from 'react-native';
import {darkPalettes, lightPalettes} from '../types/Palettes';

export const LoadingFallbackRender = (props: any) => {
  let bg;
  let textColor;

  if (props.theme == 'light') {
    bg = lightPalettes.accent;
    textColor = 'white';
  } else {
    bg = darkPalettes.background;
    textColor = 'white';
  }

  return (
    <View
      style={{
        display: 'flex',
        padding: 32,
        margin: 8,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bg,
      }}>
      <ActivityIndicator size={64} color={textColor} />
    </View>
  );
};
