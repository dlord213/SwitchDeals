import {View, Text, Image, Pressable} from 'react-native';
import {darkPalettes, lightPalettes} from '../types/Palettes';
import {CardProps} from '../types/CardProps';

export const Card = (props: CardProps) => {
  let bg;
  let textColor;

  if (props.cardTheme == true) {
    bg = darkPalettes.background;
    textColor = darkPalettes.text;
  } else {
    bg = lightPalettes.background;
    textColor = lightPalettes.accent;
  }

  return (
    <Pressable onPress={props.onPress}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginVertical: 2,
          backgroundColor: bg,
          borderRadius: 8,
          gap: 8,
          marginRight: 4,
          flexGrow: 1,
        }}>
        <Image
          source={{
            uri: props.imageUri,
          }}
          style={{
            width: 150,
            borderRadius: 8,
          }}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 8,
            flexWrap: 'wrap',
            width: 170,
            justifyContent: 'center',
          }}>
          <View
            style={{
              flexShrink: 1,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: textColor,
              }}>
              {props.title}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 4,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: 'grey',
                textDecorationLine: 'line-through',
              }}>
              {props.oldPrice}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: textColor,
                fontWeight: 'bold',
              }}>
              {props.discountedPrice}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              color: textColor,
            }}>
            {props.dateEnds}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
