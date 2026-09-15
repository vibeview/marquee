import { Dimensions } from 'react-native';

// Dark only: this is a TV.
export const colors = {
  background: '#0F1014',
  card: '#1B1D24',
  ink: '#F2F1EC',
  inkSecondary: '#9A9DA8',
  accent: '#E6602A',
  done: '#2F8F78',
} as const;

// The layout is designed in 1920x1080 units. Apple TV reports 1920x1080
// points; the Android TV emulator reports 960x540 dp at 1080p. Scaling by
// window width keeps both looking the same.
const { width } = Dimensions.get('window');
const S = width / 1920;

export const s = (n: number): number => Math.round(n * S);

export const focusRingWidth = s(4);
