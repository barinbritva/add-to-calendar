import {OutlookGenerator} from './OutlookGenerator';
import {Event} from './Event';

// 2021-06-18T20:15:00+00:00

// const event = new Event('Test', new Date(2021, 5, 18, 22, 5), new Date(2021, 5, 18, 22, 9));
const event = new Event('Test', new Date(2021, 5, 18));
const link = new OutlookGenerator(event).createLink();


console.log(link);
