import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["internship", "hackathon"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    userName: {
      type: String,
      default: "",
    },
    userEmail: {
      type: String,
      default: "",
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
