import knex from 'knex';
import Tables from './tables';

export const database = knex({
	client: 'mysql2',
	connection: {
		host: process.env.SQL_HOST,
		port: parseInt(process.env.SQL_PORT!),
		user: process.env.SQL_USER,
		password: process.env.SQL_PASS,
		database: process.env.SQL_HINT,
	},
});

export default function aquireDatabase<TableName extends keyof Tables & string>(
	name: TableName
) {
	return database<Tables[TableName]>(name);
}
