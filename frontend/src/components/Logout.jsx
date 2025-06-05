import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(100); 

  useEffect(() => {
    let interval;
    if (showModal) {
      const totalDuration = 2000; // 2 seconds
      const stepTime = 50; // ms
      const steps = totalDuration / stepTime;
      let currentStep = 0;

      interval = setInterval(() => {
        currentStep++;
        setProgress(100 - (currentStep / steps) * 100);
        if (currentStep >= steps) {
          clearInterval(interval);
          setShowModal(false);
          navigate("/");
        }
      }, stepTime);
    }
    return () => clearInterval(interval);
  }, [showModal, navigate]);

  const logoutHandler = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setShowModal(true);
      setProgress(100);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Use portal to render modal at body root, so it is not confined inside sidebar div
  return (
    <>
     <button
  onClick={logoutHandler}
  className="text-sm text-red-600 hover:underline cursor-pointer bg-transparent border-none p-0 m-0 text-left inline"
>
  Logout
</button>


      {showModal &&
        createPortal(
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={() => {
              setShowModal(false);
              navigate("/");
            }}
          >
            <div
              className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-semibold mb-4 text-green-600">Logged Out!</h2>
              <p className="text-gray-700 mb-6">You have successfully logged out.</p>

              {/* Progress bar container */}
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-green-500 transition-all duration-50"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-gray-500">Redirecting...</p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Logout;
