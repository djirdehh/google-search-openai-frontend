import React from "react";
import { useVoice } from "../../hooks/useVoice";
import SearchIcon from "@material-ui/icons/Search";
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import { Button } from "@material-ui/core";
import "./Search.css";

const placeholderArray = [
  "Who is Sam Altman?",
  "Vacation tips in Bali",
  "How to learn web development?",
  "Mount Everest",
  `Who is Van Gogh?`,
  "Bill Gates",
  "Best doughnuts in Toronto",
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
  const {
    text: voiceRecognizedText,
    isListening,
    listen,
    voiceSupported,
  } = useVoice();

  React.useEffect(() => {
    if (voiceRecognizedText && !isListening) {
      setPrompt(voiceRecognizedText);
    }
  }, [voiceRecognizedText, isListening]);

  React.useEffect(() => {
    if (voiceRecognizedText === prompt && searchPrompt) {
      searchPrompt();
    }
  }, [prompt]);


  const handleListen = () => {
    if (voiceSupported) {
      listen();
    } else {
      alert("Voice recognition is not supported by your browser.");
    }
  };

  const randomPlaceholder =
    placeholderArray[Math.floor(Math.random() * placeholderArray.length)];

  return (
    <div
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
          placeholder={isListening ? "Speak now..." : randomPlaceholder}
        />
        <div>
          <KeyboardVoiceIcon 
            className={`microphone__inputIcon ${isListening && "isListening"}`}
            onClick={handleListen}
          />
        </div>
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
            What's this?
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
            What's this?
          </Button>
        </div>
      )}
    </div>
  );
}
