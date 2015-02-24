var harness = require('scribe-test-harness/helpers');

var driver;

before(function () {
    driver = harness.driver;
});


module.exports = function () {
    return driver.executeAsyncScript(function () {
        require(['scribe-plugin-content-cleaner'],
                function  (plugin) {
                    window.scribe.use(plugin());
                });
    });
};
