import {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import {darkStyles, lightStyles} from '../styles/Styles';
import {darkPalettes, lightPalettes} from '../types/Palettes';
import {DealsSection, RenderCards} from '../components/DealsSection';
import {Card} from '../components/Card';
import PressableLink from '../components/PressableLink';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import * as cheerio from 'cheerio';
import axios from 'axios';

const PageCards = props => {
  return (
    <Pressable
      key={props.keyIndex}
      onPress={props.onPress}
      style={({pressed}) => [
        {
          width: '45%',
          backgroundColor: props.cardBg,
          margin: 4,
          opacity: pressed ? 0.8 : 1,
        },
      ]}>
      <View
        style={{
          borderRadius: 8,
        }}>
        <Image
          source={{
            uri: props.imageUri,
          }}
          resizeMode="cover"
          style={{
            width: '100%',
            height: 150,
            borderRadius: 8,
          }}
        />
        <View
          style={{
            padding: 8,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: props.textColor,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {props.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              style={{
                textDecorationLine: 'line-through',
                marginRight: 8,
                fontSize: 16,
                color: 'gray',
              }}>
              {props.oldPrice}
            </Text>
            <Text
              style={{
                color: props.textColor,
                fontWeight: 'bold',
                fontSize: 16,
              }}>
              {props.discountedPrice}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

async function getData({page, dataArray}) {
  const response = await axios.get(
    `https://www.dekudeals.com/hottest?page=${page}`,
  );
  const data = response.data;

  const $ = cheerio.load(data);
  const parseDeals = $('.col-xl-2.col-lg-3.col-sm-4.col-6.cell');

  const deals = [];

  for (const deal of parseDeals) {
    const dealData = {
      title: $(deal).find('.main-link > .h6.name').text().trim(),
      imageUri: $(deal).find('.main-link > .responsive-img').attr('src'),
      oldPrice: $(deal).find('.card-badge > .text-muted').text().trim(),
      discountedPrice: $(deal).find('.card-badge > strong').text().trim(),
      percentage: $(deal)
        .find('.card-badge > .align-text-bottom.badge.badge-danger')
        .text()
        .trim(),
      dateEnds: $(deal).find('small').text().trim(),
      link:
        'https://www.dekudeals.com' + $(deal).find('.main-link').attr('href'),
    };
    deals.push(dealData);
  }

  return deals;
}

export default function HottestDealPage({route, navigation}) {
  const {pageTheme, data} = route.params;

  const [currentPage, setCurrentPage] = useState(1);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [pageData, setPageData] = useState(data);
  const [currentData, setCurrentData] = useState(pageData);
  const [fetchURL, setFetchURL] = useState(
    `https://www.dekudeals.com/hottest?page=${currentPage}`,
  );

  let bg;
  let cardBg;
  let textColor;
  let badgeColor;

  if (pageTheme == true) {
    bg = darkPalettes.background;
    cardBg = darkPalettes.background;
    textColor = darkPalettes.text;
    badgeColor = darkPalettes.secondary;
  } else {
    bg = 'white';
    cardBg = 'white';
    textColor = lightPalettes.accent;
    badgeColor = lightPalettes.accent;
  }

  useEffect(() => {
    if (pageTheme == true) {
      navigation.setOptions({
        headerStyle: {
          backgroundColor: darkPalettes.background,
        },
        headerTitleAlign: 'center',
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
        statusBarColor: lightPalettes.accent,
        statusBarStyle: 'light',
        headerTintColor: 'white',
      });
    }

    console.log('PAGE - ' + currentPage);
    console.log(fetchURL);
    setFetchURL(`https://www.dekudeals.com/hottest?page=${currentPage}`);
    setCurrentData(pageData);
  }, [pageTheme, navigation, pageData, currentPage, fetchURL]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: bg,
        flexGrow: 1,
      }}>
      <View>
        <Text
          style={{
            color: textColor,
            marginHorizontal: 16,
            marginVertical: 8,
            fontSize: 48,
            fontWeight: '200',
          }}>
          Page {currentPage}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 16,
            marginVertical: 4,
          }}>
          <PressableLink
            icon={faArrowLeft}
            iconColor={bg}
            text="Previous"
            textColor={bg}
            backgroundColor={textColor}
            display={isFirstPage ? 'none' : 'flex'}
            onPress={async () => {
              setPageData({});
              setCurrentPage(currentPage - 1);
              if (currentPage == 1) {
                setIsFirstPage(true);
              }

              const response = await axios.get(fetchURL);
              const data = response.data;

              const $ = cheerio.load(data);
              const parseDeals = $('.col-xl-2.col-lg-3.col-sm-4.col-6.cell');

              const deals = [];

              for (const deal of parseDeals) {
                const dealData = {
                  title: $(deal).find('.main-link > .h6.name').text().trim(),
                  imageUri: $(deal)
                    .find('.main-link > .responsive-img')
                    .attr('src'),
                  oldPrice: $(deal)
                    .find('.card-badge > .text-muted')
                    .text()
                    .trim(),
                  discountedPrice: $(deal)
                    .find('.card-badge > strong')
                    .text()
                    .trim(),
                  percentage: $(deal)
                    .find('.card-badge > .align-text-bottom.badge.badge-danger')
                    .text()
                    .trim(),
                  dateEnds: $(deal).find('small').text().trim(),
                  link:
                    'https://www.dekudeals.com' +
                    $(deal).find('.main-link').attr('href'),
                };
                deals.push(dealData);
              }
              setPageData(deals);
            }}
          />
          <PressableLink
            icon={faArrowRight}
            iconColor={bg}
            text="Next"
            textColor={bg}
            backgroundColor={textColor}
            invertedIcon={true}
            onPress={async () => {
              setPageData({});
              setCurrentPage(currentPage + 1);
              setIsFirstPage(false);

              const response = await axios.get(fetchURL);
              const data = response.data;

              const $ = cheerio.load(data);
              const parseDeals = $('.col-xl-2.col-lg-3.col-sm-4.col-6.cell');

              const deals = [];

              for (const deal of parseDeals) {
                const dealData = {
                  title: $(deal).find('.main-link > .h6.name').text().trim(),
                  imageUri: $(deal)
                    .find('.main-link > .responsive-img')
                    .attr('src'),
                  oldPrice: $(deal)
                    .find('.card-badge > .text-muted')
                    .text()
                    .trim(),
                  discountedPrice: $(deal)
                    .find('.card-badge > strong')
                    .text()
                    .trim(),
                  percentage: $(deal)
                    .find('.card-badge > .align-text-bottom.badge.badge-danger')
                    .text()
                    .trim(),
                  dateEnds: $(deal).find('small').text().trim(),
                  link:
                    'https://www.dekudeals.com' +
                    $(deal).find('.main-link').attr('href'),
                };
                deals.push(dealData);
              }
              setPageData(deals);
            }}
          />
        </View>
        <FlatList
          data={currentData}
          style={{
            marginBottom: 250,
          }}
          renderItem={({item, index}) => (
            <PageCards
              keyIndex={index}
              title={item.title}
              imageUri={item.imageUri}
              dateEnds={item.dateEnds}
              discountedPrice={item.discountedPrice}
              oldPrice={item.oldPrice}
              currency={item.currency}
              percentage={item.percentage}
              onPress={() => {
                console.log(item.title);
              }}
              cardBg={cardBg}
              textColor={textColor}
              badgeColor={badgeColor}
              badgeBg={bg}
              onPress={() => {
                navigation.push('Game-Info', {
                  data: item,
                  theme: pageTheme,
                });
              }}
            />
          )}
          keyExtractor={item => item.title}
          horizontal={false}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-evenly'}}
        />
      </View>
    </SafeAreaView>
  );
}
