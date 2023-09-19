import {View, Text, FlatList} from 'react-native';
import React from 'react';
import {Card} from './Card';
import PressableLink from './PressableLink';
import {faList} from '@fortawesome/free-solid-svg-icons';
import {darkPalettes, lightPalettes} from '../types/Palettes';
import {darkStyles, lightStyles} from '../styles/Styles';

export function RenderCards(props: any) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
      }}>
      <FlatList
        data={props.data}
        renderItem={({item}) => (
          <Card
            title={item.title}
            imageUri={item.imageUri}
            dateEnds={item.dateEnds}
            discountedPrice={item.discountedPrice}
            oldPrice={item.oldPrice}
            cardTheme={props.cardTheme}
            onPress={() => {
              props.cardPress('Game-Info', {
                data: item,
                theme: props.cardTheme,
              });
            }}
          />
        )}
        keyExtractor={item => item.title}
        horizontal={true}
        initialNumToRender={2}
      />
    </View>
  );
}

function Header(props: any) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
      }}>
      <Text
        style={{
          fontSize: 36,
          color: props.textStyle,
          fontWeight: 'bold',
        }}>
        {props.title}
      </Text>
    </View>
  );
}

export const DealsSection = (props: any) => {
  return (
    <View
      style={props.theme ? darkStyles.dealsSection : lightStyles.dealsSection}>
      <Header
        textStyle={props.theme ? darkPalettes.text : lightPalettes.accent}
        title={props.title}
      />
      <RenderCards
        data={props.data}
        cardTheme={props.theme}
        cardPress={props.cardPress}
      />
      <View style={{marginVertical: 8}}>
        <PressableLink
          icon={faList}
          text="View more deals"
          display={props.display}
          backgroundColor={
            props.theme ? darkPalettes.background : lightPalettes.secondary
          }
          pressedBackgroundColor={
            props.theme ? darkPalettes.background : lightPalettes.secondary
          }
          textColor={props.theme ? darkPalettes.text : lightPalettes.accent}
          iconColor={props.theme ? darkPalettes.accent : lightPalettes.accent}
          fontSize={16}
          iconSize={16}
          align="flex-start"
          onPress={props.btnOnPress}
        />
      </View>
    </View>
  );
};
