const LearnerInfo = require("../models/trial.learner.model");

const learner = async (req, res) => {
  try {
    const {
      learnerName,
      age,
      school,
      parentName,
      phone,
      learnerEmail,
      profession,
      country,
    } = req.body;
    console.log(req.body);
    const learn = await LearnerInfo.findOne({
      learnerEmail
    })
      .exec()
      .then((learnerData) => {
        if (learnerData) {
          res.status(200).send({message:"learner already exist"});
        } else {
          const registerLearner = new LearnerInfo({
            learnerName,
            age,
            school,
            parentName,
            phone,
            learnerEmail,
            profession,
           
          });
          registerLearner.save();
          res.status(200).send({message:"registration completed for the class"});
        }
      })
      .catch((err) => {
        res.status(404).send("error");
      });
  } catch (err) {
    res.status(404).send("err");
  }
};

module.exports = learner;
