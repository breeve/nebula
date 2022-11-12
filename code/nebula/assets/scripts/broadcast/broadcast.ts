import { _decorator, Component, Node, UITransform, Label, Layers, Color, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('broadcast')
export class broadcast extends Component {
    x = 0
    infos = ""
    infosx = 0
    infosy = 0
    start() {
        var uiTransForm = this.node.getComponent(UITransform)
        var pos = this.node.getPosition()
        this.x = pos.x-uiTransForm.width/2
        this.infos = ""

        var labelNode = new Node("infos")
        labelNode.addComponent(Label)
        this.node.addChild(labelNode)

        var labelNode = this.node.getChildByName("infos")
        labelNode.layer = Layers.Enum.UI_2D
        labelNode.setPosition(uiTransForm.width, pos.y)
        var labelComponent = labelNode.getComponent(Label)
        labelComponent.color = new Color(255, 0, 0)
        labelComponent.fontSize = 20
        labelComponent.string = this.getInfos()

        this.infosx = labelNode.getPosition().x
        this.infosy = labelNode.getPosition().y
        
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

