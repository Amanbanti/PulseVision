import Patient from "../models/patientModel.js";
import dayjs from 'dayjs';

export const createPatient = async (req, res) => {
  try {
    const { fullName, age, gender, phone, address, scanType } = req.body;

    const newPatient = await Patient.create({
      fullName,
      age,
      gender,
      scanType,
      phone,
      address,
      scanImage: req.file?.path || "",
      analysisResult: req.analysisResult || null, // From middleware
      isAbnormal: req.isAbnormal || false, // From middleware
      confidence: req.confidence || 0, // From middleware
      
    });

    res.status(201).json(newPatient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save patient" });
  }
};




export const getPatientMetrics = async (req, res) => {
  try {
    const allPatients = await Patient.find().sort({ createdAt: -1 });

    const totalScans = allPatients.length;
    const abnormalCases = allPatients.filter(p => p.isAbnormal).length;
    const abnormalPercentage = totalScans > 0 ? (abnormalCases / totalScans) * 100 : 0;

    // Find last upload
    const lastUpload = totalScans > 0 ? allPatients[0].createdAt : null;

    // Filter by current and previous month
    const now = dayjs();
    const startOfThisMonth = now.startOf("month");
    const startOfLastMonth = startOfThisMonth.subtract(1, "month");
    
    const thisMonthScans = allPatients.filter(p =>
      dayjs(p.createdAt).isAfter(startOfThisMonth)
    ).length;

    const lastMonthScans = allPatients.filter(p =>
      dayjs(p.createdAt).isAfter(startOfLastMonth) &&
      dayjs(p.createdAt).isBefore(startOfThisMonth)
    ).length;

    const percentageChange = lastMonthScans > 0
      ? ((thisMonthScans - lastMonthScans) / lastMonthScans) * 100
      : 100;

    const successRate = totalScans > 0
      ? ((totalScans - abnormalCases) / totalScans) * 100
      : 0;

    const threerecentScans = allPatients.slice(0, 3).map(p => ({
      fullName: p.fullName,
      scanType: p.scanType,
      uploadDate: dayjs(p.createdAt).format("YYYY-MM-DD"),
      isAbnormal: p.isAbnormal,
      confidence: p.confidence.toFixed(2)
    }));

    res.status(200).json({
      totalScans,
      abnormalCases,
      abnormalPercentage: abnormalPercentage.toFixed(1),
      lastUpload,
      percentageChange: percentageChange.toFixed(1),
      successRate: successRate.toFixed(1),
      threerecentScans
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to calculate patient metrics" });
  }
};

// @desc    Get all patients
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find()
    res.status(200).json(patients)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get a single patient by ID
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' })
    }
    res.status(200).json(patient)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Update patient
export const updatePatient = async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' })
    }
    res.status(200).json(updatedPatient)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Delete patient
export const deletePatient = async (req, res) => {
  try {
    const deleted = await Patient.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: 'Patient not found' })
    }
    res.status(200).json({ message: 'Patient deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
