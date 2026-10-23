import CtaButton from "@/components/Button/CtaButton";

const Notfound = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] md:min-h-[calc(100vh-124px)]">
      <h2 className="text-3xl md:text-4xl font-semibold mb-2">404 ERROR</h2>
      <p className="text-gray03 text-sm md:text-base mb-12">해당 페이지를 찾을 수 없어요!</p>
      <CtaButton url="/">메인으로 돌아가기</CtaButton>
    </section>
  );
};

export default Notfound;
