import React, { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, s } from '../theme';

type Props = {
  testID: string;
  label: string;
  done?: boolean;
  preferred?: boolean;
  onPress: () => void;
};

// Focused: accent fill. Not focused: done-green when `done`, otherwise card.
export function Button({ testID, label, done = false, preferred = false, onPress }: Props) {
  const [focused, setFocused] = useState(false);
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={label}
      hasTVPreferredFocus={preferred}
      tvParallaxProperties={{ enabled: false }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onPress={onPress}
      style={[styles.button, done && styles.done, focused && styles.focused]}
    >
      <Text style={[styles.label, focused && styles.labelFocused]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minWidth: s(260),
    paddingHorizontal: s(36),
    paddingVertical: s(18),
    borderRadius: s(12),
    backgroundColor: colors.card,
    marginRight: s(24),
    alignItems: 'center',
  },
  done: {
    backgroundColor: colors.done,
  },
  focused: {
    backgroundColor: colors.accent,
    transform: [{ scale: 1.06 }],
  },
  label: {
    fontSize: s(28),
    fontWeight: '600',
    color: colors.ink,
  },
  labelFocused: {
    color: colors.ink,
  },
});
