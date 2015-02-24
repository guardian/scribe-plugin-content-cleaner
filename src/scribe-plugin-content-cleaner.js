module.exports = function(config) {

    var replacers = [
        (text) => {
            text.replace(/\s+/g, " ");
        },
        (text) => {
            text.replace("--", "&emdash;");
            text.replace("-", "&emdash;");
        }];

  return function(scribe) {
      // for now this just exposes a list of
      // commands to do the text cleanup, rather than doing it some
      // weird way with sanitizers
      var cleanupCommand = new scribe.api.Command('cleanup');

      cleanupCommand.execute = () => {
          var content = scribe.el.innerText;
          replacers.forEach(
              (f) => { f(content); }
          );
      };

  };
};
