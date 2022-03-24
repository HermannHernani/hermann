
import LoginPage from "views/LoginPage/LoginPage.jsx";
import RegisterPage from "views/RegisterPage/RegisterPage.jsx";
import HomePage from "views/HomePage/HomePage.jsx";
import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import ListPage from "views/ListPage/ListPage.jsx";
import AboutPage from "views/AboutPage/AboutPage.jsx";
import ResetPasswordPage from "views/ResetPasswordPage/ResetPasswordPage.jsx";
import FaqPage from "views/FaqPage/FaqPage.jsx"
import CalendarPage from "views/CalendarPage/CalendarPage.jsx"
//import EditPage from "../views/EditPage/EditPage.jsx";

var indexRoutes = [
 
  // { path: "/profile-page", name: "ProfilePage", component: ProfilePage },
  { path: "/register-page", name: "RegisterPage", component: RegisterPage },
  { path: "/login", name: "LoginPage", component: LoginPage },
  { path: "/profile-page/:aluno", name: "Profile", component: ProfilePage },
  { path: "/profile-page", name: "Profile", component: ProfilePage },
  //{ path: "/edit", name: "EditPage", component: EditPage },
  
  // { path: "/components", name: "Components", component: Components },
  { path: "/ResetPasswordPage/:token", name: "ResetPassword", component: ResetPasswordPage},
  { path: "/home", name: "HomePage", component: HomePage },
  { path: "/list", name: "ListPage", component: ListPage },
  { path: "/about", name: "AboutPage", component: AboutPage },
  { path: "/faq", name: "FaqPage", component: FaqPage },
  { path: "/calendar", name: "CalendarPage", component: CalendarPage },
  { path: "/", name: "LoginPage", component: LoginPage },
  

];

export default indexRoutes;
