const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create
router.post('/', async (req, res) => {
    const { title, content, published } = req.body;
    const newWpis = await prisma.wpis.create({
        data: { title, content, published },
    });
    res.json(newWpis);
});

// Read all
router.get('/', async (req, res) => {
    const wpisy = await prisma.wpis.findMany();
    res.json(wpisy);
});

// Read one
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const wpis = await prisma.wpis.findUnique({
        where: { id: parseInt(id) },
    });
    res.json(wpis);
});

// Update
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, published } = req.body;
    const updatedWpis = await prisma.wpis.update({
        where: { id: parseInt(id) },
        data: { title, content, published },
    });
    res.json(updatedWpis);
});

// Delete
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const deletedWpis = await prisma.wpis.delete({
        where: { id: parseInt(id) },
    });
    res.json(deletedWpis);
});

module.exports = router;