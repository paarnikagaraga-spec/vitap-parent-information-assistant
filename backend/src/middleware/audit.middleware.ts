import { Request, Response, NextFunction } from "express";
import { prisma } from "../services/prisma.service";

export const auditLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.on("finish", async () => {
    try {
      const parentId = (req as Request & { parentId?: number }).parentId;

      await prisma.auditLog.create({
        data: {
          parentId: parentId ?? null,
          action: `${req.method} ${req.originalUrl} - ${res.statusCode}`,
          endpoint: req.originalUrl,
          ipAddress: req.ip,
        },
      });
    } catch (error) {
      console.error("Audit log error:", error);
    }
  });

  next();
};