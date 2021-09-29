import React, { useState, createContext } from "react";

export const SearchContext = createContext();

export const SearchProvider = (props) => {
	const [searchSuggestions, setSearchSuggestions] = useState([]);
	const [searchingNotice, setSearchingNotice] = useState(false);

	return (
		<SearchContext.Provider value={[searchSuggestions, setSearchSuggestions, searchingNotice, setSearchingNotice]}>
			{props.children}
		</SearchContext.Provider>
	);
};
