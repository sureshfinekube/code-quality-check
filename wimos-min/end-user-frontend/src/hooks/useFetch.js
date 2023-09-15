import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getAllStoreNfts } from "src/redux/actions/main";
import { useDispatch } from "react-redux";

function useFetch(query, page) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);
  const dispatch = useDispatch()

  const sendQuery = useCallback(async () => {
    console.log('in sendquery',query,page)
    try {
      await setLoading(true);
      await setError(false);
      const res = await axios.get(`http://localhost:8080/v1/nft/get?page=${page}`);
    //   await setList((prev) => [...prev, ...res.data.data]);
      await setList((prev) => {
        return [...new Set([...prev, ...res.data.data])]
      })
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [query, page]);

  useEffect(() => {
    console.log("www",query,page)
    sendQuery(query);
  }, [query, sendQuery, page]);

  useEffect(() => {
    console.log('hlo',loading)
  }, [loading])

  return { loading, error, list };
}

export default useFetch;