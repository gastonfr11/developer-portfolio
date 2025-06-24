"use client"; // 👈 muy importante, sin esto no sirve
export const dynamic = 'force-dynamic';


import { useEffect, useState } from "react";
import { personalData } from "@/utils/data/personal-data";

import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data
          .filter((item) => item?.cover_image)
          .sort(() => Math.random() - 0.5);
        setBlogs(filtered);
      });
  }, []);

  return (
    <div suppressHydrationWarning>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects blogs={blogs} /> {/* Si pasás blogs al componente */}
      <Education />
      <ContactSection />
    </div>
  );
}
