import {Event} from '../Event';
import {Generator} from './Generator';

export class MultiGenerator {
	private generators: Record<string, Generator>;

	constructor(generators: Record<string, Generator>) {
		this.generators = generators;
	}

	public createLinks(event: Event): Record<string, string>;
	public createLinks(event: Event, asArray: false): Record<string, string>;
	public createLinks(event: Event, asArray: true): [string, string][];
	public createLinks(event: Event, asArray?: boolean) {
		const links: Record<string, string> = {};

		Object.keys(this.generators).forEach((key) => {
			links[key] = this.generators[key].createLink(event);
		});

		if (!asArray) {
			return links;
		}

		return Object.keys(links).map((key) => {
			return [key, links[key]];
		});
	}
}
