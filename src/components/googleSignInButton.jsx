import { useEffect, useRef } from "react";
import { googleClientID } from '../constants';
import { Fetch } from '../utils/fetch'
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

const GoogleSignInButton = () => {
  const { setIsAuthenticated, setIsAdmin } = useAuth();
  const buttonRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.google && buttonRef.current) {
      window.google.accounts.id.initialize({
        client_id: googleClientID,
        callback: async (response) => {
          console.log("Credential Response", response);
          const res = await Fetch("/api/v1/users/signin-with-google", {
            method: 'POST',
            credentials: "include",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              credentialToken: response["credential"]
            }),
          })
          
          const body = await res.json();
          console.log("Server response data:", body);
          if (!res.ok){
            alert(`Failed to login: ${data.message}`)
          }
          else if (body.success) {
            setIsAuthenticated(true);
            if (body?.data?.user?.role === "admin") {
              setIsAdmin(true)
              navigate('/adminPanel', { replace: true })
              return;
            } 
            navigate('/dashboard', { replace: true })
            return;
          }
        },
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        text: "sign_up_with",
        shape: "rectangular",
        logo_alignment: "left",
      });
    }
  }, []);

  return <div ref={buttonRef}></div>;
};

export default GoogleSignInButton;
