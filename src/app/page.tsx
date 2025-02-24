"use client";

import { useState } from "react";
import { SectionsContainer, Section } from "react-fullpage";
import Container from "@/components/Layout/Container";
import MainSection from "@/components/Home/MainSection";
import SubSection01 from "@/components/Home/SubSection01";
import SubSection02 from "@/components/Home/SubSection02";
import SubSection03 from "@/components/Home/SubSection03";
import SubSection04 from "@/components/Home/SubSection04";

type ScrollEvent = {
  activeSection: number;
};

export default function Home() {
  const [initialActiveSection, setInitialActiveSection] = useState<number | null>(null);
  const onScroll = (page: ScrollEvent) => {
    if (initialActiveSection === null) setInitialActiveSection(page.activeSection);
  };

  let options = {
    scrollCallback: onScroll,
    sectionClassName: "section",
    anchors: ["MainSection", "SubSection01", "SubSection02", "SubSection03", "SubSection04"],
    scrollBar: false,
    navigation: true,
    verticalAlign: false,
    arrowNavigation: true,
  };

  return (
    <main className="relative">
      <SectionsContainer {...options} activeSection={initialActiveSection}>
        <Section>
          <MainSection />
        </Section>
        <Section>
          <Container>
            <SubSection01 />
          </Container>
        </Section>
        <Section>
          <Container>
            <SubSection02 />
          </Container>
        </Section>
        <Section>
          <Container>
            <SubSection03 />
          </Container>
        </Section>
        <Section>
          <Container>
            <SubSection04 />
          </Container>
        </Section>
      </SectionsContainer>
    </main>
  );
}
