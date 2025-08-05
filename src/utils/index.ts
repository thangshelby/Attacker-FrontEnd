import api from "../apis/api";

export const truncate = (
  text: string,
  startChars: number,
  endChars: number,
  maxLength: number,
) => {
  if (text.length > maxLength) {
    var start = text.substring(0, startChars);
    var end = text.substring(text.length - endChars, text.length);
    while (start.length + end.length < maxLength) {
      start = start + ".";
    }
    return start + end;
  }
  return text;
};

export async function uploadImageToPinata(file: any) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        body: formData,
        headers: {
          pinata_api_key: " 1f10e699dda81877bce9",
          pinata_secret_api_key:
            " 0137dc1ea3f89163b1f1b78517856882414b9b3f526a74d3ffd53a217aab139b",
        },
      },
    );

    const result = await response.json();
    return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
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
