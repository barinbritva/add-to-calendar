import {OutlookGenerator} from './UrlGenerator/OutlookGenerator';
import {Event} from './Event';
import { ICalendarGenerator } from './FileGenerator/ICalendarGenerator';

// const date1 = new Date(2021, 0, 1, 0, 0, 0, 0);
// const date2 = new Date(Date.UTC(2021, 0, 1, 0, 0, 0, 0));
// const date3 = new Date(Date.parse('2021-01-01T00:00:00.000+02:15'));


const event = new Event('Test', new Date(2021, 5, 18, 22, 5), new Date(2021, 5, 18, 22, 9), 'Here is the link: https://bing.com?q=skype. ;');
// const event = new Event('Test', new Date(2021, 5, 18, 0, 10));
const link = new OutlookGenerator().createLink(event);
const vLink = new ICalendarGenerator().createLink(event);


console.log(link, '\n', vLink);
