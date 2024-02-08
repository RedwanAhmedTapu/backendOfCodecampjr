const LearnerData = require("../models/trial.learner.model");

const activeUser = async (req, res) => {
    
  const email = req.params.emailId;
  console.log(email)
  try {
    const activeuserData = await LearnerData.findOne({ learnerEmail:email,active:true })
      .exec()
      .then((activeUser) => {
        if (activeUser) {
          res.status(200).send(activeUser);
        } else {
          res.status(200).send("no active user");
        }
      })
      .catch((err) => {
        res.status(404).send(" error");
      });
  } catch {
    res.status(404).send("catch error");
  }
};

module.exports = activeUser;
