import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { byId } from '../data';
import type { RootStackParamList } from '../navigation';
import { POSTERS } from '../posters';
import { useMyList } from '../store';
import { colors, s } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export function DetailScreen({ navigation, route }: Props) {
  const title = byId(route.params.id);
  const myList = useMyList();
  if (!title) {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Unknown title</Text>
      </View>
    );
  }
  const inList = myList.has(title.id);
  return (
    <View style={styles.screen}>
      <Image source={POSTERS[title.id]} style={styles.poster} resizeMode="cover" />
      <View style={styles.column}>
        <Text testID="detail.title" accessibilityRole="header" style={styles.title}>
          {title.title}
        </Text>
        <Text testID="detail.meta" style={styles.meta}>
          {`${title.genre} · ${title.year}`}
        </Text>
        <Text testID="detail.blurb" style={styles.blurb}>
          {title.blurb}
        </Text>
        <View style={styles.buttons}>
          <Button
            testID="detail.watch"
            label="Watch"
            preferred
            onPress={() => navigation.navigate('Player', { id: title.id })}
          />
          <Button
            testID="detail.mylist"
            label={inList ? 'In my list' : 'Add to my list'}
            done={inList}
            onPress={() => myList.toggle(title.id)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.background,
    paddingHorizontal: s(120),
    paddingVertical: s(120),
  },
  poster: {
    width: s(520),
    height: s(780),
    borderRadius: s(16),
    backgroundColor: colors.card,
  },
  column: {
    flex: 1,
    paddingLeft: s(96),
    justifyContent: 'center',
  },
  title: {
    fontSize: s(64),
    fontWeight: '700',
    color: colors.ink,
  },
  meta: {
    marginTop: s(12),
    fontSize: s(28),
    color: colors.inkSecondary,
  },
  blurb: {
    marginTop: s(36),
    fontSize: s(28),
    lineHeight: s(42),
    color: colors.ink,
    maxWidth: s(980),
  },
  buttons: {
    flexDirection: 'row',
    marginTop: s(56),
  },
});
