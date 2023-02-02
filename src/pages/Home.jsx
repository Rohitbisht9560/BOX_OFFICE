import React from "react";
import MainPageLayout from "../component/MainPageLayout";
import { useState,useEffect } from "react";
import { apiGet } from "../misc/config";
import ShowGrid from "../component/shows/ShowGrid";
import ActorGrid from "../component/actors/ActorGrid";
const Home = () => {
  const [input, setInput] = useState("");
  const [result, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState("shows");
  const isShowsSearch = searchOption === "shows";
  useEffect(()=>{
    console.log('use effect run');
  },[searchOption])
  const onInputChange = (ev) => {
    setInput(ev.target.value);
  };
  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then((result) => {
      setResults(result);
      
    });
  };
  const onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };
  const renderResult = () => {
    if (result && result.length === 0) {
      return <div>NO Result</div>;
    }
    if (result && result.length > 0) {
      return result[0].show
        ? <ShowGrid data={result}/>
        : <ActorGrid data={result}/>
    }
  };
  const onRadioChange = (ev) => {
    setSearchOption(ev.target.value);
  };
  console.log(searchOption);

  return (
    <MainPageLayout>
      <input
        type="text"
        placeholder="Search for something"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <div>
        <label htmlFor="shows-search">
          Shows
          <input
            id="shows-search"
            type="radio"
            value="shows"
            onChange={onRadioChange}
            checked={isShowsSearch}
          />
        </label>
        <label htmlFor="actors-search">
          Actors
          <input
            id="actors-search"
            type="radio"
            value="people"
            onChange={onRadioChange}
            checked={!isShowsSearch}
          />
        </label>
      </div>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResult()}
    </MainPageLayout>
  );
};

export default Home;
