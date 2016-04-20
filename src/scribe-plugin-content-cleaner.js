module.exports = function(scribe) {
    'use strict';

    var COMMAND_NAME = "cleanup";

    var filters = [
        (text) => text.replace(/(&nbsp;)/gi, " "),
        (text) => text.replace(/(\&shy;|­|&#173;)/gi, ""),
        (text) => text.replace(/\s+/g, " "),
        (text) => text.replace(/ -- /g, " &ndash; "),
        (text) => text.replace(/ - /g, " &ndash; "),
        (text) => text.replace(/(<br\s*\/?>){3,}/gi, '<br>'),
        (text) => text.replace(/<p>\s*?<br\s*\/?><\/p>/g, ''),
        (text) => text.replace(/(\w)\s*--\s*(\w(?!(ote\b|tart\b|nd\b)))/g, "$1 &ndash; $2"),
        (text) => text.replace(/(\w)<br\s*?>(\w)/g, "$1 $2"),
        (text) => text.replace(/(\w)\s*?–\s*?(\w)/g, "$1 &ndash; $2")
    ];


    return function (scribe) {
        console.log('Initialising plugin');
        // for now this just exposes a list of
        // commands to do the text cleanup, rather than doing it some
        // weird way with sanitizers
        var cleanupCommand = new scribe.api.Command('Cleanup');

        cleanupCommand.execute = () => {
            var content = scribe.el.innerHTML;

            console.log(content);

            var temp = filters.reduce((val, fn) => {
                return fn(val);
            }, content);

            scribe.setHTML(temp, true);
        };

        cleanupCommand.queryEnabled = () => {
            return true;
        };

        scribe.commands[COMMAND_NAME] = cleanupCommand;
    };
};
