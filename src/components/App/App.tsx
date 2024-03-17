import React, { useState } from "react";
import "./App.css";
import { Facts } from "./../Facts/Facts";
import { AgeFetcher } from "./../AgeFetcher/AgeFetcher";

import { View, Panel, PanelHeader, CellButton, Group } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

function App() {
  const [activePanel, setActivePanel] = useState("facts");

  return (
    <View activePanel={activePanel}>
      <Panel id="facts">
        <PanelHeader>Факты</PanelHeader>
        <Group>
          <Facts />
          <CellButton onClick={() => setActivePanel("ageByName")}>
            Получить возраст по имени
          </CellButton>
        </Group>
      </Panel>
      <Panel id="ageByName">
        <PanelHeader>Получить возраст по имени</PanelHeader>
        <Group>
          <AgeFetcher />
          <CellButton onClick={() => setActivePanel("facts")}>
            Получить факт
          </CellButton>
        </Group>
      </Panel>
    </View>
  );
}

export default App;
