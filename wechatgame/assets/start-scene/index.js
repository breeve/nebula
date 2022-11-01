System.register("chunks:///_virtual/broadcast.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(t){"use strict";var i,n,o,s,e,r,h;return{setters:[function(t){i=t.inheritsLoose},function(t){n=t.cclegacy,o=t._decorator,s=t.UITransform,e=t.Label,r=t.Vec3,h=t.Component}],execute:function(){var a;n._RF.push({},"df1a8w/LxZIMYlnajxt0xIj","broadcast",void 0);var f=o.ccclass;o.property,t("broadcast",f("broadcast")(a=function(t){function n(){for(var i,n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(i=t.call.apply(t,[this].concat(o))||this).x=0,i.y=0,i.infos="",i.infosx=0,i.infosy=0,i}i(n,t);var o=n.prototype;return o.start=function(){var t=this.node.getComponent(s),i=this.node.getPosition();this.x=i.x-t.width,this.y=i.y-t.height,this.infos="";var n=this.node.getChildByName("infos");n.getComponent(e);this.infosx=n.getPosition().x,this.infosy=n.getPosition().y,n.setPosition(new r(this.infosx+200,this.infosy)),this.infosx=n.getPosition().x,this.infosy=n.getPosition().y},o.update=function(t){var i;(s=(o=this.node.getChildByName("infos")).getComponent(e)).string.length>0&&((i=o.getPosition()).x+s.string.length<this.x?(s.string="",this.infos=""):((i=o.getPosition()).x-=1,o.setPosition(i)));var n=this.getInfos();if(0!=n.length){if(0!=this.infos.length)return;var o,s;this.infos=n,(s=(o=this.node.getChildByName("infos")).getComponent(e)).string=this.infos,o.setPosition(new r(this.infosx,this.infosy))}},o.getInfos=function(){return"welcome flynn!!!"},n}(h))||a);n._RF.pop()}}}));

System.register("chunks:///_virtual/main.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(t){"use strict";var e,n,i,o,r;return{setters:[function(t){e=t.inheritsLoose},function(t){n=t.cclegacy,i=t._decorator,o=t.UITransform,r=t.Component}],execute:function(){var a;n._RF.push({},"47579e/PVxO4ZixR763WcCo","main",void 0);var h=i.ccclass;i.property,t("main",h("main")(a=function(t){function n(){return t.apply(this,arguments)||this}return e(n,t),n.prototype.start=function(){var t=this.node.getChildByName("playerInfo").getComponent(o);t.height=200,t.width=500;var e=this.node.getChildByName("broadcast").getComponent(o);e.height=80,e.width=500;var n=this.node.getChildByName("functions").getComponent(o);n.height=500,n.width=500;var i=this.node.getChildByName("fighting").getComponent(o);i.height=180,i.width=500},n}(r))||a);n._RF.pop()}}}));

System.register("chunks:///_virtual/portrait.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(t){"use strict";var r,e,o,i,n,s,a,c;return{setters:[function(t){r=t.inheritsLoose},function(t){e=t.cclegacy,o=t._decorator,i=t.resources,n=t.SpriteFrame,s=t.Sprite,a=t.UITransform,c=t.Component}],execute:function(){var p;e._RF.push({},"5932fuBqi1KNZSsoaq0/YLB","portrait",void 0);var u=o.ccclass;o.property,t("portrait",u("portrait")(p=function(t){function e(){return t.apply(this,arguments)||this}return r(e,t),e.prototype.start=function(){var t=this;i.load("main/portrait/spriteFrame",n,(function(r,e){if(r)console.log("resource load fail, "+r);else{var o=t.getComponent(s);o.spriteFrame=e;var i=o.getComponent(a);i.width=100,i.height=100}}))},e}(c))||p);e._RF.pop()}}}));

System.register("chunks:///_virtual/resourceInfo.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(e){"use strict";var r,o,t,n,s,c,i,u;return{setters:[function(e){r=e.inheritsLoose},function(e){o=e.cclegacy,t=e._decorator,n=e.resources,s=e.SpriteFrame,c=e.Sprite,i=e.UITransform,u=e.Component}],execute:function(){var a;o._RF.push({},"85e24Uw0yNEeKYtGf5GfPQk","resourceInfo",void 0);var p=t.ccclass;t.property,e("resourceInfo",p("resourceInfo")(a=function(e){function o(){return e.apply(this,arguments)||this}return r(o,e),o.prototype.start=function(){var e=this;n.load("main/portrait/spriteFrame",s,(function(r,o){if(r)console.log("resource load fail, "+r);else{var t=e.getComponent(c);t.spriteFrame=o,t.getComponent(i).height=100}}))},o}(u))||a);o._RF.pop()}}}));

System.register("chunks:///_virtual/start-scene",["./broadcast.ts","./main.ts","./portrait.ts","./resourceInfo.ts"],(function(){"use strict";return{setters:[null,null,null,null],execute:function(){}}}));

(function(r) {
  r('virtual:///prerequisite-imports/start-scene', 'chunks:///_virtual/start-scene'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});