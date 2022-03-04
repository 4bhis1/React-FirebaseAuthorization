import axios from "axios";
import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";

import Card from "../Component/Cards";

import "./Search.css";
import { useNavigate } from "react-router-dom";

let arr = [
  "apple",
  "india",
  "phone",
  "computer",
  "html",
  "react",
  "world",
  "russia",
  "nature",
  "mountain",
  "tree",
  "plants",
  "animals",
  "cat",
  "dog",
  "cow",
  "buffalo",
  "ocean",
  "ukraine",
  "web development",
];

const APIkey = "WPrqAtDL8tytBGCu9m4bso_gj4xblNIp_CblnGxvtUs";

let Search = () => {
  let [txt, updateText] = useState("");
  let [image, updateImage] = useState([]);
  let [arr1, updateArary] = useState(arr);
  let [page, updatePage] = useState(1);
  let [suggestvar, updateSuggestvar] = useState([]);

  let [warningStyle, updateWarningStyle] = useState({ display: "none" });
  let [warningtext, updateWarningText] = useState("");

  let Suggest = (e) => {
    updateWarningStyle({ display: "none" });
    let k = e.target.value;
    updateText(k);

    suggestvar = [];
    updateSuggestvar(suggestvar);

    for (let i of arr1) {
      if (i.toLowerCase().includes(k.toLowerCase())) {
        suggestvar.push(i);
      }
      updateSuggestvar(suggestvar);
    }

    if (("" + k).length < 1) {
      suggestvar = [];
      updateSuggestvar(suggestvar);
    }
  };

  let search = (e) => {
    e.preventDefault();
    if (!arr.includes(txt)) {
      arr1 = arr.concat(txt.toLowerCase());
      updateArary(arr1);
    }

    image = [];
    updateImage(image);

    getData();

    let k = document.getElementById("listdiv");
    k.style = { display: "none" };

    suggestvar = [];
    updateSuggestvar(suggestvar);
  };

  async function getData() {
    let url = `https://api.unsplash.com/search/photos?page=${page}&query=${txt}&client_id=${APIkey}`;
    let y = await axios.get(url);

    if (y.data.results.length === 0) {
      updateWarningStyle({ display: "flex" });
      updateWarningText("No images");
    }

    image = image.concat(y.data.results);
    updateImage(image);
  }

  let add = () => {
    page++;
    updatePage(page);
    getData();
  };

  let navigate = useNavigate();
  useEffect(() => {
    let autoToken = sessionStorage.getItem("Auth Token");

    if (!autoToken) {
      navigate("/");
    }

    let k = document.getElementById("listdiv");
    k.style = { display: "none" };
  });

  window.onscroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      add();
    }
  }, 100);

  let close = () => {
    updateWarningStyle({ display: "none" });
  };

  return (
    <div className="mainbody">
      <div className="warning" style={warningStyle}>
        {warningtext}
        <div className="close" onClick={close}>
          x
        </div>
      </div>
      <div className="mainHeadingPro">
        <form onSubmit={search} className="mainHeading">
          <div style={{ display: "flex" }}>
            <input
              type="text"
              id="search"
              onChange={Suggest}
              value={txt}
              placeholder="Search..."
              autoComplete="off"
            />
            <input type="submit" />
          </div>
          <div className="list" id="listdiv">
            {suggestvar.map((x) => {
              return (
                <div className="listItem" onClick={console.log()}>
                  {x}
                </div>
              );
            })}
          </div>
        </form>
      </div>

      <div className="mainContainer">
        {image.map((x) => {
          return (
            <Card
              src={x.urls.regular}
              height={x.height / 10 + "px"}
              width={x.width / 10 + "px"}
              description={x.alt_description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Search;
