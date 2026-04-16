import Submission from "../models/Submission.js";
import User from "../models/User.js";

export const createSubmission = async (req, res) => {
  try {
    console.log("Submission payload:", req.body);

    const { type, data } = req.body;

    if (!type || !data) {
      return res.status(400).json({ message: "Missing required submission fields" });
    }

    const requiredFieldsByType = {
      internship: ["companyName", "role", "startDate", "endDate", "duration", "prn", "division", "description"],
      hackathon: ["hackathonName", "teamName", "position", "date", "teamSize", "description"],
    };

    const requiredFields = requiredFieldsByType[type];

    if (!requiredFields) {
      return res.status(400).json({ message: "Invalid submission type" });
    }

    const missingField = requiredFields.find((field) => !data[field] || !String(data[field]).trim());

    if (missingField) {
      return res.status(400).json({ message: `Missing required field: ${missingField}` });
    }

    if (type === "internship") {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);

      if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
        return res.status(400).json({ message: "Invalid internship start or end date" });
      }

      if (startDate.getTime() > endDate.getTime()) {
        return res.status(400).json({ message: "Internship start date cannot be after end date" });
      }
    }

    if (type === "hackathon") {
      const teamSize = Number(data.teamSize);

      if (!Number.isInteger(teamSize) || teamSize < 1) {
        return res.status(400).json({ message: "Team size must be at least 1" });
      }

      if (!Array.isArray(data.members) || data.members.length !== teamSize) {
        return res.status(400).json({ message: "Team member details are incomplete" });
      }

      const hasInvalidMember = data.members.some(
        (member) => !member?.name?.trim() || !member?.prn?.trim() || !member?.division?.trim()
      );

      if (hasInvalidMember) {
        return res.status(400).json({ message: "Each team member needs name, PRN and division" });
      }
    }

    const currentUser = req.user?.id ? await User.findById(req.user.id) : null;

    const submission = await Submission.create({
      type,
      userId: currentUser?._id || null,
      userName: currentUser?.name || "",
      userEmail: currentUser?.email || "",
      data,
    });

    return res.status(201).json({
      message: "Submission saved successfully",
      submission,
    });
  } catch (error) {
    console.error("Submission error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getMySubmissions = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const submissions = await Submission.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({ submissions });
  } catch (error) {
    console.error("Get my submissions error:", error);
    return res.status(500).json({ message: error.message });
  }
};
