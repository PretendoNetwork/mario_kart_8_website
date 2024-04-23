import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export interface StaticPopoverProps {
	title: string | JSX.Element;
	body: string | JSX.Element;
	align_center?: boolean;
}

export const StaticToast: React.FC<StaticPopoverProps> = ({ title, body, align_center }) => {
	const [showSecondToast, setShowSecondToast] = useState(true);

	return (
		<>
			<ToastContainer className={"p-3" + (align_center ? " text-center" : "")} position="bottom-end" style={{ zIndex: 1, position: "fixed" }}>
				<Toast show={showSecondToast} onClose={() => setShowSecondToast(false)} style={{ zIndex: "initial" }}>
					<Toast.Header>
						<strong>🟠 Temporary reminder</strong>
					</Toast.Header>
					<Toast.Body>
						<p>
							These errors <strong>are not linked to MK8:</strong>
						</p>
						<li>101-xxxx are linked to the Friend server</li>
						<li>118-xxxx are linked to P2P (PIA)</li>
					</Toast.Body>
				</Toast>
				<Toast>
					<Toast.Header closeButton={false}>{title}</Toast.Header>
					<Toast.Body>{body}</Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	);
};
