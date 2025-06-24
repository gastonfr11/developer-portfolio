// app/client-home.server.jsx

"use client";

import { useEffect, useState } from "react";
import { personalData } from "@/utils/data/personal-data";

import HeroSection from "./components/homepage/hero-section";
import AboutSection from "./components/homepage/about";
import Experience from "./components/homepage/experience";
import Skills from "./components/homepage/skills";
import Projects from "./components/homepage/projects";
import Education from "./components/homepage/education";
import ContactSection from "./components/homepage/contact";

export default function ClientHome() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data
          .filter((item) => item.cover_image)
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
      <Projects blogs={blogs} />
      <Education />
      <ContactSection />
    </div>
  );
}
