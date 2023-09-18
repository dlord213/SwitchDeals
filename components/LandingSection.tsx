import {View, Text} from 'react-native';
import {darkPalettes, lightPalettes} from '../types/Palettes';

export const LandingSection = (props: any) => {
  let themeMode = props.theme;
  let _primaryTextStyle;
  let _secondaryTextStyle;
  let _bg;

  if (themeMode == false) {
    _bg = lightPalettes.accent;
    _primaryTextStyle = 'white';
    _secondaryTextStyle = lightPalettes.secondary;
  } else {
    _bg = darkPalettes.accent;
    _primaryTextStyle = darkPalettes.text;
    _secondaryTextStyle = darkPalettes.text;
  }

  return (
    <View
      style={{
        padding: 48,
        backgroundColor: _bg,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
      }}>
      <Text
        style={{
          fontSize: 48,
          fontWeight: 'bold',
          color: _primaryTextStyle,
        }}>
        Welcome to SwitchDeals
      </Text>
      <Text style={{fontSize: 16, color: _secondaryTextStyle}}>
        Find the best deals here for your Nintendo Switch.
      </Text>
    </View>
  );
};
