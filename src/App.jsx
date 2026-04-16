import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LearnPage from './pages/LearnPage';
import ProfilePage from './pages/ProfilePage';
import AchievementsPage from './pages/AchievementsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/course/:courseId" element={<CourseDetailPage />} />
            <Route path="/learn/:courseId/:lessonId" element={<LearnPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
