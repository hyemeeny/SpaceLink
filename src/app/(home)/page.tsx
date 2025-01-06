import Container from "@/components/Layout/Container";
import MainSection from "./components/MainSection";
import SubSection from "./components/SubSection";

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
