const { PrismaClient } = require('@prisma/client');

// Initialize a single Prisma instance
const prisma = new PrismaClient();

module.exports = prisma;
