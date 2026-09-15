// Dynamic config on top of app.json: only the build number changes here.
// VibeView sets VIBEVIEW_BUILD_NUMBER for production cloud builds with
// build.autoIncrement enabled; local and debug builds fall back to 1.
// Every build of this project targets TV, so EXPO_TV is forced on here as
// well as in package.json scripts and vibeview.json — nobody has to remember.
process.env.EXPO_TV = process.env.EXPO_TV || '1';

const buildNumber = process.env.VIBEVIEW_BUILD_NUMBER;

module.exports = ({ config }) => ({
  ...config,
  ios: { ...config.ios, buildNumber: buildNumber ?? '1' },
  android: { ...config.android, versionCode: parseInt(buildNumber ?? '1', 10) },
});
