import React, { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { DASHBOARD, LOGIN } from "../constants/routes";

const Register = () => {
  const { register, error, loading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErr("Passwords do not match");
      return;
    }

    try {
      await register(name, email, password);
      navigate(DASHBOARD);
    } catch (err) {}
  };

  return (
    <div className="grid lg:grid-cols-2 grow h-screen">
      <div className="flex justify-center items-center p-8 lg:p-10 order-2 lg:order-1">
        <div className="max-w-[390px] w-full border border-gray-200 rounded-xl">
          <div className="flex flex-col gap-5 p-10">
            <div className="text-center mb-2.5">
              <h3 className="text-lg font-semibold text-gray-900 leading-none mb-2.5">
                Register
              </h3>
              <div className="flex items-center justify-center font-medium">
                <span className="text-sm text-gray-600 me-1.5">
                  Already have an account?
                </span>
                <Link to={LOGIN} className="text-sm hz-text-cyan-500">
                  Login
                </Link>
              </div>
            </div>
            {/* <div className="flex items-center justify-center gap-2">
              <button className="flex items-center cursor-pointer gap-2 border border-gray-200 px-4 py-1 rounded-lg text-gray-700 hover:shadow-lg transition-shadow duration-300">
                <img
                  src="/images/google.svg"
                  className="w-4 h-4"
                  alt="Google Logo"
                />
                Use Google
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="border-t border-gray-200 w-full" />
              <span className="text-xs text-gray-500 font-medium uppercase">
                Or
              </span>
              <span className="border-t border-gray-200 w-full" />
            </div> */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
                {error}
              </div>
            )}
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label className="hz-form-label text-gray-900" htmlFor="email">
                  Name
                </label>
                <input
                  id="name"
                  placeholder="Enter name"
                  autoComplete="off"
                  name="name"
                  className="border border-gray-200 px-3 py-2 rounded-md focus:border-[#00ADB5] focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="hz-form-label text-gray-900" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  placeholder="Enter email"
                  autoComplete="off"
                  name="email"
                  className="border border-gray-200 px-3 py-2 rounded-md focus:border-[#00ADB5] focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-1">
                  <label
                    className="hz-form-label text-gray-900"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    autoComplete="off"
                    name="password"
                    className="border border-gray-200 px-3 py-2 rounded-md w-full focus:border-[#00ADB5] focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between gap-1">
                  <label
                    className="hz-form-label text-gray-900"
                    htmlFor="password"
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    autoComplete="off"
                    name="re-enter password"
                    className="border border-gray-200 px-3 py-2 rounded-md w-full focus:border-[#00ADB5] focus:outline-none"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" name="remember" className="w-4 h-4" />
                <span className="text-gray-900">Remember me</span>
              </label>
              <button
                type="submit"
                className="hz-bg-cyan-500 hz-login-btn text-white cursor-pointer py-2 rounded-lg disabled:opacity-50"
                disabled={loading}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="lg:rounded-xl lg:border lg:border-gray-200 lg:m-5 order-1 lg:order-2 bg-cover bg-center bg-no-repeat">
        <div className="flex flex-col p-8 lg:p-16 gap-4">
          <a href="/metronic/tailwind/react/demo1">
            <img
              src="/metronic/tailwind/react/demo1/media/app/mini-logo.svg"
              className="h-7"
              alt="Mini Logo"
            />
          </a>
          <div className="flex flex-col gap-3">
            <h3 className="text-6xl font-semibold hz-text-cyan-500 hz-animate-text">
              Zenith
            </h3>
            <div className="text-base font-medium text-gray-600">
              A webapp that helps users reach their highest potential
              <br />
              through{" "}
              <span className="text-gray-900 font-semibold">
                organization, productivity, and self-improvement
              </span>{" "}
              ,
              <br />
              focused on personal development through notes, habit tracking, and
              organization.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
