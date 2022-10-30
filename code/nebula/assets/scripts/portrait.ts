import { _decorator, Component, Node, Sprite, resources, SpriteComponent, SpriteFrame, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('portrait')
export class portrait extends Component {
    start() {
        resources.load("main/portrait/spriteFrame", SpriteFrame, (error, spriteFrame) => {
            if (error) {
                console.log("resource load fail, " + error)
                return
            }
            var portrait = this.getComponent(Sprite)
            portrait.spriteFrame = spriteFrame

            var uiTransform = portrait.getComponent(UITransform)
            uiTransform.width = 100
            uiTransform.height = 100
        })
    }
}

