import { _decorator, Component, Node, Layout, UITransform, Widget } from 'cc';
const { ccclass, property } = _decorator;
import { allocNode, allocUITransform, setBackground } from '../common';

@ccclass('functionsTools')
export class functionsTools extends Component {
    start() {
        var uiParent = this.node.getComponent(UITransform)
        var node = null

        node = allocNode("functionToolsEmail")
        node = allocUITransform(node, uiParent.width, 50)
        node = setBackground(node, "main/mainBackground/spriteFrame", uiParent.width, 50)
        this.node.addChild(node)

        node = allocNode("functionToolsMessage")
        node = allocUITransform(node, uiParent.width, 50)
        node = setBackground(node, "main/mainBackground/spriteFrame", uiParent.width, 50)
        this.node.addChild(node)

        node = allocNode("functionToolsStory")
        node = allocUITransform(node, uiParent.width, 50)
        node = setBackground(node, "main/mainBackground/spriteFrame", uiParent.width, 50)
        this.node.addChild(node)

        node = allocNode("functionToolsGameIntroduction")
        node = allocUITransform(node, uiParent.width, 50)
        node = setBackground(node, "main/mainBackground/spriteFrame", uiParent.width, 50)
        this.node.addChild(node)

        // 占位
        node = allocNode("")
        node = allocUITransform(node, uiParent.width, 350)
        node = setBackground(node, "main/mainBackground/spriteFrame", uiParent.width, 350)
        this.node.addChild(node)
    }
}

