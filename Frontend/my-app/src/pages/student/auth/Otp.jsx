import React, { useEffect, useState } from "react";
import "./otp.css";
import { useVerifyEmailMutation, useResendOtpMutation } from "../../../redux/services/studentApi";
import { useNavigate, useLocation } from "react-router-dom";

const Otp = () => {
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");

  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state || {};


  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const res = await verifyEmail({ email, otp }).unwrap();
      if (res?.msg) {
        navigate("/student");
      }
    } catch (err) {
      setErr(err?.data?.msg || "Invalid OTP");
    }
  };

  const handleResend = async () => {
    try {
      setOtp("");
      await resendOtp({ email }).unwrap();

      // 🔁 Reset timer
      setTimeLeft(30);
      setCanResend(false);

      alert("OTP resent successfully");
    } catch (err) {
      alert(err?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="otp-container">
      <div className="otp-card">
        <h2 className="otp-title">Verify OTP</h2>
        <p className="otp-subtitle">
          Enter the 4-digit OTP sent to your email
        </p>

        <form onSubmit={handleSubmit}>
          <label className="otp-label">OTP</label>
          <input
            type="text"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="otp-input"
          />

          <button type="submit" className="otp-btn" disabled={isLoading}>
            {isLoading ? "VERIFYING..." : "VERIFY OTP"}
          </button>
        </form>

        <p className="otp-footer">
          Didn't receive OTP?{" "}
          <button
            onClick={handleResend}
            id="Resend"
            disabled={!canResend || isResending}
          >
              {canResend ? "Resend OTP" : `Resend in ${timeLeft}s`}
          </button>
        </p>

        {err && <p className="otp-footer err">{err}</p>}
      </div>
    </div>
  );
};

export default Otp;
