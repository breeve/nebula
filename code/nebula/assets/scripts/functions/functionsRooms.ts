import { _decorator, Component, Node, UITransform, Layout } from 'cc';
const { ccclass, property } = _decorator;
import { allocNode, allocUITransform, setBackground } from '../common';

@ccclass('functionsRooms')
export class functionsRooms extends Component {
    start() {
        var uiParent = this.node.getComponent(UITransform)
        var node = null

        node = allocNode("functionToolsBusiness")
        node = allocUITransform(node, uiParent.width, 80)
        node = setBackground(node, "main/mainBackground/spriteFrame", uiParent.width, 80)
        this.node.addChild(node)
        // TODO 增加跳转、展示商店页面

        node = allocNode("functionToolsFighting")
        node = allocUITransform(node, uiParent.width, 80)
        node = setBackground(node, "main/mainBackground/spriteFrame", uiParent.width, 80)
        this.node.addChild(node)

        node = allocNode("functionToolsConstruction")
        node = allocUITransform(node, uiParent.width, 80)
        node = setBackground(node, "main/mainBackground/spriteFrame", uiParent.width, 80)
        this.node.addChild(node)

        node = allocNode("functionToolsParliament")
        node = allocUITransform(node, uiParent.width, 80)
        node = setBackground(node, "main/mainBackground/spriteFrame", uiParent.width, 80)
        this.node.addChild(node)

        // 占位
        node = allocNode("")
        node = allocUITransform(node, uiParent.width, 230)
        node = setBackground(node, "main/mainBackground/spriteFrame", uiParent.width, 230)
        this.node.addChild(node)
    }
}

