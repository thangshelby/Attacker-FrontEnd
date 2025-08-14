import { useState } from "react";
import Section from "./Section";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "./constants";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = testimonials.length;

  const handlePrev = () => {
    // Quay về slide cuối nếu đang ở slide đầu tiên
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    // Quay về slide đầu nếu đang ở slide cuối
    setCurrentIndex((prevIndex) =>
      prevIndex === totalSlides - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <Section id="testimonials" className="bg-slate-50 py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-3 lg:gap-16">
          {/* CỘT BÊN TRÁI: TIÊU ĐỀ & NÚT ĐIỀU HƯỚNG */}
          <div className="text-center lg:text-left">
            <p className="font-semibold text-purple-600 uppercase">
              Testimonial
            </p>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              We've build trust with reviews from real users
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Boost your credibility by featuring genuine testimonials from real
              users, showcasing their positive experiences and satisfaction with
              our services.
            </p>
            <div className="mt-8 flex justify-center gap-4 lg:justify-start">
              <button
                onClick={handlePrev}
                className="cursor-pointer rounded-full border border-gray-300 p-3 text-gray-700 transition hover:bg-gray-100"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={handleNext}
                className="cursor-pointer rounded-full bg-gray-900 p-3 text-white transition hover:bg-gray-700"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* CỘT BÊN PHẢI: SLIDER */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden p-1">
              {" "}
              {/* p-1 để bóng không bị cắt */}
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  // Dùng translateX để trượt.
                  // Trên màn nhỏ (1 slide/view), trượt 100% * index
                  // Trên màn lớn (2 slide/view), trượt 50% * index
                  transform: `translateX(calc(-${currentIndex * (100 / (window.innerWidth >= 1024 ? 2 : 1))}%)`,
                }}
              >
                {/* Cách làm đúng và "thuần túy" hơn với Tailwind */}
                <div
                  className="flex -translate-x-[calc(var(--current-index)*100%)] transform-gpu transition-transform duration-500 ease-in-out lg:-translate-x-[calc(var(--current-index)*50%)]"
                  style={{ "--current-index": currentIndex }}
                >
                  {testimonials.map((item) => (
                    <div
                      key={item.id}
                      className="w-full flex-shrink-0 px-2 lg:w-1/2"
                    >
                      <div className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-lg">
                        <div className="flex items-center gap-1 text-yellow-400">
                          {[...Array(item.stars)].map((_, i) => (
                            <Star key={i} fill="currentColor" size={20} />
                          ))}
                        </div>
                        <p className="mt-4 flex-grow text-gray-600">
                          {item.text}
                        </p>
                        <div className="mt-6 flex items-center gap-4 border-t border-gray-100 pt-6">
                          <img
                            src={item.image}
                            alt={item.author}
                            className="h-14 w-14 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">
                              {item.author}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Testimonials;
