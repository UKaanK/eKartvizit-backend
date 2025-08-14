const express = require("express");
const router = express.Router();
const cardController = require("../controllers/cardController");
const { validateCard } = require('../validators/cardValidator');

/**
 * @swagger
 * components:
 *   schemas:
 *     Social:
 *       type: object
 *       properties:
 *         platform:
 *           type: string
 *           description: Sosyal medya platformu adı (örneğin, "LinkedIn", "Twitter").
 *         url:
 *           type: string
 *           description: Sosyal medya profilinin URL'si.
 *     Card:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: Kartvizitin otomatik oluşturulan ID'si.
 *         firstName:
 *           type: string
 *           description: Kişinin adı.
 *         lastName:
 *           type: string
 *           description: Kişinin soyadı.
 *         adress:
 *           type: string
 *           description: Kişinin adresi.
 *         title:
 *           type: string
 *           description: Kişinin unvanı.
 *         company:
 *           type: string
 *           description: Çalıştığı şirket.
 *         email:
 *           type: string
 *           format: email
 *           description: E-posta adresi (benzersiz olmalı).
 *         phone:
 *           type: string
 *           description: Telefon numarası.
 *         website:
 *           type: string
 *           description: Kişisel veya şirket web sitesi.
 *         socialMedia:
 *           type: array
 *           description: Sosyal medya profilleri listesi.
 *           items:
 *             $ref: '#/components/schemas/Social'
 *       example:
 *         _id: 60a7e651c6e1f3001c9a1d4b
 *         firstName: "Ali"
 *         lastName: "Yılmaz"
 *         email: "ali.yilmaz@example.com"
 *         adress: "Örnek Mah. Sokak No: 1"
 *         title: "Yazılım Geliştirici"
 *         company: "Tech A.Ş."
 *         phone: "+905551234567"
 *         website: "https://www.aliyilmaz.dev"
 *         socialMedia:
 *           - platform: "LinkedIn"
 *             url: "https://www.linkedin.com/in/aliyilmaz"
 */

/**
 * @swagger
 * tags:
 *   - name: Cards
 *     description: Kartvizit yönetimi için API
 */

/**
 * @swagger
 * /card:
 *   get:
 *     summary: Tüm kartvizitleri listeler
 *     tags: [Cards]
 *     responses:
 *       200:
 *         description: Kartvizitler başarıyla listelendi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Card'
 *       500:
 *         description: Sunucu hatası
 */
router.get("/", cardController.getAllCards);

/**
 * @swagger
 * /card:
 *   post:
 *     summary: Yeni bir kartvizit oluşturur
 *     tags: [Cards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Card'
 *     responses:
 *       201:
 *         description: Kartvizit başarıyla oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       400:
 *         description: Geçersiz giriş
 *       500:
 *         description: Sunucu hatası
 */
router.post("/", validateCard, cardController.createCard);

/**
 * @swagger
 * /card/{id}:
 *   get:
 *     summary: Belirtilen ID'ye sahip kartviziti getirir
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kartvizit ID'si
 *     responses:
 *       200:
 *         description: Kartvizit başarıyla getirildi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       404:
 *         description: Kartvizit bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.get("/:id", cardController.getCardById);

/**
 * @swagger
 * /card/{id}:
 *   put:
 *     summary: Belirtilen ID'ye sahip kartviziti günceller
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kartvizit ID'si
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Card'
 *     responses:
 *       200:
 *         description: Kartvizit başarıyla güncellendi
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       404:
 *         description: Kartvizit bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.put("/:id", validateCard, cardController.updateCardById);

/**
 * @swagger
 * /card/{id}:
 *   delete:
 *     summary: Belirtilen ID'ye sahip kartviziti siler
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Kartvizit ID'si
 *     responses:
 *       200:
 *         description: Kartvizit başarıyla silindi
 *       404:
 *         description: Kartvizit bulunamadı
 *       500:
 *         description: Sunucu hatası
 */
router.delete("/:id", cardController.deleteCardById);

module.exports = router;
