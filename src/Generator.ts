import {Event} from './Event';

export interface Generator {
  createLink(event: Event): string;
}
