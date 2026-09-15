import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TVFocusGuideView, View } from 'react-native';

import { Poster } from '../components/Poster';
import { SHELVES, titlesOnShelf } from '../data';
import type { RootStackParamList } from '../navigation';
import { useMyList } from '../store';
import { colors, s } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const FIRST_ID = titlesOnShelf(SHELVES[0].id)[0].id;

export function HomeScreen({ navigation }: Props) {
  const myList = useMyList();
  // The poster that last held focus; restored when we come back from Detail.
  const lastFocused = useRef<string>(FIRST_ID);
  const [preferred, setPreferred] = useState<string | null>(FIRST_ID);

  useEffect(() => {
    // On return from Detail, re-assert focus on the poster that was opened.
    // hasTVPreferredFocus only acts when the prop changes, so it is cleared
    // and set again after the pop transition has settled.
    return navigation.addListener('focus', () => {
      setPreferred(null);
      const t = setTimeout(() => setPreferred(lastFocused.current), 450);
      return () => clearTimeout(t);
    });
  }, [navigation]);

  const onFocus = useCallback((id: string) => {
    lastFocused.current = id;
  }, []);

  const onPress = useCallback(
    (id: string) => {
      lastFocused.current = id;
      navigation.navigate('Detail', { id });
    },
    [navigation],
  );

  return (
    <View style={styles.screen}>
      <Text testID="home.title" accessibilityRole="header" style={styles.title}>
        Marquee
      </Text>
      {SHELVES.map((shelf) => (
        // autoFocus: entering a shelf from above/below lands on its first
        // poster the first time and on the last-focused poster afterwards.
        <TVFocusGuideView key={shelf.id} testID={`shelf.${shelf.id}`} autoFocus style={styles.shelf}>
          <Text style={styles.heading}>{shelf.heading}</Text>
          <View style={styles.row}>
            {titlesOnShelf(shelf.id).map((title) => (
              <Poster
                key={title.id}
                title={title}
                preferred={preferred === title.id}
                onFocus={onFocus}
                onPress={onPress}
              />
            ))}
          </View>
        </TVFocusGuideView>
      ))}
      <Text testID="home.mylist.count" style={styles.count}>
        {`My list: ${myList.ids.size} titles`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: s(90),
    paddingTop: s(36),
  },
  title: {
    fontSize: s(44),
    fontWeight: '700',
    color: colors.ink,
    letterSpacing: s(1),
    marginBottom: s(4),
  },
  shelf: {
    marginTop: s(6),
  },
  heading: {
    fontSize: s(22),
    fontWeight: '600',
    color: colors.inkSecondary,
    marginBottom: s(8),
  },
  row: {
    flexDirection: 'row',
    paddingVertical: s(6),
  },
  count: {
    marginTop: s(8),
    fontSize: s(20),
    color: colors.inkSecondary,
  },
});
