import { PrismaClient } from '@prisma/client'

import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function seedBooksDatabase () {
  const genres = [
    'Fiction',
    'Non-Fiction',
    'Mystery',
    'Fantasy',
    'Sci-Fi',
    'Biography',
    'History',
    'Horror'
  ]
  const publishers = [
    'Penguin',
    'HarperCollins',
    'Random House',
    'Simon & Schuster',
    'Macmillan',
    'Oxford Press'
  ]

  const books = []

  for (let i = 0; i < 500; i++) {
    const totalCount = faker.number.int({ min: 1, max: 100 })

    const availableCount = totalCount

    books.push({
      title: faker.lorem.words(3),
      author: faker.person.fullName(),
      price: faker.number.int({ min: 100, max: 2000 }),
      genre: faker.helpers.arrayElement(genres),
      publisher: faker.helpers.arrayElement(publishers),
      pages: faker.number.int({ min: 100, max: 1000 }),
      totalCount,
      availableCount
    })
  }

  //@ts-ignore
  const books2 = []

  books.forEach(element => {
    let i = Math.ceil(Math.random() * 6)

    for (let j = 1; j < i; j++) {
      books2.push({ ...element, edition: j })
    }
  })

  await prisma.book.deleteMany({})

  //@ts-ignore
  await prisma.book.createMany({ data: books2 })
  // Error ignored : Variable 'books2' implicitly has an 'any[]' type.
  console.log('data seeded successfully')
}

seedBooksDatabase()
  .catch(e => {
    console.log('Error seeding books database: ' + e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
