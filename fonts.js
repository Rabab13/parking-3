import { Platform } from 'react-native';

const fontFamilies = {
  Inter: {
    regular: require('./assets/fonts/Inter_regular.ttf'),
    thin: require('./assets/fonts/Inter_thin.ttf'),
    medium: require('./assets/fonts/Inter_medium.ttf'),
    semibold: require('./assets/fonts/Inter_semibold.ttf'),
  },
  'DM Sans': {
    regular: require('./assets/fonts/DM_Sans_regular.ttf'),
    medium: require('./assets/fonts/DM_Sans_medium.ttf'),
    bold: require('./assets/fonts/DM_Sans_bold.ttf'),
  },
  Georama: {
    regular: require('./assets/fonts/Georama.ttf'),
    extrabold: require('./assets/fonts/Georama_extrabold.ttf'),
  },
};

const getFontFamily = (fontName) => {
  const font = fontFamilies[fontName];
  if (Platform.OS === 'ios') {
    return {
      fontFamily: font[Object.keys(font)[0]].fontName,
    };
  } else {
    return {
      fontFamily: font[Object.keys(font)[0]],
    };
  }
};

export { getFontFamily };
