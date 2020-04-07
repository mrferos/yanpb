import sirv from 'sirv';
import { json } from 'body-parser';
import { getCredentialMap, comparePasswords } from './lib/users';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import expressBasicAuth from 'express-basic-auth';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

const main = async () => {
	const credentialsMap = await getCredentialMap();

	express() // You can also use Express
		.all(/admin.*/, expressBasicAuth({
			challenge: true,
			realm: 'Yet Another Personal Blog',
			users: credentialsMap,
			authorizer: (username, password) => {
				const lookupPassword = credentialsMap[username];
				if (!lookupPassword) {
					return false;
				}

				return comparePasswords(password, lookupPassword);
			}
		}))
		.use(json())
		.use(
			compression({ threshold: 0 }),
			sirv('static', { dev }),
			sapper.middleware()
		)
		.listen(PORT, err => {
			if (err) console.log('error', err);
		});
};


main();
