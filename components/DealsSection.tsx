import {View, Text, Button, FlatList} from 'react-native';
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
            currency={item.currency}
            cardTheme={props.cardTheme}
            onPress={() => {
              console.log(item.title);
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
        title={props.title}></Header>
      <RenderCards data={props.data} cardTheme={props.theme}></RenderCards>
      <View style={{marginVertical: 8}}>
        <PressableLink
          icon={faList}
          text="View more deals"
          backgroundColor={
            props.theme ? darkPalettes.background : lightPalettes.accent
          }
          pressedBackgroundColor={
            props.theme ? darkPalettes.background : lightPalettes.text
          }
          textColor={props.theme ? darkPalettes.text : 'white'}
          iconColor={props.theme ? darkPalettes.accent : 'white'}
          fontSize={16}
          iconSize={16}
          align={props.theme ? 'flex-start' : 'center'}
          onPress={props.btnOnPress}
        />
      </View>
    </View>
  );
};
