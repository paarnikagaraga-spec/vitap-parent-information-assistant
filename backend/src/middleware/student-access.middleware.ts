import { Response, NextFunction } from "express";
import { prisma } from "../services/prisma.service";
import { AuthenticatedRequest } from "./auth.middleware";

export interface StudentAuthorizedRequest extends AuthenticatedRequest {
  studentId?: number;
}

export const authorizeStudent = async (
  req: StudentAuthorizedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.parentId) {
      return res.status(401).json({
        success: false,
        message: "Parent authentication required",
      });
    }

    const authorization = await prisma.parentStudent.findFirst({
      where: {
        parentId: req.parentId,
        isActive: true,
      },
      select: {
        studentId: true,
      },
    });

    if (!authorization) {
      return res.status(403).json({
        success: false,
        message: "No authorized student is linked to this parent",
      });
    }

    req.studentId = authorization.studentId;

    next();
  } catch (error) {
    console.error("Student authorization error:", error);

    return res.status(500).json({
      success: false,
      message: "Authorization check failed",
    });
  }
};