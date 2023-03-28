export abstract class StringHelper {
	public static clearPunctuation(value: string): string {
		const regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
		return value.replace(regex, '');
	}
}
