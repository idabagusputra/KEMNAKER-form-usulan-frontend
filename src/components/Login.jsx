import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosHeaders } from "axios";
import { IoAccessibility } from "react-icons/io5";
import { Input } from "semantic-ui-react";

function Login() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    //check token
    if (localStorage.getItem("token")) {
      //redirect page dashboard
      navigate("/form");
    }
  }, []);

  const Auth = async (e) => {
    e.preventDefault();

    //initialize formData
    const formData = new FormData();

    //append data to formData
    formData.append("email", email);
    formData.append("password", password);

    //send data to server
    await axios
      .post("https://form-usulan-api.fly.dev/auth/login", formData)
      .then((response) => {
        //set token on localStorage
        localStorage.setItem("token", response.data.token);

        //redirect to dashboard
        navigate("/form");
      })
      .catch(error);
    if (error.response) {
      setMsg(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  };

  // e.preventDefault();
  // try {
  //   await axios.post(
  //     "https://form-usulan-api.fly.dev/auth/login",
  //     {
  //       email: email,
  //       password: password,
  //     },
  //     AxiosHeaders

  //   );
  //   navigate("/form");
  // } catch (error) {
  //   if (error.response) {
  //     setMsg(error.response.data.msg);
  //     console.log(error.response.data.msg);
  //   }
  // }

  return (
    <>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <div className="m-[10%] lg:m-[5%] md:m-[20%] sm:mt-0 lg:w-[50%] w-full content-center">
        <div className="md:grid md:grid-cols-1">
          <div className="mt-5 md:col-span-2 md:mt-0 justify-center">
            <form onSubmit={Auth} className="flex justify-center">
              <div className="overflow-hidden shadow-md sm:rounded-md w-[100%] lg:w-[50%]">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="flex justify-center">
                    <img
                      src="./src/assets/Logo.png"
                      alt=""
                      className="w-[20%] h-fit pt-4 pb-6"
                    />
                  </div>
                  <div className="grid grid-cols-6 gap-5 lg:gap-6">
                    <div className="col-span-6">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="">
                        <Input
                          icon="envelope"
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
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 flex flex-row justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => navigate("/register")}
                    className=" inline-flex justify-center rounded-md border border-transparent bg-transparent text-gray-700 py-2 px-4 text-sm font-medium  focus:outline-none hover:font-bold"
                  >
                    Daftar
                  </button>
                  <button
                    type="submit"
                    className=" inline-flex justify-center rounded-md border border-transparent bg-[#192a46] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#243c64] focus:outline-none focus:ring-2 focus:ring-[#495678] focus:ring-offset-2"
                  >
                    Masuk
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
