import React from "react";
import Button from "./components/Button";
import Card from "./components/Card";
import ResponsiveText from "./components/ResponsiveText";
import DarkModeBox from "./components/DarkModeBox";
import ConditionalButton from "./components/ConditionalButton";

export default function App() {
  return (
    <div className="space-y-4 p-6">
      <Button />
      <Card />
      <ResponsiveText />
      <DarkModeBox />
      <ConditionalButton />
    </div>
  );
}
