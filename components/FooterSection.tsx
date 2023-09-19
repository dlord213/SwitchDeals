import {View, Text, Switch, Alert, Linking} from 'react-native';
import {darkPalettes, lightPalettes} from '../types/Palettes';
import {faGear, faInfo, faUsd} from '@fortawesome/free-solid-svg-icons';
import PressableLink from './PressableLink';

export const FooterSection = (props: any) => {
  let bg;
  let textColor;
  let iconColor;
  let pressedBackgroundColor;

  if (props.themeValue == true) {
    bg = darkPalettes.accent;
    textColor = darkPalettes.text;
  } else {
    bg = lightPalettes.background;
    textColor = lightPalettes.accent;
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 16,
        margin: 8,
        backgroundColor: bg,
        borderRadius: 8,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontWeight: 'bold', color: textColor, fontSize: 32}}>
          SwitchDeals
        </Text>
        <Switch
          value={props.themeValue}
          onValueChange={props.switchOnValueChange}
        />
      </View>

      <PressableLink
        icon={faInfo}
        text="About"
        fontSize={16}
        backgroundColor={bg}
        pressedBackgroundColor={bg}
        iconColor={textColor}
        textColor={textColor}
        marginVertical={4}
        onPress={() => {
          Alert.alert(
            'About',
            'Made on bare React Native CLI with few libraries and scrapes DekuDeals.',
            [
              {
                text: 'Visit DekuDeals',
                onPress: () => Linking.openURL('https://www.dekudeals.com/'),
                style: 'default',
              },
              {
                text: 'OK',
                style: 'cancel',
              },
            ],
          );
        }}
      />
    </View>
  );
};
