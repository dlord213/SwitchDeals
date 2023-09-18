import {View, Text, Image, Pressable} from 'react-native';
import {darkPalettes, lightPalettes} from '../types/Palettes';
import {CardProps} from '../types/CardProps';

function LightCard(props: any) {
  return (
    <Pressable onPress={props.onPress}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginVertical: 2,
          backgroundColor: lightPalettes.background,
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
                color: lightPalettes.accent,
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
              {props.currency}
              {props.oldPrice}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontWeight: 'bold',
              }}>
              {props.currency}
              {props.discountedPrice}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              color: 'black',
            }}>
            {props.dateEnds}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

function DarkCard(props: any) {
  return (
    <Pressable onPress={props.onPress}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginVertical: 2,
          backgroundColor: darkPalettes.background,
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
                color: darkPalettes.text,
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
              {props.currency}
              {props.oldPrice}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: 'white',
                fontWeight: 'bold',
              }}>
              {props.currency}
              {props.discountedPrice}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              color: 'white',
            }}>
            {props.dateEnds}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export const Card = (props: CardProps) => {
  if (props.cardTheme == false) {
    return (
      <LightCard
        onPress={props.onPress}
        imageUri={props.imageUri}
        title={props.title}
        oldPrice={props.oldPrice}
        discountedPrice={props.discountedPrice}
        dateEnds={props.dateEnds}></LightCard>
    );
  } else {
    return (
      <DarkCard
        onPress={props.onPress}
        imageUri={props.imageUri}
        title={props.title}
        oldPrice={props.oldPrice}
        discountedPrice={props.discountedPrice}
        dateEnds={props.dateEnds}></DarkCard>
    );
  }
};
