import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import BookmarkIcon from "../../../assets/bookmark-icon.svg";
import Active from "../../../assets/active.svg";
import EditIcon from "../../../assets/edit-icon.svg";
import ReminderIcon from "../../../assets/reminder-icon.svg";
import CopyLinkIcon from "../../../assets/copy-link-icon.svg";
import DeleteIcon from "../../../assets/delete-icon.svg";
import MoreMessage from "../../../assets/more-messages-icon.svg";

function AdminMenu() {
	const menu = [
		{ icon: BookmarkIcon, linkText: "Bookmark" },
		{ icon: EditIcon, linkText: "Edit notice" },
		{ icon: ReminderIcon, linkText: "Remind me about this" },
		{ icon: CopyLinkIcon, linkText: "Copy link" },
		{ icon: DeleteIcon, linkText: "Delete notice" },
		{ icon: MoreMessage, linkText: "More message shortcuts..." },
	];

	const AdminMenuStyle = {
		display: "flex",
		alignItems: "center",
	};
	const MenuIconStyle = {
		paddingRight: "10px",
	};

	const [anchorEl, setAnchorEl] = useState(false);
	const open = Boolean(anchorEl);

	const openMenu = (evt) => {
		setAnchorEl(evt.currentTarget);
	};

	const closeMenu = () => {
		setAnchorEl(false);
	};

	return (
		<div>
			<IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={openMenu}>
				<img src={Active} alt="active" />
			</IconButton>
			<Menu
				id="long-menu"
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={closeMenu}
				PaperProps={{
					style: {
						width: "18rem",
					},
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}>
				{menu.map(({ icon, linkText }) => (
					<MenuItem key={linkText} onClick={closeMenu}>
						<div style={AdminMenuStyle}>
							<img src={icon} alt={linkText} style={MenuIconStyle} />
							<span
								style={{
									color: "#999999",
								}}>
								{linkText}
							</span>
						</div>
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}
export default AdminMenu;
