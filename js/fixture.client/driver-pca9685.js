"use strict";
class pca9685Driver {
    constructor() {
        this.i2cBus = require("i2c-bus");
        this.Pca9685Driver = require("pca9685").Pca9685Driver;
    }
}
module.exports = pca9685Driver;
//# sourceMappingURL=driver-pca9685.js.map