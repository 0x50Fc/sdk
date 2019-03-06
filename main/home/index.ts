
import { openGame } from '../@wx/openGame';
import { App } from "../@wx/App";

page.setOptions({
    title: '小程序'
});

ker.Page({
    path: path,
    data: {
        items: [
            {
                type : 'wxapp',
                path : '@wxapp/demo',
                title : '微信小程序 demo'
            },
            {
                type : 'wxgame',
                path : '@wxapp/game',
                title : '微信小游戏 demo'
            }
        ],
        topbar: {
            padding: platform == 'iOS' && screen.height >= 812 ? '84px 0px 0px 0px' : '64px 0px 0px 0px',
        },
    },
    onload: function(document: Document): void {
        
    },
    onunload: (): void => {

    },
    onTapAction : function(e:ElementEvent):void {
        let dataSet = e.dataSet;
        let path = dataSet.path;
        let type = dataSet.type;
        if(type == "wxapp") {
            (new App(path)).run();
        } else if (type == "wxgame") {
            openGame(path,true);
        }
    }
}, page);
