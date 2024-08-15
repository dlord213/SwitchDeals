import {useState, useEffect} from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {Image} from 'react-native-animatable';
import {darkPalettes, lightPalettes} from '../types/Palettes';
import PressableLink from '../components/PressableLink';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';

const LoadingSkeleton = props => {
  return (
    <View
      style={{
        display: 'flex',
      }}>
      <Image
        source={{
          uri: props.imageUri,
        }}
        resizeMode="cover"
        style={{
          height: 350,
        }}
      />
      <View
        style={{
          padding: 16,
        }}>
        <Text
          style={{
            color: props.textColor,
            fontSize: 36,
            fontWeight: 'bold',
          }}>
          {props.title}
        </Text>
        <Text
          style={{
            color: props.textColor,
            fontSize: 16,
          }}
        />
        <ActivityIndicator size={96} color={props.textColor} />
      </View>
    </View>
  );
};

function HeadingSection(props) {
  return (
    <Text
      style={{
        color: props.textColor,
        fontSize: 36,
        fontWeight: 'bold',
      }}>
      {props.title}
    </Text>
  );
}

function Prices(props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 8,
      }}>
      <Text
        style={{
          color: 'grey',
          fontSize: 16,
          textDecorationLine: 'line-through',
          marginRight: 8,
        }}>
        {props.oldPrice}
      </Text>
      <Text
        style={{
          color: props.textColor,
          fontSize: 16,
          fontWeight: 'bold',
        }}>
        {props.discountedPrice}
      </Text>
    </View>
  );
}

function GameSection(props) {
  return (
    <>
      <Text
        style={{
          color: props.descTextColor,
          fontWeight: 'bold',
          fontSize: 28,
          marginTop: 16,
        }}>
        Game
      </Text>
      <Text
        style={{
          color: props.descTextColor,
          fontSize: 16,
        }}>
        {props.description}
      </Text>
    </>
  );
}

function ScreenshotsSection(props) {
  return (
    <>
      <ScrollView
        horizontal={true}
        style={{
          flex: 1,
          flexWrap: 'wrap',
          marginVertical: 16,
        }}>
        {props.images.map((imageUri, index) => (
          <Image
            source={{
              uri: imageUri,
            }}
            resizeMode="center"
            style={{
              width: 320,
              height: 180,
              margin: 2,
            }}
            key={index}
          />
        ))}
      </ScrollView>
    </>
  );
}

const RenderGameInfo = props => {
  return (
    <View>
      <Image
        source={{
          uri: props.imageUri,
        }}
        resizeMode="cover"
        style={{
          height: 350,
        }}
      />
      <View
        style={{
          padding: 16,
        }}>
        <HeadingSection textColor={props.textColor} title={props.title} />
        <PressableLink
          text="View in DekuDeals"
          icon={faPaperPlane}
          iconColor={props.descTextColor}
          textColor={props.descTextColor}
          onPress={() => {
            Linking.openURL(props.link);
          }}
        />
        <Prices
          oldPrice={props.oldPrice}
          textColor={props.textColor}
          discountedPrice={props.discountedPrice}
        />
        <ScreenshotsSection images={props.images} />
        <GameSection
          description={props.description}
          descTextColor={props.descTextColor}
        />
      </View>
    </View>
  );
};

export default function GameInfo({route, navigation}) {
  const {data, theme} = route.params;
  const [fetchedGameData, setFetchedGameData] = useState();
  const [fetchedState, setFetchedState] = useState(false);

  let bg;
  let headerBg;
  let cardBg;
  let textColor;
  let badgeColor;

  if (theme == true) {
    bg = darkPalettes.background;
    headerBg = darkPalettes.accent;
    cardBg = darkPalettes.background;
    textColor = darkPalettes.text;
    badgeColor = darkPalettes.secondary;
  } else {
    bg = 'white';
    headerBg = lightPalettes.accent;
    cardBg = 'white';
    textColor = lightPalettes.accent;
    badgeColor = lightPalettes.accent;
  }

  useEffect(() => {
    if (theme == true) {
      navigation.setOptions({
        headerStyle: {
          backgroundColor: darkPalettes.background,
        },
        headerTitleAlign: 'center',
        title: data.title,
        statusBarStyle: 'light',
        statusBarColor: darkPalettes.background,
        headerTintColor: 'white',
      });
    } else {
      navigation.setOptions({
        headerStyle: {
          backgroundColor: lightPalettes.accent,
        },
        headerTitleAlign: 'center',
        title: data.title,
        statusBarColor: lightPalettes.accent,
        statusBarStyle: 'light',
        headerTintColor: 'white',
      });
    }

    const getGameData = async () => {
      if (fetchedState == true) {
        setFetchedState(false);
      }
      const response = await axios.get(data.link);
      const fetchedData = response.data;

      const $ = cheerio.load(fetchedData);

      const gameData = {
        description: $('.row').find('.description > p').text(),
        screenshots: [],
      };

      $('#screenshotPreviews a').each((index, img) => {
        let fetchedImg = $(img).find('img').attr('data-src');
        gameData.screenshots.push(fetchedImg);
      });

      setFetchedGameData(gameData);
      setFetchedState(true);
    };

    if (fetchedState == false) {
      getGameData();
    }
  }, [data.link, data.title, headerBg, navigation, fetchedState, theme]);

  return (
    <SafeAreaView style={{backgroundColor: bg, flexGrow: 1}}>
      <ScrollView>
        {fetchedState ? (
          <RenderGameInfo
            title={data.title}
            imageUri={data.imageUri}
            oldPrice={data.oldPrice}
            discountedPrice={data.discountedPrice}
            textColor={textColor}
            descTextColor={textColor}
            cardBg={badgeColor}
            description={fetchedGameData.description}
            images={fetchedGameData.screenshots}
            link={data.link}
          />
        ) : (
          <LoadingSkeleton
            title={data.title}
            imageUri={data.imageUri}
            textColor={textColor}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
