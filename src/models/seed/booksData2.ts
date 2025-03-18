import { PrismaClient } from '@prisma/client'
import axios from 'axios'
import { subjects } from '../utils/subjects'

/*   res =  response.data   
//  res.works  is array of objects. each object representing a book. 
//  imp keys: 
// title ,  edition_count ,  cover_id  ,  authors "authors: [ { key: '/authors/OL24529A', name: 'Emily Brontë' } ]," ,  subjects 
// for no. of pages  ,  price , total available we will assign random values.  
// for limit 1  data fetched ,  
{
  key: '/subjects/love',
  name: 'love',
  subject_type: 'subject',
  work_count: 17522,
  works: [
    {
      key: '/works/OL21177W',
      title: 'Wuthering Heights',
      edition_count: 2850,
      cover_id: 12818862,
      cover_edition_key: 'OL38586477M',
      subject: [Array],
      ia_collection: [Array],
      printdisabled: true,
      lending_edition: 'OL57648863M',
      lending_identifier: 'wutheringheights0000kesh',
      authors: [Array],
      first_publish_year: 1846,
      ia: 'wutheringheights0000kesh',
      public_scan: true,
      has_fulltext: true,
      availability: [Object]
    }
  ]
}
*/
/* 
{
  key: '/works/OL21177W',
  title: 'Wuthering Heights',
  edition_count: 2850,
  cover_id: 12818862,
  cover_edition_key: 'OL38586477M',
  subject: [
    'British and irish fiction (fictional works by one author)',
    "Children's fiction",
    'Classic fiction',
    'Classic Literature',
    'Country homes',
    'Country life',
    'Cousins',
    'Death',
    'Drama',
    'English language',
    'English language readers',
    'English literature',
    'Examinations',
    'Families',
    'family life',
    'Fiction',
    'Foundlings',
    'Historical Fiction',
    'Inheritance and succession',
    'Interpersonal relations',
    'Juvenile fiction',
    'Landscape in literature',
    'love',
    'Manners and customs',
    'orphans',
    'Psychological fiction',
    'Reading Level-Grade 7',
    'Reading Level-Grade 8',
    'Reading Level-Grade 9',
    'Reading Level-Grade 10',
    'Reading Level-Grade 11',
    'Reading Level-Grade 12',
    'Rejection (Psychology)',
    'revenge',
    'romance',
    'Romance fiction',
    'romantic fiction',
    'Rural families',
    'slavery',
    'Social life and customs',
    'tragedy',
    'Triangles (Interpersonal relations)',
    'Young women',
    'Fiction, general',
    'Revenge -- Fiction',
    'Rejection (Psychology) -- Fiction',
    'Love stories',
    'Domestic fiction',
    'Yorkshire (England) -- Fiction',
    'Foundlings -- Fiction',
    'Rural families -- Fiction',
    'Heathcliff (Fictitious character : Brontë) -- Fiction',
    'Triangles (Interpersonal relations) -- Fiction',
    'Heathcliff (fictitious character), fiction',
    'Fiction, family life, general',
    'Fiction, psychological',
    'Fiction, romance, general',
    'Man-woman relationships, fiction',
    'England, fiction',
    'Triangle (Relations humaines)',
    'Romans, nouvelles',
    'Rejet (Psychologie)',
    'Familles rurales',
    'Enfants trouvés',
    'Wuthering Heights (Brontë, Emily)',
    'Vengeance',
    'English fiction',
    'Triangles (Interpersonal relationships)',
    'Yorkshire (England)',
    'Roman anglais',
    'Relations entre hommes et femmes',
    'Mœurs et coutumes',
    'Women',
    'Femmes',
    'Heathcliff (Fictitious character)',
    'Catherine Earnshawm (Fictitious character)',
    'English Gothic fiction',
    'Adaptations',
    'Social conditions',
    'Interpersonal relations, fiction',
    'Roman',
    'Englisch',
    'Wuthering heights (Emily Brontë)',
    'Comics & graphic novels, romance',
    'Love, fiction',
    'Comic books, strips, etc.',
    'Comics & graphic novels, literary',
    'Literature, collections',
    'American fiction',
    'Foundlings in fiction',
    'Rural families in fiction',
    'England in fiction',
    'Revenge in fiction',
    'Landscape in literature in fiction',
    'Slavery in fiction',
    'Reading books',
    'Country life in fiction',
    'Readers',
    'Orphans in fiction',
    'Study and teaching',
    ... 12 more items
  ],
  ia_collection: [
    '365-Books-by-Women-Authors',
    'JaiGyan',
    'ServantsOfKnowledge-Print',
    'additional_collections',
    'album_recordings',
    'americana',
    'americanuniversity-ol',
    'audio_bookspoetry',
    'audio_music',
    'belmont-ol',
    'binghamton-ol',
    'bop-street-records',
    'bostonpubliclibrary',
    'bostonuniversitylibraries-ol',
    'bplhoughton',
    'bpljordan-ol',
    'brigham_young_university',
    'buddhist-digital-resource-center',
    'buddhist-digital-resource-center-restricted',
    'cnusd-ol',
    'cornell',
    'cua-ol',
    'dartmouthlibrary-ol',
    'delawarecountydistrictlibrary',
    'delawarecountydistrictlibrary-ol',
    'drakeuniversity-ol',
    'duke_libraries',
    'europeanlibraries',
    'framingham-ol',
    'geo_restricted',
    'graduatetheologicalunion',
    'gutenberg',
    'gutenberg-audiobooks',
    'gwulibraries-ol',
    'inlibrary',
    'internet-books',
    'internetarchivebooks',
    'ithacacollege-ol',
    'johnshopkins-ol',
    'kalamazoocollege-ol',
    'library_of_atlantis',
    'librivoxaudio',
    'marygrovecollege',
    'marymount-ol',
    'miltonpubliclibrary-ol',
    'occidentalcollegelibrary-ol',
    'openlibrary-d-ol',
    'popularchinesebooks',
    'printdisabled',
    'randolph-macon-college-ol',
    'robarts',
    'rochester-ol',
    'samples_only',
    'spokanepubliclibrary-ol',
    'stmaryscountylibrary',
    'the-claremont-colleges-ol',
    'toronto',
    'trent_university',
    'tulsacc-ol',
    'udc-ol',
    'uic',
    'unb-ol',
    'uni-ol',
    'university_of_toronto',
    'universityofarizona-ol',
    'universityofcoloradoboulder-ol',
    'universityofthewest-ol',
    'uslprototype',
    'wilsoncollege-ol',
    'worthingtonlibraries-ol'
  ],
  printdisabled: true,
  lending_edition: 'OL57648863M',
  lending_identifier: 'wutheringheights0000kesh',
  authors: [ { key: '/authors/OL24529A', name: 'Emily Brontë' } ],
  first_publish_year: 1846,
  ia: 'wutheringheights0000kesh',
  public_scan: true,
  has_fulltext: true,
  availability: {
    status: 'open',
    available_to_browse: false,
    available_to_borrow: false,
    available_to_waitlist: false,
    is_printdisabled: false,
    is_readable: true,
    is_lendable: false,
    is_previewable: true,
    identifier: 'wutheringheights0000kesh',
    isbn: null,
    oclc: null,
    openlibrary_work: 'OL21177W',
    openlibrary_edition: 'OL57648863M',
    last_loan_date: null,
    num_waitlist: null,
    last_waitlist_date: null,
    is_restricted: false,
    is_browseable: false,
    __src__: 'core.models.lending.get_availability'
  }
}
  */

// how are editions managed

//  using search api to search for a particular book.

// fetching 100 books for each of the subject.

// using set because  books can have multiple genres.

/* 
  const res = await axios
    .get('https://openlibrary.org/search.json?q=a+court+of+mist+and+fury')
    .then(res => res.data)

  console.log(res)
*/
/*
  {
  numFound: 9,
  start: 0,
  numFoundExact: true,
  num_found: 9,
  documentation_url: 'https://openlibrary.org/dev/docs/api/search',
  q: 'a court of mist and fury',
  offset: null,
  docs: [
    {
      author_key: [Array],
      author_name: [Array],
      cover_edition_key: 'OL26992991M',
      cover_i: 14315081,
      edition_count: 25,
      first_publish_year: 2014,
      has_fulltext: true,
      ia: [Array],
      ia_collection_s: 'internetarchivebooks;printdisabled',
      key: '/works/OL17860744W',
      language: [Array],
      public_scan_b: false,
      title: 'A Court of Mist and Fury'
    },
    {
      author_key: [Array],
      author_name: [Array],
      cover_edition_key: 'OL32650438M',
      cover_i: 11279902,
      edition_count: 1,
      first_publish_year: 2020,
      has_fulltext: false,
      key: '/works/OL24611849W',
      language: [Array],
      public_scan_b: false,
      title: 'Court of Thorns and Roses / A Court of Mist and Fury / A Court of Wings and Ruin / A Court of Frost and Starlight'
    },
    {
      author_key: [Array],
      author_name: [Array],
      edition_count: 1,
      first_publish_year: 2017,
      has_fulltext: false,
      key: '/works/OL40459014W',
      language: [Array],
      public_scan_b: false,
      title: 'Study Guide Student Workbook for a Court of Mist and Fury'
    },
    {
      author_key: [Array],
      author_name: [Array],
      edition_count: 1,
      first_publish_year: 2024,
      has_fulltext: false,
      key: '/works/OL38386694W',
      language: [Array],
      public_scan_b: false,
      title: 'Corte de Niebla y Furia / a Court of Mist and Fury'
    },
    {
      author_key: [Array],
      author_name: [Array],
      cover_edition_key: 'OL47315515M',
      cover_i: 13802383,
      edition_count: 1,
      first_publish_year: 2018,
      has_fulltext: false,
      key: '/works/OL34954067W',
      language: [Array],
      public_scan_b: false,
      title: 'A court of Mist and Fury'
    },
    {
      author_key: [Array],
      author_name: [Array],
      edition_count: 1,
      first_publish_year: 2018,
      has_fulltext: false,
      key: '/works/OL38279837W',
      language: [Array],
      public_scan_b: false,
      title: 'Summary of a Court of Mist and Fury : A Court of Thorns and Roses by Sarah J. Maas'
    },
    {
      author_key: [Array],
      author_name: [Array],
      cover_edition_key: 'OL51076452M',
      cover_i: 14645523,
      edition_count: 1,
      first_publish_year: 2016,
      has_fulltext: false,
      key: '/works/OL37846433W',
      language: [Array],
      public_scan_b: false,
      title: 'Corte de Niebla y Furia (una Corte de Rosas y Espinas 2) / a Court of Mist and Fury (a Court of Thorns and Roses ACOTAR 2)'
    },
    {
      author_key: [Array],
      author_name: [Array],
      edition_count: 1,
      first_publish_year: 2018,
      has_fulltext: false,
      key: '/works/OL40657946W',
      language: [Array],
      public_scan_b: false,
      title: 'Study Guide Student Workbook for Court of Mist and Fury'
    },
    {
      author_key: [Array],
      author_name: [Array],
      cover_edition_key: 'OL47534192M',
      cover_i: 14150653,
      edition_count: 14,
      first_publish_year: 2016,
      has_fulltext: false,
      key: '/works/OL28768193W',
      language: [Array],
      public_scan_b: false,
      title: 'Trivia'
    }
  ]
}

// u will get only one entry for 'A Court of Mist and Fury' 
// Different editions have diff keys , but in search results any one edition is shown. 
// from key of that  one book , we get info about other editions.  

// 
  


  /* 

  const editions = await axios
    .get('https://openlibrary.org//works/OL17860744W/editions.json')
    .then(res => res.data)
*/
//console.log(editions)

// editions.entries has the list of the editions.

/* 
  {
  links: {
    self: '/works/OL17860744W/editions.json',
    work: '/works/OL17860744W'
  },
  size: 25,
  entries: [
    {
      works: [Array],
      title: 'Двір мороку і гніву',
      publishers: [Array],
      publish_date: '2021',
      key: '/books/OL47305793M',
      type: [Object],
      covers: [Array],
      identifiers: {},
      classifications: {},
      translated_from: [Array],
      physical_format: 'Тверда',
      publish_places: [Array],
      languages: [Array],
      number_of_pages: 736,
      isbn_13: [Array],
      isbn_10: [Array],
      description: [Object],
      translation_of: 'A Court of Mist and Fury',
      latest_revision: 5,
      revision: 5,
      created: [Object],
      last_modified: [Object]
    }, ... ] } 
  */

// console.log(editions.entries[0])

/* 
  {
  works: [ { key: '/works/OL17860744W' } ],
  title: 'Двір мороку і гніву',
  publishers: [ 'Vivat' ],
  publish_date: '2021',
  key: '/books/OL47305793M',
  type: { key: '/type/edition' },
  covers: [ 13770315 ],
  identifiers: {},
  classifications: {},
  translated_from: [ { key: '/languages/eng' } ],
  physical_format: 'Тверда',
  publish_places: [ 'Україна' ],
  languages: [ { key: '/languages/ukr' } ],
  number_of_pages: 736,
  isbn_13: [ '9789669822758' ],
  isbn_10: [ '9669822750' ],
  description: {
    type: '/type/text',
    value: 'Фейра готується вийти заміж за свого коханого — Темліна. Однак спогад про злочин, який вона вчинила, щоб звільнитися від Амаранти, повертається до неї в жахіттях. Темлін намагається убезпечити її, контролюючи кожний її крок, але дівчина не хоче ставати казковою принцесою. До того ж сам Темлін має дедалі більше таємниць від коханої. Невже це лише для того, щоб її захистити? У цей час Різенд, Лорд Двору Ночі, нагадує про укладену між ними угоду. Певно, хоче скористатися нею для своєї мети. І тепер, коли над Прифією та землями людей нависла загроза жахливої війни, Фейра має вирішити, кому довіряти. На кону життя її сім’ї та доля всього світу. А в чарівному світі фейрі друзі можуть бути небезпечніші за ворогів. Тепер на Фейру очікує боротьба зі значно більшим злом, ніж вона могла собі уявити.'
  },
  translation_of: 'A Court of Mist and Fury',
  latest_revision: 5,
  revision: 5,
  created: { type: '/type/datetime', value: '2023-03-24T17:31:04.028325' },
  last_modified: { type: '/type/datetime', value: '2023-05-30T20:29:42.759467' }
}
  */

// lets populate the data.

const seedBooksDatabase = async () => {
  const books = new Set()

  // make  a set to track the handle the tracked books
  // using  .key property

  const keys = new Set()

  const prisma = new PrismaClient()

  let i = 100000

  subjects.forEach(async (e, index) => {
    const response = await axios
      .get(`https://openlibrary.org/subjects/${e}.json?limit=100`)
      .then(res => res.data)

    // response.works -> Array of books

    //@ts-ignore
    response.works.forEach(async (e, index1) => {
      if (!keys.has(e.key)) {
        keys.add(e.key)

        const editionsResponse = await axios
          .get(`https://openlibrary.org/${e.key}/editions.json`)
          .then(res => res.data)

        //@ts-ignore
        const no_of_editions = editionsResponse.size

        //@ts-ignore
        const editions = editionsResponse?.entries

        //@ts-ignore
        editions.forEach(async (e, index2) => {
          if (index2 === 0) {
            books.add({
              title: e.title ?? null,
              description: e.description?.value ?? null,
              publishers: e.publishers ?? null, //array
              publish_date: e.publish_date ?? null,
              covers: e.covers ?? null, // array
              translated_from: e.translated_from[0]?.key ?? null,
              languages: e.languages[0]?.key ?? null,
              number_of_pages: e.number_of_pages ?? null,
              isbn_13: e.isbn_13[0] ?? null,
              isbn_10: e.isbn_10[0] ?? null,
              translation_of: e.translation_of ?? null,
              latest_revision: e.latest_revision ?? null,
              revision: e.revision ?? null,
              edition_id: index2 + 1,
              book_id: (index + 1) * i + index1,
              id: (index + 1) * i + index1 + index2
            })
          }
        })
      }
    })
  })
}
