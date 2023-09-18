import {StatusBar} from 'react-native';
import {darkPalettes, lightPalettes} from '../types/Palettes';

const MainStatusBar = (props: any) => {
  let themeMode = props.theme;

  return (
    <StatusBar
      backgroundColor={themeMode ? darkPalettes.accent : lightPalettes.accent}
      barStyle={themeMode ? 'dark-content' : 'light-content'}
      animated={true}
    />
  );
};

export default MainStatusBar;
