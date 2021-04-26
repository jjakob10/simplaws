import { useState, useEffect } from "react";

// const CONTEXT_KEY = "3b7d248ed38f2a460";

const useGoogleSearch = (term) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      fetch(`https://simplaws.herokuapp.com/search?term=${term}`)
        .then((response) => response.json())
        .then((result) => {
          console.log(result.resp);
          setData(result.resp);
        });
    };
    fetchData();
  }, [term]);
  return { data };
};

export default useGoogleSearch;
