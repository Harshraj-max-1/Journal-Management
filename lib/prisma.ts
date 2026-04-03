import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const connectionString = `${process.env.DATABASE_URL}`

// Optimized Pool configuration for stable connections
const pool = new Pool({ 
  connectionString,
  max: 10,                 // Maximum simultaneous connections in the pool
  connectionTimeoutMillis: 10000, // Wait 10s for a connection before failing
  idleTimeoutMillis: 30000,       // Close idle connections after 30s
})

const adapter = new PrismaPg(pool)

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
