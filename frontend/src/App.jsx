import { useEffect, useState } from "react";
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
      onLogout={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("parent");
        setLoggedIn(false);
        setActivePage("dashboard");
      }
      }

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

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!vtopId || !dateOfBirth) {
    setError(t.error);
    return;
  }

  try {
    setError("");

    const response = await fetch(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vtopId: vtopId.trim(),
          dateOfBirth: dateOfBirth,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Login failed.");
      return;
    }

    // Save JWT token
    localStorage.setItem("token", data.token);

    // Save parent information
    localStorage.setItem(
      "parent",
      JSON.stringify(data.parent)
    );

    // Open dashboard
    onLogin();
  } catch (error) {
    console.error("Login error:", error);
    setError("Unable to connect to backend server.");
  }
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
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication token not found.");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/student/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Failed to load profile.");
          return;
        }

        setProfile(data.data);
      } catch (error) {
        console.error("Profile API error:", error);
        setError("Unable to connect to backend.");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return (
      <InformationPage
        icon="♙"
        title="Student Profile"
        description="View your child's authorized student information."
      >
        <div className="login-error">
          ⚠ {error}
        </div>
      </InformationPage>
    );
  }

  if (!profile) {
    return (
      <InformationPage
        icon="♙"
        title="Student Profile"
        description="View your child's authorized student information."
      >
        <p>Loading student profile...</p>
      </InformationPage>
    );
  }

  return (
    <InformationPage
      icon="♙"
      title="Student Profile"
      description="View your child's authorized student information."
    >
      <div className="profile-header">
        <div className="large-avatar">
          {profile.name?.charAt(0)}
        </div>

        <div>
          <h2>{profile.name}</h2>
          <p>VIT-AP Student</p>
        </div>
      </div>

      <InfoGrid
        items={[
          ["Student ID", profile.registerNumber],
          ["Program", profile.program || "Not available"],
          ["Branch", profile.branch || "Not available"],
          ["Semester", profile.semester || "Not available"],
          ["Email", profile.email || "Not available"],
          ["Phone", profile.phone || "Not available"],
        ]}
      />
    </InformationPage>
  );
}

/* =====================================================
   ACADEMICS
===================================================== */


function AcademicsPage() {
  const [credits, setCredits] = useState([]);
  const [curriculum, setCurriculum] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAcademics = async () => {
      try {
        const token = localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [creditsResponse, curriculumResponse] =
          await Promise.all([
            fetch("http://localhost:5000/api/student/credits", {
              headers,
            }),
            fetch("http://localhost:5000/api/student/curriculum", {
              headers,
            }),
          ]);

        const creditsData = await creditsResponse.json();
        const curriculumData = await curriculumResponse.json();

        if (!creditsResponse.ok) {
          throw new Error(
            creditsData.message || "Failed to load credits"
          );
        }

        if (!curriculumResponse.ok) {
          throw new Error(
            curriculumData.message || "Failed to load curriculum"
          );
        }

        setCredits(
          Array.isArray(creditsData.data) ? creditsData.data : []
        );

        setCurriculum(
          Array.isArray(curriculumData.data)
            ? curriculumData.data
            : []
        );
      } catch (err) {
        setError(err.message || "Unable to load academic information.");
      } finally {
        setLoading(false);
      }
    };

    fetchAcademics();
  }, []);

  const totalCredits = credits.reduce(
    (sum, item) => sum + Number(item.credits || 0),
    0
  );

  const earnedCredits = credits
    .filter((item) =>
      (item.status || "").toLowerCase() === "completed"
    )
    .reduce((sum, item) => sum + Number(item.credits || 0), 0);

  const courses = curriculum.length > 0 ? curriculum : credits;

  return (
    <InformationPage
      icon="▣"
      title="Academics"
      description="View curriculum, credits and academic progress."
    >
      {loading ? (
        <p>Loading academic information...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <>
          <div className="three-cards">
            <MiniInfo
              title="Credits Earned"
              value={earnedCredits}
            />
            <MiniInfo
              title="Credits Listed"
              value={totalCredits}
            />
            <MiniInfo
              title="Current Semester"
              value={credits[0]?.semester ?? "--"}
            />
          </div>

          <Table
            headers={["Course", "Code", "Credits", "Status"]}
            rows={courses.map((item) => [
              item.courseName,
              item.courseCode,
              item.credits,
              item.status || item.category || "Not specified",
            ])}
            empty="No academic course information found."
          />
        </>
      )}
    </InformationPage>
  );
}


/* =====================================================
   ATTENDANCE
===================================================== */


function AttendancePage() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/student/attendance/current",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load attendance");
        }

        setAttendance(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        setError(err.message || "Unable to load attendance.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const averageAttendance =
    attendance.length > 0
      ? (
          attendance.reduce(
            (sum, item) => sum + Number(item.percentage || 0),
            0
          ) / attendance.length
        ).toFixed(2)
      : "0.00";

  const totalConducted = attendance.reduce(
    (sum, item) => sum + Number(item.conducted || 0),
    0
  );

  const totalAttended = attendance.reduce(
    (sum, item) => sum + Number(item.attended || 0),
    0
  );

  return (
    <InformationPage
      icon="◷"
      title="Attendance"
      description="View subject-wise attendance."
    >
      {loading ? (
        <p>Loading attendance...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <>
          <div className="three-cards">
            <MiniInfo
              title="Average Attendance"
              value={`${averageAttendance}%`}
            />
            <MiniInfo
              title="Classes Conducted"
              value={totalConducted}
            />
            <MiniInfo
              title="Classes Attended"
              value={totalAttended}
            />
          </div>

          <Table
            headers={[
              "Subject",
              "Code",
              "Semester",
              "Conducted",
              "Attended",
              "Attendance",
            ]}
            rows={attendance.map((item) => [
              item.courseName,
              item.courseCode,
              item.semester,
              item.conducted,
              item.attended,
              `${Number(item.percentage || 0).toFixed(2)}%`,
            ])}
            empty="No attendance information found."
          />
        </>
      )}
    </InformationPage>
  );
}


/* =====================================================
   MENTOR
===================================================== */


function MentorPage() {
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMentor = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/student/mentor",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load mentor details");
        }

        setMentor(data.data || null);
      } catch (err) {
        setError(err.message || "Unable to load mentor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, []);

  return (
    <InformationPage
      icon="♙"
      title="Mentor Details"
      description="View your child's assigned mentor information."
    >
      {loading ? (
        <p>Loading mentor details...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : mentor ? (
        <InfoGrid
          items={[
            ["Mentor Name", mentor.name || "Not available"],
            ["Designation", mentor.designation || "Not available"],
            ["Email", mentor.email || "Not available"],
            ["Phone", mentor.phone || "Not available"],
          ]}
        />
      ) : (
        <p>No mentor information found.</p>
      )}
    </InformationPage>
  );
}


/* =====================================================
   TIMETABLE
===================================================== */


function TimetablePage() {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/student/timetable",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load timetable");
        }

        setTimetable(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        setError(err.message || "Unable to load timetable.");
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  return (
    <InformationPage
      icon="▦"
      title="Timetable"
      description="View your child's class schedule."
    >
      {loading ? (
        <p>Loading timetable...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <Table
          headers={[
            "Day",
            "Time",
            "Course",
            "Room",
            "Faculty",
          ]}
          rows={timetable.map((item) => [
            item.day,
            `${item.startTime} - ${item.endTime}`,
            item.courseName,
            item.room || "Not assigned",
            item.faculty || "Not assigned",
          ])}
          empty="No timetable information found."
        />
      )}
    </InformationPage>
  );
}


/* =====================================================
   CALENDAR
===================================================== */


function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/student/academic-calendar",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load academic calendar");
        }

        setEvents(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        setError(err.message || "Unable to load academic calendar.");
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, []);

  return (
    <InformationPage
      icon="◫"
      title="Academic Calendar"
      description="View important academic dates and events."
    >
      {loading ? (
        <p>Loading academic calendar...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <Table
          headers={["Date", "Event", "Description", "Semester"]}
          rows={events.map((item) => [
            item.eventDate
              ? new Date(item.eventDate).toLocaleDateString()
              : "Not available",
            item.title,
            item.description || "—",
            item.semester ?? "—",
          ])}
          empty="No academic calendar events found."
        />
      )}
    </InformationPage>
  );
}


/* =====================================================
   EXAMS
===================================================== */


function ExamPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/student/exams",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load exam schedule");
        }

        setExams(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        setError(err.message || "Unable to load exam schedule.");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  return (
    <InformationPage
      icon="✎"
      title="Exam Schedule"
      description="View upcoming examinations and schedules."
    >
      {loading ? (
        <p>Loading exam schedule...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <Table
          headers={["Exam", "Course", "Date", "Time", "Venue"]}
          rows={exams.map((item) => [
            item.examType,
            item.courseName,
            item.examDate
              ? new Date(item.examDate).toLocaleDateString()
              : "Not available",
            item.startTime || "Not assigned",
            item.room || "Not assigned",
          ])}
          empty="No exam schedule information found."
        />
      )}
    </InformationPage>
  );
}


/* =====================================================
   MARKS
===================================================== */


function MarksPage() {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/student/marks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load marks");
        }

        setMarks(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        setError(err.message || "Unable to load marks.");
      } finally {
        setLoading(false);
      }
    };

    fetchMarks();
  }, []);

  return (
    <InformationPage
      icon="▤"
      title="Marks"
      description="View authorized academic marks."
    >
      {loading ? (
        <p>Loading marks...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <Table
          headers={[
            "Course",
            "Code",
            "Assessment",
            "Marks",
            "Maximum Marks",
            "Semester",
          ]}
          rows={marks.map((item) => [
            item.courseName,
            item.courseCode,
            item.assessment,
            item.marks,
            item.maxMarks,
            item.semester,
          ])}
          empty="No marks information found."
        />
      )}
    </InformationPage>
  );
}


/* =====================================================
   GRADES
===================================================== */


function GradesPage() {
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/student/grades",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load grades");
        }

        setGrades(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        setError(err.message || "Unable to load grade history.");
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

  return (
    <InformationPage
      icon="★"
      title="Grade History"
      description="View academic grade records."
    >
      {loading ? (
        <p>Loading grades...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <Table
          headers={[
            "Course",
            "Course Code",
            "Grade",
            "Grade Points",
            "Semester",
          ]}
          rows={grades.map((item) => [
            item.courseName,
            item.courseCode,
            item.grade,
            item.gradePoints,
            item.semester,
          ])}
          empty="No grade records found."
        />
      )}
    </InformationPage>
  );
}


/* =====================================================
   PAYMENTS
===================================================== */


function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/student/payments",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load payments");
        }

        setPayments(Array.isArray(data.data) ? data.data : []);
      } catch (err) {
        setError(err.message || "Unable to load payment history.");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <InformationPage
      icon="₹"
      title="Payments"
      description="View authorized student fee payment records."
    >
      {loading ? (
        <p>Loading payment history...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <Table
          headers={[
            "Transaction ID",
            "Description",
            "Amount",
            "Payment Date",
            "Status",
          ]}
          rows={payments.map((item) => [
            item.transactionId,
            item.description,
            item.amount,
            item.paymentDate
              ? new Date(item.paymentDate).toLocaleDateString()
              : "—",
            item.status,
          ])}
          empty="No payment records found."
        />
      )}
    </InformationPage>
  );
}

/* =====================================================
   HOSTEL
===================================================== */


function HostelPage() {
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/student/hostel",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load hostel details");
        }

        setHostel(data.data || null);
      } catch (err) {
        setError(err.message || "Unable to load hostel details.");
      } finally {
        setLoading(false);
      }
    };

    fetchHostel();
  }, []);

  return (
    <InformationPage
      icon="⌂"
      title="Hostel Details"
      description="View authorized student accommodation details."
    >
      {loading ? (
        <p>Loading hostel details...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : hostel ? (
        <InfoGrid
          items={[
            ["Hostel", hostel.hostelName],
            ["Block", hostel.block],
            ["Room Number", hostel.roomNumber],
            ["Floor", hostel.floor],
            ["Bed Type", hostel.bedType],
          ]}
        />
      ) : (
        <p>No hostel information found.</p>
      )}
    </InformationPage>
  );
}


/* =====================================================
   CHATBOT
===================================================== */


function ChatbotPage({ t }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const suggestions = [
    "What is the attendance?",
    "Show marks",
    "Show timetable",
    "Show exam schedule",
  ];

  const sendMessage = async (text = message) => {
    const question = text.trim();

    if (!question || loading) return;

    setMessages((previous) => [
      ...previous,
      { role: "user", text: question },
    ]);
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: question }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to get a response.");
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "bot",
          text: data.answer || data.data?.answer || "No answer received.",
        },
      ]);
    } catch (err) {
      setError(err.message || "Could not connect to the chatbot backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-page">
      <div className="chatbot-header">
        <div className="chatbot-avatar">◉</div>
        <div>
          <span className="online-dot">● Online</span>
          <h2>{t.aiTitle}</h2>
          <p>{t.aiDescription}</p>
        </div>
      </div>

      <div className="chat-area">
        <div className="bot-message">
          <div className="bot-avatar">AI</div>
          <div className="message-bubble">
            <strong>Hello! 👋</strong>
            <p>{t.aiDescription}</p>
          </div>
        </div>

        {messages.map((item, index) => (
          <div
            key={`${index}-${item.role}`}
            className={
              item.role === "user" ? "user-message" : "bot-message"
            }
          >
            {item.role === "bot" && (
              <div className="bot-avatar">AI</div>
            )}
            <div className="message-bubble">
              <p style={{ whiteSpace: "pre-line" }}>{item.text}</p>
            </div>
          </div>
        ))}

        {loading && <p>Getting your answer...</p>}

        {error && <p role="alert">{error}</p>}

        <div className="suggestion-row">
          {suggestions.map((item) => (
            <button
              key={item}
              disabled={loading}
              onClick={() => sendMessage(item)}
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
          disabled={loading}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
        />

        <button
          className="send-button"
          disabled={loading || !message.trim()}
          onClick={() => sendMessage()}
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