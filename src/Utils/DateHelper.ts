export abstract class DateHelper {
	public static dateToDateString(date: Date): string {
		const year = date.getFullYear();
		const month = DateHelper.addLeadingZeroIfNeeded(date.getMonth() + 1);
		const day = DateHelper.addLeadingZeroIfNeeded(date.getDate());

		return `${year}-${month}-${day}`;
	}

	public static dateToDateTimeString(date: Date): string {
		const year = date.getUTCFullYear();
		const month = DateHelper.addLeadingZeroIfNeeded(date.getUTCMonth() + 1);
		const day = DateHelper.addLeadingZeroIfNeeded(date.getUTCDate());
		const hours = DateHelper.addLeadingZeroIfNeeded(date.getUTCHours());
		const minutes = DateHelper.addLeadingZeroIfNeeded(date.getUTCMinutes());
		const seconds = DateHelper.addLeadingZeroIfNeeded(date.getUTCSeconds());

		return `${year}-${month}-${day}` + `T${hours}:${minutes}:${seconds}Z`;
	}

	public static cloneDate(date: Date): Date {
		return new Date(date.getTime());
	}

	private static addLeadingZeroIfNeeded(value: number): string {
		return value > 9 ? String(value) : '0' + value;
	}
}
