import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  FormEvent,
} from "react";
import "./AgeFetcher.css";

import { FormItem, Button, Input } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

export function AgeFetcher() {
  const [userName, setUserName] = useState<string>("");
  const [userAge, setUserAge] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const abortController = useRef<AbortController | null>(null);

  const fetchUserAge = async () => {
    if (abortController.current) {
      abortController.current.abort();
    }

    const controller = new AbortController();
    abortController.current = controller;

    fetch(`https://api.agify.io/?name=${userName}`)
      .then((res) => res.json())
      .then((data) => setUserAge(data.age))
      .catch((err) => console.log(err));
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    setUserName(value);
    if (!/^[a-zA-Z]*$/.test(value)) {
      setNameError("The name must contain only English letters");
    } else {
      setNameError("");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!nameError) {
      fetchUserAge();
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (userName && !nameError) {
        fetchUserAge();
      }
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [userName, nameError]);

  return (
    <div className="user-age-container">
      <h2>Получить возраст по имени</h2>
      <form onSubmit={handleSubmit}>
        <FormItem
          htmlFor="text"
          status={nameError ? "error" : "valid"}
          bottom={`${nameError}`}
        >
          <Input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={userName}
            onChange={handleNameChange}
          />
        </FormItem>
        <Button type="submit" disabled={!!nameError}>
          Получить возраст
        </Button>
      </form>
      {userAge && <p>User age: {userAge}</p>}
    </div>
  );
}
