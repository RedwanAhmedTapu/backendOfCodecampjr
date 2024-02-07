const LearnerData = require("../models/trial.learner.model");

const updatelearner = async (req, res) => {
  const {email} = req.params;
  console.log(email);

  try {
    const learner = await LearnerData.findOneAndUpdate(
      { learnerEmail: email },
      { completed: true, booked: false },
      { new: true }
    );

    if (!learner) {
      return res.status(404).json({ error: "Learner not found" });
    }

    res.json({ message: "Completed status updated successfully", learner });
  } catch (error) {
    console.error("Error updating completed status:", error);
    res.status(500).json({ error: "Failed to update completed status" });
  }
};

module.exports = updatelearner;
