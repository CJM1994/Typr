const express = require("express");
const router = express.Router();

<<<<<<< HEAD
router.get("/test", (req, res) => {

});
=======
const { getUser } = require('../controllers/userRoutes');

router.get("/user", getUser );
>>>>>>> 84bbdccd68e9a63df9b025aa7adfa53bc77162db

module.exports = router;
