import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
const DEFAULT_ADMIN_EMAIL = "admin@gmail.com";
const DEFAULT_ADMIN_PASSWORD = "admin";

const getAdminEmails = () => {
  const configured = process.env.ADMIN_EMAILS || process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL;
  return new Set(
    configured
      .split(",")
      .map((email) => email.toLowerCase().trim())
      .filter(Boolean)
  );
};

const getAdminPassword = () => process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

const handleControllerError = (error, res, context) => {
  console.error(`${context} error:`, error);

  return res.status(500).json({ message: error.message });
};

export const registerUser = async (req, res) => {
  try {
    console.log(req.body);

    const { name, email, password, prn, division } = req.body;

    if (!name?.trim() || !email?.trim() || !password?.trim() || !prn?.trim() || !division?.trim()) {
      return res.status(400).json({ message: "Name, email, password, PRN and division are required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please provide a valid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const adminEmails = getAdminEmails();

    if (adminEmails.has(normalizedEmail)) {
      return res.status(403).json({ message: "Admin account cannot be registered" });
    }

    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "user",
      prn: prn.trim(),
      division: division.trim(),
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return handleControllerError(error, res, "Register");
  }
};

export const register = registerUser;

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const adminEmails = getAdminEmails();
    const adminPassword = getAdminPassword();

    if (adminEmails.has(normalizedEmail)) {
      if (password !== adminPassword) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      let adminUser = await User.findOne({ email: normalizedEmail }).select("+password");

      if (!adminUser) {
        const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);
        adminUser = await User.create({
          name: "Admin",
          email: normalizedEmail,
          password: hashedAdminPassword,
          role: "admin",
        });
      } else if (adminUser.role !== "admin") {
        adminUser.role = "admin";
        await adminUser.save();
      }

      if (!process.env.JWT_SECRET) {
        return res.status(500).json({
          success: false,
          message: "JWT secret is not configured",
        });
      }

      const token = jwt.sign(
        {
          id: adminUser._id,
          role: adminUser.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).json({
        success: true,
        token,
        user: {
          id: adminUser._id,
          name: adminUser.name,
          email: adminUser.email,
          role: adminUser.role,
          prn: adminUser.prn || "",
          division: adminUser.division || "",
        },
      });
    }

    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT secret is not configured",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        prn: user.prn || "",
        division: user.division || "",
      },
    });
  } catch (error) {
    return handleControllerError(error, res, "Login");
  }
};

export const getMe = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId).select("name email role prn division");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        prn: user.prn || "",
        division: user.division || "",
      },
    });
  } catch (error) {
    return handleControllerError(error, res, "GetMe");
  }
};
