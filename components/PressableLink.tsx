import {View, Text, Pressable} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const PressableLink = (props: any) => {
  if (props.invertedIcon == true) {
    return (
      <View
        style={{
          marginVertical: props.marginVertical,
          margin: props.marginAll,
          display: props.display,
        }}>
        <Pressable
          onPress={props.onPress}
          style={({pressed}) => [
            {
              backgroundColor: pressed
                ? props.pressedBackgroundColor
                : props.backgroundColor,
              opacity: pressed ? 0.8 : 1,
              padding: 8,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              borderRadius: 8,
              justifyContent: props.align,
              alignContent: props.align,
            },
          ]}>
          <Text style={{fontSize: props.fontSize, color: props.textColor}}>
            {props.text}
          </Text>
          <FontAwesomeIcon
            icon={props.icon}
            color={props.iconColor}
            size={props.iconSize}
          />
        </Pressable>
      </View>
    );
  } else {
    return (
      <View
        style={{
          marginVertical: props.marginVertical,
          margin: props.marginAll,
          display: props.display,
        }}>
        <Pressable
          onPress={props.onPress}
          style={({pressed}) => [
            {
              backgroundColor: pressed
                ? props.pressedBackgroundColor
                : props.backgroundColor,
              opacity: pressed ? 0.8 : 1,
              padding: 8,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              borderRadius: 8,
              justifyContent: props.align,
              alignContent: props.align,
            },
          ]}>
          <FontAwesomeIcon
            icon={props.icon}
            color={props.iconColor}
            size={props.iconSize}
          />
          <Text style={{fontSize: props.fontSize, color: props.textColor}}>
            {props.text}
          </Text>
        </Pressable>
      </View>
    );
  }
};

export default PressableLink;
