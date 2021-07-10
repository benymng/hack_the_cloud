import { useEffect, useState } from "react";

import useRecipeSearch from "../../hooks/useRecipeSearch";

import Loading from "../../components/Loading";

const Search = (props) => {
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const { search } = useRecipeSearch();

  const searchField = props.location.state?.searchField;

  useEffect(() => {
    search(searchField, (results) => {
      setLoading(false);
      setSearchResults(results);
    });
  }, [searchField]);

  if (!searchField) props.history.push("/");

  if (loading) return <Loading />;

  return <div>{JSON.stringify(searchResults, null, 2)}</div>;
};

export default Search;
