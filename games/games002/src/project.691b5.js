window.__require=function t(e,i,s){function n(a,c){if(!i[a]){if(!e[a]){var r=a.split("/");if(r=r[r.length-1],!e[r]){var h="function"==typeof __require&&__require;if(!c&&h)return h(r,!0);if(o)return o(r,!0);throw new Error("Cannot find module '"+a+"'")}}var u=i[a]={exports:{}};e[a][0].call(u.exports,function(t){return n(e[a][1][t]||t)},u,u.exports,t,e,i,s)}return i[a].exports}for(var o="function"==typeof __require&&__require,a=0;a<s.length;a++)n(s[a]);return n}({Game:[function(t,e,i){"use strict";cc._RF.push(e,"ae939RlaAlAr5bSv3Fp9IxO","Game");var s=t("Player");t("ScoreFX"),t("StarA"),t("StarB"),t("StarC"),t("StarS"),cc.Class({extends:cc.Component,properties:{starAPrefab:{default:null,type:cc.Prefab},starBPrefab:{default:null,type:cc.Prefab},starCPrefab:{default:null,type:cc.Prefab},starSPrefab:{default:null,type:cc.Prefab},scoreFXPrefab:{default:null,type:cc.Prefab},scoreNode:{default:null,type:cc.Node},maxStarDuration:8,minStarDuration:12,ground:{default:null,type:cc.Node},player:{default:null,type:s},scoreDisplay:{default:null,type:cc.Label},scoreBar:{default:null,type:cc.ProgressBar},barNode:{default:null,type:cc.Node},scoreAudio:{default:null,type:cc.AudioClip},btnNode:{default:null,type:cc.Node},winningNode:{default:null,type:cc.Node},gameOverNode:{default:null,type:cc.Node},controlHintLabel:{default:null,type:cc.Label},keyboardHint:{default:"",multiline:!0},touchHint:{default:"",multiline:!0},BGM:{default:null,type:cc.AudioClip},gameOverSFX:{default:null,type:cc.AudioClip},winSFX:{default:null,type:cc.AudioClip},victoryScore:0},onLoad:function(){this.groundY=this.ground.y+this.ground.height/2,this.currentStar=null,this.currentStarX=0,this.timer=0,this.starDuration=0,this.enabled=!1;var t=cc.sys.isMobile?this.touchHint:this.keyboardHint;this.controlHintLabel.string=t,this.starAPool=new cc.NodePool("StarA"),this.starBPool=new cc.NodePool("StarB"),this.starCPool=new cc.NodePool("StarC"),this.starSPool=new cc.NodePool("StarS"),this.scorePool=new cc.NodePool("ScoreFX")},onStartGame:function(){cc.audioEngine.playMusic(this.BGM,!0),this.resetScore(),this.enabled=!0,this.btnNode.x=3e3,this.gameOverNode.active=!1,this.winningNode.active=!1,this.player.startMoveAt(cc.v2(0,this.groundY));var t=Math.floor(10*Math.random()+1);9>t&&t>=5?Math.floor(10*Math.random()+1)>5?this.spawnNewStarB():this.spawnNewStarC():t>=10?this.spawnNewStarS():this.spawnNewStarA();console.log("\u958b\u59cb\u904a\u6232")},spawnNewStarA:function(){var t=null;t=this.starAPool.size()>0?this.starAPool.get(this):cc.instantiate(this.starAPrefab),this.node.addChild(t),t.setPosition(this.getNewStarPosition()),t.getComponent("StarA").init(this),this.startTimer(),this.currentStar=t},spawnNewStarB:function(){var t=null;t=this.starBPool.size()>0?this.starBPool.get(this):cc.instantiate(this.starBPrefab),this.node.addChild(t),t.setPosition(this.getNewStarPosition()),t.getComponent("StarB").init(this),this.startTimer(),this.currentStar=t},spawnNewStarC:function(){var t=null;t=this.starCPool.size()>0?this.starCPool.get(this):cc.instantiate(this.starCPrefab),this.node.addChild(t),t.setPosition(this.getNewStarPosition()),t.getComponent("StarC").init(this),this.startTimer(),this.currentStar=t},spawnNewStarS:function(){var t=null;t=this.starSPool.size()>0?this.starSPool.get(this):cc.instantiate(this.starSPrefab),this.node.addChild(t),t.setPosition(this.getNewStarPosition()),t.getComponent("StarS").init(this),this.startTimer(),this.currentStar=t},despawnStarA:function(t){this.starAPool.put(t);var e=Math.floor(10*Math.random()+1);9>e&&e>=5?Math.floor(10*Math.random()+1)>5?this.spawnNewStarB():this.spawnNewStarC():e>=9?this.spawnNewStarS():this.spawnNewStarA()},despawnStarB:function(t){this.starBPool.put(t);var e=Math.floor(10*Math.random()+1);9>e&&e>=5?Math.floor(10*Math.random()+1)>5?this.spawnNewStarB():this.spawnNewStarC():e>=9?this.spawnNewStarS():this.spawnNewStarA()},despawnStarC:function(t){this.starCPool.put(t);var e=Math.floor(10*Math.random()+1);9>e&&e>=5?Math.floor(10*Math.random()+1)>5?this.spawnNewStarB():this.spawnNewStarC():e>=9?this.spawnNewStarS():this.spawnNewStarA()},despawnStarS:function(t){this.starSPool.put(t);var e=Math.floor(10*Math.random()+1);9>e&&e>=5?Math.floor(10*Math.random()+1)>5?this.spawnNewStarB():this.spawnNewStarC():e>=9?this.spawnNewStarS():this.spawnNewStarA()},startTimer:function(){this.starDuration=this.minStarDuration+Math.random()*(this.maxStarDuration-this.minStarDuration),this.timer=0},getNewStarPosition:function(){this.currentStar||(this.currentStarX=2*(Math.random()-.5)*this.node.width/2);var t=0,e=this.groundY+Math.random()*this.player.jumpHeight+50,i=this.node.width/2;return t=this.currentStarX>=0?-Math.random()*i:Math.random()*i,this.currentStarX=t,cc.v2(t,e)},gainScore:function(t,e){this.score+=e;var i=e*(1/this.victoryScore);this.scoreBar.progress+=i,this.scoreDisplay.string="Score: "+this.score.toString();var s=this.spawnScoreFX(e);this.node.addChild(s.node),s.node.setPosition(t),s.play(),cc.audioEngine.playEffect(this.scoreAudio,!1)},resetScore:function(){this.score=0,this.scoreDisplay.string="Score: "+this.score.toString(),this.scoreBar.progress=0},spawnScoreFX:function(t){var e;return this.scorePool.size()>0?(e=this.scorePool.get()).getComponent("ScoreFX"):((e=cc.instantiate(this.scoreFXPrefab).getComponent("ScoreFX")).init(this),e)},despawnScoreFX:function(t){this.scorePool.put(t)},update:function(t){return this.timer>this.starDuration?(this.gameOver(),void(this.enabled=!1)):this.score>=this.victoryScore?(this.winning(),void(this.enabled=!1)):(this.scoreBar.progress<=.3?this.barNode.color=new cc.Color(230,85,85):this.scoreBar.progress>.3&&this.scoreBar.progress<=.7?this.barNode.color=new cc.Color(250,170,65):this.barNode.color=new cc.Color(142,241,233),void(this.timer+=t))},winning:function(){this.winningNode.active=!0,this.player.enabled=!1,this.player.stopMove(),this.currentStar.destroy(),this.btnNode.x=0,cc.audioEngine.stopAll(),cc.audioEngine.playEffect(this.winSFX,!1)},gameOver:function(){this.gameOverNode.active=!0,this.player.enabled=!1,this.player.stopMove(),this.currentStar.destroy(),this.btnNode.x=0,cc.audioEngine.stopAll(),cc.audioEngine.playEffect(this.gameOverSFX,!1)}});cc._RF.pop()},{Player:"Player",ScoreFX:"ScoreFX",StarA:"StarA",StarB:"StarB",StarC:"StarC",StarS:"StarS"}],Player:[function(t,e,i){"use strict";cc._RF.push(e,"0392dzBqw5Pcrj6BuvI0u35","Player"),cc.Class({extends:cc.Component,properties:{jumpHeight:0,jumpDuration:0,squashDuration:0,maxMoveSpeed:0,accel:0,jumpAudio:{default:null,type:cc.AudioClip}},onLoad:function(){this.enabled=!1,this.accLeft=!1,this.accRight=!1,this.xSpeed=0,this.minPosX=-this.node.parent.width/2,this.maxPosX=this.node.parent.width/2,this.jumpAction=this.setJumpAction(),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);var t=cc.Canvas.instance.node;t.on("touchstart",this.onTouchStart,this),t.on("touchend",this.onTouchEnd,this)},onDestroy:function(){cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this),cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);var t=cc.Canvas.instance.node;t.off("touchstart",this.onTouchStart,this),t.off("touchend",this.onTouchEnd,this)},onKeyDown:function(t){switch(t.keyCode){case cc.macro.KEY.a:case cc.macro.KEY.left:this.accLeft=!0,this.accRight=!1;break;case cc.macro.KEY.d:case cc.macro.KEY.right:this.accLeft=!1,this.accRight=!0}},onKeyUp:function(t){switch(t.keyCode){case cc.macro.KEY.a:case cc.macro.KEY.left:this.accLeft=!1;break;case cc.macro.KEY.d:case cc.macro.KEY.right:this.accRight=!1}},onTouchStart:function(t){t.getLocation().x>=cc.winSize.width/2?(this.accLeft=!1,this.accRight=!0):(this.accLeft=!0,this.accRight=!1)},onTouchEnd:function(t){this.accLeft=!1,this.accRight=!1},setJumpAction:function(){var t=cc.moveBy(this.jumpDuration,cc.v2(0,this.jumpHeight)).easing(cc.easeCubicActionOut()),e=cc.moveBy(this.jumpDuration,cc.v2(0,-this.jumpHeight)).easing(cc.easeCubicActionIn()),i=cc.scaleTo(this.squashDuration,1,.6),s=cc.scaleTo(this.squashDuration,1,1.2),n=cc.scaleTo(this.squashDuration,1,1),o=cc.callFunc(this.playJumpSound,this);return cc.repeatForever(cc.sequence(i,s,t,n,e,o))},playJumpSound:function(){cc.audioEngine.playEffect(this.jumpAudio,!1)},getCenterPos:function(){return cc.v2(this.node.x,this.node.y+this.node.height/2)},startMoveAt:function(t){this.enabled=!0,this.xSpeed=0,this.node.setPosition(t),this.node.runAction(this.setJumpAction())},stopMove:function(){this.node.stopAllActions()},update:function(t){this.accLeft?this.xSpeed-=this.accel*t:this.accRight&&(this.xSpeed+=this.accel*t),Math.abs(this.xSpeed)>this.maxMoveSpeed&&(this.xSpeed=this.maxMoveSpeed*this.xSpeed/Math.abs(this.xSpeed)),this.node.x+=this.xSpeed*t,this.node.x>this.node.parent.width/2?(this.node.x=this.node.parent.width/2,this.xSpeed=0):this.node.x<-this.node.parent.width/2&&(this.node.x=-this.node.parent.width/2,this.xSpeed=0)}}),cc._RF.pop()},{}],ScoreAnim:[function(t,e,i){"use strict";cc._RF.push(e,"380b1JxxuNAe5kjWFza8aY5","ScoreAnim"),cc.Class({extends:cc.Component,init:function(t){this.scoreFX=t},hideFX:function(){this.scoreFX.despawn()}}),cc._RF.pop()},{}],ScoreFX:[function(t,e,i){"use strict";cc._RF.push(e,"3a34dvU3ntOxLfBiuOtXfev","ScoreFX"),cc.Class({extends:cc.Component,properties:{anim:{default:null,type:cc.Animation}},init:function(t){this.game=t,this.anim.getComponent("ScoreAnim").init(this)},despawn:function(){this.game.despawnScoreFX(this.node)},play:function(){this.anim.play("score_pop")}}),cc._RF.pop()},{}],StarA:[function(t,e,i){"use strict";cc._RF.push(e,"2c164fH7PZGQLaMv89TWhBc","StarA"),cc.Class({extends:cc.Component,properties:{pickRadius:0,starScore:1},onLoad:function(){this.enabled=!1},init:function(t){this.game=t,this.enabled=!0,this.node.opacity=255,this.node.scale=2},reuse:function(t){this.init(t)},getPlayerDistance:function(){var t=this.game.player.getCenterPos();return this.node.position.sub(t).mag()},onPicked:function(){var t=this.node.getPosition();this.game.gainScore(t,this.starScore),this.game.despawnStarA(this.node)},update:function(t){if(this.getPlayerDistance()<this.pickRadius)this.onPicked();else{var e=1-this.game.timer/this.game.starDuration;this.node.opacity=50+Math.floor(205*e),this.node.scale-=.003,this.node.scale<.01&&(this.node.scale=0)}}}),cc._RF.pop()},{}],StarB:[function(t,e,i){"use strict";cc._RF.push(e,"61f82JSg5lKqrQXiPNRDL4X","StarB"),cc.Class({extends:cc.Component,properties:{pickRadius:0,starScore:1},onLoad:function(){this.enabled=!1},init:function(t){this.game=t,this.enabled=!0,this.node.opacity=255,this.node.scale=2},reuse:function(t){this.init(t)},getPlayerDistance:function(){var t=this.game.player.getCenterPos();return this.node.position.sub(t).mag()},onPicked:function(){var t=this.node.getPosition();this.game.gainScore(t,this.starScore),this.game.despawnStarB(this.node)},update:function(t){if(this.getPlayerDistance()<this.pickRadius)this.onPicked();else{var e=1-this.game.timer/this.game.starDuration;this.node.opacity=50+Math.floor(205*e),this.node.scale-=.003,this.node.scale<.01&&(this.node.scale=0)}}}),cc._RF.pop()},{}],StarC:[function(t,e,i){"use strict";cc._RF.push(e,"703d42UST9AdaQyzp+idDH5","StarC"),cc.Class({extends:cc.Component,properties:{pickRadius:0,starScore:1},onLoad:function(){this.enabled=!1},init:function(t){this.game=t,this.enabled=!0,this.node.opacity=255,this.node.scale=2},reuse:function(t){this.init(t)},getPlayerDistance:function(){var t=this.game.player.getCenterPos();return this.node.position.sub(t).mag()},onPicked:function(){var t=this.node.getPosition();this.game.gainScore(t,this.starScore),this.game.despawnStarC(this.node)},update:function(t){if(this.getPlayerDistance()<this.pickRadius)this.onPicked();else{var e=1-this.game.timer/this.game.starDuration;this.node.opacity=50+Math.floor(205*e),this.node.scale-=.003,this.node.scale<.01&&(this.node.scale=0)}}}),cc._RF.pop()},{}],StarS:[function(t,e,i){"use strict";cc._RF.push(e,"819f68OykFF57SuX33DaQeN","StarS"),cc.Class({extends:cc.Component,properties:{pickRadius:0,starScore:1},onLoad:function(){this.enabled=!1},init:function(t){this.game=t,this.enabled=!0,this.node.opacity=255,this.node.scale=2},reuse:function(t){this.init(t)},getPlayerDistance:function(){var t=this.game.player.getCenterPos();return this.node.position.sub(t).mag()},onPicked:function(){var t=this.node.getPosition();this.game.gainScore(t,this.starScore),this.game.despawnStarS(this.node)},update:function(t){if(this.getPlayerDistance()<this.pickRadius)this.onPicked();else{var e=1-this.game.timer/this.game.starDuration;this.node.opacity=50+Math.floor(205*e),this.node.scale-=.003,this.node.scale<.01&&(this.node.scale=0)}}}),cc._RF.pop()},{}],Star:[function(t,e,i){"use strict";cc._RF.push(e,"64025HGMnZBZIQRC1iNIjFh","Star"),cc.Class({extends:cc.Component,properties:{pickRadius:0,starScore:1},onLoad:function(){this.enabled=!1},init:function(t){this.game=t,this.enabled=!0,this.node.opacity=255,this.node.scale=2},reuse:function(t){this.init(t)},getPlayerDistance:function(){var t=this.game.player.getCenterPos();return this.node.position.sub(t).mag()},onPicked:function(){var t=this.node.getPosition();this.game.gainScore(t,this.starScore),this.game.despawnStar(this.node)},update:function(t){if(this.getPlayerDistance()<this.pickRadius)this.onPicked();else{var e=1-this.game.timer/this.game.starDuration;this.node.opacity=50+Math.floor(205*e),this.node.scale-=.003,this.node.scale<.01&&(this.node.scale=0)}}}),cc._RF.pop()},{}]},{},["Game","Player","ScoreAnim","ScoreFX","Star","StarA","StarB","StarC","StarS"]);