import React, { Fragment, useState, useEffect } from "react";
import "./UpdateResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearErrors } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Metadata from "../layout/Metadata";

function UpdatePassword() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const updatePasswordSubmit = (event) => {
    event.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Password Changed Successfully");
      navigate("/account");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
  }, [dispatch, error, alert, navigate, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Change Password" />
          <div className="update-password-container">
            <div className="update-password-box">
              <h2 className="update-password-heading">Change Password</h2>
              <form
                className="update-password-form"
                onSubmit={updatePasswordSubmit}
              >
                <div>
                  <VpnKeyIcon />
                  <input
                    type={oldPasswordVisible ? "text" : "password"}
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(event) => {
                      setOldPassword(event.target.value);
                    }}
                  />
                  <span
                    onClick={() => {
                      setOldPasswordVisible(!oldPasswordVisible);
                    }}
                  >
                    {oldPasswordVisible ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </span>
                </div>
                <div>
                  <LockOpenIcon />
                  <input
                    type={newPasswordVisible ? "text" : "password"}
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(event) => {
                      setNewPassword(event.target.value);
                    }}
                  />
                  <span
                    onClick={() => {
                      setNewPasswordVisible(!newPasswordVisible);
                    }}
                  >
                    {newPasswordVisible ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </span>
                </div>
                <div>
                  <LockIcon />
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                  />
                  <span
                    onClick={() => {
                      setConfirmPasswordVisible(!confirmPasswordVisible);
                    }}
                  >
                    {confirmPasswordVisible ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </span>
                </div>
                <input
                  type="submit"
                  value="CHANGE PASSWORD"
                  className="update-password-button"
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

export default UpdatePassword;
