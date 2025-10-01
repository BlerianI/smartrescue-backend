import prisma from '../prisma.js';

export const getTest = async () => {
  /* 
  Bei der Verwendung von Prisma braucht man keine Destruktion
  */
  const rows = prisma.$queryRaw`SELECT 'It works' as test`;  
  return rows;
}