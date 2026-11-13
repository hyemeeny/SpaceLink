"use client";

import { useEffect, useState } from "react";
import { SectionsContainer, Section } from "react-fullpage";
import MainSection from "@/components/Home/MainSection";
import SubSection01 from "@/components/Home/SubSection01";
import SubSection02 from "@/components/Home/SubSection02";
import SubSection03 from "@/components/Home/SubSection03";
import SubSection04 from "@/components/Home/SubSection04";

type ScrollEvent = {
  activeSection: number;
};

const sectionLabels: Record<string, string> = {
  MainSection: "메인",
  SubSection01: "링크 저장",
  SubSection02: "폴더 관리",
  SubSection03: "즐겨찾기",
  SubSection04: "링크 공유",
};

const FullpageContainer = () => {
  const [initialActiveSection, setInitialActiveSection] = useState<number | null>(null);

  useEffect(() => {
    document.querySelectorAll<HTMLAnchorElement>("a.Navigation-Anchor").forEach((el) => {
      const id = el.getAttribute("href")?.replace("#", "") ?? "";
      const label = sectionLabels[id];
      if (label) el.setAttribute("aria-label", `${label} 섹션으로 이동`);
    });
  }, []);

  const onScroll = (page: ScrollEvent) => {
    if (initialActiveSection === null) setInitialActiveSection(page.activeSection);
  };

  const options = {
    scrollCallback: onScroll,
    sectionClassName: "section",
    anchors: ["MainSection", "SubSection01", "SubSection02", "SubSection03", "SubSection04"],
    scrollBar: false,
    navigation: true,
    verticalAlign: false,
    arrowNavigation: true,
  };

  return (
    <SectionsContainer {...options} activeSection={initialActiveSection}>
      <Section>
        <MainSection />
      </Section>
      <Section>
        <SubSection01 />
      </Section>
      <Section>
        <SubSection02 />
      </Section>
      <Section>
        <SubSection03 />
      </Section>
      <Section>
        <SubSection04 />
      </Section>
    </SectionsContainer>
  );
};

export default FullpageContainer;
