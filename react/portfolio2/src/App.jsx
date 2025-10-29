import React from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";

export default function App() {
  return (
    <div className="app">
      <main className="main-content">
        <Hero />
        <About />
        <Skills />
        <Projects />
      </main>
    </div>
  );
}
