import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../services/prisma.service";

const jwtSecret =
  process.env.JWT_SECRET || "vitap-parent-chatbot-secret";
// =====================================================
// PARENT REGISTRATION
// =====================================================
export const registerParent = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, vtopId, dateOfBirth, phone } = req.body;

    // -----------------------------
    // Input validation
    // -----------------------------
    if (
      typeof name !== "string" ||
      typeof vtopId !== "string" ||
      typeof dateOfBirth !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, VTOP ID and date of birth are required",
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must contain at least 2 characters",
      });
    }

    if (vtopId.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "VTOP ID is required",
      });
    }

    const dob = new Date(dateOfBirth);

    if (isNaN(dob.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date of birth",
      });
    }

    // -----------------------------
    // Check existing parent
    // -----------------------------
    const existingParent = await prisma.parent.findUnique({
      where: {
        vtopId: vtopId.trim().toUpperCase(),
      },
    });

    if (existingParent) {
      return res.status(409).json({
        success: false,
        message: "Parent with this VTOP ID already exists",
      });
    }

    // -----------------------------
    // Create parent
    // -----------------------------
    const parent = await prisma.parent.create({
      data: {
        name: name.trim(),
        vtopId: vtopId.trim(),
        dateOfBirth: dob,
        phone: phone ? String(phone).trim() : null,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Parent registered successfully",
      parent: {
        id: parent.id,
        name: parent.name,
        vtopId: parent.vtopId,
        dateOfBirth: parent.dateOfBirth,
        phone: parent.phone,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to register parent",
    });
  }
};

// =====================================================
// PARENT LOGIN
// =====================================================
export const loginParent = async (
  req: Request,
  res: Response
) => {
  try {
    const { vtopId, dateOfBirth } = req.body;

    // -----------------------------
    // Input validation
    // -----------------------------
    if (
      typeof vtopId !== "string" ||
      typeof dateOfBirth !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "VTOP ID and date of birth are required",
      });
    }

    if (vtopId.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "VTOP ID is required",
      });
    }

    const dob = new Date(dateOfBirth);

    if (isNaN(dob.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date of birth",
      });
    }

    // -----------------------------
    // Find parent using VTOP ID
    // -----------------------------
    const parent = await prisma.parent.findUnique({
      where: {
        vtopId: vtopId.trim(),
      },
    });

    if (!parent) {
      return res.status(401).json({
        success: false,
        message: "Invalid VTOP ID or date of birth",
      });
    }

    // -----------------------------
    // Verify date of birth
    // -----------------------------
    const storedDob = parent.dateOfBirth;

    const dobMatches =
      storedDob.getFullYear() === dob.getFullYear() &&
      storedDob.getMonth() === dob.getMonth() &&
      storedDob.getDate() === dob.getDate();

    if (!dobMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid VTOP ID or date of birth",
      });
    }

    // -----------------------------
    // Create JWT token
    // -----------------------------
    const jwtSecret =
  process.env.JWT_SECRET || "vitap-parent-chatbot-secret";

  const token = jwt.sign(
    {
      parentId: parent.id,
      vtopId: parent.vtopId,
    },
    jwtSecret,
    {
      expiresIn: "2h",
    }
  );

    // -----------------------------
    // Login response
    // -----------------------------
    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      expiresIn: "2h",
      parent: {
        id: parent.id,
        name: parent.name,
        vtopId: parent.vtopId,
        dateOfBirth: parent.dateOfBirth,
        phone: parent.phone,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};