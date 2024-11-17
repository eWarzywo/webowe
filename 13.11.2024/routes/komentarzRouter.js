const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create
router.post('/', async (req, res) => {
    const { content, postId } = req.body;
    const newKomentarz = await prisma.komentarz.create({
        data: { content, postId },
    });
    res.json(newKomentarz);
});

// Read all
router.get('/', async (req, res) => {
    const komentarze = await prisma.komentarz.findMany();
    res.json(komentarze);
});

// Read one
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const komentarz = await prisma.komentarz.findUnique({
        where: { id: parseInt(id) },
    });
    res.json(komentarz);
});

// Update
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const updatedKomentarz = await prisma.komentarz.update({
        where: { id: parseInt(id) },
        data: { content },
    });
    res.json(updatedKomentarz);
});

// Delete
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedKomentarz = await prisma.komentarz.delete({
        where: { id: parseInt(id) },
    });
    res.json(deletedKomentarz);
});

module.exports = router;