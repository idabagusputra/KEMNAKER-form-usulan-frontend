import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "semantic-ui-react";

function Register() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setpassword_confirmation] = useState("");
  const [name, setName] = useState("");

  const back = () => {
    navigate("/");
  };

  const Register = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setMsg("Password must be at least 6 characters");
      console.log(msg);
      return 0;
    }
    if (password !== password_confirmation) {
      setMsg("Passwords do not match");
      console.log(msg);
    }
    try {
      await axios.post("https://form-usulan-api.fly.dev/auth/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      });
      navigate("/");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
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
      <div className="m-[10%] lg:m-[5%] md:m-[20%]  sm:mt-0 lg:w-[50%] w-full content-center">
        <div className="md:grid md:grid-cols-1">
          <div className="mt-5 md:col-span-2 md:mt-0 justify-center">
            <form onSubmit={Register} className="flex justify-center">
              <div className="overflow-hidden shadow sm:rounded-md w-[100%] lg:w-[50%]">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="justify-center flex">
                    {" "}
                    <img
                      src="./src/assets/Logo.png"
                      alt=""
                      className="w-[20%] h-fit pt-4 pb-6"
                    />
                  </div>
                  <div className="grid grid-cols-6 gap-5 lg:gap-6">
                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nama Pengusul
                      </label>
                      <Input
                        icon="user"
                        required
                        type="text"
                        name="name"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#495678] focus:ring-[#495678] sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <Input
                        icon="envelope"
                        required
                        type="email"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder=""
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
                      <Input
                        icon="lock"
                        required
                        type="password"
                        name="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#495678] focus:ring-[#495678] sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="password_confirmation"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Konfirmasi Password
                      </label>
                      <Input
                        icon="lock open"
                        required
                        type="password"
                        name="password_confirmation"
                        id="password_confirmation"
                        onChange={(e) =>
                          setpassword_confirmation(e.target.value)
                        }
                        value={password_confirmation}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#495678] focus:ring-[#495678] sm:text-sm"
                      />
                    </div>
                    <div className="col-span-3">
                      <p className="text-sm">{msg}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse gap-3">
                  <button
                    type="submit"
                    className="button inline-flex justify-center rounded-md border border-transparent bg-[#192a46] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#243c64] focus:outline-none focus:ring-2 focus:ring-[#495678] focus:ring-offset-2"
                  >
                    Daftar
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className=" inline-flex justify-center rounded-md border border-transparent bg-[#940000] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#c30101] focus:outline-none focus:ring-2 focus:ring-[#a61414] focus:ring-offset-2"
                  >
                    Cancel
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

export default Register;
