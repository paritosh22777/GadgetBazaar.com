import React, { Fragment, useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import profileIconPic from "../../images/profile-icon.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { login, register, clearErrors } from "../../actions/userAction";
import { useAlert } from "react-alert";

function LoginSignUp() {
  // useRef -> to access DOM elements in Reactjs
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const navigate = useNavigate();

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState(profileIconPic);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const handlePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const loginSubmit = (event) => {
    event.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (event) => {
    event.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (event) => {
    if (event.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        //0 - initial, 1 - processing, 2 - done
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setUser({ ...user, [event.target.name]: event.target.value });
    }
  };

  const [search] = useSearchParams();
  let redirectLink = search.has("redirect")
    ? "/" + search.get("redirect")
    : "/account";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirectLink);
    }
  }, [dispatch, error, alert, isAuthenticated, navigate, redirectLink]);

  const switchTabs = (event, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shift-to-neutral");
      switcherTab.current.classList.remove("shift-to-right");
      registerTab.current.classList.remove("shift-to-neutral-form");
      loginTab.current.classList.remove("shift-to-left");
    }
    if (tab === "register") {
      switcherTab.current.classList.remove("shift-to-neutral");
      switcherTab.current.classList.add("shift-to-right");
      registerTab.current.classList.add("shift-to-neutral-form");
      loginTab.current.classList.add("shift-to-left");
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="login-signup-container">
            <div className="login-signup-box">
              <div>
                <div className="login-signup-toggle">
                  <p
                    onClick={(event) => {
                      switchTabs(event, "login");
                    }}
                  >
                    LOGIN
                  </p>
                  <p
                    onClick={(event) => {
                      switchTabs(event, "register");
                    }}
                  >
                    REGISTER
                  </p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form
                className="login-form"
                ref={loginTab}
                onSubmit={loginSubmit}
              >
                <div className="login-email">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(event) => {
                      setLoginEmail(event.target.value);
                    }}
                  />
                </div>
                <div className="login-password">
                  <LockOpenIcon />
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    className="password-field"
                    required
                    value={loginPassword}
                    onChange={(event) => {
                      setLoginPassword(event.target.value);
                    }}
                  />
                  <span onClick={handlePasswordVisibility}>
                    {passwordVisible ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </span>
                </div>
                <Link to="/password/forgot">Forgot Password?</Link>
                <input type="submit" value="LOGIN" className="login-button" />
              </form>
              <form
                className="signup-form"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signup-name">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signup-email">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signup-password">
                  <LockOpenIcon />
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                  <span onClick={handlePasswordVisibility}>
                    {passwordVisible ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </span>
                </div>
                <div id="register-image">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="REGISTER"
                  className="signup-button"
                  disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default LoginSignUp;
