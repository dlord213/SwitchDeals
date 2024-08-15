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
        padding: 16,
        backgroundColor: _bg,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
      }}>
      <Text
        style={{
          fontSize: 36,
          fontWeight: 'bold',
          color: _primaryTextStyle,
        }}>
        SwitchDeals
      </Text>
    </View>
  );
};
