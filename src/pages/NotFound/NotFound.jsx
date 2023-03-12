import React from "react";
import { useNavigate, createSearchParams, Link } from "react-router-dom";
import { Search } from "../../components";

import "./NotFound.css";

export function NotFound() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = React.useState("");

  const searchPrompt = () => {
    navigate({
      pathname: "/search",
      search: `?${createSearchParams({ q: prompt })}`,
    });
  };

  return (
    <div className="searchResult">
      <div className="searchResult__header">
        <Link to="/">
          <div className="results__logo">
            <span className="letter">C</span>
            <span className="letter">h</span>
            <span className="letter">a</span>
            <span className="letter">t</span>
            <span className="letter">G</span>
            <span className="letter">P</span>
            <span className="letter">T</span>
          </div>
        </Link>

        <div className="searchResult__headerBody">
          <Search
            hideButtons
            prompt={prompt}
            setPrompt={setPrompt}
            searchPrompt={searchPrompt}
            searchFlex
          />
        </div>
      </div>

      <div className="searchResult__items">
        <div className="searchResult__item--large">
          <p className="searchResult__itemSnippet--large">
            This page doesn't exist! You can search for something in the search
            input above.
          </p>
        </div>
      </div>
    </div>
  );
}
