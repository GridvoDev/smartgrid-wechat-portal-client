const React = require('react');
const ReactDOM = require('react-dom');
const SelectStationPanel = require("./selectStationPanel");
require('pomelo-cocos2d-js');

window.getCookie = function (c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return document.cookie.substring(c_start, c_end);
        }
    }
    return ""
};
let pomelo = window.pomelo;
pomelo.init({
    host: "117.27.142.62",
    port: "3011"
}, () => {
    pomelo.request("connector.memberHandler.entry", {
        memberID: window.getCookie("memberID"),
    }, function (result) {
        if (result.errcode === 400) {
            console.log("member entry fail");
            return;
        }
        window.stationNames = result.member.dutyStations ? result.member.dutyStations : [];
        ReactDOM.render(
            <SelectStationPanel/>,
            document.getElementById('content')
        );
    });
});
