import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import "../App.css";
import { Input, TextArea } from "semantic-ui-react";

function Form() {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const navigate = useNavigate();

  const constants = [
    { id: 1, name: "A", value: "Pembangunan aplikasi baru" },
    {
      id: 2,
      name: "B",
      value: "Penambahan fitur baru pada aplikasi",
    },
    { id: 3, name: "C", value: "Pengembangan fitur yang sudah ada" },
    {
      id: 4,
      name: "D",
      value: "Integrasi aplikasi internal milik KEMNAKER",
    },
    {
      id: 5,
      name: "E",
      value: "Integrasi aplikasi eksternal",
    },
    {
      id: 6,
      name: "F",
      value: "Akses Database",
    },
  ];

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      console.log("refreshing token");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };
  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
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
    namaProgram: "",
  });

  const handleChange = (event) => {
    setFormFields({ ...formFields, [event.target.name]: event.target.value });
  };

  const [usulanFields, setUsulanFields] = useState([
    { jenis: "", usulan: "", prioritas: "" },
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
    if (confirm("Yakin ingin mengirim usulan?")) {
      setFormFields({
        es1: "",
        es2: "",
        namaLengkap: "",
        fitur: "",
        namaProgram: "",
      });
      setUsulanFields([{ jenis: "", usulan: "", prioritas: "" }]);
      console.log(fullData);
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="hidden sm:block sm:" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <div className="lg:mx-[20%] md:mx-[10%] mx-[2%] my-5 lg:px-10">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1 py-5">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg leading-6 text-gray-900 font-semibold">
                Form Usulan
              </h3>
              <p className="mt-5 text-md text-gray-600 italic">Keterangan</p>
              <ul>
                {constants.map((constant) => (
                  <li key={constant.id} className="text-md my-1 py-1">
                    <p className="text-md mx-5 text-gray-600">
                      {constant.name} -{" "}
                      <span className="text-gray-500 font-normal">
                        {constant.value}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0 ">
            <form onSubmit={handleSubmit}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white py-5 pt-6 pb-6 pl-6 pr-3">
                  <div className="grid grid-cols-6 gap-3 lg:gap-4 ">
                    <div className="col-span-3 sm:col-span-3">
                      <label
                        htmlFor="es1"
                        className="block text-sm font-medium text-gray-700"
                      >
                        UNIT ES. 1
                      </label>
                      <Input
                        required
                        type="text"
                        name="es1"
                        id="es1"
                        onChange={(event) => handleChange(event)}
                        value={formFields.es1}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                      />
                    </div>
                    <div className="col-span-3 sm:col-span-3">
                      <label
                        htmlFor="es2"
                        className="block text-sm font-medium text-gray-700"
                      >
                        UNIT ES. 2
                      </label>
                      <Input
                        required
                        type="text"
                        name="es2"
                        id="es2"
                        value={formFields.es2}
                        onChange={(event) => handleChange(event)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="namaLengkap"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nama Pengusul
                      </label>
                      <Input
                        icon="user"
                        required
                        type="text"
                        name="namaLengkap"
                        id="namaLengkap"
                        value={formFields.namaLengkap}
                        onChange={(event) => handleChange(event)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
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
                        value={formFields.fitur}
                        onChange={(event) => handleChange(event)}
                        className=" mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#495678] focus:outline-none focus:ring-[#495678] sm:text-sm"
                      >
                        <option disabled selected></option>
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
                        htmlFor="namaProgram"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nama Program
                      </label>
                      <Input
                        required
                        type="text"
                        name="namaProgram"
                        id="namaProgram"
                        value={formFields.namaProgram}
                        onChange={(event) => handleChange(event)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                      />
                    </div>
                    {usulanFields.map((Input, index) => {
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
                              value={usulanFields.jenis}
                              name="jenis"
                              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#495678] focus:outline-none focus:ring-[#495678] sm:text-sm"
                            >
                              <option disabled selected></option>
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
                            <TextArea
                              required
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                              value={usulanFields.usulan}
                              name="usulan"
                              id="usulan"
                              className="mt-1 focus:border-0 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm h-[42px] lg:h-[38px]"
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
                              value={usulanFields.prioritas}
                              className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#495678] focus:outline-none focus:ring-[#495678] sm:text-sm"
                            >
                              <option disabled selected></option>
                              <option>HP - High Priority</option>
                              <option>MP - Middle Priority</option>
                              <option>LP - Low Priority</option>
                            </select>
                          </div>
                          <div className="col-span-1 lg:ml-5 ml-0 lg:col-span-1  ">
                            <button
                              type="button"
                              onClick={(e) => removeFields(index)}
                              className="mt-5 inline-flex justify-center py-2 lg:py-2 px-4 w-fit text-sm font-medium text-white hover:scale-150"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-7 h-7 fill-black"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
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
