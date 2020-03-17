import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import de from 'vuetify/es5/locale/de';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    // dark: true,
    options: {
      customProperties: true,
    },
    themes: {
      // light: {
      //   primary: '#ee44aa',
      //   secondary: '#424242',
      //   accent: '#82B1FF',
      //   error: '#FF5252',
      //   info: '#2196F3',
      //   success: '#4CAF50',
      //   warning: '#FFC107'
      // },
      light: {
        primary: '#212121',
        secondary: '#212121',
        accent: '#EF6C00',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
  lang: {
    locales: { de },
    current: 'de',
  },
  icons: {
    iconfont: 'md',
  },
});
