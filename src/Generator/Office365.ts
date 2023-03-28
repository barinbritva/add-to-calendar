import {Outlook} from './Outlook';

export class Office365 extends Outlook {
	protected urlBase = 'https://outlook.office.com/calendar/0/deeplink/compose';
}
