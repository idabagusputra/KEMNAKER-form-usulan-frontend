import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../App.css";
import { Input, TextArea } from "semantic-ui-react";

function Form() {
  const [firstEchelon, setfirstEchelon] = useState([{ name: "", id: "" }]);
  const [selectedfirstEchelon, setselectedfirstEchelon] = useState("");
  const [secondEchelon, setsecondEchelon] = useState([{ name: "", id: "" }]);
  const [namaProgram, setnamaProgram] = useState();

  const [proposalType, setproposalType] = useState([{ name: "", code: "" }]);
  const [priorityLevel, setpriorityLevel] = useState([{ name: "", id: "" }]);
  const [namafitur, setnamafitur] = useState();
  const [usulan, setusulan] = useState();

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    //set axios header dengan type Authorization + Bearer token
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  useEffect(() => {
    //check token empty
    if (!token) {
      //redirect login page
      navigate("/");
    }

    //call function "fetchData"
    fetchData();
  }, []);

  const apifisrtEchelon = "https://form-usulan-api.fly.dev/meta/first-echelons";
  useEffect(() => {
    const firstEchelon = async () => {
      const { data: res } = await axios.get(apifisrtEchelon);
      setfirstEchelon(res);
    };
    firstEchelon();
  }, []);

  const handlefirstEchelonChange = (event) => {
    console.log(event.target.value);
    setselectedfirstEchelon(event.target.value);
  };

  const apisecondEchelon = `https://form-usulan-api.fly.dev/meta/second-echelons?first_echelon=${selectedfirstEchelon}`;
  useEffect(() => {
    if (selectedfirstEchelon) {
      const secondEchelon = async () => {
        const { data: res } = await axios.get(apisecondEchelon);
        setsecondEchelon(res);
      };
      secondEchelon();
    }
  }, [selectedfirstEchelon]);

  const apipriorityLevel =
    "https://form-usulan-api.fly.dev/meta/priority-levels";
  useEffect(() => {
    const priorityLevel = async () => {
      const { data: res } = await axios.get(apipriorityLevel);
      setpriorityLevel(res);
    };
    priorityLevel();
  }, []);

  const apiproposalType = "https://form-usulan-api.fly.dev/meta/proposal-types";
  useEffect(() => {
    const proposalType = async () => {
      const { data: res } = await axios.get(apiproposalType);
      setproposalType(res);
    };
    proposalType();
  }, []);

  const handlesecondEchelonChange = (event) => {
    console.log(event.target.value);
    const { id, value } = event.target;
    const updatedSecondEchelon = secondEchelon.map((item) => {
      if (item.id === id) {
        return { ...item, name: value };
      }
      return item;
    });
    setsecondEchelon(updatedSecondEchelon);
  };

  const handlepriorityLevelChange = (event) => {
    console.log(event.target.value);
    const { id, value } = event.target;
    const updatedpriorityLevel = priorityLevel.map((item) => {
      if (item.id === id) {
        return { ...item, name: value };
      }
      return item;
    });
    setpriorityLevel(updatedpriorityLevel);
  };

  const handleproposalTypeChange = (event) => {
    console.log(event.target.value);
    const { id, value } = event.target;
    const updatedproposalType = proposalType.map((item) => {
      if (item.id === id) {
        return { ...item, name: value };
      }
      return item;
    });
    setproposalType(updatedproposalType);
  };

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

  const handlenamaProgramChange = (event) => {
    setnamaProgram(event.target.value);
  };

  const handlenamafiturChange = (event) => {
    setnamafitur(event.target.value);
  };

  const handleusulanChange = (event) => {
    setusulan(event.target.value);
  };

  const [usulanFields, setUsulanFields] = useState([
    {
      proposalType: [{ name: "", code: "" }],
      priorityLevel: [{ name: "", id: "" }],
      namafitur: "",
      usulan: "",
    },
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
    const fullData = { ...namaProgram, usulan: usulanFields };
    if (confirm("Yakin ingin mengirim usulan?")) {
      setnamaProgram({
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

  const a = async () => {
    const data = {
      second_echelon_id: secondEchelon,
      application_name: namaProgram,
    };

    const response = await axios.post("https://form-usulan-api.fly/forms", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData);
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
                      <select
                        required
                        value={selectedfirstEchelon}
                        onChange={handlefirstEchelonChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                      >
                        {firstEchelon.map((firstEchelon) => (
                          <option key={firstEchelon.id} value={firstEchelon.id}>
                            {firstEchelon.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-3 sm:col-span-3">
                      <label
                        htmlFor="es2"
                        className="block text-sm font-medium text-gray-700"
                      >
                        UNIT ES. 2
                      </label>

                      <select
                        required
                        id={secondEchelon.id}
                        value={secondEchelon.name}
                        onChange={handlesecondEchelonChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                      >
                        {secondEchelon.map((secondEchelon) => (
                          <option
                            key={secondEchelon.id}
                            value={secondEchelon.id}
                          >
                            {secondEchelon.name}
                          </option>
                        ))}
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
                        value={namaProgram}
                        onChange={handlenamaProgramChange}
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
                              id={proposalType.id}
                              value={proposalType.name}
                              onChange={handleproposalTypeChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                            >
                              {proposalType.map((proposalType) => (
                                <option
                                  key={proposalType.id}
                                  value={proposalType.id}
                                >
                                  {proposalType.code}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="col-span-4 lg:col-span-4">
                            <label
                              htmlFor="fitur"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Nama Fitur
                            </label>
                            <TextArea
                              required
                              onChange={handlenamafiturChange}
                              value={namafitur}
                              name="fitur"
                              id="fitur"
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
                              id={priorityLevel.id}
                              value={priorityLevel.name}
                              onChange={handlepriorityLevelChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm"
                            >
                              {priorityLevel.map((priorityLevel) => (
                                <option
                                  key={priorityLevel.id}
                                  value={priorityLevel.id}
                                >
                                  {priorityLevel.name}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="col-span-6 lg:col-span-6">
                            <label
                              htmlFor="usulann"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Usulan
                            </label>
                            <TextArea
                              required
                              onChange={handleusulanChange}
                              value={usulan}
                              name="usulan"
                              id="usulan"
                              className="mt-1 focus:border-0 block w-full rounded-md border-gray-300 shadow-sm  sm:text-sm h-[42px] lg:h-[38px]"
                            />
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
