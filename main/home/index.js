"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var openGame_1 = require("../@wx/openGame");
var App_1 = require("../@wx/App");
page.setOptions({
    title: '小程序'
});
ker.Page({
    path: path,
    data: {
        items: [
            {
                type: 'wxapp',
                path: '@wxapp/demo',
                title: '微信小程序 demo'
            },
            {
                type: 'wxgame',
                path: '@wxapp/game',
                title: '微信小游戏 demo'
            }
        ],
        topbar: {
            padding: platform == 'iOS' && screen.height >= 812 ? '84px 0px 0px 0px' : '64px 0px 0px 0px',
        },
    },
    onload: function (document) {
    },
    onunload: function () {
    },
    onTapAction: function (e) {
        var dataSet = e.dataSet;
        var path = dataSet.path;
        var type = dataSet.type;
        if (type == "wxapp") {
            (new App_1.App(path)).run();
        }
        else if (type == "wxgame") {
            openGame_1.openGame(path, true);
        }
    }
}, page);
