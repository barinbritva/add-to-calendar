import {Outlook} from './UrlGenerator/Outlook';
import {Event} from './Event';
import { ICalendarGenerator } from './FileGenerator/ICalendarGenerator';
import { Office365 } from './UrlGenerator/Office365';
import { Google } from './UrlGenerator/Google';
import { Yahoo } from './UrlGenerator/Yahoo';

// const date1 = new Date(2021, 0, 1, 0, 0, 0, 0);
// const date2 = new Date(Date.UTC(2021, 0, 1, 0, 0, 0, 0));
// const date3 = new Date(Date.parse('2021-01-01T00:00:00.000+02:15'));


const event = new Event('Test', new Date(2021, 5, 18, 22, 5), new Date(2021, 5, 18, 22, 9), 'Here is the link: https://bing.com?q=skype. ;');
// const event = new Event('Test', new Date(2021, 5, 18, 0, 10));
const link = new Outlook().createLink(event);
const link365 = new Office365().createLink(event);
const gLink = new Google().createLink(event);
const yEvent = new Yahoo().createLink(event);
const vLink = new ICalendarGenerator().createLink(event);


console.log(yEvent, gLink, link);
