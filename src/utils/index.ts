export const truncate = (
  text: string,
  startChars: number,
  endChars: number,
  maxLength: number
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
          pinata_api_key:' 1f10e699dda81877bce9',
          pinata_secret_api_key:' 0137dc1ea3f89163b1f1b78517856882414b9b3f526a74d3ffd53a217aab139b',
        },
      }
    );

    const result = await response.json();
    return `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`;
  } catch (error) {
    console.error("Upload failed:", error);
  }
}


export function formatDate(dateString:string) {
  const date = new Date(dateString);
  
  return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
  });
}

