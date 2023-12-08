import React, { useCallback, useMemo, useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
import ListItems from "./list-items";

const App = () => {
  const [renderList, setRenderList] = useState([]);

  const onSearch = async (val) => {
    const response = await axios.get(
      `http://localhost:3000/countries?q=${val}`
    );
    const result = response.data;
    return result;
  };

  const handleCountrySelect = (c) => {
    alert(`Selected Country - ${c}`);
  };
  const debounceSearchWord = useMemo(
    () =>
      debounce(async (val) => {
        const coll = await onSearch(val);
        if (coll.length) {
          const list = coll.map((c, i) => {
            return (
              <div
                className="list-item"
                onClick={() => handleCountrySelect(c)}
                key={i}
              >
                {c}
              </div>
            );
          });
          setRenderList(list);
        }
      }, 500),
    [onSearch]
  );

  const handleChange = useCallback(
    (e) => {
      if (e.target.value.length > 1) debounceSearchWord(e.target.value);
      else setRenderList(<></>);
    },
    [debounceSearchWord]
  );

  return (
    <div className="container">
      <input className="input-query" onChange={handleChange} />
      <div className="list">
        <ListItems list={renderList}></ListItems>
      </div>
    </div>
  );
};

export default App;
