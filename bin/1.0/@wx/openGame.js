"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function openGame(path, animated) {
    app.open("@wx/page/game.js?path=" + encodeURIComponent(path), animated);
}
exports.openGame = openGame;
