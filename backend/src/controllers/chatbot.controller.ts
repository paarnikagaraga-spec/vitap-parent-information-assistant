
import { Response } from "express";
import { prisma } from "../services/prisma.service";
import { StudentAuthorizedRequest } from "../middleware/student-access.middleware";

export const askChatbot = async (
  req: StudentAuthorizedRequest,
  res: Response
) => {
  try {
    const question = String(req.body?.message || "").trim();

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Please enter a question.",
      });
    }

    if (question.length > 500) {
      return res.status(400).json({
        success: false,
        message: "Question must be 500 characters or fewer.",
      });
    }

    if (!req.studentId) {
      return res.status(403).json({
        success: false,
        message: "No authorized student is linked to this parent.",
      });
    }

    const q = question.toLowerCase();
    let answer = "";

    // ATTENDANCE
    if (q.includes("attendance")) {
      const records = await prisma.attendance.findMany({
        where: { studentId: req.studentId },
      });

      answer = records.length
        ? records
            .map(
              (r: any) =>
                `${r.courseName || r.courseCode}: ${
                  r.attendancePercentage ??
                  r.percentage ??
                  "N/A"
                }% attendance`
            )
            .join("\n")
        : "No attendance records were found.";

    // MARKS
    } else if (q.includes("mark")) {
      const records = await prisma.mark.findMany({
        where: { studentId: req.studentId },
      });

      answer = records.length
        ? records
            .map(
              (r: any) =>
                `${r.courseName || r.courseCode}: ${r.marks}/${r.maxMarks}`
            )
            .join("\n")
        : "No marks records were found.";

    // TIMETABLE
    } else if (
      q.includes("timetable") ||
      q.includes("class schedule")
    ) {
      const records = await prisma.timetable.findMany({
        where: { studentId: req.studentId },
        orderBy: [{ day: "asc" }, { startTime: "asc" }],
      });

      answer = records.length
        ? records
            .map(
              (r: any) =>
                `${r.day}, ${r.startTime}-${r.endTime}: ${
                  r.courseName || r.courseCode
                }, ${r.room || "Room not listed"}`
            )
            .join("\n")
        : "No timetable records were found.";

    // EXAM SCHEDULE
    } else if (q.includes("exam")) {
      const records = await prisma.exam.findMany({
        where: { studentId: req.studentId },
      });

      answer = records.length
        ? records
            .map(
              (r: any) =>
                `${r.courseName || r.courseCode}: ${
                  r.examDate ?? r.date ?? "Date not listed"
                } ${r.time ?? ""}`
            )
            .join("\n")
        : "No exam schedule records were found.";

    // CREDITS
    } else if (
      q.includes("credit") ||
      q.includes("curriculum")
    ) {
      const records = await prisma.credit.findMany({
        where: { studentId: req.studentId },
        orderBy: [{ semester: "asc" }, { courseCode: "asc" }],
      });

      if (records.length) {
        const totalCredits = records.reduce(
          (sum, record) => sum + record.credits,
          0
        );

        const completedCredits = records
          .filter(
            (record) =>
              record.status?.toLowerCase() === "completed"
          )
          .reduce((sum, record) => sum + record.credits, 0);

        answer =
          `Total listed credits: ${totalCredits}\n` +
          `Completed credits: ${completedCredits}\n\n` +
          records
            .map(
              (r) =>
                `${r.courseCode} - ${r.courseName}: ${r.credits} credits, Semester ${r.semester}, Status: ${r.status || "Not specified"}`
            )
            .join("\n");
      } else {
        answer = "No credit records were found.";
      }

    // MENTOR
    } else if (q.includes("mentor")) {
      const mentor = await prisma.mentor.findUnique({
        where: { studentId: req.studentId },
      });

      answer = mentor
        ? `Mentor: ${mentor.name}\nDesignation: ${
            mentor.designation || "Not specified"
          }\nEmail: ${mentor.email || "Not available"}\nPhone: ${
            mentor.phone || "Not available"
          }`
        : "No mentor details were found.";

    // HOSTEL
    } else if (
      q.includes("hostel") ||
      q.includes("room number") ||
      q.includes("hostel block") ||
      q.includes("bed type")
    ) {
      const hostel = await prisma.hostel.findUnique({
        where: { studentId: req.studentId },
      });

      answer = hostel
        ? `Hostel: ${hostel.hostelName}\nBlock: ${
            hostel.block
          }\nRoom Number: ${hostel.roomNumber}\nFloor: ${
            hostel.floor || "Not specified"
          }\nBed Type: ${hostel.bedType || "Not specified"}`
        : "No hostel details were found.";
    
    
    // PAYMENT DETAILS
    } else if (
      q.includes("payment") ||
      q.includes("fee") ||
      q.includes("transaction") ||
      q.includes("receipt")
    ) {
      const payments = await prisma.payment.findMany({
        where: { studentId: req.studentId },
        orderBy: { paymentDate: "desc" },
      });

      if (!payments.length) {
        answer = "No payment records were found.";
      } else if (
        q.includes("method") ||
        q.includes("how did") ||
        q.includes("mode")
      ) {
        answer = payments
          .map(
            (p) =>
              `${p.transactionId}: Payment method: ${p.paymentMethod}`
          )
          .join("\n");
      } else if (
        q.includes("receipt") ||
        q.includes("receipt details")
      ) {
        answer = payments
          .map(
            (p) =>
              `Transaction: ${p.transactionId}\n` +
              `Amount: ₹${p.amount}\n` +
              `Date: ${p.paymentDate.toLocaleDateString()}\n` +
              `Type: ${p.paymentType}\n` +
              `Status: ${p.status}\n` +
              `Receipt: ${
                p.receiptPath
                  ? "Receipt is available. Open it through the secure receipt page."
                  : "No receipt recorded."
              }`
          )
          .join("\n\n");
      } else {
        answer = payments
          .map(
            (p) =>
              `Transaction ID: ${p.transactionId}\n` +
              `Amount: ₹${p.amount}\n` +
              `Date: ${p.paymentDate.toLocaleDateString()}\n` +
              `Type: ${p.paymentType}\n` +
              `Method: ${p.paymentMethod}\n` +
              `Status: ${p.status}`
          )
          .join("\n\n");
      }

    // UNKNOWN QUESTION
    } else {
      answer =
        "I can help you with attendance, marks, timetable, exam schedule, credits, mentor details, and hostel information. Please ask about one of these topics.";
    }

    return res.json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("Chatbot error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to answer your question right now.",
    });
  }
};
