import {OutlookGenerator} from './UrlGenerator/OutlookGenerator';
import {Event} from './Event';

console.log(new Date(2021, 5, 18, 22, 5).toISOString());
console.log(new Date(2021, 5, 18, 22, 5).toJSON());
console.log(new Date(2021, 5, 18, 22, 5).toUTCString());
const event = new Event('Test', new Date(2021, 5, 18, 22, 5), new Date(2021, 5, 18, 22, 9));
// const event = new Event('Test', new Date(2021, 5, 18, 0, 10));
const link = new OutlookGenerator().createLink(event);


console.log(link);
