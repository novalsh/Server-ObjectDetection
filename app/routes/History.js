const express = require("express");
const {
  getHistorys,
  getHistory,
  getHistoryByToken,
  createHistory,
} = require("../controllers/HistoryController");
const { protect } = require("../controllers/AuthController");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB in bytes
  },
});

const router = express.Router();

router.get("/api/history", protect, getHistorys);
router.get("/api/history/:id", protect, getHistory);
router.post(
  "/api/history",
  protect,
  upload.single("photo_url"),
  (req, res) => {
    let finalImageURL =
      req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;
    
    createHistory(req, res, finalImageURL);
    
  }
);
router.get("/api/historys/token", protect, getHistoryByToken);

module.exports = router;
