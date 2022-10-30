import { _decorator, Component, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('main')
export class main extends Component {
    start() {
        var playerInfo = this.node.getChildByName("playerInfo")
        var playerInfoUITransForm = playerInfo.getComponent(UITransform)
        playerInfoUITransForm.height = 200
        playerInfoUITransForm.width = 500

        var broadcast = this.node.getChildByName("broadcast")
        var broadcastUITransForm = broadcast.getComponent(UITransform)
        broadcastUITransForm.height = 80
        broadcastUITransForm.width = 500

        var  functions= this.node.getChildByName("functions")
        var functionsUITransForm = functions.getComponent(UITransform)
        functionsUITransForm.height = 500
        functionsUITransForm.width = 500

        var fighting = this.node.getChildByName("fighting")
        var fightingUITransForm = fighting.getComponent(UITransform)
        fightingUITransForm.height = 180
        fightingUITransForm.width = 500
    }
}

