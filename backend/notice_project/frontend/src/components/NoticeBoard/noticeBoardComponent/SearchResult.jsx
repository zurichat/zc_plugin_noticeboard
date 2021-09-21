import React from "react";
import { useHistory } from "react-router-dom";
// import UserNoticeModal from "./UserNoticeModal";
import Button from "@material-ui/core/Button";
import UserMenu from "./UserMenu/UserMenu";
import "./SearchResult.css";

function SearchResult() {
	const history = useHistory();
	const user = history.location.state.searchData;

	console.log(user);

	// const OpenModal = (event) => {
	// 	const clickedButton = event.currentTarget.getAttribute("id");
	// 	const modal_id = `modal_${clickedButton}`;
	// 	document.getElementById(modal_id).style.display = "block";
	// };

	return (
		<div className="user-notice" id="user-notice">
			<div className="notice-heading">
				<p>Notices</p>
			</div>

			<div className="user-notice-post">
				{user.map((item, id) => (
					<div key={id}>
						<div className="user-notice-card">
							<div className="card-top">
								<div className="avatar-grp">
									<div className="avatar">
										<img
											src={
												"data:image/png;base64,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"
											}
											alt="avatar"
										/>
									</div>
								</div>
								<div className="info-icon">
									<UserMenu />
								</div>
							</div>
							<div className="card-body">
								<div className="notice-title">{item.title}</div>
								<div className="notice-message">{item.message.substring(0, 120)}...</div>
							</div>

							<div className="card-buttons-grp">
								<div>
									<Button className="view-btn MuiButtonBase-root" id={user.id} variant="outlined" onClick={(event) => OpenModal(event)}>
										View notice
									</Button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			{/* <UserNoticeModal user={user} /> */}
		</div>
	);
}

export default SearchResult;
