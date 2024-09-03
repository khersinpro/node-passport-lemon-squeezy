// custom.d.ts ou tout autre nom de fichier de déclaration
import 'express';
import { User as PrismaUser } from '@prisma/client'; // Assurez-vous que ce chemin est correct pour votre configuration Prisma.

declare global {
  namespace Express {
    interface User extends PrismaUser {}  // S'assure que toutes les propriétés de l'utilisateur Prisma sont incluses
    interface Request {
      rawBody?: Buffer;
  }
  }
}
