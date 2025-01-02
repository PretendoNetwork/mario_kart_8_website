import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export interface StaticPopoverProps {
	title: string | JSX.Element;
	body: string | JSX.Element;
	align_center?: boolean;
}

export const StaticToast: React.FC<StaticPopoverProps> = ({ title, body, align_center }) => {
	return (
		<>
			<ToastContainer className={"p-3" + (align_center ? " text-center" : "")} position="bottom-end" style={{ zIndex: 1, position: "fixed" }}>
				<Toast>
					<Toast.Header closeButton={false}>{title}</Toast.Header>
					<Toast.Body>{body}</Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	);
};
