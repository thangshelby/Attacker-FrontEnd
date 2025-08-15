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

        <div className="flex flex-wrap justify-center">
          {featureContents.map((feature: FeatureContent) => (
            <div
              key={feature.id}
              className="flex w-full flex-col items-center rounded-xl bg-slate-50 p-6 shadow sm:w-[300px]"
            >
              <img
                src={feature.iconUrl}
                alt={feature.title}
                className="mb-4 h-12 w-12 object-contain"
              />
              <h3 className="mb-2 text-center text-lg font-bold text-gray-900">
                {feature.title}
              </h3>
              <div className="mt-2 text-left">
                <p className="text-md text-center text-gray-600">
                  {feature.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Features;
