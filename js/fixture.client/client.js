"use strict";
class FixtureClient {
    constructor(option) {
        this.WebSocketClient = require("./websocketClient");
        console.log("FIXTURE_CLIENT::STARTING");
        console.group();
        this.client = new this.WebSocketClient(option.serverAdress);
        console.groupEnd();
    }
}
module.exports = FixtureClient;
//# sourceMappingURL=client.js.map