import { useState } from "react";
import {
  Shield,
  Wallet,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  GraduationCap,
  FileCheck,
  AlertCircle,
  Upload,
} from "lucide-react";
import {useNavigate} from "react-router-dom";
// Sample data - trong thực tế sẽ fetch từ API
const sampleData = [
  {
    id: 1,
    name: "University Degree",
    method: "did:key",
    description: "Bachelor's degree in Computer Science",
    did: "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK",
    studyYear: "2023-2024",
    term: "1",
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    name: "Master's Certificate",
    method: "did:web",
    description: "Master's degree in Software Engineering",
    did: "did:web:example.com:users:alice",
    studyYear: "2024-2025",
    term: "2",
    createdAt: "2024-02-20",
  },
  {
    id: 3,
    name: "PhD Thesis",
    method: "did:ethr",
    description: "Doctoral dissertation in AI",
    did: "did:ethr:0x1234567890123456789012345678901234567890",
    studyYear: "2025-2026",
    term: "3",
    createdAt: "2024-03-10",
  },
];

const DIDManagementTable = () => {
  const [data, setData] = useState(sampleData);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              DID Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Quản lý danh sách các DID đã nhập
            </p>
          </div>
          <button
            onClick={() => navigate("/VCs")}
            className="flex items-center rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:from-indigo-600 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500/50"
          >
            <Plus className="mr-2 h-4 w-4" />
            Thêm DID mới
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-gray-800">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Public Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Method
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    DID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Năm học
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Học kỳ
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Ngày tạo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                {data.map((item) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FileCheck className="mr-3 h-5 w-5 text-indigo-500" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </div>
                          {item.description && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {item.description.length > 50
                                ? `${item.description.substring(0, 50)}...`
                                : item.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                        <Shield className="mr-1 h-3 w-3" />
                        {item.method}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-mono text-sm text-gray-900 dark:text-white">
                        {item.did.length > 30
                          ? `${item.did.substring(0, 30)}...`
                          : item.did}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900 dark:text-white">
                        <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                        {item.studyYear}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-900 dark:text-white">
                        <GraduationCap className="mr-2 h-4 w-4 text-gray-400" />
                        Học kỳ {item.term}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {item.createdAt}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="rounded-lg bg-blue-100 p-2 text-blue-600 transition-colors hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-400 dark:hover:bg-blue-800"
                          title="Chỉnh sửa"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="rounded-lg bg-red-100 p-2 text-red-600 transition-colors hover:bg-red-200 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800"
                          title="Xóa"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data.length === 0 && (
            <div className="py-12 text-center">
              <Wallet className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                Chưa có DID nào
              </h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Nhấn vào nút "Thêm DID mới" để bắt đầu
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DIDManagementTable;
