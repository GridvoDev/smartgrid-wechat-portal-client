const React = require('react');
const ReactDOM = require('react-dom');

class SelectStationPanel extends React.Component {
    selectStation(event){
        let pomelo = window.pomelo;
        let stationName = event.target.text;
        pomelo.request("connector.memberEntryHandler.selectStation", {
            stationName: stationName
        }, function (result) {
            if (result.code === 500) {
                console.log("select station fail");
                return;
            }
        });
    }

    render() {
        let stationUIs = [];
        let self = this;
        for (let stationName of window.stationNames) {
            let ui = (
                <a key={stationName} href="javascript:;" onClick={self.selectStation}
                   className="weui_btn weui_btn_primary">{stationName}</a>
            );
            stationUIs.push(ui);
        }
        return (
            <div>
                <div className="hd">
                    <h3 className="page_title">站点选择</h3>
                </div>
                <div className="bd">
                    {stationUIs}
                </div>
            </div>
        );
    }
}

module.exports = SelectStationPanel;