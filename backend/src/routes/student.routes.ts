import { Router } from "express";

import {
  getStudentProfile,
  getStudentCredits,
  getCurrentAttendance,
  getSemesterAttendance,
  getSubjectAttendance,
  getStudentMentor,
  getStudentTimetable,
  getAcademicCalendar,
  getStudentExams,
  getStudentMarks,
  getStudentGrades,
  getStudentPayments,
  getPaymentReceipt,
  getPaymentMethod,
  getStudentHostel,
  getStudentCurriculum,
} from "../controllers/student.controller";

import { authenticateParent } from "../middleware/auth.middleware";
import { authorizeStudent } from "../middleware/student-access.middleware";

const router = Router();

// Protect all student routes
router.use(authenticateParent, authorizeStudent);

router.get("/profile", getStudentProfile);
router.get("/credits", getStudentCredits);

router.get("/attendance/current", getCurrentAttendance);
router.get("/attendance/semester", getSemesterAttendance);
router.get("/attendance/subject", getSubjectAttendance);

router.get("/mentor", getStudentMentor);
router.get("/timetable", getStudentTimetable);
router.get("/academic-calendar", getAcademicCalendar);
router.get("/exams", getStudentExams);
router.get("/marks", getStudentMarks);
router.get("/grades", getStudentGrades);

router.get("/payments", getStudentPayments);
router.get("/payment/receipt", getPaymentReceipt);
router.get("/payments/method", getPaymentMethod);

router.get("/hostel", getStudentHostel);
router.get("/curriculum", getStudentCurriculum);

export default router;