import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#F2EEE8] px-4 text-center">
      {/* Khuôn mặt hoạt hình */}
      <div className="relative mb-8">
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-yellow-200 shadow-inner">
          {/* Băng đô */}
          <div className="absolute top-0 flex h-6 w-full">
            <div className="w-1/3 rounded-tl-full bg-red-500"></div>
            <div className="w-1/3 bg-white"></div>
            <div className="w-1/3 rounded-tr-full bg-blue-500"></div>
          </div>
          {/* Mắt */}
          <div className="absolute top-1/3 left-1/4 h-3 w-3 rounded-full bg-black"></div>
          <div className="absolute top-1/3 right-1/4 h-3 w-3 rounded-full bg-black"></div>
          {/* Má lúm */}
          <div className="absolute bottom-6 left-4 h-2 w-2 rounded-full bg-pink-300"></div>
          <div className="absolute right-4 bottom-6 h-2 w-2 rounded-full bg-pink-300"></div>
          {/* Miệng */}
          <div className="absolute bottom-4 h-2 w-10 rounded-full bg-black"></div>
        </div>
      </div>

      {/* Tiêu đề lỗi */}
      <h1 className="mb-4 text-2xl font-semibold text-gray-700">
        Oops! Something went wrong!
      </h1>

      {/* Nút quay về */}
      <Link to="/">
        <div className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white shadow transition hover:bg-blue-700">
          Return to Home
        </div>
      </Link>
    </div>
  );
};

export default NotFoundPage;
