import { _decorator, Component, UITransform, Layout, Node, Layers } from 'cc';
const { ccclass, property } = _decorator;
import { setBackground } from '../common';

@ccclass('playInfo')
export class playInfo extends Component {
    _offset = 0
    startX = 0
    y = 0

    start() {
        var uiParent = this.node.getComponent(UITransform)
        var posParent = this.node.getPosition()
        this.startX = posParent.x - uiParent.width/2
        this.y = posParent.y

        // layout
        var layout = this.addComponent(Layout)
        layout.type = Layout.Type.HORIZONTAL
        layout.alignHorizontal = true
        layout.resizeMode = Layout.ResizeMode.CONTAINER
        layout.horizontalDirection = Layout.HorizontalDirection.LEFT_TO_RIGHT
        layout.affectedByScale = true

        // portrait
        this.portrait(uiParent)

        // description
        this.description(uiParent)
    }

    portrait(uiParent:UITransform) {
        var portraitNode = new Node
        portraitNode.name = "portrait"
        this.node.addChild(portraitNode)

        portraitNode = this.node.getChildByName("portrait")
        portraitNode.layer = Layers.Enum.UI_2D
        portraitNode.setPosition(this.startX + this._offset, this.y)
        this._offset += uiParent.height

        setBackground(
            portraitNode, 
            "main/mainBackground/spriteFrame", 
            uiParent.height, 
            uiParent.height
        )
    }

    description(uiParent:UITransform) {
        var descriptionNode = new Node
        descriptionNode.name = "description"
        this.node.addChild(descriptionNode)

        descriptionNode = this.node.getChildByName("description")
        descriptionNode.layer = Layers.Enum.UI_2D
        descriptionNode.setPosition(this.startX + this._offset, this.y)
        this._offset += uiParent.width - uiParent.height

        setBackground(
            descriptionNode, 
            "main/mainBackground/spriteFrame", 
            uiParent.width - uiParent.height, 
            uiParent.height
        )
    }
}

