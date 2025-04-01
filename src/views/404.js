export const template = (data) => {
	return html`
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>CHAMP — 404 Not Found</title>
				<style>
					${data.preCSS}
				</style>
			</head>
			<body>
				<div id="_404">
					<a href="/">Return to Home</a>
				</div>
			</body>
		</html>
	`;
};
