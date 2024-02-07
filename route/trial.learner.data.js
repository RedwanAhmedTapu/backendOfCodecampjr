const LearnerData=require("../models/trial.learner.model") ;

const trialLearner=async (req, res) => {
    try {

      const learner = await LearnerData.find({});
      if (!learner) {
        return res.status(404).json({ message: "Learners not found" });
      }
      res.status(200).json(learner);
    } catch (err) {
      console.error("Error fetching learner:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  module.exports=trialLearner;