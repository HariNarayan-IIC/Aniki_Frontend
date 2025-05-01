import React, { useState, useEffect } from "react";
import { baseURL } from "../constants";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function OTPVerification() {
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
 
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        if (!email || email=="") {
            navigate("/PageNotFound", {replace: true});
        }
        const sendVerificationRequest = async () => {
            try {
                await fetch(`${baseURL}/api/v1/users/verify-email`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email }),
                })
            } catch (err) {
                console.error("Failed to send verification:", err);
            }
        };
        sendVerificationRequest();
    }, [email]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 3) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    const handleVerify = async () => {
        const enteredOtp = otp.join("");
        try {
            await fetch(`${baseURL}/api/v1/users/validate-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ otp: enteredOtp, email }),
                credentials: 'include'
            })
            .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setIsAuthenticated(true);
                        navigate("/dashboard", {replace: true})
                    }
                }
                )
            
        } catch (err) {
            console.error("OTP verification failed:", err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white relative">
            <div className="absolute inset-0 bg-[url('/background-stars.svg')] bg-no-repeat bg-center opacity-10" />
            <div className="relative z-10 bg-white border-2 border-cyan-500 rounded-xl p-8 w-[400px] shadow-xl text-center">
                <img
                    src="/images/OTPclipart.png"
                    alt="OTP Illustration"
                    className="mx-auto mb-4"
                />
                <p className="text-gray-700 mb-2">
                    One Time Password (OTP) has been sent to {email}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                    Enter the OTP below to verify it
                </p>
                <div className="flex justify-center gap-3 mb-4">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength="1"
                            className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                        />
                    ))}
                </div>
                <p className="text-sm text-gray-600 mb-4">
                    Resend OTP in{" "}
                    <span className="font-bold">
                        00:{timer.toString().padStart(2, "0")}
                    </span>
                </p>
                <button
                    className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600"
                    onClick={handleVerify}
                >
                    VERIFY OTP
                </button>
            </div>
        </div>
    );
}
