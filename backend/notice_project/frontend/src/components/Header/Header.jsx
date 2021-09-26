import React, { useState, useEffect, useContext } from "react";
import "./Header.css";
import axios from "axios";
import profileIcon from "./images/profile_icon_img_x2.png";
import SearchResult from "../NoticeBoard/noticeBoardComponent/SearchResult";
import { SearchContext } from "../../noticeContext";

const Header = () => {
	const api = axios.create({
		baseURL: "https://noticeboard.zuri.chat/api/v1",
	});

	// For Searching On Change
	const [searchText, setSearchText] = useState("");
	const [searchResult, setSearchResult] = useState([]);
	const [searchSuggestions, setSearchSuggestions] = useContext(SearchContext);
	const [searchingNotice, setSearchingNotice] = useContext(SearchContext);
	const org_id = "614679ee1a5607b13c00bcb7";

	// useEffect(() => {
	// 	const loadNotices = async () => {
	// 		const response = await api.get(`/organisation/${org_id}/notices`);
	// 		setSearchResult(response.data.data);
	// 	};
	// 	loadNotices();
	// }, [searchResult]);

	const onChangeHandler = (targetText) => {
		setSearchText(targetText);

		let matches = [];
		if (searchText.length > 0) {
			matches = searchResult.filter((result) => {
				setSearchingNotice(true);
				const regex = new RegExp(`${searchText}`, "gi");
				return result.title.match(regex) + result.message.match(regex);
			});

			setSearchSuggestions(matches);
		} else if (searchText.length == 0) {
			setSearchingNotice(false);
			setSearchSuggestions([]);
		}
		console.log(matches);
	};

	return (
		<header className="header">
			<div className="header__wraps">
				<form className="header__form">
					<div className="header__search-icon">
						<svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M7.875 13.5C10.9816 13.5 13.5 10.9816 13.5 7.875C13.5 4.7684 10.9816 2.25 7.875 2.25C4.7684 2.25 2.25 4.7684 2.25 7.875C2.25 10.9816 4.7684 13.5 7.875 13.5Z"
								stroke="#333333"
								strokeWidth="1.22693"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path d="M15.7496 15.75L11.8496 11.85" stroke="#333333" strokeWidth="1.22693" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</div>
					<input
						className="header__form-input"
						type="text"
						onChange={(e) => onChangeHandler(e.target.value)}
						value={searchText}
						placeholder="Search your workspace"
					/>
				</form>
			</div>
		</header>
	);
};

export default Header;
