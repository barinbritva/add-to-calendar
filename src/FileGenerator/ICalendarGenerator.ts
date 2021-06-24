import { Event } from '../Event';
import { Generator } from '../Generator';

export interface DataPiece {
  key: string;
  value: string | undefined;
}

export class ICalendarGenerator implements Generator {
  public createLink(event: Event): string {
    const eventData = this.convertEventToData(event);   

    return this.convertEventDataToFileContent(eventData);
  }

  private convertEventToData(event: Event): DataPiece[] {
    return [
      {
        key: "BEGIN",
        value: "VCALENDAR"
      },
      {
        key: "VERSION",
        value: "2.0"
      },
      {
        key: "BEGIN",
        value: "VEVENT"
      },
      {
        key: "DTSTART",
        value: event.getStartDateAsString()
      },
      {
        key: "DTEND",
        value: event.getEndDateAsString()
      },
      {
        key: "SUMMARY",
        value: this.escapeSpecialChars(event.title)
      },
      {
        key: "DESCRIPTION",
        value: this.escapeSpecialChars(event.description)
      },
      {
        key: "LOCATION",
        value: this.escapeSpecialChars(event.location)
      },
      {
        key: "END",
        value: "VEVENT"
      },
      {
        key: "END",
        value: "VCALENDAR"
      }
    ];
  }

  private escapeSpecialChars(text?: string): string | undefined {
    if (text == null) {
      return text;
    }

    return text
    .replace(/,/gm, ",")
    .replace(/;/gm, ";")
    .replace(/\n/gm, "\\n")
    .replace(/(\\n)[\s\t]+/gm, "\\n");
  }

  private convertEventDataToFileContent(data: DataPiece[]): string {
    let fileParts: string[] = [];

    for (const key in data) {
      const dataItem = data[key];

      if (dataItem.value == null) {
        continue;
      }

      fileParts.push(`${dataItem.key}:${encodeURIComponent(dataItem.value)}`);
    }

    return `data:text/calendar;charset=utf8,${fileParts.join('\n')}`;
  }
}
