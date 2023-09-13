const ActiveStudentModel = require("../models/active.user.model");

const activeUser = async (req, res) => {
  const { level, group, schedule, email, profile } = req.body;
  try {
    const activeuserData = await ActiveStudentModel.findOne({ email })
      .exec()
      .then((activeUser) => {
        if (activeUser) {
          res.status(200).send("user already exist");
        } else {
          const activeUserRegistration = new ActiveStudentModel({
            level,
            group,
            schedule,
            email,
            profile,
          });
          activeUserRegistration.save();
          res.send("successfully activeStudentData saved");
        }
      })
      .catch((err) => {
        res.status(404).send(" error");
      });
  } catch {
    res.status(404).send("catch error");
  }
};

module.exports=activeUser;