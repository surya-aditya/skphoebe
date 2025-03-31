export function Router(newUrl) {
	const _app = _A;

	const newPageRoute = _app.config.routes[newUrl];
	const oldRoute = _app.route.new;
	const prevRoute = _app.route.old;

	_app.route.old = oldRoute;
	_app.route.new = {
		url: newUrl,
		page: newPageRoute,
	};

	_app.is[oldRoute.page] = false;
	_app.is[newPageRoute] = true;

	if (prevRoute.page) _app.was[prevRoute.page] = false;

	_app.was[oldRoute.page] = true;
}
