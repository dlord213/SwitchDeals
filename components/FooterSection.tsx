import {View, Text, Switch, Pressable} from 'react-native';
import {darkPalettes, lightPalettes} from '../types/Palettes';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGear, faInfo, faUsd} from '@fortawesome/free-solid-svg-icons';
import PressableLink from './PressableLink';

const DarkHeader = (props: any) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text style={{fontWeight: 'bold', color: 'white', fontSize: 32}}>
        SwitchDeals
      </Text>
      <Switch
        value={props.themeValue}
        onValueChange={props.switchOnValueChange}
      />
    </View>
  );
};

const DarkSettings = (props: any) => {
  return (
    <>
      <PressableLink
        icon={faGear}
        text="Options"
        fontSize={16}
        backgroundColor={darkPalettes.accent}
        iconColor={darkPalettes.text}
        textColor={darkPalettes.text}
        marginVertical={4}
      />
      <PressableLink
        icon={faUsd}
        text="Region"
        fontSize={16}
        backgroundColor={darkPalettes.accent}
        iconColor={darkPalettes.text}
        textColor={darkPalettes.text}
        marginVertical={4}
      />
      <PressableLink
        icon={faInfo}
        text="About"
        fontSize={16}
        backgroundColor={darkPalettes.accent}
        iconColor={darkPalettes.text}
        textColor={darkPalettes.text}
        marginVertical={4}
      />
    </>
  );
};

const LightHeader = (props: any) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          color: lightPalettes.accent,
          fontSize: 32,
        }}>
        SwitchDeals
      </Text>
      <Switch
        value={props.themeValue}
        onValueChange={props.switchOnValueChange}
      />
    </View>
  );
};

const LightSettings = (props: any) => {
  return (
    <>
      <PressableLink
        icon={faGear}
        text="Options"
        fontSize={16}
        backgroundColor={lightPalettes.background}
        pressedBackgroundColor={lightPalettes.background}
        iconColor={lightPalettes.accent}
        textColor={lightPalettes.accent}
        marginVertical={4}
      />
      <PressableLink
        icon={faUsd}
        text="Region"
        fontSize={16}
        backgroundColor={lightPalettes.background}
        pressedBackgroundColor={lightPalettes.background}
        iconColor={lightPalettes.accent}
        textColor={lightPalettes.accent}
        marginVertical={4}
      />
      <PressableLink
        icon={faInfo}
        text="About"
        fontSize={16}
        backgroundColor={lightPalettes.background}
        pressedBackgroundColor={lightPalettes.background}
        iconColor={lightPalettes.accent}
        textColor={lightPalettes.accent}
        marginVertical={4}
      />
    </>
  );
};

export const FooterSection = (props: any) => {
  if (props.theme == 'dark') {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 16,
          margin: 8,
          backgroundColor: darkPalettes.accent,
          borderRadius: 8,
        }}>
        <DarkHeader
          themeValue={props.themeValue}
          switchOnValueChange={props.switchOnValueChange}
        />
        <DarkSettings />
      </View>
    );
  } else {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: 16,
          margin: 8,
          backgroundColor: lightPalettes.background,
          borderRadius: 8,
        }}>
        <LightHeader
          themeValue={props.themeValue}
          switchOnValueChange={props.switchOnValueChange}
        />
        <LightSettings />
      </View>
    );
  }
};
