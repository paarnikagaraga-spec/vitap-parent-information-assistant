import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import bcrypt from "bcryptjs";

const adapter = new PrismaBetterSqlite3({
  url: "file:./prisma/dev.db",
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("Starting database seed...");

  // Clear existing demo data
  await prisma.auditLog.deleteMany();
  await prisma.hostel.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.grade.deleteMany();
  await prisma.mark.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.academicCalendar.deleteMany();
  await prisma.timetable.deleteMany();
  await prisma.mentor.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.curriculum.deleteMany();
  await prisma.credit.deleteMany();
  await prisma.parentStudent.deleteMany();
  await prisma.student.deleteMany();
  await prisma.parent.deleteMany();

  // Create fictional/demo parent
  const passwordHash = await bcrypt.hash("Test@12345", 10);

const parent = await prisma.parent.create({
  data: {
    name: "Test Parent",
    email: "testparent@example.com",
    phone: "9000000001",
    passwordHash,
  },
});

  // Create fictional/demo student
  const student = await prisma.student.create({
    data: {
      registerNumber: "24MIC7233",
      name: "Shree Priya",
      dateOfBirth: new Date("2006-08-26"),
      email: "priya@example.com",
      phone: "8989455236",
      program: "Integrated M.Tech",
      branch: "Computer Science and Engineering",
      semester: 5,
      section: null,
    },
  });

  // Authorize parent to access this student
  const parentStudent = await prisma.parentStudent.create({
    data: {
      parentId: parent.id,
      studentId: student.id,
      relation: "Father",
      isActive: true,
    },
  });

  await prisma.credit.createMany({
  data: [
    {
      studentId: student.id,
      courseCode: "CSE3001",
      courseName: "Data Structures and Algorithms",
      credits: 4,
      semester: 5,
      status: "Completed",
    },
    {
      studentId: student.id,
      courseCode: "CSE3002",
      courseName: "Database Management Systems",
      credits: 4,
      semester: 5,
      status: "Completed",
    },
    {
      studentId: student.id,
      courseCode: "CSE3003",
      courseName: "Computer Networks",
      credits: 3,
      semester: 5,
      status: "Completed",
    },
    {
      studentId: student.id,
      courseCode: "CSE3004",
      courseName: "Cloud Computing",
      credits: 3,
      semester: 5,
      status: "In Progress",
    },
  ],
  });

  await prisma.attendance.createMany({
  data: [
    {
      studentId: student.id,
      courseCode: "CSE3001",
      courseName: "Data Structures and Algorithms",
      semester: 5,
      attended: 42,
      conducted: 48,
      percentage: 87.5,
    },
    {
      studentId: student.id,
      courseCode: "CSE3002",
      courseName: "Database Management Systems",
      semester: 5,
      attended: 44,
      conducted: 50,
      percentage: 88.0,
    },
    {
      studentId: student.id,
      courseCode: "CSE3003",
      courseName: "Computer Networks",
      semester: 5,
      attended: 39,
      conducted: 45,
      percentage: 86.67,
    },
    {
      studentId: student.id,
      courseCode: "CSE3004",
      courseName: "Cloud Computing",
      semester: 5,
      attended: 41,
      conducted: 47,
      percentage: 87.23,
    },
  ],
  });   
  
  await prisma.mentor.create({
  data: {
    studentId: student.id,
    name: "Dr. Soniya Sharma",
    email: "Soniya.sharma@example.com",
    phone: "9985033789",
    designation: "Associate Professor",
  },
});

await prisma.timetable.createMany({
  data: [
    {
      studentId: student.id,
      day: "Monday",
      startTime: "09:00",
      endTime: "09:50",
      courseCode: "CSE3001",
      courseName: "Data Structures and Algorithms",
      room: "SJT-101",
      faculty: "Dr. Arun Kumar",
      semester: 5,
    },
    {
      studentId: student.id,
      day: "Monday",
      startTime: "10:00",
      endTime: "10:50",
      courseCode: "CSE3002",
      courseName: "Database Management Systems",
      room: "SJT-102",
      faculty: "Dr. Meena Rao",
      semester: 5,
    },
    {
      studentId: student.id,
      day: "Tuesday",
      startTime: "10:00",
      endTime: "10:50",
      courseCode: "CSE3003",
      courseName: "Computer Networks",
      room: "SJT-103",
      faculty: "Dr. Rajesh nayak",
      semester: 5,
    },
    {
      studentId: student.id,
      day: "Tuesday",
      startTime: "11:00",
      endTime: "11:50",
      courseCode: "CSE3004",
      courseName: "Cloud Computing",
      room: "SJT-104",
      faculty: "Dr. Preethi Sharma",
      semester: 5,
    },
  ],
});

await prisma.academicCalendar.createMany({
  data: [
    {
      studentId: student.id,
      title: "Commencement of FALL 2026-27 Semester",
      eventDate: new Date("2026-07-14"),
      description: "First Class Day",
      semester: 5,
    },
    {
      studentId: student.id,
      title: "Independence Day",
      eventDate: new Date("2026-08-15"),
      description: "No Class Day",
      semester: 5,
    },
    {
      studentId: student.id,
      title: "CAT-1",
      eventDate: new Date("2026-08-17"),
      description: "Exam Days: 17th - 24th August 2026",
      semester: 5,
    },
    {
      studentId: student.id,
      title: "Milad-un-Nabi",
      eventDate: new Date("2026-08-26"),
      description: "No Class Day",
      semester: 5,
    },
    {
      studentId: student.id,
      title: "V-TAPP",
      eventDate: new Date("2026-09-07"),
      description: "No Class Days: 7th - 8th September 2026",
      semester: 5,
    },
    {
      studentId: student.id,
      title: "Vinayaka Chaturthi",
      eventDate: new Date("2026-09-14"),
      description: "No Class Day",
      semester: 5,
    },
    {
      studentId: student.id,
      title: "CAT-2",
      eventDate: new Date("2026-09-28"),
      description: "Exam Days: 28th September - 5th October 2026",
      semester: 5,
    },
    {
      studentId: student.id,
      title: "Mahatma Gandhi Jayanti",
      eventDate: new Date("2026-10-02"),
      description: "No Class Day",
      semester: 5,
    },
    {
      studentId: student.id,
      title: "Vijaya Dashami / Dussehra",
      eventDate: new Date("2026-10-20"),
      description: "No Class Day",
      semester: 5,
    },
    {
      studentId: student.id,
      title: "LAB FAT",
      eventDate: new Date("2026-10-31"),
      description: "LAB FAT: 31st October - 6th November 2026",
      semester: 5,
    },
    {
      studentId: student.id,
      title: "Deepavali",
      eventDate: new Date("2026-11-07"),
      description: "No Class Days: 7th - 10th November 2026",
      semester: 5,
    },
    {
      studentId: student.id,
      title: "Engineering Clinics Expo",
      eventDate: new Date("2026-11-14"),
      description: "Evaluation and demonstration of multi-disciplinary engineering projects",
      semester: 5,
    },
    {
      studentId: student.id,
      title: "Last Instructional Day of FALL 2026-27 Semester",
      eventDate: new Date("2026-11-14"),
      description: "Last Instructional Day",
      semester: 5,
    },
    {
      studentId: student.id,
      title: "Theory FAT",
      eventDate: new Date("2026-11-16"),
      description: "Exam Days: 16th November - 1st December 2026",
      semester: 5,
    },
    {
      studentId: student.id,
      title: "Commencement of WIN 2026-27 Semester",
      eventDate: new Date("2026-12-02"),
      description: "First Class Day",
      semester: 5,
    },
    {
      studentId: student.id,
      title: "Winter Vacation for Students",
      eventDate: new Date("2026-12-20"),
      description: "Winter vacation: 20th December 2026 - 4th January 2027",
      semester: 5,
    },
    {
      studentId: student.id,
      title: "Last Date for Upload of Assignments and Projects",
      eventDate: new Date("2026-11-06"),
      description: "Last date for upload of assignments and projects",
      semester: 5,
    },
  ],
});

await prisma.exam.createMany({
  data: [
    {
      studentId: student.id,
      courseCode: "CSE3001",
      courseName: "Data Structures and Algorithms",
      examType: "CAT-2",
      examDate: new Date("2026-09-29"),
      startTime: "10:00",
      room: "SJT-101",
      semester: 5,
    },
    {
      studentId: student.id,
      courseCode: "CSE3002",
      courseName: "Database Management Systems",
      examType: "CAT-2",
      examDate: new Date("2026-09-30"),
      startTime: "14:00",
      room: "SJT-102",
      semester: 5,
    },
    {
      studentId: student.id,
      courseCode: "CSE3003",
      courseName: "Computer Networks",
      examType: "CAT-2",
      examDate: new Date("2026-10-01"),
      startTime: "10:00",
      room: "SJT-103",
      semester: 5,
    },
    {
      studentId: student.id,
      courseCode: "CSE3004",
      courseName: "Cloud Computing",
      examType: "CAT-2",
      examDate: new Date("2026-10-03"),
      startTime: "14:00",
      room: "SJT-104",
      semester: 5,
    },
  ],
});

await prisma.mark.createMany({
  data: [
    {
      studentId: student.id,
      courseCode: "CSE3001",
      courseName: "Data Structures and Algorithms",
      assessment: "CAT-1",
      marks: 42,
      maxMarks: 50,
      semester: 5,
    },
    {
      studentId: student.id,
      courseCode: "CSE3002",
      courseName: "Database Management Systems",
      assessment: "CAT-1",
      marks: 45,
      maxMarks: 50,
      semester: 5,
    },
    {
      studentId: student.id,
      courseCode: "CSE3003",
      courseName: "Computer Networks",
      assessment: "CAT-1",
      marks: 40,
      maxMarks: 50,
      semester: 5,
    },
    {
      studentId: student.id,
      courseCode: "CSE3004",
      courseName: "Cloud Computing",
      assessment: "CAT-1",
      marks: 44,
      maxMarks: 50,
      semester: 5,
    },
  ],
});

await prisma.grade.createMany({
  data: [
    {
      studentId: student.id,
      courseCode: "CSE1001",
      courseName: "Programming Fundamentals",
      grade: "A",
      gradePoint: 9,
      semester: 1,
    },
    {
      studentId: student.id,
      courseCode: "MAT1001",
      courseName: "Engineering Mathematics",
      grade: "A",
      gradePoint: 10,
      semester: 1,
    },
    {
      studentId: student.id,
      courseCode: "CSE2001",
      courseName: "Object Oriented Programming",
      grade: "A",
      gradePoint: 9,
      semester: 2,
    },
    {
      studentId: student.id,
      courseCode: "CSE2002",
      courseName: "Operating Systems",
      grade: "B",
      gradePoint: 8,
      semester: 2,
    },
  ],
});

await prisma.payment.createMany({
  data: [
    {
      studentId: student.id,
      transactionId: "TXN2026CSE001",
      amount: 100000,
      paymentDate: new Date("2026-07-10"),
      paymentType: "Tution Fee",
      paymentMethod: "UPI",
      status: "Paid",
      receiptPath: "/receipts/TXN2026CSE001.pdf",
    },
    {
      studentId: student.id,
      transactionId: "TXN2026HOST002",
      amount: 200000,
      paymentDate: new Date("2026-07-12"),
      paymentType: "Hostel Fee",
      paymentMethod: "Net Banking",
      status: "Paid",
      receiptPath: "/receipts/TXN2026HOST002.pdf",
    },
    {
      studentId: student.id,
      transactionId: "TXN2026CSE003",
      amount: 12000,
      paymentDate: new Date("2026-08-05"),
      paymentType: "Mess fee",
      paymentMethod: "Debit Card",
      status: "Paid",
      receiptPath: "/receipts/TXN2026CSE003.pdf",
    },
  ],
});

await prisma.hostel.create({
  data: {
    studentId: student.id,
    hostelName: "VIT-AP Hostel",
    block: "LH 2 Block",
    roomNumber: "408",
    floor: "4rd Floor",
    bedType: "4-bed-AC",
  },
});

await prisma.curriculum.createMany({
  data: [
    {
      studentId: student.id,
      courseCode: "CSE3001",
      courseName: "Data Structures and Algorithms",
      credits: 4,
      category: "Core",
      semester: 5,
    },
    {
      studentId: student.id,
      courseCode: "CSE3002",
      courseName: "Database Management Systems",
      credits: 4,
      category: "Core",
      semester: 5,
    },
    {
      studentId: student.id,
      courseCode: "CSE3003",
      courseName: "Computer Networks",
      credits: 3,
      category: "Core",
      semester: 5,
    },
    {
      studentId: student.id,
      courseCode: "CSE3004",
      courseName: "Cloud Computing",
      credits: 3,
      category: "Elective",
      semester: 5,
    },
  ],
});

  console.log("Parent created:", parent.name);
  console.log("Parent email:", parent.email);
  console.log("Student created:", student.name);
  console.log("Register number:", student.registerNumber);
  console.log("Parent-student authorization created:", parentStudent.id);
  console.log("Database seed completed successfully!");
  console.log("Attendance data created successfully!");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  