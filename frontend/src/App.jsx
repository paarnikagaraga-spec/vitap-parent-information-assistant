import { useState } from "react";
import "./App.css";

const menuItems = [
  { id: "dashboard", icon: "⌂", label: "Dashboard" },
  { id: "profile", icon: "♙", label: "Student Profile" },
  { id: "academics", icon: "▣", label: "Academics" },
  { id: "attendance", icon: "◷", label: "Attendance" },
  { id: "mentor", icon: "♙", label: "Mentor Details" },
  { id: "timetable", icon: "▦", label: "Timetable" },
  { id: "calendar", icon: "◫", label: "Academic Calendar" },
  { id: "exams", icon: "✎", label: "Exam Schedule" },
  { id: "marks", icon: "▤", label: "Marks" },
  { id: "grades", icon: "★", label: "Grade History" },
  { id: "payments", icon: "₹", label: "Payments" },
  { id: "hostel", icon: "⌂", label: "Hostel" },
  { id: "chatbot", icon: "◉", label: "AI Assistant" },
];

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  if (!loggedIn) {
    return <LoginPage onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <Dashboard
      activePage={activePage}
      setActivePage={setActivePage}
      onLogout={() => setLoggedIn(false)}
    />
  );
}

/* =========================
   LOGIN PAGE
========================= */

function LoginPage({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [vtopId, setVtopId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!vtopId || !password) {
      setError("Please enter your VTOP ID and password.");
      return;
    }

    setError("");
    onLogin();
  };

  return (
    <div className="login-page">

      <div className="login-left">

        <div className="brand-top">
          <div className="vit-logo">V</div>

          <div>
            <h2>VIT-AP</h2>
            <p>Amaravati</p>
          </div>
        </div>

        <div className="login-hero">

          <div className="welcome-badge">
            ✦ Parent Information Assistant
          </div>

          <h1>
            Stay connected with
            <span> your child's journey.</span>
          </h1>

          <p>
            Securely access your child's academic information,
            attendance, marks, timetable, examinations and
            other university updates from one place.
          </p>

          <div className="login-features">

            <div>
              <span>✓</span>
              Secure Parent Access
            </div>

            <div>
              <span>✓</span>
              Academic Information
            </div>

            <div>
              <span>✓</span>
              Smart AI Assistant
            </div>

          </div>

        </div>

        <div className="login-footer">
          VIT-AP Parent Information Assistant
        </div>

      </div>

      <div className="login-right">

        <div className="login-card">

          <div className="mobile-logo">

            <div className="vit-logo">V</div>

            <div>
              <strong>VIT-AP</strong>
              <small>Parent Connect</small>
            </div>

          </div>

          <div className="login-title">

            <span className="small-label">
              WELCOME BACK
            </span>

            <h2>Parent Login</h2>

            <p>
              Sign in using your VTOP credentials
              to continue.
            </p>

          </div>

          <form onSubmit={handleLogin}>

            <div className="input-group">

              <label>VTOP ID</label>

              <div className="input-wrapper">

                <span className="input-icon">♙</span>

                <input
                  type="text"
                  placeholder="Enter your VTOP ID"
                  value={vtopId}
                  onChange={(e) => setVtopId(e.target.value)}
                />

              </div>

            </div>

            <div className="input-group">

              <div className="password-label">

                <label>Password</label>

                <button
                  type="button"
                  className="forgot-button"
                  onClick={() => setShowForgot(true)}
                >
                  Forgot Password?
                </button>

              </div>

              <div className="input-wrapper">

                <span className="input-icon">●</span>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  className="eye-button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Show or hide password"
                >
                  {showPassword ? "◉" : "◌"}
                </button>

              </div>

            </div>

            {error && (
              <div className="login-error">
                ⚠ {error}
              </div>
            )}

            <button type="submit" className="login-button">
              Sign In
              <span>→</span>
            </button>

          </form>

          <div className="security-note">

            <span>🔒</span>

            <div>
              <strong>Secure Login</strong>

              <p>
                Your credentials are used only for authentication.
              </p>
            </div>

          </div>

          <p className="login-bottom">
            VIT-AP Parent Information Assistant
          </p>

        </div>

      </div>

      {showForgot && (
        <div className="modal-overlay">

          <div className="forgot-modal">

            <button
              className="modal-close"
              onClick={() => setShowForgot(false)}
            >
              ×
            </button>

            <div className="modal-icon">
              ?
            </div>

            <h2>Forgot Password?</h2>

            <p>
              For VTOP password recovery, please use
              the official VTOP password recovery process.
            </p>

            <button
              className="modal-action"
              onClick={() => setShowForgot(false)}
            >
              Okay
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

/* =========================
   DASHBOARD
========================= */

function Dashboard({
  activePage,
  setActivePage,
  onLogout,
}) {

  const currentItem =
    menuItems.find((item) => item.id === activePage);

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}

      <aside className="sidebar">

        <div className="sidebar-brand">

          <div className="brand-logo-small">
            V
          </div>

          <div>
            <h2>VIT-AP</h2>
            <span>Parent Connect</span>
          </div>

        </div>

        <div className="sidebar-section-title">
          MAIN MENU
        </div>

        <nav className="sidebar-menu">

          {menuItems.map((item) => (

            <button
              key={item.id}
              className={
                activePage === item.id
                  ? "sidebar-item active"
                  : "sidebar-item"
              }
              onClick={() => setActivePage(item.id)}
            >

              <span className="sidebar-icon">
                {item.icon}
              </span>

              <span>{item.label}</span>

            </button>

          ))}

        </nav>

        <div className="sidebar-bottom">

          <button className="sidebar-item">

            <span className="sidebar-icon">
              ⚙
            </span>

            Settings

          </button>

          <button
            className="sidebar-item logout-item"
            onClick={onLogout}
          >

            <span className="sidebar-icon">
              ↪
            </span>

            Logout

          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}

      <main className="main-content">

        <header className="topbar">

          <div>

            <p className="breadcrumb">
              Parent Portal / {currentItem?.label}
            </p>

            <h1>{currentItem?.label}</h1>

          </div>

          <div className="topbar-right">

            <button className="notification-button">
              ♢
              <span></span>
            </button>

            <div className="profile-mini">

              <div className="profile-avatar">
                P
              </div>

              <div>
                <strong>Parent</strong>
                <small>VIT-AP</small>
              </div>

            </div>

          </div>

        </header>

        <div className="page-container">

          {activePage === "dashboard" && (
            <DashboardHome
              setActivePage={setActivePage}
            />
          )}

          {activePage === "profile" && <ProfilePage />}
          {activePage === "academics" && <AcademicsPage />}
          {activePage === "attendance" && <AttendancePage />}
          {activePage === "mentor" && <MentorPage />}
          {activePage === "timetable" && <TimetablePage />}
          {activePage === "calendar" && <CalendarPage />}
          {activePage === "exams" && <ExamPage />}
          {activePage === "marks" && <MarksPage />}
          {activePage === "grades" && <GradesPage />}
          {activePage === "payments" && <PaymentsPage />}
          {activePage === "hostel" && <HostelPage />}
          {activePage === "chatbot" && <ChatbotPage />}

        </div>

      </main>

    </div>
  );
}

/* =========================
   DASHBOARD HOME
========================= */

function DashboardHome({ setActivePage }) {

  return (
    <>

      {/* SMALL WELCOME SECTION */}

      <div className="simple-welcome">

        <div>
          <span className="section-label">
            PARENT PORTAL
          </span>

          <h2>
            Welcome to VIT-AP Parent Connect 👋
          </h2>

          <p>
            Access your child's academic information,
            attendance, marks and university updates.
          </p>
        </div>

        <div className="welcome-icon">
          ✦
        </div>

      </div>

      {/* STAT CARDS */}

      <div className="stats-grid">

        <StatCard
          icon="◷"
          title="Attendance"
          value="--"
          subtitle="Current semester"
          page="attendance"
          setActivePage={setActivePage}
        />

        <StatCard
          icon="★"
          title="CGPA"
          value="--"
          subtitle="Overall"
          page="grades"
          setActivePage={setActivePage}
        />

        <StatCard
          icon="▣"
          title="Credits"
          value="--"
          subtitle="Earned credits"
          page="academics"
          setActivePage={setActivePage}
        />

        <StatCard
          icon="✎"
          title="Exams"
          value="--"
          subtitle="Upcoming"
          page="exams"
          setActivePage={setActivePage}
        />

      </div>

      {/* QUICK ACCESS */}

      <div className="dashboard-grid">

        <div className="content-card">

          <div className="card-heading">

            <div>

              <span className="section-label">
                QUICK ACCESS
              </span>

              <h3>
                Student Information
              </h3>

            </div>

          </div>

          <div className="quick-grid">

            <QuickButton
              icon="♙"
              title="Profile"
              page="profile"
              setActivePage={setActivePage}
            />

            <QuickButton
              icon="▣"
              title="Academics"
              page="academics"
              setActivePage={setActivePage}
            />

            <QuickButton
              icon="◷"
              title="Attendance"
              page="attendance"
              setActivePage={setActivePage}
            />

            <QuickButton
              icon="✎"
              title="Marks"
              page="marks"
              setActivePage={setActivePage}
            />

            <QuickButton
              icon="▦"
              title="Timetable"
              page="timetable"
              setActivePage={setActivePage}
            />

            <QuickButton
              icon="◉"
              title="AI Assistant"
              page="chatbot"
              setActivePage={setActivePage}
            />

          </div>

        </div>

        <div className="content-card assistant-card">

          <div className="assistant-icon">
            ◉
          </div>

          <span className="section-label">
            SMART ASSISTANT
          </span>

          <h3>
            Have a question?
          </h3>

          <p>
            Ask the AI Assistant about attendance,
            marks, timetable, exams and other
            authorized academic information.
          </p>

          <button
            onClick={() => setActivePage("chatbot")}
            className="assistant-button"
          >
            Open AI Assistant →
          </button>

        </div>

      </div>

    </>
  );
}

/* =========================
   STAT CARD
========================= */

function StatCard({
  icon,
  title,
  value,
  subtitle,
  page,
  setActivePage,
}) {

  return (
    <button
      className="stat-card"
      onClick={() => setActivePage(page)}
    >

      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-info">

        <span>{title}</span>

        <strong>{value}</strong>

        <small>{subtitle}</small>

      </div>

    </button>
  );
}

/* =========================
   QUICK BUTTON
========================= */

function QuickButton({
  icon,
  title,
  page,
  setActivePage,
}) {

  return (
    <button
      className="quick-button"
      onClick={() => setActivePage(page)}
    >

      <span>{icon}</span>

      <strong>{title}</strong>

      <small>
        View details →
      </small>

    </button>
  );
}

/* =========================
   COMMON PAGE
========================= */

function InformationPage({
  icon,
  title,
  description,
  children,
}) {

  return (
    <div>

      <div className="page-intro">

        <div className="page-icon">
          {icon}
        </div>

        <div>

          <span className="section-label">
            VIT-AP PARENT PORTAL
          </span>

          <h2>{title}</h2>

          <p>{description}</p>

        </div>

      </div>

      <div className="content-card information-content">
        {children}
      </div>

    </div>
  );
}

/* =========================
   PROFILE
========================= */

function ProfilePage() {

  return (
    <InformationPage
      icon="♙"
      title="Student Profile"
      description="View your child's authorized student information."
    >

      <div className="profile-header">

        <div className="large-avatar">
          S
        </div>

        <div>

          <h2>Student Name</h2>

          <p>VIT-AP Student</p>

        </div>

      </div>

      <InfoGrid
        items={[
          ["Student ID", "Not available"],
          ["Program", "Not available"],
          ["School", "Not available"],
          ["Year", "Not available"],
          ["Semester", "Not available"],
          ["Campus", "VIT-AP Amaravati"],
        ]}
      />

    </InformationPage>
  );
}

/* =========================
   ACADEMICS
========================= */

function AcademicsPage() {

  return (
    <InformationPage
      icon="▣"
      title="Academics"
      description="View curriculum, credits and academic progress."
    >

      <div className="three-cards">

        <MiniInfo
          title="Credits Earned"
          value="--"
        />

        <MiniInfo
          title="Credits Required"
          value="--"
        />

        <MiniInfo
          title="Current Semester"
          value="--"
        />

      </div>

      <Table
        headers={[
          "Course",
          "Code",
          "Credits",
          "Status",
        ]}
        rows={[]}
        empty="Academic course information will appear here."
      />

    </InformationPage>
  );
}

/* =========================
   ATTENDANCE
========================= */

function AttendancePage() {

  return (
    <InformationPage
      icon="◷"
      title="Attendance"
      description="View subject-wise and semester-wise attendance."
    >

      <div className="three-cards">

        <MiniInfo
          title="Overall Attendance"
          value="--"
        />

        <MiniInfo
          title="Current Semester"
          value="--"
        />

        <MiniInfo
          title="Subjects"
          value="--"
        />

      </div>

      <Table
        headers={[
          "Subject",
          "Faculty",
          "Conducted",
          "Present",
          "Attendance",
        ]}
        rows={[]}
        empty="Attendance information will appear here."
      />

    </InformationPage>
  );
}

/* =========================
   MENTOR
========================= */

function MentorPage() {

  return (
    <InformationPage
      icon="♙"
      title="Mentor Details"
      description="View your child's assigned mentor information."
    >

      <div className="mentor-box">

        <div className="large-avatar">
          M
        </div>

        <div>

          <span className="section-label">
            MENTOR
          </span>

          <h2>
            Mentor information
          </h2>

          <p>
            Details will be displayed after backend integration.
          </p>

        </div>

      </div>

    </InformationPage>
  );
}

/* =========================
   TIMETABLE
========================= */

function TimetablePage() {

  return (
    <InformationPage
      icon="▦"
      title="Timetable"
      description="View your child's class schedule."
    >

      <Table
        headers={[
          "Day",
          "Time",
          "Course",
          "Room",
          "Faculty",
        ]}
        rows={[]}
        empty="Timetable information will appear here."
      />

    </InformationPage>
  );
}

/* =========================
   CALENDAR
========================= */

function CalendarPage() {

  return (
    <InformationPage
      icon="◫"
      title="Academic Calendar"
      description="View important academic dates and events."
    >

      <Table
        headers={[
          "Date",
          "Event",
          "Category",
        ]}
        rows={[]}
        empty="Academic calendar information will appear here."
      />

    </InformationPage>
  );
}

/* =========================
   EXAMS
========================= */

function ExamPage() {

  return (
    <InformationPage
      icon="✎"
      title="Exam Schedule"
      description="View upcoming examinations and schedules."
    >

      <Table
        headers={[
          "Exam",
          "Course",
          "Date",
          "Time",
          "Venue",
        ]}
        rows={[]}
        empty="Exam schedule information will appear here."
      />

    </InformationPage>
  );
}

/* =========================
   MARKS
========================= */

function MarksPage() {

  return (
    <InformationPage
      icon="▤"
      title="Marks"
      description="View authorized academic marks."
    >

      <div className="three-cards marks-summary">

        <MiniInfo
          title="CAT 1"
          value="--"
        />

        <MiniInfo
          title="CAT 2"
          value="--"
        />

        <MiniInfo
          title="FAT"
          value="--"
        />

      </div>

      <Table
        headers={[
          "Course",
          "CAT 1",
          "CAT 2",
          "FAT",
          "Total",
        ]}
        rows={[]}
        empty="Marks information will appear here."
      />

    </InformationPage>
  );
}

/* =========================
   GRADES
========================= */

function GradesPage() {

  return (
    <InformationPage
      icon="★"
      title="Grade History"
      description="View semester-wise grade information."
    >

      <div className="three-cards">

        <MiniInfo
          title="CGPA"
          value="--"
        />

        <MiniInfo
          title="Latest Semester"
          value="--"
        />

        <MiniInfo
          title="Completed Semesters"
          value="--"
        />

      </div>

      <Table
        headers={[
          "Semester",
          "Credits",
          "SGPA",
          "CGPA",
        ]}
        rows={[]}
        empty="Grade history will appear here."
      />

    </InformationPage>
  );
}

/* =========================
   PAYMENTS
========================= */

function PaymentsPage() {

  return (
    <InformationPage
      icon="₹"
      title="Payments"
      description="View authorized payment and fee information."
    >

      <div className="three-cards">

        <MiniInfo
          title="Total Paid"
          value="--"
        />

        <MiniInfo
          title="Pending"
          value="--"
        />

        <MiniInfo
          title="Latest Payment"
          value="--"
        />

      </div>

      <Table
        headers={[
          "Date",
          "Description",
          "Amount",
          "Status",
        ]}
        rows={[]}
        empty="Payment information will appear here."
      />

    </InformationPage>
  );
}

/* =========================
   HOSTEL
========================= */

function HostelPage() {

  return (
    <InformationPage
      icon="⌂"
      title="Hostel Information"
      description="View authorized hostel information."
    >

      <InfoGrid
        items={[
          ["Hostel", "Not available"],
          ["Room", "Not available"],
          ["Block", "Not available"],
          ["Bed", "Not available"],
          ["Mess", "Not available"],
          ["Status", "Not available"],
        ]}
      />

    </InformationPage>
  );
}

/* =========================
   CHATBOT
========================= */

function ChatbotPage() {

  const [message, setMessage] = useState("");

  return (
    <div className="chatbot-page">

      <div className="chatbot-header">

        <div className="chatbot-avatar">
          ◉
        </div>

        <div>

          <span className="online-dot">
            ● Online
          </span>

          <h2>
            VIT-AP AI Assistant
          </h2>

          <p>
            Ask about authorized academic information.
          </p>

        </div>

      </div>

      <div className="chat-area">

        <div className="bot-message">

          <div className="bot-avatar">
            AI
          </div>

          <div className="message-bubble">

            <strong>
              Hello! 👋
            </strong>

            <p>
              I'm your VIT-AP Parent Information Assistant.
              You can ask questions about attendance, marks,
              timetable, exams, grades and other authorized
              student information.
            </p>

          </div>

        </div>

        <div className="suggestion-row">

          <button
            onClick={() => setMessage("What is the attendance?")}
          >
            📊 Attendance
          </button>

          <button
            onClick={() => setMessage("Show marks")}
          >
            📝 Marks
          </button>

          <button
            onClick={() => setMessage("Show timetable")}
          >
            📅 Timetable
          </button>

          <button
            onClick={() => setMessage("Show exam schedule")}
          >
            ✎ Exams
          </button>

        </div>

      </div>

      <div className="chat-input-area">

        <input
          type="text"
          placeholder="Ask about your child's information..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {

            if (e.key === "Enter") {
              e.preventDefault();
              setMessage("");
            }

          }}
        />

        <button
          onClick={() => setMessage("")}
          className="send-button"
        >
          ➤
        </button>

      </div>

    </div>
  );
}

/* =========================
   SMALL COMPONENTS
========================= */

function MiniInfo({ title, value }) {

  return (
    <div className="mini-info">

      <span>{title}</span>

      <strong>{value}</strong>

    </div>
  );
}

function InfoGrid({ items }) {

  return (
    <div className="info-grid">

      {items.map(([label, value]) => (

        <div
          className="info-item"
          key={label}
        >

          <span>{label}</span>

          <strong>{value}</strong>

        </div>

      ))}

    </div>
  );
}

function Table({
  headers,
  rows,
  empty,
}) {

  return (
    <div className="table-wrapper">

      <table>

        <thead>

          <tr>

            {headers.map((header) => (
              <th key={header}>
                {header}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          {rows.length === 0 ? (

            <tr>

              <td colSpan={headers.length}>

                <div className="empty-table">

                  <span>◌</span>

                  <p>{empty}</p>

                </div>

              </td>

            </tr>

          ) : (

            rows.map((row, index) => (

              <tr key={index}>

                {row.map((cell, cellIndex) => (

                  <td key={cellIndex}>
                    {cell}
                  </td>

                ))}

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default App;