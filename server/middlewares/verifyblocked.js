const user = require("../models/usermodel");
const verifyisblocked = async (req, res) => {
  try {
    const currentuser = username._id;
    if (currentuser) {
      const isuser = await user.findById({ id: currentuser });
      if (isuser) {
        const isblocked = isuser.isBlocked ? true : false;
        if (isblocked) {
          res.status(401).json({ success: false, msg: "you are blocked !" });
          
        } else {
          res.status(200).json({ success: true, msg: "clear to user !" });
          next();
        }
      } else {
        res.status(404).json({ success: false, msg: "user not found" });
      }
    } else {
      res.status(404).json({ success: false, msg: "no current user" });
    }
  } catch (err) {
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};
module.exports = {verifyisblocked}