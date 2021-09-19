import React from "react";
import { useHistory } from "react-router-dom";
import "./SearchResult.css";

function SearchResult() {
	const history = useHistory();
	const data = history.location.state.searchData;
	console.log(data);

	return (
		<div className="outer-div">
			{data.map((item, id) => (
				<div className="inner-cards" key={id}>
					<p>{item.title}</p>
					<p>{item.message}</p>
					<p>{item.created}</p>
				</div>
			))}
		</div>
	);
}

export default SearchResult;
