import * as moment from 'moment';

export class DateUtil {
    static getFormat(locale: string): string {
        let format = 'MM/DD/YYYY';

        if (locale == 'pt') {
            format = 'DD/MM/YYYY'
        }

        return format;
    }

    static getISOFromString(date: string, locale: string) {
        return moment(date, this.getFormat(locale)).toISOString();
    }

    static getStringFromISO(date: string, locale: string) {
        return moment(date, 'YYYY-MM-DDTHH:mm:ss').format(this.getFormat(locale))
    }
}