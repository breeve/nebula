import { _decorator, Component, Node, UITransform, Label, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('broadcast')
export class broadcast extends Component {
    x = 0
    y = 0
    infos = ""
    infosx = 0
    infosy = 0
    start() {
        var uiTransForm = this.node.getComponent(UITransform)
        var pos = this.node.getPosition()
        this.x = pos.x - uiTransForm.width
        this.y = pos.y - uiTransForm.height
        this.infos = ""

        var label = this.node.getChildByName("infos")
        var labelComponent = label.getComponent(Label)
        this.infosx = label.getPosition().x
        this.infosy = label.getPosition().y
        label.setPosition(new Vec3(this.infosx+200, this.infosy))
        this.infosx = label.getPosition().x
        this.infosy = label.getPosition().y
    }

    update(deltaTime: number) {
        var label = this.node.getChildByName("infos")
        var labelComponent = label.getComponent(Label)
        if (labelComponent.string.length > 0 ) {
            var pos = label.getPosition()
            if ((pos.x+labelComponent.string.length) < this.x) {
                labelComponent.string = ""
                this.infos = ""
            } else {
                var pos = label.getPosition()
                pos.x -= 1
                label.setPosition(pos)
            }
        }

        var infosNew = this.getInfos()
        if (infosNew.length != 0 ) {
            if (this.infos.length != 0) {
                return
            }
            this.infos = infosNew
            var label = this.node.getChildByName("infos")
            var labelComponent = label.getComponent(Label)
            labelComponent.string = this.infos
            label.setPosition(new Vec3(this.infosx, this.infosy))
        }
    }

    getInfos() {
        return "welcome flynn!!!"
    }
}

