import { connection, connect, set, ConnectionOptions, Connection } from 'mongoose';

let _conn: Connection | null;

export interface createConnectionParams {
	databaseUrl: string;
	poolSize: number;
	enviroment?: string;
	printSqlQueries?: boolean;
}

export const createConnection = async ({ databaseUrl, poolSize, enviroment = 'development', printSqlQueries = false }: createConnectionParams) => {
	if (printSqlQueries) {
		set('debug', enviroment === 'development');
	}
	const options: ConnectionOptions = {
		autoIndex: false,
		family: 4,
		keepAlive: true,
		keepAliveInitialDelay: 300000,
		maxStalenessSeconds: 90,
		poolSize: poolSize,
		promiseLibrary: Promise,
		readPreference: 'secondaryPreferred',
		socketTimeoutMS: 30000,
		useCreateIndex: true,
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	if (_conn) {
		return _conn;
	}

	// eslint-disable-next-line @typescript-eslint/no-floating-promises
	return new Promise<Connection | null>((resolve) => {
		connection.on('connecting', () => console.log(`MONGODB CONNECTING: ${enviroment}`));
		connection.on('connected', () => {
			console.log(`MONGODB CONNECTED: ${enviroment}`);
			resolve(connection);
		});
		connection.on('open', () => console.log(`MONGODB OPENED: ${enviroment}`));
		connection.on('reconnected', () => console.log(`MONGODB RECONNECTED: ${enviroment}`));
		connection.on('timeout', () => console.log(`MONGODB TIMEOUT: ${enviroment}`));
		connection.on('disconnected', () => console.log(`MONGODB DISCONNECTED: ${enviroment}`));
		connection.on('close', () => console.log(`MONGODB CLOSED: ${enviroment}`));
		connection.on('error', (err) => console.log(`MONGODB ERROR: ${enviroment}`, err));
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		connect(String(databaseUrl), options);
	});
};

export * from './schemas';
