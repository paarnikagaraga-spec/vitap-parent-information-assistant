import { Response } from "express";
import { prisma } from "../services/prisma.service";
import { StudentAuthorizedRequest } from "../middleware/student-access.middleware";

// ============================================================
// 1. STUDENT PROFILE
// ============================================================

export const getStudentProfile = async (
  req: StudentAuthorizedRequest,
  res: Response
) => {
  try {
    if (!req.studentId) {
      return res.status(403).json({
        success: false,
        message: "Student authorization is required",
      });
    }

    const student = await prisma.student.findUnique({
      where: {
        id: req.studentId,
      },
      select: {
        registerNumber: true,
        name: true,
        dateOfBirth: true,
        email: true,
        phone: true,
        program: true,
        branch: true,
        semester: true,
        section: true,
      },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.json({
      success: true,
      data: student,
    });
  } catch (error) {
    console.error("Error fetching student profile:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch student profile",
    });
  }
};

// ============================================================
// 2. CREDITS
// ============================================================

export const getStudentCredits = async (
  req: StudentAuthorizedRequest,
  res: Response
) => {
  try {
    if (!req.studentId) {
      return res.status(403).json({
        success: false,
        message: "Student authorization is required",
      });
    }

    const credits = await prisma.credit.findMany({
      where: {
        studentId: req.studentId,
      },
      select: {
        courseCode: true,
        courseName: true,
        credits: true,
        semester: true,
        status: true,
      },
      orderBy: [
        {
          semester: "asc",
        },
        {
          courseCode: "asc",
        },
      ],
    });

    return res.json({
      success: true,
      data: credits,
    });
  } catch (error) {
    console.error("Error fetching credits:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch credits",
    });
  }
};

// ============================================================
// 3. CURRENT ATTENDANCE
// ============================================================

export const getCurrentAttendance = async (
  req: StudentAuthorizedRequest,
  res: Response
) => {
  try {
    if (!req.studentId) {
      return res.status(403).json({
        success: false,
        message: "Student authorization is required",
      });
    }

    const student = await prisma.student.findUnique({
      where: {
        id: req.studentId,
      },
      select: {
        semester: true,
      },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const currentSemester = student.semester ?? 5;

    const attendance = await prisma.attendance.findMany({
      where: {
        studentId: req.studentId,
        semester: currentSemester,
      },
      select: {
        courseCode: true,
        courseName: true,
        attended: true,
        conducted: true,
        percentage: true,
        semester: true,
      },
      orderBy: {
        courseCode: "asc",
      },
    });

    return res.json({
      success: true,
      semester: currentSemester,
      data: attendance,
    });
  } catch (error) {
    console.error("Error fetching current attendance:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch current attendance",
    });
  }
};

// ============================================================
// 4. SEMESTER ATTENDANCE
// ============================================================

export const getSemesterAttendance = async (
  req: StudentAuthorizedRequest,
  res: Response
) => {
  try {
    if (!req.studentId) {
      return res.status(403).json({
        success: false,
        message: "Student authorization is required",
      });
    }

    const student = await prisma.student.findUnique({
      where: {
        id: req.studentId,
      },
      select: {
        semester: true,
      },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const currentSemester = student.semester ?? 5;

    const attendance = await prisma.attendance.findMany({
      where: {
        studentId: req.studentId,
        semester: currentSemester,
      },
      select: {
        courseCode: true,
        courseName: true,
        attended: true,
        conducted: true,
        percentage: true,
      },
      orderBy: {
        courseCode: "asc",
      },
    });

    const totalAttended = attendance.reduce(
      (sum, item) => sum + item.attended,
      0
    );

    const totalConducted = attendance.reduce(
      (sum, item) => sum + item.conducted,
      0
    );

    const overallPercentage =
      totalConducted > 0
        ? Number(((totalAttended / totalConducted) * 100).toFixed(2))
        : 0;

    return res.json({
      success: true,
      semester: currentSemester,
      overallPercentage,
      data: attendance,
    });
  } catch (error) {
    console.error("Error fetching semester attendance:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch semester attendance",
    });
  }
};

// ============================================================
// 5. SUBJECT ATTENDANCE
// ============================================================

export const getSubjectAttendance = async (
  req: StudentAuthorizedRequest,
  res: Response
) => {
  try {
    const { courseCode } = req.query;

    if (!courseCode || typeof courseCode !== "string") {
      return res.status(400).json({
        success: false,
        message: "courseCode is required",
      });
    }

    if (!req.studentId) {
      return res.status(403).json({
        success: false,
        message: "Student authorization is required",
      });
    }

    const student = await prisma.student.findUnique({
      where: {
        id: req.studentId,
      },
      select: {
        id: true,
        name: true,
        registerNumber: true,
      },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const attendance = await prisma.attendance.findFirst({
      where: {
        studentId: req.studentId,
        courseCode: courseCode,
      },
      select: {
        courseCode: true,
        courseName: true,
        semester: true,
        attended: true,
        conducted: true,
        percentage: true,
      },
    });

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance not found for this subject",
      });
    }

    return res.json({
      success: true,
      student: {
        name: student.name,
        registerNumber: student.registerNumber,
      },
      data: attendance,
    });
  } catch (error) {
    console.error("Error fetching subject attendance:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch subject attendance",
    });
  }
};

// ============================================================
// 6. MENTOR
// ============================================================

export const getStudentMentor = async (
  req: StudentAuthorizedRequest,
  res: Response
) => {
  try {
    if (!req.studentId) {
      return res.status(403).json({
        success: false,
        message: "Student authorization is required",
      });
    }

    const mentor = await prisma.mentor.findUnique({
      where: {
        studentId: req.studentId,
      },
      select: {
        name: true,
        email: true,
        phone: true,
        designation: true,
      },
    });

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor details not found",
      });
    }

    return res.json({
      success: true,
      data: mentor,
    });
  } catch (error) {
    console.error("Error fetching mentor:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch mentor details",
    });
  }
};

// ============================================================
// 7. TIMETABLE
// ============================================================

export const getStudentTimetable = async (
  req: StudentAuthorizedRequest,
  res: Response
) => {
  try {
    if (!req.studentId) {
      return res.status(403).json({
        success: false,
        message: "Student authorization is required",
      });
    }

    const timetable = await prisma.timetable.findMany({
      where: {
        studentId: req.studentId,
      },
      select: {
        day: true,
        startTime: true,
        endTime: true,
        courseCode: true,
        courseName: true,
        room: true,
        faculty: true,
        semester: true,
      },
      orderBy: [
        {
          day: "asc",
        },
        {
          startTime: "asc",
        },
      ],
    });

    return res.json({
      success: true,
      data: timetable,
    });
  } catch (error) {
    console.error("Error fetching timetable:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch timetable",
    });
  }
};

// ============================================================
// 8. ACADEMIC CALENDAR
// ============================================================

export const getAcademicCalendar = async (
  req: StudentAuthorizedRequest,
  res: Response
) => {
  try {
    if (!req.studentId) {
      return res.status(403).json({
        success: false,
        message: "Student authorization is required",
      });
    }

    const calendar = await prisma.academicCalendar.findMany({
      where: {
        studentId: req.studentId,
      },
      select: {
        title: true,
        eventDate: true,
        description: true,
        semester: true,
      },
      orderBy: {
        eventDate: "asc",
      },
    });

    return res.json({
      success: true,
      data: calendar,
    });
  } catch (error) {
    console.error("Error fetching academic calendar:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch academic calendar",
    });
  }
};

// ============================================================
// 9. EXAM SCHEDULE
// ============================================================

export const getStudentExams = async (
  req: StudentAuthorizedRequest,
  res: Response
) => {
  try {
    if (!req.studentId) {
      return res.status(403).json({
        success: false,
        message: "Student authorization is required",
      });
    }

    const exams = await prisma.exam.findMany({
      where: {
        studentId: req.studentId,
      },
      select: {
        courseCode: true,
        courseName: true,
        examType: true,
        examDate: true,
        startTime: true,
        room: true,
        semester: true,
      },
      orderBy: {
        examDate: "asc",
      },
    });

    return res.json({
      success: true,
      data: exams,
    });
  } catch (error) {
    console.error("Error fetching exam schedule:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch exam schedule",
    });
  }
};

// ============================================================
// 10. MARKS
// ============================================================

export const getStudentMarks = async (
  req: StudentAuthorizedRequest,
  res: Response
) => {
  try {
    if (!req.studentId) {
      return res.status(403).json({
        success: false,
        message: "Student authorization is required",
      });
    }

    const marks = await prisma.mark.findMany({
      where: {
        studentId: req.studentId,
      },
      select: {
        courseCode: true,
        courseName: true,
        assessment: true,
        marks: true,
        maxMarks: true,
        semester: true,
      },
      orderBy: [
        {
          semester: "asc",
        },
        {
          courseCode: "asc",
        },
        {
          assessment: "asc",
        },
      ],
    });

    return res.json({
      success: true,
      data: marks,
    });
  } catch (error) {
    console.error("Error fetching marks:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch marks",
    });
  }
};

// ============================================================
// 11. GRADE HISTORY
// ============================================================

export const getStudentGrades = async (
  req: StudentAuthorizedRequest,
  res: Response
) => {
  try {
    if (!req.studentId) {
      return res.status(403).json({
        success: false,
        message: "Student authorization is required",
      });
    }

    const student = await prisma.student.findUnique({
      where: {
        id: req.studentId,
      },
      select: {
        semester: true,
      },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    const currentSemester = student.semester ?? 5;

    const grades = await prisma.grade.findMany({
      where: {
        studentId: req.studentId,
        semester: {
          lt: currentSemester,
        },
      },
      select: {
        courseCode: true,
        courseName: true,
        grade: true,
        gradePoint: true,
        semester: true,
      },
      orderBy: [
        {
          semester: "asc",
        },
        {
          courseCode: "asc",
        },
      ],
    });

    return res.json({
      success: true,
      data: grades,
    });
  } catch (error) {
    console.error("Error fetching grade history:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch grade history",
    });
  }
};

// ============================================================
// 12. PAYMENT HISTORY
// ============================================================

export const getStudentPayments = async (
  req: StudentAuthorizedRequest,
  res: Response
) => {
  try {
    if (!req.studentId) {
      return res.status(403).json({
        success: false,
        message: "Student authorization is required",
      });
    }

    const payments = await prisma.payment.findMany({
      where: {
        studentId: req.studentId,
      },
      select: {
        transactionId: true,
        amount: true,
        paymentDate: true,
        paymentType: true,
        paymentMethod: true,
        status: true,
        receiptPath: true,
      },
      orderBy: {
        paymentDate: "desc",
      },
    });

    return res.json({
      success: true,
      data: payments,
    });
  } catch (error) {
    console.error("Error fetching payment history:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch payment history",
    });
  }
};

// ============================================================
// 13. PAYMENT RECEIPT
// ============================================================

export const getPaymentReceipt = async (
  req: StudentAuthorizedRequest,
  res: Response
) => {
  try {
    const studentId = req.studentId!;

    const payment = await prisma.payment.findFirst({
      where: {
        studentId,
      },
      orderBy: {
        paymentDate: "desc",
      },
      select: {
        transactionId: true,
        amount: true,
        paymentDate: true,
        paymentType: true,
        status: true,
      },
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "No payment receipt found",
      });
    }

    return res.json({
      success: true,
      receipt: payment,
      message: "Payment receipt details retrieved securely",
    });
  } catch (error) {
    console.error("Payment receipt error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve payment receipt",
    });
  }
};

// ============================================================
// 14. PAYMENT METHOD
// ============================================================

export const getPaymentMethod = async (
  req: StudentAuthorizedRequest,
  res: Response
) => {
  try {
    const { transactionId } = req.query;

    if (!transactionId || typeof transactionId !== "string") {
      return res.status(400).json({
        success: false,
        message: "transactionId is required",
      });
    }

    if (!req.studentId) {
      return res.status(403).json({
        success: false,
        message: "Student authorization is required",
      });
    }

    const payment = await prisma.payment.findFirst({
      where: {
        studentId: req.studentId,
        transactionId: transactionId,
      },
      select: {
        transactionId: true,
        paymentMethod: true,
        status: true,
      },
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    return res.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    console.error("Error fetching payment method:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch payment method",
    });
  }
};

// ============================================================
// 15. HOSTEL
// ============================================================

export const getStudentHostel = async (
  req: StudentAuthorizedRequest,
  res: Response
) => {
  try {
    if (!req.studentId) {
      return res.status(403).json({
        success: false,
        message: "Student authorization is required",
      });
    }

    const hostel = await prisma.hostel.findUnique({
      where: {
        studentId: req.studentId,
      },
      select: {
        hostelName: true,
        block: true,
        roomNumber: true,
        floor: true,
        bedType: true,
      },
    });

    if (!hostel) {
      return res.status(404).json({
        success: false,
        message: "Hostel details not found",
      });
    }

    return res.json({
      success: true,
      data: hostel,
    });
  } catch (error) {
    console.error("Error fetching hostel details:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch hostel details",
    });
  }
};

// ============================================================
// 16. CURRICULUM
// ============================================================

export const getStudentCurriculum = async (
  req: StudentAuthorizedRequest,
  res: Response
) => {
  try {
    if (!req.studentId) {
      return res.status(403).json({
        success: false,
        message: "Student authorization is required",
      });
    }

    const curriculum = await prisma.curriculum.findMany({
      where: {
        studentId: req.studentId,
      },
      select: {
        courseCode: true,
        courseName: true,
        credits: true,
        category: true,
        semester: true,
      },
      orderBy: [
        {
          semester: "asc",
        },
        {
          courseCode: "asc",
        },
      ],
    });

    return res.json({
      success: true,
      data: curriculum,
    });
  } catch (error) {
    console.error("Error fetching curriculum:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch curriculum",
    });
  }
};