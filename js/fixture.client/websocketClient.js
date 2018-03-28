"use strict";
class WebSocketClient {
    constructor(serverAdress) {
        this.WebSocket = require("ws");
        let that = this;
        console.log("SOCKET_CLIENT::STARTING");
        console.log("SOCKET_CLIENT::CONNECTING", serverAdress.toString());
        this.ws = new this.WebSocket(serverAdress.toString());
        this.ws.on('open', function socketOpen() {
            that.ws.send("meta-stuff");
        });
    }
    sendMeta() {
        this.ws.send("meta-stuff");
    }
}
module.exports = WebSocketClient;
//# sourceMappingURL=websocketClient.js.map