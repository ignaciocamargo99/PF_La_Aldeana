import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Image } from 'react-native';
import { Colors, DebugInstructions, Header, LearnMoreLinks, ReloadInstructions, } from 'react-native/Libraries/NewAppScreen';
import stylesImg from '../styles/imageStyle';

const Section = ({ children, title }) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Image source={require('../images/logo_expandido.png')} style={styles.image} />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Section title="Step One">
            Bienvenido/a <Text style={styles.highlight}>Ignacio</Text>
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  image:{
    width:'100%',
    height:'70%',
    // position:'absolute',
    // left:0,
    // bottom:0,
    // right:0,
    // top:0,
    // resizeMode:'contain'
  }
});

export default App;
