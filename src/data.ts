export type ShelfId = 'tonight' | 'documentaries' | 'kids';

export type Title = {
  id: string;
  title: string;
  shelf: ShelfId;
  genre: string;
  year: number;
  blurb: string;
  color: string;
};

export const SHELVES: { id: ShelfId; heading: string }[] = [
  { id: 'tonight', heading: 'Tonight' },
  { id: 'documentaries', heading: 'Documentaries' },
  { id: 'kids', heading: 'Kids' },
];

// Eighteen fictional titles, six per shelf. The colour is the poster card's
// background (scripts/make-images.py reads this file to draw the posters).
export const TITLES: Title[] = [
  {
    id: 'harbor-lights',
    title: 'Harbor Lights',
    shelf: 'tonight',
    genre: 'Drama',
    year: 2024,
    blurb:
      'A ferry pilot takes the last crossing of the season and finds a passenger who should not be aboard. Over one long night the two of them piece together why the harbor is closing for good. By morning neither wants to reach the other shore.',
    color: '#2E4A7D',
  },
  {
    id: 'the-quiet-orchard',
    title: 'The Quiet Orchard',
    shelf: 'tonight',
    genre: 'Mystery',
    year: 2023,
    blurb:
      'A surveyor inherits an orchard where every tree has been numbered by hand. The numbers skip in a pattern only she can read. Following it leads her to a cellar that was never on any plan.',
    color: '#4E6B3A',
  },
  {
    id: 'signal-fade',
    title: 'Signal Fade',
    shelf: 'tonight',
    genre: 'Thriller',
    year: 2025,
    blurb:
      'A late-shift radio operator hears a voice repeating coordinates that do not exist yet. Each night the coordinates move closer to the station. On the seventh night she decides to answer.',
    color: '#7A2E3B',
  },
  {
    id: 'paper-moons',
    title: 'Paper Moons',
    shelf: 'tonight',
    genre: 'Romance',
    year: 2022,
    blurb:
      'Two set painters at a failing theater compete to build the best moon for the closing show. Their rivalry is loud and their nights are long. The moon they finish is the one neither of them designed.',
    color: '#8A5A2B',
  },
  {
    id: 'northbound',
    title: 'Northbound',
    shelf: 'tonight',
    genre: 'Adventure',
    year: 2024,
    blurb:
      'A retired rail engineer agrees to drive one final freight run across a frozen pass. The line has been closed for years and the bridges were never inspected. Halfway up he learns what the cargo is.',
    color: '#2F6F73',
  },
  {
    id: 'glass-meridian',
    title: 'Glass Meridian',
    shelf: 'tonight',
    genre: 'Science fiction',
    year: 2025,
    blurb:
      'A cartographer on an orbital station maps a line that divides the planet below into day and night. The line begins to drift. Nobody on the ground has noticed yet.',
    color: '#4A3F86',
  },
  {
    id: 'salt-and-tide',
    title: 'Salt and Tide',
    shelf: 'documentaries',
    genre: 'Nature',
    year: 2023,
    blurb:
      'A year on a stretch of coast where the tide retreats three kilometers twice a day. Cameras follow the birds, the crabs, and the one family that still harvests the flats. The sea returns on schedule every time.',
    color: '#2B6E8C',
  },
  {
    id: 'the-last-lighthouse-keepers',
    title: 'The Last Lighthouse Keepers',
    shelf: 'documentaries',
    genre: 'History',
    year: 2022,
    blurb:
      'Four keepers describe the final decade before their lights were automated. Their logbooks record storms, ships, and long stretches of nothing at all. The film ends the night the last lamp switched itself on.',
    color: '#5B4B3A',
  },
  {
    id: 'bridges-of-the-delta',
    title: 'Bridges of the Delta',
    shelf: 'documentaries',
    genre: 'Engineering',
    year: 2024,
    blurb:
      'Eleven bridges cross a river delta that changes course every spring. Engineers explain how each one was designed to be moved, raised, or abandoned. Two of them have been rebuilt so often that nobody knows the original site.',
    color: '#6C6F2A',
  },
  {
    id: 'a-year-in-the-vineyard',
    title: 'A Year in the Vineyard',
    shelf: 'documentaries',
    genre: 'Food',
    year: 2021,
    blurb:
      'A single hillside vineyard, from the first pruning to the first bottle. The family that works it has never sold a vintage outside their valley. This year a buyer from the city arrives with an offer.',
    color: '#7D3A66',
  },
  {
    id: 'cold-rooms',
    title: 'Cold Rooms',
    shelf: 'documentaries',
    genre: 'Science',
    year: 2025,
    blurb:
      'Inside the laboratories that keep seeds, ice cores, and cell lines frozen for centuries. Technicians explain what happens when the power fails and what they keep in their own freezers. The coldest room has not been opened in thirty years.',
    color: '#3B5E7A',
  },
  {
    id: 'ink-and-copper',
    title: 'Ink and Copper',
    shelf: 'documentaries',
    genre: 'Arts',
    year: 2023,
    blurb:
      'The last commercial engraving workshop in the region takes on an apprentice. Every plate is cut by hand and printed on a press older than the building. The apprentice has six months to produce a plate the master will sign.',
    color: '#8C4A2B',
  },
  {
    id: 'pip-and-the-tide-pool',
    title: 'Pip and the Tide Pool',
    shelf: 'kids',
    genre: 'Animation',
    year: 2024,
    blurb:
      'Pip is a hermit crab who has outgrown every shell in the pool. A storm washes in something new, shiny, and much too big. With the tide coming back, Pip and friends have until dusk to make it fit.',
    color: '#2E8A6E',
  },
  {
    id: 'robot-bakery',
    title: 'Robot Bakery',
    shelf: 'kids',
    genre: 'Animation',
    year: 2023,
    blurb:
      'A bakery run by three clumsy robots opens on the busiest street in town. Their bread is perfect but their delivery routes are chaos. The day the mayor orders a wedding cake, everything has to go right.',
    color: '#C46A1E',
  },
  {
    id: 'the-moon-garden-club',
    title: 'The Moon Garden Club',
    shelf: 'kids',
    genre: 'Family',
    year: 2025,
    blurb:
      'Four neighbors start a garden that only opens after dark. Their plants glow, hum, and occasionally wander off. When the club is asked to enter the town flower show, they have to explain a garden nobody can see by day.',
    color: '#3E4E9A',
  },
  {
    id: 'captain-comet-jr',
    title: 'Captain Comet Jr.',
    shelf: 'kids',
    genre: 'Adventure',
    year: 2022,
    blurb:
      'The youngest cadet on a cargo rocket is left in charge during a nap that lasts three planets. She has a manual, a very patient robot, and a cat that thinks it is the captain. Landing is the easy part.',
    color: '#A03A3A',
  },
  {
    id: 'puddle-town',
    title: 'Puddle Town',
    shelf: 'kids',
    genre: 'Animation',
    year: 2024,
    blurb:
      'In Puddle Town it rains every afternoon at three, and every puddle leads somewhere different. Two best friends map them all before the summer ends. The last puddle on the map has never been jumped into.',
    color: '#1F7A8C',
  },
  {
    id: 'the-great-kite-race',
    title: 'The Great Kite Race',
    shelf: 'kids',
    genre: 'Family',
    year: 2023,
    blurb:
      'Once a year the whole valley flies kites from the ridge to the river. This year the smallest kite has the biggest plan. The wind, as always, has its own ideas.',
    color: '#6A8F2E',
  },
];

export const byId = (id: string): Title | undefined => TITLES.find((t) => t.id === id);

export const titlesOnShelf = (shelf: ShelfId): Title[] => TITLES.filter((t) => t.shelf === shelf);
