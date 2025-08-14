const request = require('supertest');
const app = require('../server'); // Uygulama örneğini içeri aktarın
const mongoose = require('mongoose');
const Card = require('../models/Card'); // Card modelini içeri aktarın

describe('Card API', () => {
  // Testler arasında kullanılacak kartvizit ID'si
  let cardId;

  // Tüm testlerden önce bir kere çalışacak
  beforeAll(async () => {
    // Test veritabanına bağlan
    const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/testdb';
    await mongoose.connect(dbURI);
  });

  // Her testten sonra veritabanını temizle
  afterEach(async () => {
    await Card.deleteMany({});
  });

  // Tüm testler bittikten sonra bir kere çalışacak
  afterAll(async () => {
    // Veritabanı bağlantısını kapat
    await mongoose.connection.close();
  });

  // POST: Yeni bir kartvizit oluşturma testi
  test('POST /card - should create a new card', async () => {
    const newCard = {
      firstName: "Test",
      lastName: "User",
      email: "test.user@example.com",
      title: "Software Engineer",
      company: "Test Corp"
    };
    const response = await request(app)
      .post('/card')
      .send(newCard)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toHaveProperty('message', 'Kartvizit başarıyla oluşturuldu');
    expect(response.body).toHaveProperty('cardId');
    cardId = response.body.cardId; // Diğer testler için ID'yi sakla
  });

  // GET: Tüm kartvizitleri getirme testi
  test('GET /card - should return all cards', async () => {
    // Önce bir kart oluştur
    const newCard = {
      firstName: "Another",
      lastName: "User",
      email: "another.user@example.com",
    };
    await request(app).post('/card').send(newCard);

    const response = await request(app)
      .get('/card')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  // GET: Belirli bir kartviziti ID ile getirme testi
  test('GET /card/:id - should return a card by id', async () => {
    // Önce bir kart oluştur ve ID'sini al
    const newCard = {
      firstName: "Fetch",
      lastName: "User",
      email: "fetch.user@example.com"
    };
    const createResponse = await request(app).post('/card').send(newCard);
    const idToFetch = createResponse.body.cardId;

    const response = await request(app)
      .get(`/card/${idToFetch}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body._id).toBe(idToFetch);
    expect(response.body.firstName).toBe("Fetch");
  });

  // PUT: Belirli bir kartviziti güncelleme testi
  test('PUT /card/:id - should update a card', async () => {
    // Önce bir kart oluştur
    const newCard = {
      firstName: "Update",
      lastName: "Me",
      email: "update.me@example.com"
    };
    const createResponse = await request(app).post('/card').send(newCard);
    const idToUpdate = createResponse.body.cardId;

    const updatedData = {
      firstName: "Updated",
      lastName: "Person",
      email: "update.me@example.com"
    };

    const response = await request(app)
      .put(`/card/${idToUpdate}`)
      .send(updatedData)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.message).toBe("Kartvizit başarıyla güncellendi");
    expect(response.body.card.firstName).toBe("Updated");
  });

  // DELETE: Belirli bir kartviziti silme testi
  test('DELETE /card/:id - should delete a card', async () => {
    // Önce bir kart oluştur
    const newCard = {
      firstName: "Delete",
      lastName: "Me",
      email: "delete.me@example.com"
    };
    const createResponse = await request(app).post('/card').send(newCard);
    const idToDelete = createResponse.body.cardId;

    await request(app)
      .delete(`/card/${idToDelete}`)
      .expect(200);

    // Kartın silindiğini doğrulamak için tekrar GET isteği yap
    await request(app)
      .get(`/card/${idToDelete}`)
      .expect(404);
  });
});
