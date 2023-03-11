import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";
import "./Search.css";

const placeholderArray = [
  "Who is Sam Altman?",
  "What is the capital of France?",
  "Where is the Great Barrier Reef located?",
  "What is the highest mountain in the world?",
  `Who painted the famous artwork "Starry Night"?`,
  "Who is Bill Gates?",
  "What is there to do in Toronto, Canada?",
];

export function Search({
  prompt,
  setPrompt,
  searchPrompt,
  loading,
  setDrawer,
  searchFlex = false,
  hideButtons = false,
}) {
  const randomPlaceholder =
    placeholderArray[Math.floor(Math.random() * placeholderArray.length)];

  return (
    <form
      className="search"
      style={{ display: searchFlex ? "flex" : "initial" }}
    >
      <div
        className="search__input"
        style={{ background: loading ? `#f0f3f7` : `initial` }}
      >
        <SearchIcon className="search__inputIcon" />
        <input
          value={prompt}
          disabled={loading}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchPrompt();
            }
          }}
          placeholder={randomPlaceholder}
        />
      </div>

      {!hideButtons ? (
        <div className="search__buttons">
          <Button
            disabled={prompt.trim() === ""}
            type="submit"
            onClick={searchPrompt}
            variant="outlined"
          >
            Search
          </Button>
          <Button
            className="search__button--what"
            variant="outlined"
            onClick={() => setDrawer(true)}
          >
            What is this?
          </Button>
        </div>
      ) : (
        <div className="search__buttons">
          <Button
            className="search__buttonHidden"
            type="submit"
            onClick={searchPrompt}
            variant="outlined"
          >
            Search
          </Button>
          <Button
            className="search__buttonHidden"
            variant="outlined"
            onClick={() => setDrawer(true)}
          >
            What is this?
          </Button>
        </div>
      )}
    </form>
  );
}
