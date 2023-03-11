import React from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Search } from "../../components";

import "./Results.css";

export function Results() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchedPrompt, setSearchedPrompt] = React.useState("");

  const [loading, setLoading] = React.useState(true);
  const [openAIData, setOpenAIData] = React.useState(undefined);
  const [chatGPTMessages, setChatGPTMessages] = React.useState(undefined);

  const searchPrompt = (e) => {
    e.preventDefault();
    setOpenAIData(undefined);

    if (searchParams.get("q") === searchedPrompt) {
      navigate(0);
    } else {
      setSearchParams({ q: searchedPrompt });
    }
  };

  React.useEffect(() => {
    const prompt = searchParams.get("q");
    setOpenAIData(undefined);
    setSearchedPrompt(prompt);

    const sendPrompt = async () => {
      try {
        setLoading(true);

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        };

        const res = await fetch("/api/ask", requestOptions);

        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        const { data, messages } = await res.json();

        setChatGPTMessages(messages);
        if (data) {
          setOpenAIData(openAIData ? [...openAIData, data] : [data]);
        } else {
          setOpenAIData(null);
        }
      } catch (err) {
        console.error(err, "err");
      } finally {
        setLoading(false);
      }
    };

    sendPrompt();
  }, [searchParams]);

  React.useEffect(() => {
    const prompt = searchParams.get("q");
    if (openAIData && openAIData.length < 6) {
      const sendPrompt = async () => {
        try {
          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt, messages: chatGPTMessages }),
          };

          const res = await fetch("/api/ask", requestOptions);

          if (!res.ok) {
            throw new Error("Something went wrong");
          }

          const { data } = await res.json();
          setOpenAIData(openAIData ? [...openAIData, data] : [data]);
        } catch (err) {
          console.log(err, "err");
        }
      };
      sendPrompt();
    }
  }, [openAIData]);

  if (loading) {
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
              prompt={searchedPrompt}
              searchFlex
              loading={loading}
            />
          </div>
        </div>

        <div className="searchResult__items">
          <div className="searchResult__itemsCount">
            <span className="searchResult__loading-spinner" />
          </div>
        </div>
      </div>
    );
  }

  if (
    openAIData == null ||
    (openAIData && openAIData[0].title == null) ||
    (openAIData && openAIData[0].link == null) ||
    (openAIData && openAIData[0].description == null)
  ) {
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
              prompt={searchedPrompt}
              setPrompt={setSearchedPrompt}
              searchPrompt={searchPrompt}
              searchFlex
            />
          </div>
        </div>

        <div className="searchResult__items">
          <div className="searchResult__item--large">
            <p className="searchResult__itemSnippet--large">
              Ah sorry! We weren't able to get the results in the format you
              were looking for. Try again and search with a more specific
              question or topic.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (openAIData && openAIData.length) {
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
              prompt={searchedPrompt}
              setPrompt={setSearchedPrompt}
              searchPrompt={searchPrompt}
              searchFlex
            />
          </div>
        </div>

        <div className="searchResult__items">
          <div className="searchResult__itemsCount">
            {openAIData.length < 6 ? (
              <>
                <span className="searchResult__loading-spinner" />
                <span>Loading more responses...</span>
              </>
            ) : (
              <span>🤖 {openAIData.length} responses</span>
            )}
          </div>

          <div className="searchResult__item--large">
            <p className="searchResult__itemSnippet--large">
              {openAIData[0].description}
            </p>

            <a
              href={openAIData[0].link}
              target="_blank"
              className="searchResult__itemLink"
            >
              {openAIData[0].link}
              <ArrowDropDownIcon />
            </a>

            <a
              href={openAIData[0].link}
              target="_blank"
              className="searchResult__itemTitle"
            >
              <h2>{openAIData[0].title}</h2>
            </a>
          </div>

          {openAIData.slice(1).map((item) => (
            <div className="searchResult__item" key={item.formattedUrl}>
              <a
                href={item.link}
                target="_blank"
                className="searchResult__itemLink"
              >
                {item.link}
                <ArrowDropDownIcon />
              </a>

              <a
                href={item.link}
                target="_blank"
                className="searchResult__itemTitle"
              >
                <h2>{item.title}</h2>
              </a>

              <p className="searchResult__itemSnippet">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
