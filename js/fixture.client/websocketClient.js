"use strict";
class WebSocketClient {
    constructor(targetAddress) {
        this.WebSocket = require("ws");
        this.serverAddress = "ws://127.0.0.1:80/";
        this.connected = false;
        this.attempting = false;
        this.timerActive = false;
        let that = this;
        console.log("SOCKET_CLIENT::STARTING");
        if (targetAddress !== undefined && targetAddress !== null) {
            this.serverAddress = targetAddress;
        }
        this.attemptConnection();
    }
    startMonitor(that) {
        if (that.timerActive === false) {
            console.log("SOCKET_CLIENT::MONITOR_STARTING");
            this.statusMonitorTimer(that);
        }
        else {
            console.log("SOCKET_CLIENT::MONITOR_RUNNING");
        }
    }
    statusMonitorTimer(that) {
        setTimeout(function monitorTick() {
            that.statusMonitorLoop(that);
            that.statusMonitorTimer(that);
        }, 5000, that);
    }
    statusMonitorLoop(that) {
        if (this.connected === false && this.attempting === false) {
            that.attemptConnection(that.serverAddress);
        }
        else if (this.connected === true && this.attempting === false) {
        }
    }
    attemptConnection() {
        let that = this;
        that.attempting = true;
        if (that.connected === false) {
            console.log("SOCKET_CLIENT::CONNECTING", that.serverAddress.toString());
            this.ws = new that.WebSocket(that.serverAddress.toString());
            this.ws.on('open', function socketOpen() {
                that.attempting = false;
                that.connected = true;
                that.startMonitor(that);
            });
            this.ws.on('error', function socketError(error) {
                console.log("SOCKET_SERver::CONNECTION_ERROR:" + error.code);
                console.error(error);
                that.attempting = false;
                that.connected = false;
                that.startMonitor(that);
            });
        }
    }
}
module.exports = WebSocketClient;
//# sourceMappingURL=websocketClient.js.map