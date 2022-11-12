import { _decorator, Component, Node, UITransform, Layout, Layers, Widget } from 'cc';
const { ccclass, property } = _decorator;
import { setBackground } from '../common';
import { functionsTools } from './functionsTools';
import { functionsRooms } from './functionsRooms';

@ccclass('functions')
export class functions extends Component {
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

        this.tools(uiParent)
        this.personalShow(uiParent)
        this.rooms(uiParent)
    }

    tools(uiParent:UITransform) {
        var node = new Node
        node.name = "functionsTools"
        this.node.addChild(node)

        node = this.node.getChildByName("functionsTools")
        node.layer = Layers.Enum.UI_2D
        node.setPosition(this.startX + this._offset, this.y)

        var ui = node.addComponent(UITransform)
        ui.width = 100
        ui.height = uiParent.height
        node = setBackground(
            node, 
            "main/background/spriteFrame", 
            100, 
            uiParent.height
        )
        node.addComponent(functionsTools)
        
        // layout
        var layout = node.addComponent(Layout)
        layout.type = Layout.Type.VERTICAL
        layout.alignVertical = true
        layout.resizeMode = Layout.ResizeMode.CONTAINER
        layout.verticalDirection = Layout.VerticalDirection.TOP_TO_BOTTOM
        layout.affectedByScale = true

        this._offset += 50
    }

    personalShow(uiParent:UITransform) {
        var node = new Node
        node.name = "functionsPersonalShow"
        this.node.addChild(node)

        node = this.node.getChildByName("functionsPersonalShow")
        node.layer = Layers.Enum.UI_2D
        node.setPosition(this.startX + this._offset, this.y)

        var ui = node.addComponent(UITransform)
        ui.width = 400
        ui.height = uiParent.height
        node = setBackground(
            node, 
            "main/background/spriteFrame", 
            400, 
            uiParent.height
        )

        this._offset += 400
    }

    rooms(uiParent:UITransform) {
        var node = new Node
        node.name = "functionsRooms"
        this.node.addChild(node)

        node = this.node.getChildByName("functionsRooms")
        node.layer = Layers.Enum.UI_2D
        node.setPosition(this.startX + this._offset, this.y)

        var ui = node.addComponent(UITransform)
        ui.width = 150
        ui.height = uiParent.height
        node = setBackground(
            node, 
            "main/background/spriteFrame", 
            150, 
            uiParent.height
        )

        // layout
        var layout = node.addComponent(Layout)
        layout.type = Layout.Type.VERTICAL
        layout.alignVertical = true
        layout.resizeMode = Layout.ResizeMode.CONTAINER
        layout.verticalDirection = Layout.VerticalDirection.TOP_TO_BOTTOM
        layout.affectedByScale = true

        node.addComponent(functionsRooms)

        this._offset += 150
    }
}

