import { Application } from './application';

export interface Handler {
	executeHandler(client: Application, ...args: unknown[]): void;

	settings: {
		enabled: boolean;
	};
}
