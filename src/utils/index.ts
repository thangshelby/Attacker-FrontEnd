import api from "../apis/api";
import moment from "moment";
export const truncate = (text: string) => {
  return `${text.slice(0, 6)}...${text.slice(-4)}`;
};

export function getUploadElapsedTime(uploadTimeISO: string): string {
  const now = moment();
  const uploadTime = moment(uploadTimeISO);

  if (uploadTime.isAfter(now)) return "Upload time is in the future";
  const duration = moment.duration(now.diff(uploadTime));
  const hours = duration.hours();
  const minutes = duration.minutes();
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "now";
}

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post("/images/upload_image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export const getGPAColor = (gpa) => {
  if (gpa >= 3.6) return "text-green-400";
  if (gpa >= 3.0) return "text-blue-400";
  if (gpa >= 2.5) return "text-yellow-400";
  return "text-red-400";
};

export const getGPALevel = (gpa) => {
  if (gpa >= 3.6) return "Xuất sắc";
  if (gpa >= 3.2) return "Giỏi";
  if (gpa >= 2.5) return "Khá";
  if (gpa >= 2.0) return "Trung bình";
  return "Yếu";
};
