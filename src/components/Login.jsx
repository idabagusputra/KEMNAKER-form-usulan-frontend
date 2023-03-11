import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Auth = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
      navigate("/form");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <div className="m-0 lg:m-[5%] sm:mt-0">
        <div className="md:grid md:grid-cols-1">
          <div className="mt-5 md:col-span-2 md:mt-0 justify-center">
            <form onSubmit={Auth} className="flex justify-center">
              <div className="overflow-hidden shadow sm:rounded-md w-[100%] lg:w-[50%]">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-5 lg:gap-6">
                    <div className="col-span-6">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        id="email"
                        placeholder=""
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#495678] focus:ring-[#495678] sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <input
                        required
                        type="password"
                        name="password"
                        id="password"
                        placeholder=""
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#495678] focus:ring-[#495678] sm:text-sm"
                      />
                    </div>
                    <div className="col-span-3">
                      <p className="text-sm">{msg}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className=" inline-flex justify-center rounded-md border border-transparent bg-[#192a46] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#243c64] focus:outline-none focus:ring-2 focus:ring-[#495678] focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="py-5">
        <div className="border-t border-gray-200" />
      </div>
    </>
  );
}

export default Login;
