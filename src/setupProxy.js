const proxy = require("http-proxy-middleware");

module.exports = app => {
    app.use(proxy("/api", { target: "https://summer.cash", secure: false, changeOrigin: true }));
    app.use(proxy("/ws", { target: "ws://summer.cash:2086", secure: false, ws: true }));
}; // Set exports
