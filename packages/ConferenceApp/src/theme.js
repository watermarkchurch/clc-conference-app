import { Platform } from 'react-native';

const colors = {
  primary: '#EF5E24',
  secondary: '#F8A61A',
  tertiary: '#3E2B2E',
  screen: '#FCFCFC',
  paper: '#FFFFFF',
  alert: '#c64f55',

  // Dark shades
  darkPrimary: '#303030',
  darkSecondary: '#868686',
  darkTertiary: '#C7C7C7',

  // Light shades
  lightPrimary: '#F7F7F7',
  lightSecondary: '#DDDDDD',
  lightTertiary: '#868686',

  // Statics
  wordOfChrist: '#8b0000', // only used in Scripture.
};

const typography = {
  baseFontSize: 16,
  baseLineHeight: 23.04, // 1.44 ratio
  ...Platform.select({
    ios: {
      sans: {
        regular: {
          default: 'AvenirNext-Regular',
          italic: 'AvenirNext-Regular',
        },
        medium: {
          default: 'AvenirNext-DemiBold',
          italic: 'AvenirNext-DemiBold',
        },
        bold: {
          default: 'AvenirNext-Bold',
          italic: 'AvenirNext-Bold',
        },
        black: {
          default: 'AvenirNext-Bold',
          italic: 'AvenirNext-Bold',
        },
      },
    },
    android: {},
  }),
};

const overrides = {
  H1: {
    fontSize: 34,
  },
  H2: {
    fontSize: 26,
  },
  H3: {
    fontSize: 19,
  },
  H4: {
    fontSize: 16,
  },
  H5: {
    fontSize: 14,
  },
  H6: {
    fontSize: 12,
    textTransform: 'uppercase',
  },
};

export default {
  colors,
  typography,
  overrides,
};
