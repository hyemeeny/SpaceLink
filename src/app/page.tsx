import Container from "@/components/Layout/Container";
import MainSection from "@/components/Home/MainSection";
import SubSection from "@/components/Home/SubSection";

export default function Home() {
  return (
    <main>
      <MainSection />
      <Container>
        <SubSection />
      </Container>
    </main>
  );
}
