import React from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { Search } from "../../components";
import Drawer from "@material-ui/core/Drawer";
import "./Home.css";

export function Home() {
  const navigate = useNavigate();
  const [drawer, setDrawer] = React.useState(false);
  const [prompt, setPrompt] = React.useState("");

  const searchPrompt = () => {
    navigate({
      pathname: "/search",
      search: `?${createSearchParams({ q: prompt })}`,
    });
  };

  return (
    <div className="home">
      <div className="home__header"></div>

      <div className="home__body">
        <div className="home__logo">
          <span className="letter">C</span>
          <span className="letter">h</span>
          <span className="letter">a</span>
          <span className="letter">t</span>
          <span className="letter">G</span>
          <span className="letter">P</span>
          <span className="letter">T</span>
        </div>
        <div className="home__inputContainer">
          <Search
            prompt={prompt}
            setPrompt={setPrompt}
            searchPrompt={searchPrompt}
            setDrawer={setDrawer}
          />
        </div>
      </div>
      <Drawer open={drawer} anchor="right" onClose={() => setDrawer(false)}>
        <div className="drawer">
          <h2>Notes:</h2>
          <p>
            This is a hobby app that uses OpenAI's new{" "}
            <a
              href="https://platform.openai.com/docs/api-reference/chat"
              target="_blank"
            >
              /chat/completions/
            </a>{" "}
            API (i.e. the ChatGPT API) to return a list of results that looks
            like it was searched from a search engine. At the moment, I limit
            the total number of results being returned for a single search to 6
            results.
          </p>
          <p>
            You can find how I engineer the prompt{" "}
            <a
              href="https://github.com/djirdehh/google-search-openai-backend"
              target="_blank"
            >
              here
            </a>
            . Here is source code for the{" "}
            <a
              href="https://github.com/djirdehh/google-search-openai-frontend"
              target="_blank"
            >
              front-end
            </a>
            .
          </p>
          <p>
            The links that are being returned don't consistently work. As a
            language model, it sometimes is able to piece together links that
            work and are relevant but a lot of the time it produces links that
            look like they work but don't. The links work better if you search
            for things that are more popular and known (e.g.{" "}
            <b>"Who is Bill Gates?"</b>) as opposed to searching for things less
            known (e.g. <b>"Who is Hassan Djirdeh"</b>).
          </p>
          <p>
            Why did I build this? I wanted to see how well OpenAI can return
            information that resemble results that have been searched through a
            search engine so I spun this up to find out. The app did not perform
            well when using <b>text-davinci-003</b> but with{" "}
            <b>gpt-3.5-turbo</b>, it performs much much better.
          </p>
          <p>
            If you're interested in an introductory tutorial series on how to
            interact with OpenAI's /completions API with Node.js & React, I've
            done a bit of writing on it on{" "}
            <a
              href="https://newsletter.frontendfresh.com/archive/"
              target="_blank"
            >
              newsletter.frontendfresh.com
            </a>
            .
          </p>
          <p>
            Have any questions, thoughts, or opinions? Tweet me{" "}
            <a href="https://twitter.com/djirdehh" target="_blank">
              @djirdehh
            </a>{" "}
            or email me @ hassan.djirdeh@gmail.com.
          </p>
        </div>
      </Drawer>

      <div className="social">
        <a href="https://twitter.com/djirdehh" target="_blank">
          <img src="https://img.icons8.com/fluency/512/twitter.png" />
        </a>
      </div>
    </div>
  );
}
