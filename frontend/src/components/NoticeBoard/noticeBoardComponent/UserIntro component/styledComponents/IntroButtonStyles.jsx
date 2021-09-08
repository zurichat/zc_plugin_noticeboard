import styled, { css } from "styled-components";

export const IntroButtonStyles = styled.button`
	background: var(--accent-color) !important;
 	color: var(--button-color) !important;
	font-weight: bold;
	padding: 10px, 24px;
	width: 377px;
	height: 56px;
	text-transform: capitalize;
	font-size: 16px;
	margin-top: 40px !important;
	margin-bottom: 125px;
 	border: none;
 	outline: none;
	cursor: pointer;
 img {
   display: none;
   }

	@media screen and (max-width: 500px) {
		width: 167px;
		height: 53px;
		left: 87.5px;
		background: #00bb7c;
		border-radius: 3px;
		margin-bottom: 197.54px !important;
		margin-top: 0px;

  img {
    display: inline-block;
    width: fit-content;
    margin-left: 16px;
   }
	}
`;
