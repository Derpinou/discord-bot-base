import { Database } from './Classes/Database';
import * as dotenv from 'dotenv';

import { envConf } from './Types/global';

const config: envConf = dotenv.config().parsed as unknown as envConf;


const db = new Database({
	host: config.PG_HOST,
	password: config.PG_PASS,
	database: config.PG_DB,
});

db.initDB();