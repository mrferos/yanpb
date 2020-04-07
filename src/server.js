import sirv from 'sirv';
import { json } from 'body-parser';
import express from 'express';
import compression from 'compression';
import * as sapper from '@sapper/server';
import expressBasicAuth from 'express-basic-auth';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';

express() // You can also use Express
	.all(/admin.*/, expressBasicAuth({
		challenge: true,
		realm: 'Yet Another Personal Blog',
		users: {
			[process.env.ADMIN_USERNAME]: process.env.ADMIN_PASSWORD
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
