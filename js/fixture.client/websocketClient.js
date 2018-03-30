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
            that.serverAddress = targetAddress;
        }
        that.attemptConnection(that);
    }
    startMonitor(that) {
        if (that.timerActive === false) {
            console.log("SOCKET_CLIENT::MONITOR_STARTING");
            that.statusMonitorTimer(that);
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
        if (that.connected === false && that.attempting === false) {
            that.attemptConnection(that);
        }
    }
    attemptConnection(that) {
        let address = that.serverAddress.toString();
        that.attempting = true;
        if (that.connected === false) {
            console.log("SOCKET_CLIENT::CONNECTING", address);
            that.ws = new that.WebSocket(address);
            that.wsOpen(that.ws, that);
            that.wsClose(that.ws, that);
            that.wsError(that.ws, that);
        }
        else {
            console.log("SOCKET_CLIENT::CONNECTION_ACTIVE:", "nothing changed");
        }
    }
    wsOpen(ws, that) {
        ws.on('open', function socketOpen() {
            that.attempting = false;
            that.connected = true;
            if (this.timerActive === false) {
                that.startMonitor(that);
            }
            console.log("SOCKET_CLIENT::CONNECTED");
        });
    }
    wsClose(ws, that) {
        ws.on("close", function socketClose(code, reason) {
            console.log("SOCKET_CLIENT::CONNECTION_CLOSED:" + code, reason);
            that.attempting = false;
            that.connected = false;
            if (that.timerActive === false) {
                that.startMonitor(that);
            }
        });
    }
    wsError(ws, that) {
        ws.on("error", function socketError(error) {
            let message = "default";
            if (error.code === "ECONNREFUSED") {
                message = "connection refused!";
            }
            else {
                message = error.code;
            }
            that.attempting = false;
            that.connected = false;
            if (that.timerActive === false) {
                that.startMonitor(that);
            }
            console.log("SOCKET_CLIENT::CONNECTION_ERROR:", message);
        });
    }
}
module.exports = WebSocketClient;
//# sourceMappingURL=websocketClient.js.map