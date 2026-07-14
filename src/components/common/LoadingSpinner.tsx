const DOT_DELAYS = ["0s", "0.2s", "0.4s"];

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center gap-1.5 py-2">
      {DOT_DELAYS.map((delay) => (
        <span key={delay} className="dot-blink h-2 w-2 rounded-full bg-purple01" style={{ animationDelay: delay }} />
      ))}
    </div>
  );
};

export default LoadingSpinner;
