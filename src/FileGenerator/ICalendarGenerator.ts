import { Event } from '../Event';
import { Generator } from '../Generator';

export class ICalendarGenerator implements Generator {
  createLink(event: Event): string {
    throw new Error('Method not implemented.');
  }
}
