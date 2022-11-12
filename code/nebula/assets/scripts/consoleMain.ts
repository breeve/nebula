import { _decorator, Component, Node, UITransform, Widget, resources, SpriteFrame, Sprite, Layout, Button, ButtonComponent, Script } from 'cc';
import { broadcast } from './broadcast/broadcast';
import { playInfo } from './playInfo/playInfo';
import { functions } from './functions/functions';
import { allocNode, allocUITransform, setBackground } from './common';

const { ccclass, property } = _decorator;


@ccclass('consoleMain')
export class consoleMain extends Component {
    mainHeight = 0
    mainWidth = 0

    onLoad() {
        this.mainHeight = 960
        this.mainWidth = 640
    }
    start() {
        // UITransform，Node 大小
        var uiTransform = this.node.addComponent(UITransform)
        uiTransform.height = this.mainHeight
        uiTransform.width = this.mainWidth

        // Widget，Node 对齐
        var widget = this.node.addComponent(Widget)
        widget.alignMode = Widget.AlignMode.ON_WINDOW_RESIZE
        widget.isAlignLeft = true
        widget.isAlignRight = true
        widget.isAlignTop = true
        widget.isAlignBottom = true
        widget.left = 0
        widget.right = 0
        widget.top = 0
        widget.bottom = 0

        this.mainFrame()
    }

    mainFrame() {
        // Layout，Node的 child node 的布局方式
        var layout = this.addComponent(Layout)
        layout.type = Layout.Type.VERTICAL
        layout.alignVertical = true
        layout.resizeMode = Layout.ResizeMode.CONTAINER
        layout.verticalDirection = Layout.VerticalDirection.TOP_TO_BOTTOM
        layout.affectedByScale = true

        // playInfo
        var playInfoNode = allocNode("playInfo")
        playInfoNode = allocUITransform(playInfoNode, this.mainWidth, 120)
        playInfoNode = setBackground(playInfoNode, "main/background/spriteFrame", this.mainWidth, 120)
        this.node.addChild(playInfoNode)
        playInfoNode.addComponent(playInfo)

        // broadcast
        var broadcastNode = allocNode("broadcast")
        broadcastNode = allocUITransform(broadcastNode, this.mainWidth, 30)
        broadcastNode = setBackground(broadcastNode, "main/mainBackground/spriteFrame", this.mainWidth, 30)
        this.node.addChild(broadcastNode)
        broadcastNode.addComponent(broadcast)

        // functions
        var functionsNode = allocNode("functions")
        functionsNode = allocUITransform(functionsNode, this.mainWidth, 550)
        functionsNode = setBackground(functionsNode, "main/background/spriteFrame", this.mainWidth, 550)
        this.node.addChild(functionsNode)
        functionsNode.addComponent(functions)

        // fighting
        var fighting = allocNode("fighting")
        fighting = allocUITransform(fighting, this.mainWidth, 100)
        fighting = setBackground(fighting, "main/mainBackground/spriteFrame", this.mainWidth, 100)
        this.node.addChild(fighting)
    }
}

