const LearnerData = require("../models/trial.learner.model");

const learnerdata = async (req, res) => {
    try {
        const { email, level, schedule } = req.body;
        console.log(req.body);

        // Update learner fields
       
        // Find the learner by email and update the fields
        const updatedLearner = await LearnerData.findOneAndUpdate(
            { learnerEmail: email },
            {level,schedule,completed:false,active:true},
            { new: true }
        );

        if (!updatedLearner) {
            return res.status(404).json({ message: "Learner not found" });
        }

        res.status(200).json({ message: "Learner schedule successfully updated" });
    } catch (error) {
        console.error("Error updating learner:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = learnerdata;
