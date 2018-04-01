"use strict";
class FixtureController {
    constructor(option) {
        this.profileName = "default";
        console.log("FIXTURE_CONTROLLER::STARTING");
        console.group();
        if (option.driver !== undefined || option.driver !== null) {
            this.profileName = option.driver.toString();
        }
        this.driverLoader(this.profileName, this.driverStart);
        console.groupEnd();
    }
    driverLoader(profileName, callback) {
        let that = this;
        let success = false;
        console.log("FIXTURE_CONTROLLER::LOAD_DRIVER:", profileName);
        if (profileName === "pca9685") {
            this.driverClass = require("./driver-pca9685");
            success = true;
        }
        else if (profileName === "dummy" || profileName === "default") {
            this.driverClass = require("./driver-dummy");
            success = true;
        }
        else {
            console.log("FIXTURE_CONTROLLER::LOAD_FAIL:", profileName);
        }
        if (success) {
            callback(that);
        }
    }
    driverStart(that) {
        that.driver = new that.driverClass();
    }
}
module.exports = FixtureController;
//# sourceMappingURL=controller.js.map