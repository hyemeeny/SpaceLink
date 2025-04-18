import loading from "@/assets/lotties/loading.json";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const LoadingSpinner = () => {
  return <Lottie animationData={loading} className="w-10 mx-auto" />;
};

export default LoadingSpinner;
