import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../services/prisma.service";

const JWT_SECRET = process.env.JWT_SECRET || "vitap-parent-chatbot-secret";

// =====================================================
// PARENT REGISTRATION
// =====================================================
export const registerParent = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, phone, password } = req.body;

    // -----------------------------
    // Input validation
    // -----------------------------
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    if (name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "Name must contain at least 2 characters",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must contain at least 8 characters",
      });
    }

    // -----------------------------
    // Check existing parent
    // -----------------------------
    const existingParent = await prisma.parent.findUnique({
      where: {
        email: email.toLowerCase().trim(),
      },
    });

    if (existingParent) {
      return res.status(409).json({
        success: false,
        message: "Parent with this email already exists",
      });
    }

    // -----------------------------
    // Hash password
    // -----------------------------
    const passwordHash = await bcrypt.hash(password, 10);

    // -----------------------------
    // Create parent
    // -----------------------------
    const parent = await prisma.parent.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone ? String(phone).trim() : null,
        passwordHash,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Parent registered successfully",
      parent: {
        id: parent.id,
        name: parent.name,
        email: parent.email,
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
    const { email, password } = req.body;

    // -----------------------------
    // Input validation
    // -----------------------------
    if (
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    if (password.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    // -----------------------------
    // Find parent
    // -----------------------------
    const parent = await prisma.parent.findUnique({
      where: {
        email: email.toLowerCase().trim(),
      },
    });

    if (!parent) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // -----------------------------
    // Compare password
    // -----------------------------
    const passwordMatch = await bcrypt.compare(
      password,
      parent.passwordHash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // -----------------------------
    // Create JWT token
    // -----------------------------
    const token = jwt.sign(
      {
        parentId: parent.id,
        email: parent.email,
      },
      JWT_SECRET,
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
        email: parent.email,
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