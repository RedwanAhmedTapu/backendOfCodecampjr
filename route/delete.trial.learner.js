const LearnerData = require("../models/trial.learner.model");


const learnerData=async (req, res) => {
    try {
      const { email } = req.params;
      console.log(email)
  
      // Find the learner by email and delete
      const deletedLearner = await LearnerData.findOneAndDelete({ learnerEmail: email });
  
      if (!deletedLearner) {
        return res.status(404).json({ message: "Learner not found" });
      }
  
      res.status(200).json({ message: "Learner deleted successfully" });
    } catch (error) {
      console.error("Error deleting learner:", error);
      res.status(500).json({ message: "Internal server error" });
    }
}

module.exports=learnerData;