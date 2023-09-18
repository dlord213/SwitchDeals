import {darkPalettes, lightPalettes} from '../types/Palettes';
import {StyleSheet} from 'react-native';

export const darkStyles = StyleSheet.create({
  body: {
    backgroundColor: darkPalettes.background,
    color: darkPalettes.text,
  },
  headerSection: {
    display: 'flex',
    flexDirection: 'row',
    padding: 16,
    backgroundColor: darkPalettes.accent,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: 'space-between',
  },
  dealsSection: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    color: darkPalettes.text,
    backgroundColor: darkPalettes.background,
    justifyContent: 'center',
  },
});

export const lightStyles = StyleSheet.create({
  body: {
    backgroundColor: lightPalettes.accent,
  },
  text: {
    color: lightPalettes.text,
  },
  text_grey: {
    color: 'grey',
  },
  headerSection: {
    display: 'flex',
    flexDirection: 'row',
    padding: 16,
    margin: 8,
    backgroundColor: lightPalettes.accent,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: 'space-between',
  },
  dealsSection: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    margin: 8,
    backgroundColor: lightPalettes.secondary,
    borderRadius: 8,
    justifyContent: 'center',
  },
});
