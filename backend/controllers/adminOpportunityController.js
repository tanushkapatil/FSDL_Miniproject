import Opportunity from "../models/Opportunity.js";

const normalizeOpportunityPayload = (body) => ({
  title: body.title,
  company: body.company,
  role: body.role,
  description: body.description,
  deadline: body.deadline,
  applyLink: body.applyLink || "",
  domain: body.domain,
});

export const createOpportunity = async (req, res) => {
  try {
    console.log("POST /api/opportunities request:", req.body);

    const payload = normalizeOpportunityPayload(req.body || {});
    const requiredFields = ["title", "company", "role", "description", "deadline", "domain"];
    const missingField = requiredFields.find((field) => !payload[field] || !String(payload[field]).trim());

    if (missingField) {
      return res.status(400).json({ message: `Missing required field: ${missingField}` });
    }

    const opportunity = await Opportunity.create(payload);

    return res.status(201).json({
      message: "Opportunity created successfully",
      opportunity,
    });
  } catch (error) {
    console.error("Create opportunity error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateOpportunity = async (req, res) => {
  try {
    console.log("PUT /api/opportunities/:id request:", req.params.id, req.body);

    const updatedOpportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      normalizeOpportunityPayload(req.body || {}),
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedOpportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    return res.status(200).json({
      message: "Opportunity updated successfully",
      opportunity: updatedOpportunity,
    });
  } catch (error) {
    console.error("Update opportunity error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteOpportunity = async (req, res) => {
  try {
    console.log("DELETE /api/opportunities/:id request:", req.params.id);

    const deletedOpportunity = await Opportunity.findByIdAndDelete(req.params.id);

    if (!deletedOpportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    return res.status(200).json({
      message: "Opportunity deleted successfully",
    });
  } catch (error) {
    console.error("Delete opportunity error:", error);
    return res.status(500).json({ message: error.message });
  }
};
