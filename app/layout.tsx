import { NEXStatus } from '@/components/NEXStatus';
import NavigationBar from '@/components/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata = {
	title: 'Pretendo MK8',
	description: 'Pretendo Mario Kart 8 website',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body>
				<div>
					<NavigationBar />
					<div className="mt-0 container-fluid d-flex justify-content-center">
						{children}
					</div>
				</div>
				<NEXStatus />
			</body>
		</html>
	)
}
