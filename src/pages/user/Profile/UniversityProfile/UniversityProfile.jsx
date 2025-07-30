import React, { useState, useMemo } from "react";
import {
  Mail,
  University,
  BookUser,
  Calendar,
  UploadCloud,
  ChevronDown,
} from "lucide-react";
import { universities, faculties } from "./mockdat";

const FormField = ({ id, label, children }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-600 dark:text-gray-300"
    >
      {label}
    </label>
    <div className="mt-1">{children}</div>
  </div>
);

const UnveristyProfile = () => {
  // Giả sử email này được lấy từ state của user hoặc context
  const registeredEmail = "harrypotter@gmail.com";

  const [profile, setProfile] = useState({
    universityId: "hcmus", // ID của trường được chọn
    studentId: "19120001",
    startYear: "2019",
    endYear: "2024",
    facultyId: "cntt",
    major: "Kỹ thuật phần mềm",
  });

  const [fileName, setFileName] = useState("");

  // Lấy thông tin trường đại học đang được chọn
  const selectedUniversity = useMemo(
    () => universities.find((uni) => uni.id === profile.universityId),
    [profile.universityId],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu đã gửi:", { ...profile, admissionLetter: fileName });
    // Thêm logic gọi API để lưu dữ liệu ở đây
    alert("Đã lưu thông tin thành công!");
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Tiêu đề trang */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Hồ Sơ Học Vấn
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Cập nhật thông tin về trường học của bạn để hoàn tất hồ sơ.
        </p>
      </div>

      {/* Card chứa form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="space-y-8">
          {/* Phần thông tin trường học */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
            <div className="md:col-span-2">
              <FormField id="universityId" label="Tên trường">
                <div className="relative">
                  <select
                    id="universityId"
                    name="universityId"
                    value={profile.universityId}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-8 shadow-sm transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    {universities.map((uni) => (
                      <option key={uni.id} value={uni.id}>
                        {uni.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
              </FormField>
              {selectedUniversity && (
                <div className="mt-2 rounded-md bg-indigo-50 p-3 text-sm text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                  <p>
                    <strong>Địa chỉ:</strong> {selectedUniversity.address}
                  </p>
                </div>
              )}
            </div>

            <FormField id="studentId" label="Mã số sinh viên">
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={profile.studentId}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              />
            </FormField>

            <FormField id="email" label="Email sinh viên">
              <div className="flex items-center rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 dark:border-gray-600 dark:bg-gray-700/50">
                <Mail size={16} className="mr-2 text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">
                  {registeredEmail}
                </span>
              </div>
            </FormField>
          </div>

          {/* Phần thông tin học tập */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2">
            <div className="flex gap-4">
              <FormField id="startYear" label="Năm nhập học">
                <input
                  type="number"
                  id="startYear"
                  name="startYear"
                  value={profile.startYear}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
              </FormField>
              <FormField id="endYear" label="Năm tốt nghiệp (dự kiến)">
                <input
                  type="number"
                  id="endYear"
                  name="endYear"
                  value={profile.endYear}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
              </FormField>
            </div>

            <div>
              <FormField id="facultyId" label="Khoa">
                <div className="relative">
                  <select
                    id="facultyId"
                    name="facultyId"
                    value={profile.facultyId}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-lg border-gray-300 bg-white px-4 py-2.5 pr-8 shadow-sm transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >
                    {faculties.map((fac) => (
                      <option key={fac.id} value={fac.id}>
                        {fac.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
              </FormField>
            </div>

            <div className="md:col-span-2">
              <FormField id="major" label="Chuyên ngành">
                <input
                  type="text"
                  id="major"
                  name="major"
                  value={profile.major}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                />
              </FormField>
            </div>
          </div>

          {/* Phần tải lên giấy tờ */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Giấy xác nhận nhập học
            </label>
            <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10 dark:border-gray-600">
              <div className="text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4 flex text-sm leading-6 text-gray-600 dark:text-gray-400">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-none hover:text-indigo-500 dark:text-indigo-400 dark:ring-offset-gray-800"
                  >
                    <span>Tải lên một file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">hoặc kéo và thả</p>
                </div>
                <p className="text-xs leading-5 text-gray-500">
                  PNG, JPG, PDF tối đa 10MB
                </p>
                {fileName && (
                  <p className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                    Đã chọn file: {fileName}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="mt-8 flex justify-end gap-x-3 border-t border-gray-200 pt-6 dark:border-gray-700">
          <button
            type="button"
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>
  );
};

export default UnveristyProfile;
