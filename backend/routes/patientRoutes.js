// routes/patientRoutes.js
import express from "express";
import { 
    createPatient,
    getPatientMetrics,
    getAllPatients
 } from "../controllers/patientController.js";
import { uploadSingleScanImage} from "../middleware/upload.js";
import { analyzeImage } from "../middleware/analyzeImage.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/",protect, uploadSingleScanImage, analyzeImage, createPatient);
router.get("/", protect, getAllPatients); 
router.get("/metrics", protect, getPatientMetrics);

export default router;
