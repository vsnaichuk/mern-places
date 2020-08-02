export const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Vova',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    placeCount: 12,
  },
  {
    id: 'u2',
    name: 'Ivan',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    placeCount: 4,
  },
];

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Museum of Contemporary Art Australia',
    description:
      'The Museum of Contemporary Art Australia (abbreviated MCA), located in George Street, Sydney, is an Australian museum solely dedicated to exhibiting, interpreting and collecting contemporary art, both from across Australia and around the world.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/MCA_Sydney.jpg/800px-MCA_Sydney.jpg',
    address: '140 George St, The Rocks NSW 2000, Australia',
    location: {
      lat: -33.8599358,
      lng: 151.2090295,
    },
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Maidan Nezalezhnosti',
    description:
      "Maidan Nezalezhnosti is the central square of Kyiv, the capital city of Ukraine. One of the city's main squares, it is located on Khreshchatyk Street in the Shevchenko Raion",
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/b/b9/MaidanNezalezhnosti.jpg',
    address: 'Kyiv 02000',
    location: {
      lat: 50.450555,
      lng: 30.5210808,
    },
    creator: 'u2',
  },
  {
    id: 'p3',
    title: 'Maidan Nezalezhnosti',
    description:
      "Maidan Nezalezhnosti is the central square of Kyiv, the capital city of Ukraine. One of the city's main squares, it is located on Khreshchatyk Street in the Shevchenko Raion",
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/b/b9/MaidanNezalezhnosti.jpg',
    address: 'Kyiv 02000',
    location: {
      lat: 50.450555,
      lng: 30.5210808,
    },
    creator: 'u1',
  },
];
