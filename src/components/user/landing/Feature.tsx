import Section from "./Section";
import { featureContents } from "./constants";

interface FeatureContent {
  id: string;
  title: string;
  text: string;
  iconUrl: string;
}

const Features = () => {
  return (
    <Section id="features">
      <div className="mx-auto w-10/12 justify-center">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold text-purple-600 uppercase">
            Tính năng
          </p>
          <h2 className="text-4xl font-extrabold text-gray-900">
            Khám phá tính năng mà ứng dụng mang đến
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {featureContents.map((feature: FeatureContent) => (
            <div
              key={feature.id}
              className="group flex flex-col items-center bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/30 hover:bg-white/90 hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <div className="mb-6 p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <img
                  src={feature.iconUrl}
                  alt={feature.title}
                  className="h-10 w-10 object-contain filter brightness-0 invert"
                />
              </div>
              <h3 className="mb-4 text-center text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-center text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Features;
