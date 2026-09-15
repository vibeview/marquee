import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, StyleSheet, Text, View } from 'react-native';

import { byId } from '../data';
import type { RootStackParamList } from '../navigation';
import { POSTERS } from '../posters';
import { colors, s } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Player'>;

export const PLAY_SECONDS = 30;

// No real video: the poster darkened behind, the title, and a bar that fills
// over 30 seconds. Back (Menu / BACK) returns to Detail.
export function PlayerScreen({ route }: Props) {
  const title = byId(route.params.id);
  const progress = useRef(new Animated.Value(0)).current;
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const anim = Animated.timing(progress, {
      toValue: 1,
      duration: PLAY_SECONDS * 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    });
    anim.start();
    const started = Date.now();
    const tick = setInterval(() => {
      setElapsed(Math.min(PLAY_SECONDS, Math.floor((Date.now() - started) / 1000)));
    }, 500);
    return () => {
      anim.stop();
      clearInterval(tick);
    };
  }, [progress]);

  if (!title) return <View style={styles.screen} />;

  const width = progress.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] });
  const percent = Math.round((elapsed / PLAY_SECONDS) * 100);

  return (
    <View style={styles.screen}>
      <Image source={POSTERS[title.id]} style={styles.backdrop} resizeMode="cover" blurRadius={12} />
      <View style={styles.scrim} />
      <View style={styles.content}>
        <Text testID="player.title" accessibilityRole="header" style={styles.title}>
          {title.title}
        </Text>
        <Text style={styles.meta}>{`${title.genre} · ${title.year}`}</Text>
        <View
          testID="player.progress"
          accessibilityRole="progressbar"
          accessibilityLabel="Progress"
          accessibilityValue={{ min: 0, max: 100, now: percent, text: `${percent}%` }}
          style={styles.track}
        >
          <Animated.View style={[styles.fill, { width }]} />
        </View>
        <Text testID="player.time" style={styles.time}>
          {`${fmt(elapsed)} / ${fmt(PLAY_SECONDS)}`}
        </Text>
      </View>
    </View>
  );
}

const fmt = (sec: number) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.45,
  },
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 16, 20, 0.62)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: s(140),
    paddingBottom: s(120),
  },
  title: {
    fontSize: s(72),
    fontWeight: '700',
    color: colors.ink,
  },
  meta: {
    marginTop: s(8),
    fontSize: s(28),
    color: colors.inkSecondary,
  },
  track: {
    marginTop: s(40),
    height: s(12),
    borderRadius: s(6),
    backgroundColor: 'rgba(242, 241, 236, 0.22)',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.accent,
  },
  time: {
    marginTop: s(16),
    fontSize: s(24),
    color: colors.inkSecondary,
  },
});
