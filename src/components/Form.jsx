import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import "../App.css";

function Form() {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const res = await axios.get("http://localhost:5000/token");
      setToken(res.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setExpire(decoded.exp);
      console.log(decoded);
    } catch (error) {
      if (error.response) {
        navigate("/form");
      }
    }
  };

  axios.interceptors.response.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const [formFields, setFormFields] = useState({
    es1: "",
    es2: "",
    namaLengkap: "",
    fitur: "",
  });

  const handleChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  const [usulanFields, setUsulanFields] = useState([
    { jenis: "", usulan: "null", prioritas: "" },
  ]);

  const handleFormChange = (index, event) => {
    let data = [...usulanFields];
    data[index][event.target.name] = event.target.value;
    setUsulanFields(data);
  };

  const addFields = () => {
    let object = { jenis: "", usulan: "", prioritas: "" };
    setUsulanFields([...usulanFields, object]);
  };

  const removeFields = (index) => {
    let data = [...usulanFields];
    data.splice(index, 1);
    setUsulanFields(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullData = { ...formFields, usulan: usulanFields };
    console.log(fullData);
  };

  return (
    <>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <div className="m-0 lg:m-[5%] sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Form Usulan
              </h3>
              <p className="mt-5 text-md text-gray-600 italic">Keterangan</p>
              <ul>
                <li className="my-1 text-sm mx-5 text-gray-600">
                  A -{" "}
                  <span className="text-gray-500 font-normal">
                    Pembangunan aplikasi baru
                  </span>
                </li>
                <li className="my-1 text-sm mx-5 text-gray-600">
                  B -{" "}
                  <span className="text-gray-500 font-normal">
                    Penambahan fitur baru pada aplikasi
                  </span>
                </li>
                <li className="my-1 text-sm mx-5 text-gray-600">
                  C -{" "}
                  <span className="text-gray-500 font-normal">
                    Pengembangan fitur yang sudah ada
                  </span>
                </li>
                <li className="my-1 text-sm mx-5 text-gray-600">
                  D -{" "}
                  <span className="text-gray-500 font-normal">
                    Integrasi dengan aplikasi internal KEMNAKER
                  </span>
                </li>
                <li className="my-1 text-sm mx-5 text-gray-600">
                  E -{" "}
                  <span className="text-gray-500 font-normal">
                    Integrasi dengan aplikasi eksternal
                  </span>
                </li>
                <li className="my-1 text-sm mx-5 text-gray-600">
                  F -{" "}
                  <span className="text-gray-500 font-normal">
                    Akses database
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0 ">
            <form onSubmit={handleSubmit}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-3 lg:gap-5">
                    <div className="col-span-3 sm:col-span-3">
                      <label
                        htmlFor="es1"
                        className="block text-sm font-medium text-gray-700"
                      >
                        UNIT ES. 1
                      </label>
                      <input
                        required
                        type="text"
                        name="es1"
                        id="es1"
                        onChange={(event) => handleChange(event)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#495678] focus:ring-[#495678] sm:text-sm"
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-3">
                      <label
                        htmlFor="es2"
                        className="block text-sm font-medium text-gray-700"
                      >
                        UNIT ES. 2
                      </label>
                      <input
                        required
                        type="text"
                        name="es2"
                        id="es2"
                        onChange={(event) => handleChange(event)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#495678] focus:ring-[#495678] sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="namaLengkap"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nama Pengusul
                      </label>
                      <input
                        required
                        type="text"
                        name="namaLengkap"
                        id="namaLengkap"
                        onChange={(event) => handleChange(event)}
                        placeholder=". . ."
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#495678] focus:ring-[#495678] sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="fitur"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Fitur
                      </label>
                      <select
                        required
                        id="fitur"
                        name="fitur"
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#495678] focus:outline-none focus:ring-[#495678] sm:text-sm"
                      >
                        <option disabled selected>
                          ...
                        </option>
                        <option value="proglat">Proglat</option>
                        <option value="etraining">E-Training</option>
                        <option value="sintala">Sintala</option>
                        <option value="akreditasi">Akreditasi</option>
                        <option value="kelembagaan">Kelembagaan</option>
                        <option value="produktivitas">Produktivitas</option>
                        <option value="magang">Magang</option>
                      </select>
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="nama-program"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nama Program
                      </label>
                      <input
                        required
                        type="text"
                        name="nama-program"
                        id="nama-program"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#495678] focus:ring-[#495678] sm:text-sm"
                      />
                    </div>
                    {usulanFields.map((input, index) => {
                      return (
                        <div className="col-span-7 grid grid-cols-7 gap-3">
                          <div className="col-span-1 lg:col-span-1">
                            <label
                              htmlFor="jenis"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Jenis
                            </label>
                            <select
                              required
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                              id="jenis"
                              name="jenis"
                              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#495678] focus:outline-none focus:ring-[#495678] sm:text-sm"
                            >
                              <option disabled selected>
                                ...
                              </option>
                              <option>A</option>
                              <option>B</option>
                              <option>C</option>
                              <option>D</option>
                              <option>E</option>
                              <option>F</option>
                            </select>
                          </div>

                          <div className="col-span-4 lg:col-span-4">
                            <label
                              htmlFor="usulan"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Usulan
                            </label>
                            <textarea
                              required
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                              name="usulan"
                              id="usulan"
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#495678] focus:ring-[#495678] sm:text-sm h-[38px]"
                            />
                          </div>

                          <div className="col-span-1 lg:col-span-1">
                            <label
                              htmlFor="prioritas"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Prioritas
                            </label>
                            <select
                              required
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                              id="prioritas"
                              name="prioritas"
                              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#495678] focus:outline-none focus:ring-[#495678] sm:text-sm"
                            >
                              <option disabled selected>
                                ...
                              </option>
                              <option>HP - High Priority</option>
                              <option>MP - Middle Priority</option>
                              <option>LP - Low Priority</option>
                            </select>
                          </div>
                          <div className="col-span-1 lg:ml-5 ml-0 lg:col-span-1  ">
                            <button
                              type="button"
                              onClick={() => removeFields(index)}
                              className="mt-5 inline-flex justify-center py-2 lg:py-2 px-4 text-sm font-medium text-white hover:scale-150"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-7 h-7 fill-black"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="">
                    <button
                      type="button"
                      onClick={addFields}
                      className="mt-6 mr-5 inline-flex justify-center rounded-md border border-transparent bg-[#192a46] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#243c64] focus:outline-none focus:ring-2 focus:ring-[#495678] focus:ring-offset-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v12m6-6H6"
                        />
                      </svg>
                    </button>
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

export default Form;
