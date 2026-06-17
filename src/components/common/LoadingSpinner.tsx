const DOT_DELAYS = ["0s", "0.2s", "0.4s"];

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center gap-1.5 py-2">
      {DOT_DELAYS.map((delay) => (
        <span
          key={delay}
          className="w-2 h-2 rounded-full bg-purple01 animate-[dot-blink_1.4s_ease-in-out_infinite]"
          style={{ animationDelay: delay }}
        />
      ))}
    </div>
  );
};

export default LoadingSpinner;
