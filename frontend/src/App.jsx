import { useState } from "react";
import "./App.css";

const translations = {
  English: {
    dashboard: "Dashboard",
    profile: "Student Profile",
    academics: "Academics",
    attendance: "Attendance",
    mentor: "Mentor Details",
    timetable: "Timetable",
    calendar: "Academic Calendar",
    exams: "Exam Schedule",
    marks: "Marks",
    grades: "Grade History",
    payments: "Payments",
    hostel: "Hostel",
    chatbot: "AI Assistant",

    mainMenu: "MAIN MENU",
    settings: "Settings",
    logout: "Logout",
    parent: "Parent",

    parentPortal: "PARENT PORTAL",
    welcome: "Welcome, Parent 👋",
    welcomeText:
      "Welcome to the VIT-AP Parent Information Assistant.",

    smartAssistant: "SMART ASSISTANT",
    aiTitle: "VIT-AP AI Assistant",
    aiDescription:
      "Ask questions about your child's attendance, marks, timetable, examinations, grades and other authorized academic information.",
    openAI: "Open AI Assistant →",

    language: "Language Preference",
    vtopId: "VTOP ID",
    dateOfBirth: "Date of Birth",

    signIn: "Sign In",
    welcomeBack: "WELCOME BACK",
    loginTitle: "Parent Login",
    loginDescription:
      "Sign in using your VTOP credentials to continue.",

    secureLogin: "Secure Login",
    secureText:
      "Your details are used only for authentication.",

    enterVtop: "Enter your VTOP ID",
    enterDob: "Enter your date of birth",

    error:
      "Please enter your VTOP ID and date of birth.",
  },

  Telugu: {
    dashboard: "డాష్‌బోర్డ్",
    profile: "విద్యార్థి ప్రొఫైల్",
    academics: "అకాడమిక్స్",
    attendance: "హాజరు",
    mentor: "మెంటర్ వివరాలు",
    timetable: "టైమ్‌టేబుల్",
    calendar: "అకాడమిక్ క్యాలెండర్",
    exams: "పరీక్షల షెడ్యూల్",
    marks: "మార్కులు",
    grades: "గ్రేడ్ చరిత్ర",
    payments: "చెల్లింపులు",
    hostel: "హాస్టల్",
    chatbot: "AI అసిస్టెంట్",

    mainMenu: "ప్రధాన మెనూ",
    settings: "సెట్టింగ్స్",
    logout: "లాగ్ అవుట్",
    parent: "పేరెంట్",

    parentPortal: "పేరెంట్ పోర్టల్",
    welcome: "వెల్కమ్, పేరెంట్ 👋",
    welcomeText:
      "VIT-AP పేరెంట్ ఇన్ఫర్మేషన్ అసిస్టెంట్‌కు స్వాగతం.",

    smartAssistant: "స్మార్ట్ అసిస్టెంట్",
    aiTitle: "VIT-AP AI అసిస్టెంట్",
    aiDescription:
      "మీ పిల్లల హాజరు, మార్కులు, టైమ్‌టేబుల్, పరీక్షలు, గ్రేడ్లు మరియు ఇతర అకాడమిక్ సమాచారాన్ని అడగండి.",
    openAI: "AI అసిస్టెంట్‌ను తెరవండి →",

    language: "భాష ఎంపిక",
    vtopId: "VTOP ID",
    dateOfBirth: "పుట్టిన తేదీ",

    signIn: "సైన్ ఇన్",
    welcomeBack: "తిరిగి స్వాగతం",
    loginTitle: "పేరెంట్ లాగిన్",
    loginDescription:
      "కొనసాగించడానికి మీ VTOP వివరాలతో సైన్ ఇన్ చేయండి.",

    secureLogin: "సురక్షిత లాగిన్",
    secureText:
      "మీ వివరాలు కేవలం ధృవీకరణ కోసం మాత్రమే ఉపయోగించబడతాయి.",

    enterVtop: "మీ VTOP ID నమోదు చేయండి",
    enterDob: "మీ పుట్టిన తేదీ నమోదు చేయండి",

    error:
      "దయచేసి VTOP ID మరియు పుట్టిన తేదీ నమోదు చేయండి.",
  },

  Hindi: {
    dashboard: "डैशबोर्ड",
    profile: "छात्र प्रोफ़ाइल",
    academics: "शैक्षणिक जानकारी",
    attendance: "उपस्थिति",
    mentor: "मेंटॉर विवरण",
    timetable: "समय सारणी",
    calendar: "शैक्षणिक कैलेंडर",
    exams: "परीक्षा समय सारणी",
    marks: "अंक",
    grades: "ग्रेड इतिहास",
    payments: "भुगतान",
    hostel: "हॉस्टल",
    chatbot: "AI सहायक",

    mainMenu: "मुख्य मेनू",
    settings: "सेटिंग्स",
    logout: "लॉग आउट",
    parent: "अभिभावक",

    parentPortal: "अभिभावक पोर्टल",
    welcome: "स्वागत है, अभिभावक 👋",
    welcomeText:
      "VIT-AP अभिभावक सूचना सहायक में आपका स्वागत है।",

    smartAssistant: "स्मार्ट सहायक",
    aiTitle: "VIT-AP AI सहायक",
    aiDescription:
      "अपने बच्चे की उपस्थिति, अंक, समय सारणी, परीक्षाओं, ग्रेड और अन्य शैक्षणिक जानकारी के बारे में पूछें।",
    openAI: "AI सहायक खोलें →",

    language: "भाषा पसंद",
    vtopId: "VTOP ID",
    dateOfBirth: "जन्म तिथि",

    signIn: "साइन इन",
    welcomeBack: "वापसी पर स्वागत है",
    loginTitle: "अभिभावक लॉगिन",
    loginDescription:
      "जारी रखने के लिए अपने VTOP विवरण से साइन इन करें।",

    secureLogin: "सुरक्षित लॉगिन",
    secureText:
      "आपकी जानकारी केवल प्रमाणीकरण के लिए उपयोग की जाती है।",

    enterVtop: "अपना VTOP ID दर्ज करें",
    enterDob: "अपनी जन्म तिथि दर्ज करें",

    error:
      "कृपया VTOP ID और जन्म तिथि दर्ज करें।",
  },
};

const menuItems = [
  { id: "dashboard", icon: "⌂" },
  { id: "profile", icon: "♙" },
  { id: "academics", icon: "▣" },
  { id: "attendance", icon: "◷" },
  { id: "mentor", icon: "♙" },
  { id: "timetable", icon: "▦" },
  { id: "calendar", icon: "◫" },
  { id: "exams", icon: "✎" },
  { id: "marks", icon: "▤" },
  { id: "grades", icon: "★" },
  { id: "payments", icon: "₹" },
  { id: "hostel", icon: "⌂" },
  { id: "chatbot", icon: "◉" },
];

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");
  const [language, setLanguage] = useState("English");

  const t = translations[language];

  if (!loggedIn) {
    return (
      <LoginPage
        language={language}
        setLanguage={setLanguage}
        t={t}
        onLogin={() => setLoggedIn(true)}
      />
    );
  }

  return (
    <Dashboard
      language={language}
      setLanguage={setLanguage}
      t={t}
      activePage={activePage}
      setActivePage={setActivePage}
      onLogout={() => setLoggedIn(false)}
    />
  );
}

/* =====================================================
   LOGIN PAGE
===================================================== */

function LoginPage({
  language,
  setLanguage,
  t,
  onLogin,
}) {
  const [vtopId, setVtopId] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!vtopId || !dateOfBirth) {
      setError(t.error);
      return;
    }

    setError("");
    onLogin();
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* LOGO */}

        <div className="login-brand">

          <div className="vit-logo">
            V
          </div>

          <div>
            <h2>VIT-AP</h2>
            <p>Parent Connect</p>
          </div>

        </div>

        {/* TITLE */}

        <div className="login-title">

          <span className="welcome-text">
            {t.welcomeBack}
          </span>

          <h1>
            {t.loginTitle}
          </h1>

          <p>
            {t.loginDescription}
          </p>

        </div>

        {/* FORM */}

        <form onSubmit={handleLogin}>

          {/* VTOP ID */}

          <div className="input-group">

            <label>
              {t.vtopId}
            </label>

            <div className="input-wrapper">

              <span className="input-icon">
                ♙
              </span>

              <input
                type="text"
                placeholder={t.enterVtop}
                value={vtopId}
                onChange={(e) => {
                  setVtopId(e.target.value);
                  setError("");
                }}
              />

            </div>

          </div>

          {/* DATE OF BIRTH */}

          <div className="input-group">

            <label>
              {t.dateOfBirth}
            </label>

            <div className="input-wrapper">

              <span className="input-icon">
                📅
              </span>

              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => {
                  setDateOfBirth(e.target.value);
                  setError("");
                }}
              />

            </div>

          </div>

          {/* LANGUAGE */}

          <div className="input-group">

            <label>
              {t.language}
            </label>

            <select
              className="language-select"
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value);
                setError("");
              }}
            >

              <option value="English">
                English
              </option>

              <option value="Telugu">
                తెలుగు
              </option>

              <option value="Hindi">
                हिंदी
              </option>

            </select>

          </div>

          {/* ERROR */}

          {error && (
            <div className="login-error">
              ⚠ {error}
            </div>
          )}

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="login-button"
          >
            {t.signIn}
            <span>→</span>
          </button>

        </form>

        {/* SECURITY */}

        <div className="security-note">

          <span>
            🔒
          </span>

          <div>

            <strong>
              {t.secureLogin}
            </strong>

            <p>
              {t.secureText}
            </p>

          </div>

        </div>

        <p className="login-bottom">
          VIT-AP Parent Information Assistant
        </p>

      </div>

    </div>
  );
}

/* =====================================================
   DASHBOARD
===================================================== */

function Dashboard({
  language,
  setLanguage,
  t,
  activePage,
  setActivePage,
  onLogout,
}) {

  const currentItem = menuItems.find(
    (item) => item.id === activePage
  );

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
          {t.mainMenu}
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
              onClick={() =>
                setActivePage(item.id)
              }
            >

              <span className="sidebar-icon">
                {item.icon}
              </span>

              <span>
                {t[item.id]}
              </span>

            </button>

          ))}

        </nav>

        <div className="sidebar-bottom">

          <button className="sidebar-item">

            <span className="sidebar-icon">
              ⚙
            </span>

            {t.settings}

          </button>

          <button
            className="sidebar-item logout-item"
            onClick={onLogout}
          >

            <span className="sidebar-icon">
              ↪
            </span>

            {t.logout}

          </button>

        </div>

      </aside>

      {/* MAIN */}

      <main className="main-content">

        <header className="topbar">

          <div>

            <p className="breadcrumb">
              {t.parentPortal} /{" "}
              {t[currentItem?.id]}
            </p>

            <h1>
              {t[currentItem?.id]}
            </h1>

          </div>

          <div className="topbar-right">

            <select
              className="dashboard-language"
              value={language}
              onChange={(e) =>
                setLanguage(e.target.value)
              }
            >

              <option value="English">
                English
              </option>

              <option value="Telugu">
                తెలుగు
              </option>

              <option value="Hindi">
                हिंदी
              </option>

            </select>

            <button className="notification-button">
              ♢
            </button>

            <div className="profile-mini">

              <div className="profile-avatar">
                P
              </div>

              <div>

                <strong>
                  {t.parent}
                </strong>

                <small>
                  VIT-AP
                </small>

              </div>

            </div>

          </div>

        </header>

        <div className="page-container">

          {activePage === "dashboard" && (
            <DashboardHome
              setActivePage={setActivePage}
              t={t}
            />
          )}

          {activePage === "profile" && (
            <ProfilePage t={t} />
          )}

          {activePage === "academics" && (
            <AcademicsPage t={t} />
          )}

          {activePage === "attendance" && (
            <AttendancePage t={t} />
          )}

          {activePage === "mentor" && (
            <MentorPage t={t} />
          )}

          {activePage === "timetable" && (
            <TimetablePage t={t} />
          )}

          {activePage === "calendar" && (
            <CalendarPage t={t} />
          )}

          {activePage === "exams" && (
            <ExamPage t={t} />
          )}

          {activePage === "marks" && (
            <MarksPage t={t} />
          )}

          {activePage === "grades" && (
            <GradesPage t={t} />
          )}

          {activePage === "payments" && (
            <PaymentsPage t={t} />
          )}

          {activePage === "hostel" && (
            <HostelPage t={t} />
          )}

          {activePage === "chatbot" && (
            <ChatbotPage t={t} />
          )}

        </div>

      </main>

    </div>
  );
}

/* =====================================================
   DASHBOARD HOME
===================================================== */

function DashboardHome({
  setActivePage,
  t,
}) {

  return (
    <div className="dashboard-home">

      <div className="welcome-card">

        <div>

          <span className="section-label">
            {t.parentPortal}
          </span>

          <h2>
            {t.welcome}
          </h2>

          <p>
            {t.welcomeText}
          </p>

        </div>

        <div className="welcome-card-icon">
          ✦
        </div>

      </div>

      <div className="assistant-card-large">

        <div className="assistant-icon-large">
          ◉
        </div>

        <span className="section-label">
          {t.smartAssistant}
        </span>

        <h2>
          {t.aiTitle}
        </h2>

        <p>
          {t.aiDescription}
        </p>

        <button
          className="assistant-button"
          onClick={() =>
            setActivePage("chatbot")
          }
        >
          {t.openAI}
        </button>

      </div>

    </div>
  );
}

/* =====================================================
   INFORMATION PAGE
===================================================== */

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

          <h2>
            {title}
          </h2>

          <p>
            {description}
          </p>

        </div>

      </div>

      <div className="content-card information-content">
        {children}
      </div>

    </div>
  );
}

/* =====================================================
   PROFILE
===================================================== */

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

          <h2>
            Student Name
          </h2>

          <p>
            VIT-AP Student
          </p>

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

/* =====================================================
   ACADEMICS
===================================================== */

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

/* =====================================================
   ATTENDANCE
===================================================== */

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

/* =====================================================
   MENTOR
===================================================== */

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

/* =====================================================
   TIMETABLE
===================================================== */

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

/* =====================================================
   CALENDAR
===================================================== */

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

/* =====================================================
   EXAMS
===================================================== */

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

/* =====================================================
   MARKS
===================================================== */

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

/* =====================================================
   GRADES
===================================================== */

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

/* =====================================================
   PAYMENTS
===================================================== */

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

/* =====================================================
   HOSTEL
===================================================== */

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

/* =====================================================
   CHATBOT
===================================================== */

function ChatbotPage({ t }) {

  const [message, setMessage] = useState("");

  const suggestions = [
    "What is the attendance?",
    "Show marks",
    "Show timetable",
    "Show exam schedule",
  ];

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
            {t.aiTitle}
          </h2>

          <p>
            {t.aiDescription}
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
              {t.aiDescription}
            </p>

          </div>

        </div>

        <div className="suggestion-row">

          {suggestions.map((item) => (

            <button
              key={item}
              onClick={() =>
                setMessage(item)
              }
            >
              {item}
            </button>

          ))}

        </div>

      </div>

      <div className="chat-input-area">

        <input
          type="text"
          placeholder="Ask about your child's information..."
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={(e) => {

            if (e.key === "Enter") {
              e.preventDefault();
              setMessage("");
            }

          }}
        />

        <button
          className="send-button"
          onClick={() => setMessage("")}
        >
          ➤
        </button>

      </div>

    </div>
  );
}

/* =====================================================
   SMALL COMPONENTS
===================================================== */

function MiniInfo({
  title,
  value,
}) {

  return (
    <div className="mini-info">

      <span>
        {title}
      </span>

      <strong>
        {value}
      </strong>

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

          <span>
            {label}
          </span>

          <strong>
            {value}
          </strong>

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

                  <span>
                    ◌
                  </span>

                  <p>
                    {empty}
                  </p>

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