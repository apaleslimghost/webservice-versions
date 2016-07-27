import fetch from 'node-fetch';
import {send} from 'micro-core';
import url from 'url';

export default function(req, res) {
	const {query} = url.parse(req.url, true);

	return Promise.all(
		[].concat(query.service || []).map(
			async service => {
				const {appVersion} = await (await fetch(`http://${service}/__about`)).json();
				return {service, version: appVersion};
			}
		)
	);
};
