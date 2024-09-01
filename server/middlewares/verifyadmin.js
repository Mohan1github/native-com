const user = require("../models/usermodel");
const verifyisadmin = async (req, res) => {
  try {
    const currentuser = username._id;
    if (currentuser) {
      const isuser = await user.findById({ id: currentuser });
      if (isuser) {
        const isAdmin = isuser.isAdmin ? true : false;
        if (isAdmin) {
          res.status(200).json({ success: true, msg: "admin detected !" });
          next();
        } else {
          res.status(402).json({ success: false, msg: "admin not detected !" });
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
module.exports = {verifyisadmin}
