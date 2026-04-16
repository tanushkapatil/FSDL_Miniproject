import Submission from "../models/Submission.js";

export const getSubmissions = async (req, res) => {
  try {
    console.log("GET /api/submissions request", req.query);

    const { type, date } = req.query;
    const query = {};

    if (type) {
      query.type = String(type).trim().toLowerCase();
    }

    if (date) {
      const start = new Date(date);
      if (!Number.isNaN(start.getTime())) {
        const end = new Date(start);
        end.setDate(end.getDate() + 1);

        query.$or = [
          {
            createdAt: {
              $gte: start,
              $lt: end,
            },
          },
          {
            "data.date": {
              $gte: start.toISOString().slice(0, 10),
              $lt: end.toISOString().slice(0, 10),
            },
          },
        ];
      }
    }

    const submissions = await Submission.find(query)
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    const normalizedSubmissions = submissions.map((submission) => {
      const object = submission.toObject();
      const fallbackName = object.userId?.name || "";
      const fallbackEmail = object.userId?.email || "";

      return {
        ...object,
        userName: object.userName || fallbackName,
        userEmail: object.userEmail || fallbackEmail,
      };
    });

    return res.status(200).json(normalizedSubmissions);
  } catch (error) {
    console.error("Get submissions error:", error);
    return res.status(500).json({ message: error.message });
  }
};
