import { useEffect, useState } from "react";

export const useFetch = ({ url, config }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url, { ...config })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) setError(true);
        else setData(data);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .finally(setLoading(false));
  }, []);

  return { data, loading, error };
};
