import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";
import UserProfileCard from "./UserProfileCard";

const Navbar = ({ bookmarkedCount }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(user);
  const [submissions, setSubmissions] = useState([]);
  const profileWrapperRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    setUserProfile(user);
  }, [user]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileWrapperRef.current && !profileWrapperRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const fetchProfileDetails = async () => {
    try {
      setProfileLoading(true);

      const [meResponse, submissionsResponse] = await Promise.all([
        axiosClient.get("/api/auth/me"),
        axiosClient.get("/api/submissions/me"),
      ]);

      setUserProfile(meResponse.data?.user || user);
      setSubmissions(Array.isArray(submissionsResponse.data?.submissions) ? submissionsResponse.data.submissions : []);
    } catch {
      setUserProfile(user);
      setSubmissions([]);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleToggleProfile = () => {
    const nextState = !showProfile;
    setShowProfile(nextState);

    if (nextState) {
      fetchProfileDetails();
    }
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/40 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="font-heading text-xl font-bold text-slate-900">Opportunity Tracker</p>
          <p className="text-sm text-slate-600">Internship + Hackathon Dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
            Bookmarks: {bookmarkedCount}
          </div>
          <div ref={profileWrapperRef} className="relative">
            <button
              type="button"
              onClick={handleToggleProfile}
              className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              {user?.name || user?.email || "User"}
            </button>

            {showProfile && (
              <UserProfileCard userProfile={userProfile} submissions={submissions} loading={profileLoading} />
            )}
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
