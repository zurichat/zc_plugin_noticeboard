import React from "react";

import see from "../../../assets/Seen.svg";
// import active from "../../../assets/active.svg";
import dot from "../../../assets/Ellipse135.svg";

import { Button } from "@material-ui/core";
import AdminMenu from "./AdminNoticeMenu";
import ViewNoticeModal from "../ViewNoticeCardModal/ViewNoticeModal";

const Card = ({ person }) => {
  const [openModal, setOpenModal] = React.useState(false)
	// console.log(person)

	return (
		<div>
			<article className="card">
				<div className="card-header">
					<div className="profile">
						<div className="img-profile-container">
							<img className="profile-pic" src={person.userImage} alt="profile-pic" />
						</div>
						<div className="identity">
							<h6 className="name">{person.userName}</h6>
							<p className="time-date">
								{person.date}{" "}
								<span>
									<img src={dot} alt="" />
								</span>{" "}
								{person.timeStamp}
							</p>
						</div>
					</div>
					<AdminMenu />
				</div>
				{/* body of card */}
				<div className="card-body">
					<h5 className="card-title">{person.title}</h5>
					<p className="card-info">{person.info.substring(0, 150)}...</p>
				</div>
				{/* icons tray */}
				<div className="icon-button-tray">
					<div className="icon-tray">
						<div>
							<img src={see} alt="" />
							<p className="number">{person.views}</p>
						</div>
					</div>
					<Button className="card-button" variant="outlined" color="primary" onClick={() => {setOpenModal(true)}}>
						View Notice
					</Button>
				</div>
			</article>

      {openModal &&<ViewNoticeModal />}
		</div>
	);
};

export default Card;
