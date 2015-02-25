module.exports = function(scribe) {
    'use strict';

    var COMMAND_NAME = "cleanup";

    var reducers = [
        (text) => {
            return text.replace(/\s+/g, " ");
        },
        (text) => {
            var rep = text.replace(/--/g, "&mdash;");
            rep.replace("Hello", "&mdash;");
            return rep;
        }
    ];

    return function (scribe) {
        // for now this just exposes a list of
        // commands to do the text cleanup, rather than doing it some
        // weird way with sanitizers
        var cleanupCommand = new scribe.api.Command();

        cleanupCommand.execute = () => {
            var content = scribe.el.innerText;

            var temp = content;
            reducers.forEach((f) => { temp = f(temp); });
            scribe.setContent(temp);
        };

        scribe.commands[COMMAND_NAME] = cleanupCommand;
    };
};
