import style from './styles.less';

const loginPortalMetaData = {
  internal: {
    bg: style.workBenchBg,
    login: style.googleLogin,
    tabStyle: 'workBenchTabs',
  },
  external: {
    bg: style.inviand,
    login: style.privateLogin,
    tabStyle: 'inviandTabs',
  },
  public: {
    bg: style.public,
    login: style.publicLogin,
    tabStyle: 'publicTabs',
  },
};

export default loginPortalMetaData;
