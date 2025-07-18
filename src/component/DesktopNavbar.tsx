import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { Hamburger } from "lucide-react";
import { useAuthStore } from "../hooks/useAuthStore";

interface DesktopNavbarProps {
  toggleNav: () => void;
  isDropOpen: boolean;
  toggleDrop: () => void;
  currentTheme: string;
  onToggleTheme: () => void;
}

export default function DesktopNavbar({
  toggleNav,
  isDropOpen,
  toggleDrop,
  currentTheme,
  onToggleTheme,
}: DesktopNavbarProps) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  let avatarSrc = "/defaultMemberPic.webp";
  if (user?.photoURL) {
    avatarSrc = user.photoURL;
  } else if (user?.email?.endsWith("@gmail.com")) {
    avatarSrc = `https://www.google.com/s2/photos/profile/${user.email}`;
  }

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/avatar.webp";
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 nav p-2 px-10 flex align-middle sm:justify-between justify-center shadow-2xl z-1000 items-center bg-base-100"
      style={{ zIndex: 9999 }}
    >
      <div className="ham md:hidden left-5 absolute rounded-full p-2">
        <Hamburger className="hamburger cursor-pointer" onClick={toggleNav} />
      </div>
      <div className="logo tooltip tooltip-bottom" data-tip="homePage">
        <Link to="/" className="navLink flex text-center">
          <img
            src="/logo.webp"
            className="max-w-md"
            alt="Elon Musk 首頁連結"
            loading="lazy"
          />
        </Link>
      </div>
      <ul className="flex justify-evenly max-md:hidden items-center">
        <li>
          <Link to="/company" className="navLink">
            公司
          </Link>
        </li>
        <li>
          <Link to="/life" className="navLink">
            生平
          </Link>
        </li>
        <li>
          <Link to="/news" className="navLink">
            新聞
          </Link>
        </li>
        <li>
          <Link to="/info" className="navLink">
            更多消息
          </Link>
        </li>

        <li>
          {user ? (
            <div className="dropdown hover:bg-opacity-100 bg-baase-100">
              <div
                tabIndex={0}
                role="button"
                className="btn m-1 hover:bg-opacity-100 bg-baase-100"
                onClick={toggleDrop}
              >
                <img
                  src={avatarSrc}
                  alt="會員頭像"
                  className={`w-12 h-12 rounded-full object-cover ${
                    isDropOpen ? true : false
                  }`}
                  onError={handleImgError}
                />
              </div>
              <ul
                tabIndex={0}
                className={`dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm ${
                  isDropOpen ? "max-h-fit" : "hidden"
                }`}
              >
                <li
                  onClick={() => {
                    navigate("/member");
                    toggleDrop();
                  }}
                >
                  <a>會員資料</a>
                </li>

                <li onClick={logout}>
                  <a>登出</a>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="navLink">
              登入
            </Link>
          )}
        </li>
        <li>
          <div
            className="flex items-center gap-2 tooltip tooltip-bottom"
            data-tip="switchTheme"
          >
            <span className="text-sm"></span>
            <ThemeToggle currentTheme={currentTheme} onToggle={onToggleTheme} />
          </div>
        </li>
      </ul>
    </nav>
  );
}
