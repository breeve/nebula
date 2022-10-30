import { _decorator, Component, Node, resources, SpriteFrame, Sprite, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('resourceInfo')
export class resourceInfo extends Component {
    start() {
        resources.load("main/portrait/spriteFrame", SpriteFrame, (error, spriteFrame) => {
            if (error) {
                console.log("resource load fail, " + error)
                return
            }
            var portrait = this.getComponent(Sprite)
            portrait.spriteFrame = spriteFrame

            var uiTransform = portrait.getComponent(UITransform)
            uiTransform.height = 100
        })
    }
}

