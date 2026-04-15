import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    prn: "",
    division: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      prn: formData.prn,
      division: formData.division,
      role: "user",
    };

    console.log("Register payload:", payload);

    try {
      setIsSubmitting(true);
      const response = await axiosClient.post("/auth/register", payload);
      console.log("Register response:", response.data);

      setSuccess("Registration successful");
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 1000);
    } catch (requestError) {
      if (requestError.response) {
        setError(requestError.response.data.message);
      } else {
        setError("Server not running");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-site px-4 py-10 font-body">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <h1 className="font-heading text-3xl font-bold text-slate-900">Create Account</h1>
        <p className="mt-2 text-sm text-slate-600">Register to start tracking opportunities.</p>

        <form onSubmit={handleRegister} className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="block text-sm text-slate-600 md:col-span-2">
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-brand-500"
            />
          </label>

          <label className="block text-sm text-slate-600 md:col-span-2">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-brand-500"
            />
          </label>

          <label className="block text-sm text-slate-600 md:col-span-2">
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-brand-500"
            />
          </label>

          <label className="block text-sm text-slate-600">
            PRN
            <input
              type="text"
              name="prn"
              value={formData.prn}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-brand-500"
            />
          </label>

          <label className="block text-sm text-slate-600">
            Division
            <input
              type="text"
              name="division"
              value={formData.division}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none focus:border-brand-500"
            />
          </label>

          {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 md:col-span-2">{error}</p>}
          {success && <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 md:col-span-2">{success}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="md:col-span-2 w-full rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Already have an account? <Link to="/login" className="font-semibold text-brand-700">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
