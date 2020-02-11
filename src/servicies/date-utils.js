const moment = require('moment');
require('moment/locale/es');
const ISO_FORMAT_ONLY_YEAR = 'YYYY';
const ISO_FORMAT = 'YYYY-MM-DD';
const ISO_FORMAT_WITH_HOUR_AND_MINUTES = 'YYYY-MM-DD HH:mm';

// Default locale:
let locale = 'es';

export function setLocale(localeCode) {
	locale = localeCode;
}

export function isoToday() {
	return moment().format(ISO_FORMAT);
}

export function convertIsoFormat(date) {
	return moment(date).format(ISO_FORMAT);
}

export function convertIsoFormatWithHourAndMinutes(date) {
	return moment(date).format(ISO_FORMAT_WITH_HOUR_AND_MINUTES);
}

export function getYear(date) {
	return moment(date).format(ISO_FORMAT_ONLY_YEAR);
}

export function isoTomorrow() {
	return moment()
		.add(1, 'days')
		.format(ISO_FORMAT);
}

export function isoFuture(daysFromNow) {
	return moment()
		.add(daysFromNow, 'days')
		.format(ISO_FORMAT);
}

export function localizedToday() {
	return localize(moment());
}

export function localizedTomorrow() {
	return localize(moment().add(1, 'days'));
}

export function addEighteenYear(date) {
	return moment(date)
		.add(18, 'years')
		.format(ISO_FORMAT);
}

export function localizedFromIso(isoDate) {
	return localize(moment(isoDate, ISO_FORMAT));
}

function localize(date) {
	return removeLeadingZeros(
		toTitleCase(
			date
				.locale(locale)
				.format(`dddd, DD [${localizedSeparator(locale)}] MMMM`)
		)
	);
}

function removeLeadingZeros(formattedDate) {
	return formattedDate.replace(/ 0+/g, ' ');
}

function localizedSeparator(locale) {
	if (locale === 'en') return 'of';
	return 'de';
}

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}
