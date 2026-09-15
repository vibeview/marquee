import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import type { Title } from '../data';
import { POSTERS } from '../posters';
import { colors, focusRingWidth, s } from '../theme';

export const POSTER_WIDTH = s(200);
export const POSTER_HEIGHT = s(300);

type Props = {
  title: Title;
  preferred: boolean;
  onFocus: (id: string) => void;
  onPress: (id: string) => void;
};

// A poster is a native-focusable Pressable: react-native-tvos drives focus,
// we only reflect it (scale up + accent ring) from the native onFocus/onBlur
// events, so the device's automation layer sees the same focus we draw.
export function Poster({ title, preferred, onFocus, onPress }: Props) {
  const [focused, setFocused] = useState(false);
  return (
    <Pressable
      testID={`poster.${title.id}`}
      accessibilityLabel={title.title}
      accessibilityRole="button"
      hasTVPreferredFocus={preferred}
      tvParallaxProperties={{ enabled: false }}
      onFocus={() => {
        setFocused(true);
        onFocus(title.id);
      }}
      onBlur={() => setFocused(false)}
      onPress={() => onPress(title.id)}
      style={[styles.slot, focused && styles.slotFocused]}
    >
      <View style={[styles.card, focused && styles.cardFocused]}>
        <Image source={POSTERS[title.id]} style={styles.image} resizeMode="cover" />
      </View>
      <Text numberOfLines={1} style={[styles.caption, focused && styles.captionFocused]}>
        {title.title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  slot: {
    width: POSTER_WIDTH,
    marginRight: s(28),
    alignItems: 'center',
  },
  slotFocused: {
    transform: [{ scale: 1.08 }],
  },
  card: {
    width: POSTER_WIDTH,
    height: POSTER_HEIGHT,
    borderRadius: s(10),
    overflow: 'hidden',
    backgroundColor: colors.card,
    borderWidth: focusRingWidth,
    borderColor: 'transparent',
  },
  cardFocused: {
    borderColor: colors.accent,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  caption: {
    marginTop: s(10),
    fontSize: s(20),
    color: colors.inkSecondary,
    maxWidth: POSTER_WIDTH,
  },
  captionFocused: {
    color: colors.ink,
  },
});
