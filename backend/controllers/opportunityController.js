import Opportunity from "../models/Opportunity.js";

export const getOpportunities = async (req, res) => {
  try {
    console.log("GET /api/opportunities request");

    const opportunities = await Opportunity.find().sort({ createdAt: -1 });

    const formattedOpportunities = opportunities.map((opportunity) => ({
      ...opportunity.toObject(),
      domains: opportunity.domain ? [opportunity.domain] : [],
    }));

    return res.status(200).json(formattedOpportunities);
  } catch (error) {
    console.error("Get opportunities error:", error);
    return res.status(500).json({ message: error.message });
  }
};
