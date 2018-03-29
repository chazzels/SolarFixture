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
            that.timerActive = true;
        }
        else {
            console.log("SOCKET_CLIENT::MONITOR_RUNNING");
        }
    }
    statusMonitorTimer(that) {
        setTimeout(function monitorTick() {
            that.statusMonitor(that);
            that.statusMonitorTimer(that);
        }, 5000, that);
    }
    statusMonitor(that) {
        if (this.connected === false && this.attempting === false) {
            this.attemptConnection();
        }
        else if (this.connected === true && this.attempting === false) {
        }
    }
    attemptConnection() {
        let that = this;
        let address = that.serverAddress.toString();
        that.attempting = true;
        if (that.connected === false) {
            console.log("SOCKET_CLIENT::CONNECTING", address);
            this.ws = new that.WebSocket(address);
            this.ws.on('open', function socketOpen() {
                that.attempting = false;
                that.connected = true;
                if (that.timerActive === false) {
                    that.startMonitor(that);
                }
                console.log("SOCKET_CLIENT::CONNECTED");
            });
            this.ws.on("error", function socketError(error) {
                let message = "default";
                if (error.code === "ECONNREFUSED") {
                    message = "connection refused!";
                }
                that.attempting = false;
                that.connected = false;
                if (that.timerActive === false) {
                    that.startMonitor(that);
                }
                console.log("SOCKET_CLIENT::CONNECTION_ERROR:", message);
            });
            this.ws.on("close", function socketClose(code, reason) {
                console.log("SOCKET_CLIENT::CONNECTION_CLOSED:" + code, reason);
                that.attempting = false;
                that.connected = false;
                if (that.timerActive === false) {
                    that.startMonitor(that);
                }
            });
        }
        else {
            console.log("SOCKET_CLIENT::CONNECTION_ACTIVE:", "nothing changed");
        }
    }
}
module.exports = WebSocketClient;
//# sourceMappingURL=websocketClient.js.map