import { Node, UITransform, resources, SpriteFrame, Sprite, Layers, Vec3, Widget } from 'cc'
export {allocNode, allocUITransform, setBackground}

function allocNode(name: string):Node {
    var node = new Node
    node.name = name
    node.layer = Layers.Enum.UI_2D
    node.setPosition(0,0)
    return node
}

function allocUITransform(node:Node, width?:number, height?:number):Node {
    node.addComponent(UITransform)
    var ui = node.getComponent(UITransform)
    if (width != 0) {
        ui.width = width
    }
    if (height != 0) {
        ui.height = height
    }

    // Widget，Node 对齐
    node.addComponent(Widget)
    var widget = node.getComponent(Widget)
    widget.alignMode = Widget.AlignMode.ON_WINDOW_RESIZE
    widget.isAlignLeft = true
    widget.isAlignRight = true
    widget.left = 0
    widget.right = 0
    return node
}

function setBackground(node:Node, spritPath:string, width?:number, height?:number): Node {
    resources.load(spritPath, SpriteFrame, (error, spriteFrame) => {
        if (error) {
            console.log("resource load fail, " + error)
            return
        }

        node.addComponent(Sprite)
        var portrait = node.getComponent(Sprite)
        portrait.spriteFrame = spriteFrame
        portrait.type = Sprite.Type.SLICED
        portrait.sizeMode = Sprite.SizeMode.CUSTOM

        var ui = node.getComponent(UITransform)
        if (ui == null) {
            node.addComponent(UITransform)
            ui = node.getComponent(UITransform)
        }
        if (width != 0) {
            ui.width = width
        }
        if (height != 0) {
            ui.height = height
        }
    })

    return node
}