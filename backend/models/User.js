import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    prn: {
      type: String,
      trim: true,
      required: function requirePrn() {
        return this.role === "user";
      },
      default: "",
    },
    division: {
      type: String,
      trim: true,
      required: function requireDivision() {
        return this.role === "user";
      },
      default: "",
    },
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Opportunity",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const bcryptHashPattern = /^\$2[aby]\$\d{2}\$.{53}$/;

userSchema.pre("save", async function preSave() {
  if (!this.isModified("password")) {
    return;
  }

  // Avoid rehashing if password is already a bcrypt hash.
  if (bcryptHashPattern.test(this.password)) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);

export default User;
