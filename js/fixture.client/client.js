"use strict";
class FixtureClient {
    constructor(serverAdress) {
        this.WebSocketClient = require("./websocketClient");
        console.log("FIXTURE_CLIENT::STARTING");
        console.group();
        this.client = new this.WebSocketClient(serverAdress);
        console.groupEnd();
    }
}
module.exports = FixtureClient;
//# sourceMappingURL=client.js.map