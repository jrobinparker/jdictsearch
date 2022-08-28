import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import cheerio from "cheerio";
import gsap from "gsap";
import Search from "./components/Search";
import Results from "./components/Results";
import NoResults from "./components/NoResults";
import Background from "./components/Background";
import Header from "./components/Header";
import "./App.css";

const App = () => {
  const [weblio, setWeblio] = useState("");
  const [eiNavi, setEiNavi] = useState("");
  const [eijiro, setEijiro] = useState("");
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState("inactive");
  const [renderStatus, setRenderStatus] = useState(false);
  const [failedStatus, setFailedStatus] = useState(false);

  const onTermSubmit = async (searchTerm) => {
    setLoading("loading");
    setTerm(searchTerm);
    await weblioSearch(searchTerm);
    await eiNaviSearch(searchTerm);
    await eijiroSearch(searchTerm);
  };

  useEffect(() => {
    if (weblio.length > 1) {
      setLoading("loaded");
    }
  }, [weblio]);

  const weblioSearch = async (searchTerm) => {
    try {
      const req = axios.get(
        `https://pure-coast-05369.herokuapp.com/https://ejje.weblio.jp/content/${searchTerm}`
      );
      const res = await req;
      const $ = cheerio.load(res.data);
      const result1Data = $(".content-explanation.ej").text();
      setWeblio(result1Data);
      setFailedStatus(false);
    } catch (error) {
      setFailedStatus(true);
    }
  };

  const eiNaviSearch = async (searchTerm) => {
    try {
      const req = axios.get(
        `https://pure-coast-05369.herokuapp.com/https://www.ei-navi.jp/dictionary/content/${searchTerm}/`
      );
      const res = await req;
      const $ = cheerio.load(res.data);
      const result2Data = $(
        ".main .container .summary .list-group .list-group-item .list-group-item-text"
      )
        .children()
        .text();
      setEiNavi(result2Data);
      setFailedStatus(false);
    } catch (error) {
      setFailedStatus(true);
    }
  };

  const eijiroSearch = async (searchTerm) => {
    try {
      const req = axios.get(
        `https://pure-coast-05369.herokuapp.com/https://eow.alc.co.jp/search?q=${searchTerm}&ref=sa`
      );
      const res = await req;
      const $ = cheerio.load(res.data);
      const result3Data = $("ul li div ul li, #resultsList")
        .children()
        .slice(2, 4)
        .text();
      setEijiro(result3Data);
      setRenderStatus(true);
      setFailedStatus(false);
    } catch (error) {
      setFailedStatus(true);
    }
  };

  const handleReload = () => {
    const result1 = document.querySelectorAll(".result")[0];
    const result2 = document.querySelectorAll(".result")[1];
    const result3 = document.querySelectorAll(".result")[2];
    const noResults = document.querySelector(".no-results");
    const tl = gsap.timeline();

    tl.to(result1, 0.25, { opacity: 0, y: 5 })
      .to(result2, 0.25, { opacity: 0, y: 5 })
      .to(result3, 0.25, { opacity: 0, y: 5 })
      .to(noResults, 0.25, { opacity: 0, y: 5 });

    setTimeout(() => {
      setWeblio("");
      setEiNavi("");
      setEijiro("");
      setTerm("");
      setLoading("inactive");
      setRenderStatus(false);
      setFailedStatus(false);
    }, 1000);
  };

  const resultAnimation = () => {
    const result1 = document.querySelectorAll(".result")[0];
    const result2 = document.querySelectorAll(".result")[1];
    const result3 = document.querySelectorAll(".result")[2];
    const tl = gsap.timeline();

    tl.to(result1, 0.25, { delay: 1, opacity: 1, y: -5 })
      .to(result2, 0.25, { delay: 1, opacity: 1, y: -5 })
      .to(result3, 0.25, { delay: 1, opacity: 1, y: -5 });
  };

  return (
    <div className="container">
      <Background />
      <div className="ui">
        <Header />
        <Search
          onTermSubmit={onTermSubmit}
          handleReload={handleReload}
          loading={loading}
        />
        <div className="row">
          {renderStatus && !failedStatus ? (
            <Fragment>
              <Results
                weblio={weblio}
                eiNavi={eiNavi}
                eijiro={eijiro}
                term={term}
                showResults={resultAnimation}
                loading={loading}
              />
            </Fragment>
          ) : renderStatus && failedStatus ? (
            <NoResults />
          ) : (
            <Fragment></Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
