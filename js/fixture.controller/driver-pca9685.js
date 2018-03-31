"use strict";
class pca9685Driver {
    constructor(options) {
        this.i2cBus = require("i2c-bus");
        this.Pca9685Driver = require("pca9685").Pca9685Driver;
        this.i2cActive = false;
        this.i2cAddress = 0x40;
        this.i2cFrequency = 1000;
        this.i2cDebug = false;
        let that = this;
        this.setParameters(options);
        let settings = {
            i2c: this.i2cBus.openSync(1),
            address: this.i2cAddress,
            frequency: this.i2cFrequency,
            debug: false
        };
        this.pwm = new this.Pca9685Driver(settings, function pca9685callback(err) {
            if (err) {
                console.log("DRIVER_PCA9685::CONNECTION_FAILED");
                console.error(err);
                that.i2cActive = false;
            }
            that.i2cActive = true;
        }, that);
    }
    updateChannel() {
        if (this.i2cActive) {
        }
    }
    setParameters(options) {
        if (options === undefined || options === null) {
            options = {};
        }
        if (options.address !== undefined
            && options.address !== null) {
            this.i2cAddress = options.address;
        }
        else if (options.frequency !== undefined
            && options.frequency !== null) {
            this.i2cFrequency = options.frequency;
        }
    }
}
module.exports = pca9685Driver;
//# sourceMappingURL=driver-pca9685.js.map