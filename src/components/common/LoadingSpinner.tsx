import Lottie from "lottie-react";
import loading from "@/assets/lotties/loading.json";

const LoadingSpinner = () => {
  return <Lottie animationData={loading} className="w-10 mx-auto" />;
};

export default LoadingSpinner;
