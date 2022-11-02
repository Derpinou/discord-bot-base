import { Client } from 'pg';
import * as fs from 'fs';

interface DatabaseOptions {
    host?: string;
    port?: number;
    user?: string;
    password: string;
    database: string;
}

export class Database {
	private client: Client;
	constructor(options: DatabaseOptions) {
		this.client = new Client({
			host: options.host || 'localhost',
			port: options.port || 5432,
			user: options.user || 'postgres',
			password: options.password,
			database: options.database
		});

		this.client.connect().then(() => {
			console.log('Successfully connected to database as ' + this.client.user);
		});
	}

	public initDB () {
		fs.readFile('src/init.sql', (err, data) => {
			if (err) return console.error(err);
			this.client.query(data.toString()).then(() => {
				console.log('Init database with success');
				process.exit();
			});
		});
	}




}