import React, { useState, useEffect, useRef } from "react";
import "./Facts.css";

import { Button } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

export function Facts() {
  const [catFact, setCatFact] = useState<string>("");
  const abortController = useRef<AbortController | null>(null);
  const catFactInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (catFactInputRef.current && catFactInputRef.current.value !== "") {
      catFactInputRef.current.focus();
      catFactInputRef.current.setSelectionRange(
        catFact.indexOf(" "),
        catFact.indexOf(" "),
      );
    }
  }, [catFact]);

  const fetchCatFact = async () => {
    if (abortController.current) {
      abortController.current.abort();
    }

    const controller = new AbortController();
    abortController.current = controller;

    fetch("https://cat-fact.herokuapp.com/facts/random", {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setCatFact(data.text))
      .catch((err) => console.log(err));
  };

  return (
    <div className="facts">
      <h2>Факты</h2>
      <Button onClick={fetchCatFact} 
        className="facts__button">Получить факт</Button>
      <input ref={catFactInputRef} type="text" value={catFact} className="facts__input"/>
    </div>
  );
}
