module.exports = function(scribe) {
    'use strict';

    var COMMAND_NAME = "cleanup";

    var filters = [
        (text) => {
                return text.replace(/(&nbsp;)/gi, " ");
        },
        (text) => {
            return text.replace(/\s+/g, " ");
        },
        (text) => {
            return text.replace(/ -- /g, " &ndash; ");
        },
        (text) => {
            return text.replace(/ - /g, " &ndash; ");
        },
        (text) => {
            return text.replace(/(<br\s*\/?>){3,}/gi, '<br>');
        },
        (text) => {
            return text.replace(/<p>\s*?<br\s*\/?><\/p>/g, '');
        }
    ];

    const tagContentFilters = [
        (text) => {
            return text.replace(/(\w)--(\w)/g, " &ndash; ");
        }
    ];


    return function (scribe) {
        // for now this just exposes a list of
        // commands to do the text cleanup, rather than doing it some
        // weird way with sanitizers
        var cleanupCommand = new scribe.api.Command('Cleanup');

        cleanupCommand.execute = () => {
            var content = scribe.el.innerHTML;

            var temp = filters.reduce((val, fn) => {
                return fn(val);
            }, content);

            const parser = new DOMParser();
            const doc = parser.parseFromString(temp, "text/html");

            for( var i = 0; i < doc.body.children.length; i++) {
                const currentElement = doc.body.children[i];
                if(currentElement.children === 0) {
                    const text = currentElement.innerHTML;
                    var temp = tagContentFilters.reduce((val, fn) => {
                        return fn(val);
                        }, text);
                    currentElement.innerHTML = temp;
                }
            }

            scribe.setHTML(doc.body.innerHTML, true);
        };

        cleanupCommand.queryEnabled = () => {
            return true;
        };

        scribe.commands[COMMAND_NAME] = cleanupCommand;
    };
};
