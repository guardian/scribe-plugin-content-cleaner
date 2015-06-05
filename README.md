# Scribe Content Cleaner plugin

Formats the content of the HTML wrapped by the Scribe instance and applies [Guardian](http://www.theguardian.com) rules for cleaning content to a standard format.

## Rules summary

* Reduce multiple whitespace to a single space
* Turns ` -- ` into the endash character, regards of spacing around the double-hyphens
* Turns ` - ` into the endash character
* Removes elements that only consist of break return elements
* Reduces multiple break-returns to a single break return
* Where a break-return separates non-boundary characters the break-return is replaced with a space

## Running the tests

* `npm install`
* `npm test`

## Known issues

Tests are not running locally on Firefox due to an out-of-date Selenium Webdriver dependency 