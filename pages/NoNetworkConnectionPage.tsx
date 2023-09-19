import {View, Text, SafeAreaView} from 'react-native';
import {lightPalettes} from '../types/Palettes';

export default function NoNetworkPage() {
  return (
    <SafeAreaView>
      <View
        style={{
          padding: 16,
          backgroundColor: lightPalettes.accent,
          justifyContent: 'flex-end',
        }}>
        <Text
          style={{
            fontSize: 48,
            color: 'white',
            fontWeight: 'bold',
          }}>
          No network connection
        </Text>
      </View>
    </SafeAreaView>
  );
}
