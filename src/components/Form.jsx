import "../App.css";

export default function Form() {
  return (
    <>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <div className="mt-10 sm:mt-0">
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
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              method="POST"
            >
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-3 sm:col-span-3">
                      <label
                        htmlFor="es1"
                        className="block text-sm font-medium text-gray-700"
                      >
                        UNIT ES. 1
                      </label>
                      <input
                        type="text"
                        name="es1"
                        id="es1"
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
                        type="text"
                        name="es2"
                        id="es2"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#495678] focus:ring-[#495678] sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                      <label
                        htmlFor="nama-lengkap"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nama Pengusul
                      </label>
                      <input
                        type="text"
                        name="nama-lengkap"
                        id="nama-lengkap"
                        placeholder=". . ."
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#495678] focus:ring-[#495678] sm:text-sm"
                      />
                    </div>

                    <div className="col-span-4 sm:col-span-4">
                      <label
                        htmlFor="fitur"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Fitur
                      </label>
                      <select
                        id="fitur"
                        name="fitur"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#495678] focus:outline-none focus:ring-[#495678] sm:text-sm"
                      >
                        <option value="proglat">Proglat</option>
                        <option value="etraining">E-Training</option>
                        <option value="sintala">Sintala</option>
                        <option value="akreditasi">Akreditasi</option>
                        <option value="kelembagaan">Kelembagaan</option>
                        <option value="produktivitas">Produktivitas</option>
                        <option value="magang">Magang</option>
                      </select>
                    </div>

                    <div className="col-span-2 sm:col-span-2">
                      <label
                        htmlFor="jumlah"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Jumlah Usulan
                      </label>
                      <input
                        type="number"
                        name="jumlah"
                        id="jumlah"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#495678] focus:ring-[#495678] sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="nama-program"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nama Program
                      </label>
                      <input
                        type="text"
                        name="nama-program"
                        id="nama-program"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#495678] focus:ring-[#495678] sm:text-sm"
                      />
                    </div>

                    <div className="col-span-1 lg:col-span-1">
                      <label
                        htmlFor="jenis"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Jenis
                      </label>
                      <select
                        id="jenis"
                        name="jenis"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#495678] focus:outline-none focus:ring-[#495678] sm:text-sm"
                      >
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                        <option>E</option>
                        <option>F</option>
                      </select>
                    </div>

                    <div className="col-span-4 lg:col-span-3">
                      <label
                        htmlFor="usulan"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Usulan
                      </label>
                      <textarea
                        name="usulan"
                        id="usulan"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#495678] focus:ring-[#495678] sm:text-sm h-[38px]"
                      />
                    </div>

                    <div className="col-span-1 lg:col-span-2">
                      <label
                        htmlFor="prioritas"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Prioritas
                      </label>
                      <select
                        id="prioritas"
                        name="prioritas"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#495678] focus:outline-none focus:ring-[#495678] sm:text-sm"
                      >
                        <option>HP - High Priority</option>
                        <option>MP - Middle Priority</option>
                        <option>LP - Low Priority</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-[#192a46] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#243c64] focus:outline-none focus:ring-2 focus:ring-[#495678] focus:ring-offset-2"
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
