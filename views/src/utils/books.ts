interface book {
  id: number
  bookId: number
  title: string
  description?: string | null
  price: number | null
  genre: string
  pages: number | null
  totalCount: number
  availableCount: number
  cover: [
    {
      id: number
      coverId: number
      bookWithEditionId: number
      bookId: number
    }
  ]
}

export const sample: book[] = [
  {
    id: 121249,
    bookId: 46637,
    title: 'Kidnapped (Gift Classics)',
    description: null,
    price: 5853,
    genre: 'thriller',
    pages: 516,
    totalCount: 84,
    availableCount: 84,
    cover: [
      {
        id: 260,
        coverId: 14485462,
        bookWithEditionId: 121249,
        bookId: 121249
      }
    ]
  },
  {
    id: 125913,
    bookId: 66666,
    title: 'Przygody Oliwera Twista',
    description: null,
    price: 7258,
    genre: 'historical_fiction',
    pages: 447,
    totalCount: 61,
    availableCount: 61,
    cover: [
      {
        id: 735,
        coverId: 11200702,
        bookWithEditionId: 125913,
        bookId: 125913
      }
    ]
  },
  {
    id: 129157,
    bookId: 71393,
    title: 'Washington Square',
    description: null,
    price: 4430,
    genre: 'romance',
    pages: null,
    totalCount: 60,
    availableCount: 60,
    cover: [
      {
        id: 624,
        coverId: 11268809,
        bookWithEditionId: 129157,
        bookId: 129157
      }
    ]
  },
  {
    id: 129169,
    bookId: 30031,
    title: 'The Works Of William H. Seward V1',
    description: null,
    price: 8388,
    genre: 'politics_and_governement',
    pages: 644,
    totalCount: 51,
    availableCount: 51,
    cover: [
      {
        id: 914,
        coverId: 2851433,
        bookWithEditionId: 129169,
        bookId: 129169
      }
    ]
  },
  {
    id: 135768,
    bookId: 25413,
    title: 'The Giver',
    description:
      "Jonas vive in un mondo perfetto, dove non esistono guerre né fame né dolore.\r\nTutto è meticolosamente organizzato, a dodici anni ogni cittadino riceve l'incarico cui è destinato.\r\n\r\nFinché alla Cerimonia dei Dodici Jonas viene scelto come nuovo Portato di Ricordi, un ruolo unico nella comunità.\r\nAddestrato dal Donatore, il ragazzo scoprirà l'esistenza di un passato sconosciuto, di cui rivivrà gli orrori, ma anche tutto ciò che è stato sacrificato in nome della perfezione. E allora la sconvolgente verità metter Jonas di fronte alla scelta più straordinaria della sua vita.",
    price: 2334,
    genre: 'science_fiction',
    pages: 208,
    totalCount: 92,
    availableCount: 92,
    cover: [
      {
        id: 203,
        coverId: 14847572,
        bookWithEditionId: 135768,
        bookId: 135768
      }
    ]
  },
  {
    id: 135794,
    bookId: 66983,
    title: 'Dune',
    description: null,
    price: 3532,
    genre: 'science_fiction',
    pages: 592,
    totalCount: 19,
    availableCount: 19,
    cover: [
      {
        id: 186,
        coverId: 14637497,
        bookWithEditionId: 135794,
        bookId: 135794
      }
    ]
  },
  {
    id: 137217,
    bookId: 45586,
    title: 'Silahşor',
    description: null,
    price: 4416,
    genre: 'science_fiction',
    pages: 239,
    totalCount: 81,
    availableCount: 81,
    cover: [
      {
        id: 235,
        coverId: 12310831,
        bookWithEditionId: 137217,
        bookId: 137217
      }
    ]
  },
  {
    id: 142513,
    bookId: 56445,
    title: 'Ivanhoe',
    description: null,
    price: 1781,
    genre: 'historical_fiction',
    pages: null,
    totalCount: 91,
    availableCount: 91,
    cover: [
      {
        id: 819,
        coverId: 12817017,
        bookWithEditionId: 142513,
        bookId: 142513
      }
    ]
  },
  {
    id: 144288,
    bookId: 24551,
    title: 'The War of the Worlds',
    description: null,
    price: 7556,
    genre: 'science_fiction',
    pages: null,
    totalCount: 59,
    availableCount: 59,
    cover: [
      {
        id: 99,
        coverId: 14849050,
        bookWithEditionId: 144288,
        bookId: 144288
      }
    ]
  },
  {
    id: 150875,
    bookId: 10723,
    title: 'Brood of the Witch-Queen',
    description: null,
    price: 9463,
    genre: 'horror',
    pages: null,
    totalCount: 26,
    availableCount: 26,
    cover: [
      {
        id: 400,
        coverId: 14415385,
        bookWithEditionId: 150875,
        bookId: 150875
      }
    ]
  },
  {
    id: 121249,
    bookId: 46637,
    title: 'Kidnapped (Gift Classics)',
    description: null,
    price: 5853,
    genre: 'thriller',
    pages: 516,
    totalCount: 84,
    availableCount: 84,
    cover: [
      {
        id: 260,
        coverId: 14485462,
        bookWithEditionId: 121249,
        bookId: 121249
      }
    ]
  },
  {
    id: 125913,
    bookId: 66666,
    title: 'Przygody Oliwera Twista',
    description: null,
    price: 7258,
    genre: 'historical_fiction',
    pages: 447,
    totalCount: 61,
    availableCount: 61,
    cover: [
      {
        id: 735,
        coverId: 11200702,
        bookWithEditionId: 125913,
        bookId: 125913
      }
    ]
  },
  {
    id: 129157,
    bookId: 71393,
    title: 'Washington Square',
    description: null,
    price: 4430,
    genre: 'romance',
    pages: null,
    totalCount: 60,
    availableCount: 60,
    cover: [
      {
        id: 624,
        coverId: 11268809,
        bookWithEditionId: 129157,
        bookId: 129157
      }
    ]
  },
  {
    id: 129169,
    bookId: 30031,
    title: 'The Works Of William H. Seward V1',
    description: null,
    price: 8388,
    genre: 'politics_and_governement',
    pages: 644,
    totalCount: 51,
    availableCount: 51,
    cover: [
      {
        id: 914,
        coverId: 2851433,
        bookWithEditionId: 129169,
        bookId: 129169
      }
    ]
  },
  {
    id: 135768,
    bookId: 25413,
    title: 'The Giver',
    description:
      "Jonas vive in un mondo perfetto, dove non esistono guerre né fame né dolore.\r\nTutto è meticolosamente organizzato, a dodici anni ogni cittadino riceve l'incarico cui è destinato.\r\n\r\nFinché alla Cerimonia dei Dodici Jonas viene scelto come nuovo Portato di Ricordi, un ruolo unico nella comunità.\r\nAddestrato dal Donatore, il ragazzo scoprirà l'esistenza di un passato sconosciuto, di cui rivivrà gli orrori, ma anche tutto ciò che è stato sacrificato in nome della perfezione. E allora la sconvolgente verità metter Jonas di fronte alla scelta più straordinaria della sua vita.",
    price: 2334,
    genre: 'science_fiction',
    pages: 208,
    totalCount: 92,
    availableCount: 92,
    cover: [
      {
        id: 203,
        coverId: 14847572,
        bookWithEditionId: 135768,
        bookId: 135768
      }
    ]
  },
  {
    id: 135794,
    bookId: 66983,
    title: 'Dune',
    description: null,
    price: 3532,
    genre: 'science_fiction',
    pages: 592,
    totalCount: 19,
    availableCount: 19,
    cover: [
      {
        id: 186,
        coverId: 14637497,
        bookWithEditionId: 135794,
        bookId: 135794
      }
    ]
  },
  {
    id: 137217,
    bookId: 45586,
    title: 'Silahşor',
    description: null,
    price: 4416,
    genre: 'science_fiction',
    pages: 239,
    totalCount: 81,
    availableCount: 81,
    cover: [
      {
        id: 235,
        coverId: 12310831,
        bookWithEditionId: 137217,
        bookId: 137217
      }
    ]
  },
  {
    id: 142513,
    bookId: 56445,
    title: 'Ivanhoe',
    description: null,
    price: 1781,
    genre: 'historical_fiction',
    pages: null,
    totalCount: 91,
    availableCount: 91,
    cover: [
      {
        id: 819,
        coverId: 12817017,
        bookWithEditionId: 142513,
        bookId: 142513
      }
    ]
  },
  {
    id: 144288,
    bookId: 24551,
    title: 'The War of the Worlds',
    description: null,
    price: 7556,
    genre: 'science_fiction',
    pages: null,
    totalCount: 59,
    availableCount: 59,
    cover: [
      {
        id: 99,
        coverId: 14849050,
        bookWithEditionId: 144288,
        bookId: 144288
      }
    ]
  },
  {
    id: 150875,
    bookId: 10723,
    title: 'Brood of the Witch-Queen',
    description: null,
    price: 9463,
    genre: 'horror',
    pages: null,
    totalCount: 26,
    availableCount: 26,
    cover: [
      {
        id: 400,
        coverId: 14415385,
        bookWithEditionId: 150875,
        bookId: 150875
      }
    ]
  }
]
