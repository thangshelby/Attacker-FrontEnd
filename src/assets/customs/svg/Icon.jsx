export const PulseDot = ({ color = "#3B82F6", size = 18, icon = null }) => {
  const outerSize = size * 3;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: outerSize, height: outerSize }}
    >
      {/* Outer glow */}
      <div
        className="absolute rounded-full opacity-20"
        style={{
          width: outerSize,
          height: outerSize,
          backgroundColor: color,
        }}
      ></div>

      {/* Inner dot */}
      <div
        className="relative z-10 flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
        }}
      >
        {icon && <div className="text-xs text-white">{icon}</div>}
      </div>
    </div>
  );
};
