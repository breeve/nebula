import { _decorator, Component, UITransform, Layout, Node, Layers } from 'cc';
const { ccclass, property } = _decorator;
import { setBackground } from '../common';

@ccclass('playInfo')
export class playInfo extends Component {
    start() {
        var uiParent = this.node.getComponent(UITransform)
        var posParent = this.node.getPosition()
        var startX = posParent.x - uiParent.width/2
        var y = posParent.y
        var _offset = 0

        // layout
        var layout = this.addComponent(Layout)
        layout.type = Layout.Type.HORIZONTAL
        layout.alignHorizontal = true
        layout.resizeMode = Layout.ResizeMode.CONTAINER
        layout.horizontalDirection = Layout.HorizontalDirection.LEFT_TO_RIGHT
        layout.affectedByScale = true

        // portrait
        this.portrait(uiParent, startX, y, _offset)

        // description
        this.description(uiParent, startX, y, _offset)
    }

    portrait(uiParent:UITransform, startX:number, y:number, _offset:number) {
        var portraitNode = new Node
        portraitNode.name = "portrait"
        this.node.addChild(portraitNode)

        portraitNode = this.node.getChildByName("portrait")
        portraitNode.layer = Layers.Enum.UI_2D
        portraitNode.setPosition(startX + _offset, y)
        _offset = startX

        setBackground(
            portraitNode, 
            "main/mainBackground/spriteFrame", 
            uiParent.height, 
            uiParent.height
        )
    }

    description(uiParent:UITransform, startX:number, y:number, _offset:number) {
        var descriptionNode = new Node
        descriptionNode.name = "description"
        this.node.addChild(descriptionNode)

        descriptionNode = this.node.getChildByName("description")
        descriptionNode.layer = Layers.Enum.UI_2D
        descriptionNode.setPosition(startX + _offset, y)

        setBackground(
            descriptionNode, 
            "main/mainBackground/spriteFrame", 
            uiParent.width - uiParent.height, 
            uiParent.height
        )
    }
}

