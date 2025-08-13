const express = require("express");
const router = express.Router();
const cardController = require("../controllers/cardController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Card:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the card.
 *         title:
 *           type: string
 *           description: The title of the card.
 *         content:
 *           type: string
 *           description: The content of the card.
 *         date:
 *           type: string
 *           format: date
 *           description: The creation date of the card.
 *       example:
 *         id: 60a7e651c6e1f3001c9a1d4b
 *         title: "First Business Card"
 *         content: "Web Development Expert"
 *         date: "2023-10-26T10:00:00.000Z"
 */

/**
 * @swagger
 * tags:
 *   - name: Cards
 *     description: API for managing cards
 */

/**
 * @swagger
 * /card:
 *   post:
 *     summary: Creates a new card
 *     tags: [Cards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Card'
 *     responses:
 *       201:
 *         description: The card was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/", cardController.createCard);

/**
 * @swagger
 * /card/{id}:
 *   get:
 *     summary: Gets a card by its ID
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The card ID
 *     responses:
 *       200:
 *         description: The card was retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       404:
 *         description: The card was not found
 *       500:
 *         description: Server error
 */
router.get("/:id", cardController.getCardById);

/**
 * @swagger
 * /card/{id}:
 *   put:
 *     summary: Updates a card by its ID
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The card ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Card'
 *     responses:
 *       200:
 *         description: The card was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Card'
 *       404:
 *         description: The card was not found
 *       500:
 *         description: Server error
 */
router.put("/:id", cardController.updateCardById);

/**
 * @swagger
 * /card/{id}:
 *   delete:
 *     summary: Deletes a card by its ID
 *     tags: [Cards]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The card ID
 *     responses:
 *       200:
 *         description: The card was deleted successfully
 *       404:
 *         description: The card was not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", cardController.deleteCardById);

module.exports = router;
