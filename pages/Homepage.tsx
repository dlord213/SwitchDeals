import {useState, useEffect} from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';
import {SafeAreaView, ScrollView, useColorScheme} from 'react-native';
import MainStatusBar from '../components/MainStatusBar';
import {LandingSection} from '../components/LandingSection';
import {DealsSection} from '../components/DealsSection';
import {LoadingFallbackRender} from '../components/LoadingFallbackRender';
import {darkStyles, lightStyles} from '../styles/Styles';
import {FooterSection} from '../components/FooterSection';

export default function Homepage({navigation, homeTheme}) {
  const [theme, setTheme] = useState(homeTheme);
  const themeMode = useColorScheme() === theme;
  const [hottestDealsData, setHottestDealsData] = useState(undefined);
  const [recentPriceDropsData, setRecentPriceDropsData] = useState(undefined);
  const [hottestDealsDataLoaded, setHottestDealsDataLoaded] = useState(false);
  const [recentPriceDropsDataLoaded, setRecentPriceDropsDataLoaded] =
    useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const getHottestDealsData = async () => {
      let index = 0;
      const response = await axios.get(
        'https://www.dekudeals.com/hottest?filter[store]=eshop',
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
            'https://www.dekudeals.com' +
            $(deal).find('.main-link').attr('href'),
        };
        if (index < 10) {
          ++index;
          deals.push(dealData);
        }
      }

      setHottestDealsData(deals);
      setHottestDealsDataLoaded(true);
    };
    const getRecentDealsData = async () => {
      let index = 0;
      const response = await axios.get(
        'https://www.dekudeals.com/recent-drops',
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
          link:
            'https://www.dekudeals.com' +
            $(deal).find('.main-link').attr('href'),
          dateEnds: $(deal).find('small').text().trim(),
        };
        if (index < 10) {
          ++index;
          deals.push(dealData);
        }
      }

      setRecentPriceDropsData(deals);
      setRecentPriceDropsDataLoaded(true);
    };

    const getData = async () => {
      getHottestDealsData();
      getRecentDealsData();
      if (hottestDealsDataLoaded && recentPriceDropsDataLoaded) {
        setDataLoaded(true);
      }
    };

    if (dataLoaded == false) {
      getData();
    }
  }, [hottestDealsDataLoaded, recentPriceDropsDataLoaded, dataLoaded]);

  return (
    <ScrollView style={themeMode ? darkStyles.body : lightStyles.body}>
      <SafeAreaView style={themeMode ? darkStyles.body : lightStyles.body}>
        <MainStatusBar theme={themeMode} />
        <LandingSection theme={themeMode} />
        {dataLoaded ? (
          <>
            <DealsSection
              theme={themeMode}
              title="Hottest Deals"
              data={hottestDealsData}
              btnOnPress={() => {
                navigation.navigate('Hottest-Deals', {
                  pageTheme: themeMode,
                  data: hottestDealsData,
                });
              }}
              cardPress={navigation.push}
            />
            <DealsSection
              theme={themeMode}
              title="Recent Price Drops"
              data={recentPriceDropsData}
              cardPress={navigation.push}
              display={'none'}
            />
          </>
        ) : (
          <LoadingFallbackRender theme={theme} />
        )}
        <FooterSection
          themeValue={themeMode}
          switchOnValueChange={() => {
            if (theme == 'light') {
              setTheme('dark');
            } else {
              setTheme('light');
            }
          }}
        />
      </SafeAreaView>
    </ScrollView>
  );
}
