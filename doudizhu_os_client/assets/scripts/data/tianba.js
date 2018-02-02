import PlayerData from './player-data'
import ResoucesManager from './../utility/resources-manager'
const TianBa = function () {
    let that = {};
    that.playerData = PlayerData();
    that.resourcesManager = ResoucesManager();
    return that;
};
export default TianBa;