const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create
router.post('/', async (req, res) => {
    const { name } = req.body;
    const newKategoria = await prisma.kategoria.create({
        data: { name },
    });
    res.json(newKategoria);
});

// Read all
router.get('/', async (req, res) => {
    const kategorie = await prisma.kategoria.findMany();
    res.json(kategorie);
});

// Read one
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const kategoria = await prisma.kategoria.findUnique({
        where: { id: parseInt(id) },
    });
    res.json(kategoria);
});

// Update
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const updatedKategoria = await prisma.kategoria.update({
        where: { id: parseInt(id) },
        data: { name },
    });
    res.json(updatedKategoria);
});

// Delete
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedKategoria = await prisma.kategoria.delete({
        where: { id: parseInt(id) },
    });
    res.json(deletedKategoria);
});

module.exports = router;