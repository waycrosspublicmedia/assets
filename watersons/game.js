var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var GameEngine = (function (_super) {
            __extends(GameEngine, _super);
            function GameEngine() {
                var _this = _super.call(this, Config.GW, Config.GH, Phaser.CANVAS, Config.DOM_PARENT_ID, null) || this;
                _this.state.add(States.BOOT, Client.Boot, false);
                _this.state.add(States.PRELOADER, Client.Preloader, false);
                _this.state.add(States.MAINMENU, Client.MainMenu, false);
                _this.state.add(States.GAME, Client.Game, false);
                _this.state.add(States.LEVELSELECT, Client.LevelSelect, false);
                _this.state.add(States.INTRO, Client.Intro, false);
                _this.state.add(States.OUTRO, Client.Outro, false);
                _this.state.start(States.BOOT);
                return _this;
            }
            return GameEngine;
        }(Phaser.Game));
        Client.GameEngine = GameEngine;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
window.onload = function () {
    new PhaserGame.Client.GameEngine();
};
var Config;
(function (Config) {
    Config.DOM_PARENT_ID = 'game';
    Config.GW = 640;
    Config.GH = 520;
    Config.GSW = 640;
    Config.GSH = 520;
    Config.FPS = 12;
})(Config || (Config = {}));
var DB;
(function (DB) {
    DB.ITEMS = [
        { name: 'r', fr: 'red-item', sel: 'red-item-sel', sector: 'red-sector' },
        { name: 'g', fr: 'green-item', sel: 'green-item-sel', sector: 'green-sector' },
        { name: 'b', fr: 'blue-item', sel: 'blue-item-sel', sector: 'blue-sector' }
    ];
})(DB || (DB = {}));
var Params;
(function (Params) {
    Params.isMacOS = false;
})(Params || (Params = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var go_Nail_bed = (function (_super) {
            __extends(go_Nail_bed, _super);
            function go_Nail_bed(game, x, y) {
                var _this = _super.call(this, game, x, y, 'geAtlas', 'nail_bed') || this;
                _this.objects = [];
                _this.x = _this.x + _this.width / 2;
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.loadPolygon('physData', 'nail_bed');
                _this.body.fixedRotation = true;
                _this.body.kinematic = true;
                return _this;
            }
            go_Nail_bed.prototype.setObj = function (obj) {
                this.objects.push(obj);
            };
            go_Nail_bed.prototype.setVelobjects = function (velX, velY) {
                for (var i = 0; i < this.objects.length; i++) {
                    this.objects[i].body.velocity.y = velY;
                    this.objects[i].body.velocity.x = velX;
                }
            };
            go_Nail_bed.prototype.open = function () {
                this.body.velocity.y = 400;
                this.setVelobjects(0, 400);
                SndMng.sfxPlay(SndMng.SFX_NAIL_BED_FALLING, 1);
            };
            go_Nail_bed.prototype.update = function () {
                if (this.y >= 115) {
                    this.setVelobjects(0, 0);
                    this.body.velocity.y = 0;
                }
            };
            return go_Nail_bed;
        }(Phaser.Sprite));
        Client.go_Nail_bed = go_Nail_bed;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goBaloon = (function (_super) {
            __extends(goBaloon, _super);
            function goBaloon(game, x, y, atlas, frame) {
                var _this = _super.call(this, game, x, y, atlas, frame) || this;
                _this.timeToDestroy = 120;
                _this.talive = true;
                _this.anchor.set(0.5);
                _this.game.physics.p2.enable(_this);
                _this.body.setCircle(8);
                _this.body.rotateRight(50);
                _this.data.name = 'baloon';
                _this.data.enable = true;
                _this.data.allowSleep = true;
                return _this;
            }
            goBaloon.prototype.update = function () {
                if (this.body) {
                    if (this.data.enable == false) {
                        this.talive = false;
                        this.data.enable = null;
                        this.game.physics.p2.removeBody(this.body);
                        this.animations.add('splash', Phaser.Animation.generateFrameNames('baloon_splash', 1, 27, '', 4), 60, false);
                        this.play('splash').onComplete.addOnce(this.onDestroy, this);
                    }
                }
                if (this.body) {
                    if (this.data.enableTarget == false) {
                        this.data.enable = null;
                        this.game.physics.p2.removeBody(this.body);
                        this.kill();
                        this.talive = false;
                        this.body.static = true;
                    }
                }
                if (this.data.enable) {
                    if ((this.body.velocity.x > -5) && (this.body.velocity.x < 5)) {
                        if ((this.body.velocity.y > -5) && (this.body.velocity.y < 5)) {
                            if (this.timeToDestroy < 0) {
                                this.data.enable = false;
                            }
                            else {
                                this.timeToDestroy--;
                            }
                        }
                        else {
                            this.timeToDestroy = 120;
                        }
                    }
                }
                if ((this.x > Config.GW) || (this.x < 0)) {
                    if (this.data.enable) {
                        this.data.enable = false;
                    }
                }
            };
            goBaloon.prototype.onDestroy = function () {
                this.kill();
            };
            return goBaloon;
        }(Phaser.Sprite));
        Client.goBaloon = goBaloon;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goBasketball_hoop = (function (_super) {
            __extends(goBasketball_hoop, _super);
            function goBasketball_hoop(game, x, y) {
                var _this = _super.call(this, game, x, y, 'geAtlas', 'basketball_hoop') || this;
                _this.x = _this.x + _this.width / 2;
                _this.y = _this.y + (_this.height / 2);
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.loadPolygon('physData', 'basketball_hoop');
                _this.body.static = true;
                _this.data.enable = true;
                return _this;
            }
            goBasketball_hoop.prototype.update = function () {
            };
            return goBasketball_hoop;
        }(Phaser.Sprite));
        Client.goBasketball_hoop = goBasketball_hoop;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goBeeHave = (function (_super) {
            __extends(goBeeHave, _super);
            function goBeeHave(game, x, y, moveRound, tdistance) {
                if (moveRound === void 0) { moveRound = true; }
                if (tdistance === void 0) { tdistance = 100; }
                var _this = _super.call(this, game, x, y, 'geAtlas', 'bee_hive0001') || this;
                _this.tAngle = 0;
                _this.mUP = 'up';
                _this.mDOWN = 'down';
                _this.move = _this.mDOWN;
                _this.animations.add('play', Phaser.Animation.generateFrameNames('bee_hive', 1, 71, '', 4), 60, true);
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.setCircle(20);
                _this.body.kinematic = true;
                _this.data.enable = true;
                _this.data.name = 'spike';
                _this.play('play');
                _this.moveRound = moveRound;
                _this.gX = x;
                _this.gY = y;
                _this.distance = tdistance;
                return _this;
            }
            goBeeHave.prototype.setMoveCenter = function (sX, sY, sAngle) {
                this.cX = sX;
                this.cY = sY;
                this.tAngle = sAngle;
            };
            goBeeHave.prototype.setUp = function (state) {
                if (state === void 0) { state = true; }
                if (state) {
                    this.move = this.mUP;
                }
                else {
                    this.move = this.mDOWN;
                }
            };
            goBeeHave.prototype.fMoveRound = function () {
                this.tAngle -= 1.5;
                if (this.tAngle < 0) {
                    this.tAngle = 360;
                }
                this.body.x = this.cX + 100 * Math.sin(uMath.toRadians(this.tAngle));
                this.body.y = this.cY + 100 * Math.cos(uMath.toRadians(this.tAngle));
            };
            goBeeHave.prototype.fMoveLinear = function () {
                if (this.move == this.mUP) {
                    if (this.y < this.gY + this.distance) {
                        this.body.velocity.y = 40;
                    }
                    else {
                        this.move = this.mDOWN;
                    }
                }
                if (this.move == this.mDOWN) {
                    if (this.y > this.gY - this.distance) {
                        this.body.velocity.y = -40;
                    }
                    else {
                        this.move = this.mUP;
                    }
                }
            };
            goBeeHave.prototype.update = function () {
                if (this.moveRound) {
                    this.fMoveRound();
                }
                else {
                    this.fMoveLinear();
                }
            };
            return goBeeHave;
        }(Phaser.Sprite));
        Client.goBeeHave = goBeeHave;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goBreaking_window = (function (_super) {
            __extends(goBreaking_window, _super);
            function goBreaking_window(game, x, y, height) {
                if (height === void 0) { height = null; }
                var _this = _super.call(this, game, x, y, 'geAtlas', 'breaking_window0001') || this;
                _this.animations.add('play', Phaser.Animation.generateFrameNames('breaking_window', 1, 43, '', 4), 60, false);
                if (height) {
                    _this.height = height;
                }
                _this.x = _this.x + _this.width / 2;
                _this.y = _this.y + (_this.height / 2) - 3;
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.setRectangle(10, _this.height, -_this.width / 2 + 10);
                _this.body.static = true;
                _this.data.enable = true;
                _this.data.breaking = false;
                _this.data.name = 'breaking_window';
                _this.data.enable = true;
                return _this;
            }
            goBreaking_window.prototype.update = function () {
                if (this.data.enable == false) {
                    if (!this.data.breaking) {
                        this.data.breaking = true;
                        this.play('play').onComplete.addOnce(this.onRemoveBody, this);
                        SndMng.sfxPlay(SndMng.SFX_GLASS_WINDOW_BREAK, 1);
                    }
                }
            };
            goBreaking_window.prototype.onRemoveBody = function () {
                this.body.clearShapes();
            };
            return goBreaking_window;
        }(Phaser.Sprite));
        Client.goBreaking_window = goBreaking_window;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goBreakingPlatform = (function (_super) {
            __extends(goBreakingPlatform, _super);
            function goBreakingPlatform(game, x, y) {
                var _this = _super.call(this, game, x, y, 'geAtlas', 'breaking_platform0001') || this;
                _this.mLeft = 'mLeft';
                _this.mRight = 'mRight';
                _this.mNone = 'None';
                _this.move = _this.mRight;
                _this.animations.add('play', Phaser.Animation.generateFrameNames('breaking_platform', 1, 36, '', 4), 60, false);
                _this.y = _this.y + (_this.height / 2) - 3;
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.loadPolygon('physData', 'breaking_platform');
                _this.body.kinematic = true;
                _this.data.enable = true;
                _this.data.breaking = false;
                _this.data.name = 'breaking_window';
                _this.data.enable = true;
                _this.posLeft = x - 100;
                _this.posRight = x + 300;
                return _this;
            }
            goBreakingPlatform.prototype.update = function () {
                if (this.data.enable == false) {
                    if (!this.data.breaking) {
                        this.data.breaking = true;
                        this.play('play');
                        SndMng.sfxPlay(SndMng.SFX_PILLAR_SMASHING, 1);
                        this.body.clearShapes();
                        this.move = this.mNone;
                    }
                }
                if (this.move == this.mRight) {
                    if (this.x < this.posRight) {
                        this.body.velocity.x = 30;
                    }
                    else {
                        this.move = this.mLeft;
                    }
                }
                if (this.move == this.mLeft) {
                    if (this.x > this.posLeft) {
                        this.body.velocity.x = -30;
                    }
                    else {
                        this.move = this.mRight;
                    }
                }
            };
            return goBreakingPlatform;
        }(Phaser.Sprite));
        Client.goBreakingPlatform = goBreakingPlatform;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goBucketPlatform = (function (_super) {
            __extends(goBucketPlatform, _super);
            function goBucketPlatform(game, x, y) {
                var _this = _super.call(this, game, x, y, 'geAtlas', 'bucket_platform') || this;
                _this.mUP = 'up';
                _this.mDOWN = 'down';
                _this.mRIGHT = 'right';
                _this.mLEFT = 'left';
                _this.mOPEN = 'open';
                _this.mCLOSE = 'close';
                _this.move = _this.mDOWN;
                _this.distanceX = 160;
                _this.distanceY = 90;
                _this.y = _this.y + _this.height / 2;
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.loadPolygon('physData', 'bucket_platform');
                _this.body.kinematic = true;
                _this.data.enable = true;
                _this.gX = x;
                _this.gY = y;
                return _this;
            }
            goBucketPlatform.prototype.update = function () {
                if (this.move == this.mDOWN) {
                    if (this.y < this.gY + this.distanceY) {
                        this.body.velocity.y = 30;
                    }
                    else {
                        this.body.velocity.y = 0;
                        this.move = this.mRIGHT;
                    }
                }
                if (this.move == this.mRIGHT) {
                    if (this.x < this.gX + this.distanceX) {
                        this.body.velocity.x = 30;
                    }
                    else {
                        this.body.velocity.x = 0;
                        this.move = this.mOPEN;
                    }
                }
                if (this.move == this.mOPEN) {
                    if (this.angle < 80) {
                        this.body.angularVelocity = 1;
                    }
                    else {
                        this.body.angularVelocity = 0;
                        this.move = this.mCLOSE;
                    }
                }
                if (this.move == this.mCLOSE) {
                    if (this.angle > 0) {
                        this.body.angularVelocity = -1;
                    }
                    else {
                        this.body.angularVelocity = 0;
                        this.move = this.mLEFT;
                    }
                }
                if (this.move == this.mLEFT) {
                    if (this.x > this.gX) {
                        this.body.velocity.x = -30;
                    }
                    else {
                        this.body.velocity.x = 0;
                        this.move = this.mUP;
                    }
                }
                if (this.move == this.mUP) {
                    if (this.y > this.gY) {
                        this.body.velocity.y = -30;
                    }
                    else {
                        this.body.velocity.y = 0;
                        this.move = this.mDOWN;
                    }
                }
            };
            return goBucketPlatform;
        }(Phaser.Sprite));
        Client.goBucketPlatform = goBucketPlatform;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goCarmen = (function (_super) {
            __extends(goCarmen, _super);
            function goCarmen(game, x, y) {
                var _this = _super.call(this, game, x, y, 'carmenAtlas', 'carmen_idle0001') || this;
                _this.tWater = false;
                _this.animations.add('idle', Phaser.Animation.generateFrameNames('carmen_idle', 1, 100, '', 4), 60, true);
                _this.play('idle');
                _this.y = _this.y - _this.height / 2;
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.loadPolygon('physData', 'carmen');
                _this.data.name = 'target';
                _this.body.fixedRotation = true;
                _this.body.kinematic = true;
                _this.thishand = new Phaser.Sprite(_this.game, 0, -_this.height / 2, 'carmenAtlas', 'hand_anim0001');
                _this.thishand.anchor.set(0.5);
                _this.thishand.animations.add('play', Phaser.Animation.generateFrameNames('hand_anim', 1, 72, '', 4), 60, true);
                _this.thishand.play('play');
                _this.addChild(_this.thishand);
                return _this;
            }
            goCarmen.prototype.update = function () {
                if (this.data.name == 'target') {
                    if (this.data.enable == false) {
                        this.data.name = 'pass';
                        this.setVictory();
                        this.tWater = true;
                    }
                }
            };
            goCarmen.prototype.setVictory = function () {
                SndMng.sfxPlay(SndMng.SFX_BALOON_SPLASH, 1);
                this.thishand.visible = false;
                this.thisVictory = new Phaser.Sprite(this.game, 0, 0, 'carmenAtlas', 'carmen_victory0001');
                this.thisVictory.anchor.set(0.55, 0.68);
                this.thisVictory.animations.add('victory', Phaser.Animation.generateFrameNames('carmen_victory', 1, 57, '', 4), 60, true);
                this.thisVictory.play('victory');
                this.addChild(this.thisVictory);
                this.animations.add('rotate', Phaser.Animation.generateFrameNames('rotate_effect', 1, 9, '', 4), 10, true);
                this.play('rotate');
                this.waterSplash = new Phaser.Sprite(this.game, 0, 0, 'carmenAtlas', 'water_splash0001');
                this.waterSplash.anchor.set(0.5, 0.55);
                this.waterSplash.animations.add('play', Phaser.Animation.generateFrameNames('water_splash', 1, 49, '', 4), 60, false);
                this.waterSplash.play('play').onComplete.addOnce(this.onCompleteWaterSplash, this);
                this.addChild(this.waterSplash);
                this.cool = new Phaser.Sprite(this.game, 0, 0, 'carmenAtlas', 'cool0001');
                this.cool.animations.add('play', Phaser.Animation.generateFrameNames('cool', 1, 8, '', 4), 60, true);
                this.cool.anchor.set(0.5);
                this.addChild(this.cool);
                this.game.add.tween(this.cool).to({ y: -47 }, 100, Phaser.Easing.Linear.None, true);
                this.cool.play('play');
            };
            goCarmen.prototype.onCompleteWaterSplash = function () {
                this.waterSplash.visible = false;
            };
            goCarmen.prototype.victoryLoop = function () {
                this.thisVictory.anchor.set(0.5);
                this.thisVictory.play('victory_loop');
            };
            return goCarmen;
        }(Phaser.Sprite));
        Client.goCarmen = goCarmen;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goCarrie = (function (_super) {
            __extends(goCarrie, _super);
            function goCarrie(game, x, y) {
                var _this = _super.call(this, game, x, y, 'carrieAtlas', 'carrie_idle0001') || this;
                _this.tWater = false;
                _this.animations.add('idle', Phaser.Animation.generateFrameNames('carrie_idle', 1, 60, '', 4), 60, true);
                _this.play('idle');
                _this.y = _this.y - _this.height / 2;
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.loadPolygon('physData', 'carrie');
                _this.data.name = 'target';
                _this.body.fixedRotation = true;
                _this.body.kinematic = true;
                _this.thishand = new Phaser.Sprite(_this.game, 0, -_this.height / 2, 'carrieAtlas', 'hand_anim0001');
                _this.thishand.anchor.set(0.5);
                _this.thishand.animations.add('play', Phaser.Animation.generateFrameNames('hand_anim', 1, 72, '', 4), 60, true);
                _this.thishand.play('play');
                _this.addChild(_this.thishand);
                return _this;
            }
            goCarrie.prototype.setVelocity = function (x, y) {
                this.body.velocity.x = x;
                this.body.velocity.y = y;
            };
            goCarrie.prototype.update = function () {
                if (this.data.name == 'target') {
                    if (this.data.enable == false) {
                        this.data.name = 'pass';
                        this.setVictory();
                        this.tWater = true;
                    }
                }
            };
            goCarrie.prototype.setVictory = function () {
                SndMng.sfxPlay(SndMng.SFX_BALOON_SPLASH, 1);
                this.thishand.visible = false;
                this.thisVictory = new Phaser.Sprite(this.game, 0, 0, 'carrieAtlas', 'carrie_victory0001');
                this.thisVictory.anchor.set(0.55, 0.68);
                this.thisVictory.animations.add('victory', Phaser.Animation.generateFrameNames('carrie_victory', 1, 40, '', 4), 60, false);
                this.thisVictory.animations.add('victory_loop', Phaser.Animation.generateFrameNames('carrie_victory_loop', 1, 60, '', 4), 60, true);
                this.thisVictory.play('victory').onComplete.addOnce(this.victoryLoop, this);
                this.addChild(this.thisVictory);
                this.animations.add('rotate', Phaser.Animation.generateFrameNames('rotate_effect', 1, 9, '', 4), 10, true);
                this.play('rotate');
                this.waterSplash = new Phaser.Sprite(this.game, 0, 0, 'carrieAtlas', 'water_splash0001');
                this.waterSplash.anchor.set(0.5, 0.55);
                this.waterSplash.animations.add('play', Phaser.Animation.generateFrameNames('water_splash', 1, 49, '', 4), 60, false);
                this.waterSplash.play('play').onComplete.addOnce(this.onCompleteWaterSplash, this);
                this.addChild(this.waterSplash);
                this.cool = new Phaser.Sprite(this.game, 0, 0, 'carrieAtlas', 'cool0001');
                this.cool.animations.add('play', Phaser.Animation.generateFrameNames('cool', 1, 8, '', 4), 60, true);
                this.cool.anchor.set(0.5);
                this.addChild(this.cool);
                this.game.add.tween(this.cool).to({ y: -47 }, 100, Phaser.Easing.Linear.None, true);
                this.cool.play('play');
            };
            goCarrie.prototype.onCompleteWaterSplash = function () {
                this.waterSplash.visible = false;
            };
            goCarrie.prototype.victoryLoop = function () {
                this.thisVictory.anchor.set(0.5);
                this.thisVictory.play('victory_loop');
            };
            return goCarrie;
        }(Phaser.Sprite));
        Client.goCarrie = goCarrie;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goDarwin = (function (_super) {
            __extends(goDarwin, _super);
            function goDarwin(game, x, y) {
                var _this = _super.call(this, game, x, y, 'playerAtlas', 'darwin_idle0001') || this;
                _this.fireEnable = false;
                _this.snd = false;
                _this.onReady = new Phaser.Signal();
                _this.animations.add('idle', Phaser.Animation.generateFrameNames('darwin_idle', 1, 50, '', 4), 60, true);
                _this.animations.add('run', Phaser.Animation.generateFrameNames('darwin_run', 1, 25, '', 4), 60, true);
                _this.animations.add('victory', Phaser.Animation.generateFrameNames('darwin_victory', 1, 21, '', 4), 60, true);
                _this.animations.add('ready', Phaser.Animation.generateFrameNames('darwin_ready', 1, 1, '', 4), 60, true);
                _this.head = new Phaser.Sprite(game, -27, -3, 'playerAtlas', 'darwin_head0001');
                _this.head.animations.add('head', Phaser.Animation.generateFrameNames('darwin_head', 1, 50, '', 4), 60, true);
                _this.head.play('head');
                _this.head.anchor.set(0.48, 0.8);
                _this.addChild(_this.head);
                _this.fire = new Phaser.Sprite(game, -28, -6, 'playerAtlas', 'darwin_fire0001');
                _this.fire.animations.add('fire', Phaser.Animation.generateFrameNames('darwin_fire', 1, 28, '', 4), 60, false);
                _this.fire.anchor.set(0.5);
                _this.addChild(_this.fire);
                _this.power = new Phaser.Sprite(game, -30, 0, 'playerAtlas', 'power0001');
                _this.power.animations.add('play', Phaser.Animation.generateFrameNames('power', 1, 100, '', 4), 60, false);
                _this.power.anchor.set(-0.08, 0.5);
                _this.addChild(_this.power);
                return _this;
            }
            goDarwin.prototype.swichAnimIdle = function () {
                var draw = false;
                var pname = 'Useddarwin';
                this.onReady.dispatch(draw, pname);
                this.fire.visible = false;
                this.head.visible = false;
                this.fire.visible = false;
                this.power.visible = false;
                this.play('idle');
            };
            goDarwin.prototype.swichAnimRun = function () {
                var draw = false;
                var pname = 'Useddarwin';
                this.onReady.dispatch(draw, pname);
                this.fire.visible = false;
                this.head.visible = false;
                this.fire.visible = false;
                this.power.visible = false;
                this.play('run');
            };
            goDarwin.prototype.swichAnimVictory = function () {
                var draw = false;
                var pname = 'Useddarwin';
                this.onReady.dispatch(draw, pname);
                this.fire.visible = false;
                this.head.visible = false;
                this.fire.visible = false;
                this.power.visible = false;
                this.play('victory');
            };
            goDarwin.prototype.swichAnimReady = function () {
                var draw = true;
                var pname = 'Useddarwin';
                this.onReady.dispatch(draw, pname);
                this.fireEnable = true;
                this.fire.visible = true;
                this.head.visible = true;
                this.power.visible = true;
                this.play('ready');
            };
            goDarwin.prototype.playAnimFire = function () {
                var draw = false;
                var pname = 'Useddarwin';
                this.onReady.dispatch(draw, pname);
                this.fireEnable = false;
                this.power.visible = false;
                if (!this.snd) {
                    SndMng.sfxPlay(SndMng.SFX_THROW_WOOSH);
                }
                else {
                    SndMng.sfxPlay(SndMng.SFX_THROW_WOOSH_2);
                }
                this.snd = !this.snd;
                this.fire.play('fire').onComplete.addOnce(this.onFireReady, this);
            };
            goDarwin.prototype.onFireReady = function () {
                var draw = true;
                var pname = 'Useddarwin';
                this.onReady.dispatch(draw, pname);
                this.fireEnable = true;
                this.power.visible = true;
                this.fire.frame = 0;
            };
            return goDarwin;
        }(Phaser.Sprite));
        Client.goDarwin = goDarwin;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goFire = (function (_super) {
            __extends(goFire, _super);
            function goFire(game, x, y, tstatic) {
                if (tstatic === void 0) { tstatic = true; }
                var _this = _super.call(this, game, x, y, 'geAtlas', 'fire0001') || this;
                _this.y = _this.y - _this.height / 2 + 1;
                _this.game.physics.p2.enable(_this);
                _this.animations.add('play', Phaser.Animation.generateFrameNames('fire', 1, 36, '', 4), 60, true);
                _this.body.clearShapes();
                _this.body.loadPolygon('physData', 'fire');
                if (tstatic) {
                    _this.body.kinematic = true;
                }
                _this.data.enable = true;
                _this.data.name = 'spike';
                _this.body.fixedRotation = true;
                _this.body.mass = 1000;
                _this.play('play');
                _this.sound = SndMng.sfxPlay(SndMng.SFX_FIRE_LOOP, 0.5);
                return _this;
            }
            goFire.prototype.setVel = function (vX, vY) {
                this.body.velocity.x = vX;
                this.body.velocity.y = vY;
            };
            goFire.prototype.update = function () {
                if (this.sound.currentTime == this.sound.durationMS) {
                    this.sound = SndMng.sfxPlay(SndMng.SFX_FIRE_LOOP, 0.5);
                }
            };
            return goFire;
        }(Phaser.Sprite));
        Client.goFire = goFire;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goGate = (function (_super) {
            __extends(goGate, _super);
            function goGate(game, x, y, length, tangle) {
                if (tangle === void 0) { tangle = 0; }
                var _this = _super.call(this, game, x, y) || this;
                _this.timeToChange = -1;
                _this.maxTimeOpen = 0;
                _this.maxTimeClose = 0;
                _this.autoOpen = false;
                _this.stOpen = 'open';
                _this.stClose = 'close';
                _this.currentState = _this.stClose;
                _this.game.physics.p2.enable(_this);
                _this.body.setRectangle(20, length, 20 / 2, Number(length) / 2);
                _this.body.static = true;
                _this.data.enable = true;
                _this.body.angle = tangle;
                _this.loker = new Phaser.Sprite(game, 0, 0, 'geAtlas', 'gate_lock');
                _this.addChild(_this.loker);
                _this.gate = new Phaser.Sprite(game, 2, length, 'geAtlas', 'gate_long');
                _this.gate.anchor.set(0, 1);
                _this.addChild(_this.gate);
                var mask = new Phaser.Graphics(_this.game, 0, 0);
                mask.beginFill(0xffffff);
                mask.drawPolygon(0, _this.loker.height, 20, _this.loker.height, 20, length, 0, length);
                mask.x = 0;
                mask.y = 0;
                _this.addChild(mask);
                _this.gate.mask = mask;
                _this.lengthGate = length;
                return _this;
            }
            goGate.prototype.setTimeToAutoOpen = function (timeOpen, timeClose) {
                if (timeClose === void 0) { timeClose = null; }
                this.maxTimeClose = timeOpen;
                this.maxTimeOpen = timeOpen;
                this.timeToChange = timeOpen;
                this.autoOpen = true;
                if (timeClose) {
                    this.maxTimeClose = timeClose;
                }
            };
            goGate.prototype.open = function () {
                this.currentState = this.stOpen;
                this.body.clearShapes();
                this.body.setRectangle(20, 20, 20 / 2, 20 / 2);
                this.game.add.tween(this.gate).to({ y: 30 }, 100, Phaser.Easing.Linear.None, true);
                SndMng.sfxPlay(SndMng.SFX_GATE_OPEN, 1);
                this.timeToChange = this.maxTimeClose;
            };
            goGate.prototype.close = function () {
                this.currentState = this.stClose;
                this.body.clearShapes();
                this.body.setRectangle(20, this.lengthGate, 20 / 2, Number(this.lengthGate) / 2);
                this.game.add.tween(this.gate).to({ y: this.lengthGate }, 100, Phaser.Easing.Linear.None, true);
                SndMng.sfxPlay(SndMng.SFX_GATE_OPEN, 1);
                this.timeToChange = this.maxTimeOpen;
            };
            goGate.prototype.update = function () {
                if (this.autoOpen) {
                    if (this.timeToChange <= 0) {
                        if (this.currentState == this.stOpen) {
                            this.close();
                        }
                        else {
                            this.open();
                        }
                    }
                    else {
                        this.timeToChange--;
                    }
                }
            };
            return goGate;
        }(Phaser.Sprite));
        Client.goGate = goGate;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goGenericPlatform = (function (_super) {
            __extends(goGenericPlatform, _super);
            function goGenericPlatform(game, x, y) {
                var _this = _super.call(this, game, x, y, 'geAtlas', 'generic_platform') || this;
                _this.mLEFT = 'left';
                _this.mRIGHT = 'right';
                _this.move = _this.mRIGHT;
                _this.distance = 50;
                _this.objects = [];
                _this.x = _this.x + _this.width / 2;
                _this.y = _this.y + _this.height / 2;
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.loadPolygon('physData', 'generic_platform');
                _this.body.kinematic = true;
                _this.data.enable = true;
                _this.body.mass = 1000;
                _this.gX = x;
                _this.gY = y;
                return _this;
            }
            goGenericPlatform.prototype.setObj = function (obj) {
                this.objects.push(obj);
            };
            goGenericPlatform.prototype.update = function () {
                if (this.move == this.mRIGHT) {
                    if (this.x - this.width / 2 < this.gX + this.distance) {
                        this.body.velocity.x = 35;
                    }
                    else {
                        this.move = this.mLEFT;
                    }
                }
                if (this.move == this.mLEFT) {
                    if (this.x - this.width / 2 > this.gX - this.distance) {
                        this.body.velocity.x = -35;
                    }
                    else {
                        this.move = this.mRIGHT;
                    }
                }
                for (var i = 0; i < this.objects.length; i++) {
                    this.objects[i].setVel(this.body.velocity.x, this.body.velocity.y);
                }
            };
            return goGenericPlatform;
        }(Phaser.Sprite));
        Client.goGenericPlatform = goGenericPlatform;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goGumball = (function (_super) {
            __extends(goGumball, _super);
            function goGumball(game, x, y) {
                var _this = _super.call(this, game, x, y, 'playerAtlas', 'gumball_idle0001') || this;
                _this.fireEnable = false;
                _this.snd = false;
                _this.onReady = new Phaser.Signal();
                _this.sX = x;
                _this.sY = y;
                _this.animations.add('idle', Phaser.Animation.generateFrameNames('gumball_idle', 1, 79, '', 4), 60, true);
                _this.animations.add('run', Phaser.Animation.generateFrameNames('gumball_run', 1, 54, '', 4), 60, true);
                _this.animations.add('victory', Phaser.Animation.generateFrameNames('gumball_victory', 1, 25, '', 4), 60, false);
                _this.animations.add('victory_loop', Phaser.Animation.generateFrameNames('gumball_victory_loop', 1, 60, '', 4), 60, true);
                _this.animations.add('ready', Phaser.Animation.generateFrameNames('gumball_ready', 1, 79, '', 4), 60, true);
                _this.anchor.set(0.5);
                _this.head = new Phaser.Sprite(game, -25, 5, 'playerAtlas', 'gumball_head0001');
                _this.head.animations.add('head', Phaser.Animation.generateFrameNames('gumball_head', 1, 79, '', 4), 60, true);
                _this.head.play('head');
                _this.head.anchor.set(0.5, 1);
                _this.addChild(_this.head);
                _this.fire = new Phaser.Sprite(game, -21, -1, 'playerAtlas', 'gumball_fire0001');
                _this.fire.animations.add('fire', Phaser.Animation.generateFrameNames('gumball_fire', 1, 21, '', 4), 60, false);
                _this.fire.anchor.set(0.5);
                _this.addChild(_this.fire);
                _this.power = new Phaser.Sprite(game, -30, 0, 'playerAtlas', 'power0001');
                _this.power.animations.add('play', Phaser.Animation.generateFrameNames('power', 1, 100, '', 4), 60, false);
                _this.power.anchor.set(-0.08, 0.5);
                _this.addChild(_this.power);
                return _this;
            }
            goGumball.prototype.swichAnimIdle = function () {
                var draw = false;
                var pname = 'UsedGumball';
                this.onReady.dispatch(draw, pname);
                this.fire.visible = false;
                this.head.visible = false;
                this.fire.visible = false;
                this.power.visible = false;
                this.play('idle');
            };
            goGumball.prototype.swichAnimRun = function () {
                this.y = this.sY - 8;
                var draw = false;
                var pname = 'UsedGumball';
                this.onReady.dispatch(draw, pname);
                this.fire.visible = false;
                this.head.visible = false;
                this.fire.visible = false;
                this.power.visible = false;
                this.play('run');
            };
            goGumball.prototype.swichAnimVictory = function () {
                this.y = this.sY - 10;
                this.x = this.x + 12;
                var draw = false;
                var pname = 'UsedGumball';
                this.onReady.dispatch(draw, pname);
                this.fire.visible = false;
                this.head.visible = false;
                this.fire.visible = false;
                this.power.visible = false;
                this.play('victory').onComplete.addOnce(this.animVictoryLoop, this);
            };
            goGumball.prototype.animVictoryLoop = function () {
                this.y = this.sY - 3;
                this.x = this.x - 9;
                this.play('victory_loop');
            };
            goGumball.prototype.swichAnimReady = function () {
                this.y = this.sY - 2;
                var draw = true;
                var pname = 'UsedGumball';
                this.onReady.dispatch(draw, pname);
                this.fireEnable = true;
                this.fire.visible = true;
                this.head.visible = true;
                this.power.visible = true;
                this.play('ready');
            };
            goGumball.prototype.playAnimFire = function () {
                var draw = false;
                var pname = 'UsedGumball';
                this.onReady.dispatch(draw, pname);
                this.fireEnable = false;
                this.power.visible = false;
                if (!this.snd) {
                    SndMng.sfxPlay(SndMng.SFX_THROW_WOOSH);
                }
                else {
                    SndMng.sfxPlay(SndMng.SFX_THROW_WOOSH_2);
                }
                this.snd = !this.snd;
                this.fire.play('fire').onComplete.addOnce(this.onFireReady, this);
            };
            goGumball.prototype.onFireReady = function () {
                var draw = true;
                var pname = 'UsedGumball';
                this.onReady.dispatch(draw, pname);
                this.fireEnable = true;
                this.power.visible = true;
                this.fire.frameName = 'gumball_fire0001';
            };
            return goGumball;
        }(Phaser.Sprite));
        Client.goGumball = goGumball;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goHeadgehog = (function (_super) {
            __extends(goHeadgehog, _super);
            function goHeadgehog(game, x, y) {
                var _this = _super.call(this, game, x, y, 'geAtlas', 'hedgehog0001') || this;
                _this.animations.add('idle', Phaser.Animation.generateFrameNames('hedgehog', 1, 94, '', 4), 60, true);
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.loadPolygon('physData', 'hedgehog');
                _this.body.kinematic = true;
                _this.data.enable = true;
                _this.data.name = 'spike';
                _this.play('idle');
                return _this;
            }
            goHeadgehog.prototype.setVel = function (vX, vY) {
                this.body.velocity.x = vX;
                this.body.velocity.y = vY;
            };
            goHeadgehog.prototype.update = function () {
            };
            return goHeadgehog;
        }(Phaser.Sprite));
        Client.goHeadgehog = goHeadgehog;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goJoe = (function (_super) {
            __extends(goJoe, _super);
            function goJoe(game, x, y) {
                var _this = _super.call(this, game, x, y, 'joeAtlas', 'joe_idle0001') || this;
                _this.tWater = false;
                _this.animations.add('idle', Phaser.Animation.generateFrameNames('joe_idle', 1, 79, '', 4), 60, true);
                _this.play('idle');
                _this.y = _this.y - _this.height / 2;
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.loadPolygon('physData', 'joe');
                _this.data.name = 'target';
                _this.body.fixedRotation = true;
                _this.body.kinematic = true;
                _this.thishand = new Phaser.Sprite(_this.game, 0, -_this.height / 2, 'joeAtlas', 'hand_anim0001');
                _this.thishand.anchor.set(0.5);
                _this.thishand.animations.add('play', Phaser.Animation.generateFrameNames('hand_anim', 1, 72, '', 4), 60, true);
                _this.thishand.play('play');
                _this.addChild(_this.thishand);
                return _this;
            }
            goJoe.prototype.update = function () {
                if (this.data.name == 'target') {
                    if (this.data.enable == false) {
                        this.data.name = 'pass';
                        this.setVictory();
                        this.tWater = true;
                    }
                }
            };
            goJoe.prototype.setVictory = function () {
                SndMng.sfxPlay(SndMng.SFX_BALOON_SPLASH, 1);
                this.thishand.visible = false;
                this.thisVictory = new Phaser.Sprite(this.game, 0, 0, 'joeAtlas', 'joe_victory0001');
                this.thisVictory.anchor.set(0.55, 0.68);
                this.thisVictory.animations.add('victory', Phaser.Animation.generateFrameNames('joe_victory', 1, 36, '', 4), 60, true);
                this.thisVictory.play('victory');
                this.addChild(this.thisVictory);
                this.animations.add('rotate', Phaser.Animation.generateFrameNames('rotate_effect', 1, 9, '', 4), 10, true);
                this.play('rotate');
                this.waterSplash = new Phaser.Sprite(this.game, 0, 0, 'joeAtlas', 'water_splash0001');
                this.waterSplash.anchor.set(0.5, 0.55);
                this.waterSplash.animations.add('play', Phaser.Animation.generateFrameNames('water_splash', 1, 49, '', 4), 60, false);
                this.waterSplash.play('play').onComplete.addOnce(this.onCompleteWaterSplash, this);
                this.addChild(this.waterSplash);
                this.cool = new Phaser.Sprite(this.game, 0, 0, 'joeAtlas', 'cool0001');
                this.cool.animations.add('play', Phaser.Animation.generateFrameNames('cool', 1, 8, '', 4), 60, true);
                this.cool.anchor.set(0.5);
                this.addChild(this.cool);
                this.game.add.tween(this.cool).to({ y: -47 }, 100, Phaser.Easing.Linear.None, true);
                this.cool.play('play');
            };
            goJoe.prototype.onCompleteWaterSplash = function () {
                this.waterSplash.visible = false;
            };
            goJoe.prototype.victoryLoop = function () {
                this.thisVictory.anchor.set(0.5);
                this.thisVictory.play('victory_loop');
            };
            return goJoe;
        }(Phaser.Sprite));
        Client.goJoe = goJoe;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goLever = (function (_super) {
            __extends(goLever, _super);
            function goLever(game, x, y, lever_block) {
                var _this = _super.call(this, game, x, y, 'geAtlas', 'lever0001') || this;
                _this.objArr = [];
                _this.currentTime = -1;
                _this.x = x + 15;
                _this.y = y - 3;
                _this.animations.add('open', Phaser.Animation.generateFrameNames('lever', 1, 21, '', 4), 60, false);
                _this.animations.add('close', Phaser.Animation.generateFrameNames('lever', 21, 42, '', 4), 60, false);
                _this.game.physics.p2.enable(_this);
                _this.body.setRectangle(50, 50);
                _this.body.clearShapes();
                _this.body.loadPolygon('physData', 'close');
                _this.body.kinematic = true;
                _this.data.enable = true;
                _this.data.name = 'close';
                _this.icon = new Phaser.Sprite(_this.game, -3, 0, 'geAtlas', lever_block);
                _this.icon.anchor.set(0.5, 0);
                _this.addChild(_this.icon);
                return _this;
            }
            goLever.prototype.addObject = function (obj) {
                this.objArr.push(obj);
            };
            goLever.prototype.setTime = function (tTime) {
                this.currentTime = tTime;
                this.totalTime = tTime;
            };
            goLever.prototype.update = function () {
                if (this.data.name == 'close') {
                    if (this.data.enable == false) {
                        this.data.name = 'open';
                        this.play('open');
                        SndMng.sfxPlay(SndMng.SFX_SWITCH_HIT, 1);
                        this.body.clearShapes();
                        this.body.loadPolygon('physData', 'open');
                        for (var i = 0; i < this.objArr.length; i++) {
                            this.objArr[i].open();
                        }
                    }
                }
                if (this.currentTime != -1) {
                    if (this.data.name == 'open') {
                        if (this.currentTime > 0) {
                            this.currentTime--;
                        }
                        else {
                            this.currentTime = this.totalTime;
                            this.data.name = 'close';
                            this.play('close');
                            SndMng.sfxPlay(SndMng.SFX_SWITCH_HIT, 1);
                            this.body.clearShapes();
                            this.body.loadPolygon('physData', 'close');
                            this.data.enable = true;
                            for (var i = 0; i < this.objArr.length; i++) {
                                this.objArr[i].close();
                            }
                        }
                    }
                }
            };
            return goLever;
        }(Phaser.Sprite));
        Client.goLever = goLever;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goPenny = (function (_super) {
            __extends(goPenny, _super);
            function goPenny(game, x, y) {
                var _this = _super.call(this, game, x, y, 'pennyAtlas', 'penny_idle0001') || this;
                _this.tWater = false;
                _this.animations.add('idle', Phaser.Animation.generateFrameNames('penny_idle', 1, 100, '', 4), 60, true);
                _this.play('idle');
                _this.y = _this.y - _this.height / 2;
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.loadPolygon('physData', 'penny');
                _this.data.name = 'target';
                _this.body.fixedRotation = true;
                _this.body.kinematic = true;
                _this.thishand = new Phaser.Sprite(_this.game, 0, -_this.height / 2, 'pennyAtlas', 'hand_anim0001');
                _this.thishand.anchor.set(0.5);
                _this.thishand.animations.add('play', Phaser.Animation.generateFrameNames('hand_anim', 1, 72, '', 4), 60, true);
                _this.thishand.play('play');
                _this.addChild(_this.thishand);
                return _this;
            }
            goPenny.prototype.update = function () {
                if (this.data.name == 'target') {
                    if (this.data.enable == false) {
                        this.data.name = 'pass';
                        this.setVictory();
                        this.tWater = true;
                    }
                }
            };
            goPenny.prototype.setVictory = function () {
                SndMng.sfxPlay(SndMng.SFX_BALOON_SPLASH, 1);
                this.thishand.visible = false;
                this.thisVictory = new Phaser.Sprite(this.game, 0, 0, 'pennyAtlas', 'penny_victory0001');
                this.thisVictory.anchor.set(0.55, 0.68);
                this.thisVictory.animations.add('victory', Phaser.Animation.generateFrameNames('penny_victory', 1, 40, '', 4), 60, false);
                this.thisVictory.animations.add('victory_loop', Phaser.Animation.generateFrameNames('penny_victory_loop', 1, 101, '', 4), 60, true);
                this.thisVictory.play('victory').onComplete.addOnce(this.victoryLoop, this);
                this.addChild(this.thisVictory);
                this.animations.add('rotate', Phaser.Animation.generateFrameNames('rotate_effect', 1, 9, '', 4), 10, true);
                this.play('rotate');
                this.waterSplash = new Phaser.Sprite(this.game, 0, 0, 'pennyAtlas', 'water_splash0001');
                this.waterSplash.anchor.set(0.5, 0.3);
                this.waterSplash.animations.add('play', Phaser.Animation.generateFrameNames('water_splash', 1, 49, '', 4), 60, false);
                this.waterSplash.play('play').onComplete.addOnce(this.onCompleteWaterSplash, this);
                this.addChild(this.waterSplash);
                this.cool = new Phaser.Sprite(this.game, 0, 0, 'tobiasAtlas', 'cool0001');
                this.cool.animations.add('play', Phaser.Animation.generateFrameNames('cool', 1, 8, '', 4), 60, true);
                this.cool.anchor.set(0.5);
                this.addChild(this.cool);
                this.game.add.tween(this.cool).to({ y: -47 }, 100, Phaser.Easing.Linear.None, true);
                this.cool.play('play');
            };
            goPenny.prototype.onCompleteWaterSplash = function () {
                this.waterSplash.visible = false;
            };
            goPenny.prototype.victoryLoop = function () {
                this.thisVictory.anchor.set(0.5);
                this.thisVictory.play('victory_loop');
            };
            return goPenny;
        }(Phaser.Sprite));
        Client.goPenny = goPenny;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goPlatform_block = (function (_super) {
            __extends(goPlatform_block, _super);
            function goPlatform_block(game, x, y, numBlock) {
                var _this = _super.call(this, game, x, y, 'geAtlas', 'platform_block') || this;
                _this.x = _this.x + _this.width / 2;
                _this.y = _this.y + _this.height / 2;
                _this.game.physics.p2.enable(_this);
                _this.body.setRectangle(((_this.width - 2) * numBlock), _this.height, (((_this.width - 2) * numBlock) / 2) - (_this.width / 2));
                _this.body.static = true;
                _this.data.enable = true;
                for (var i = 0; i < numBlock - 1; i++) {
                    var block = new Phaser.Sprite(_this.game, (_this.width / 2) - (2) + ((_this.width - 2) * i), -_this.height / 2, 'geAtlas', 'platform_block');
                    _this.addChild(block);
                }
                return _this;
            }
            goPlatform_block.prototype.update = function () {
            };
            return goPlatform_block;
        }(Phaser.Sprite));
        Client.goPlatform_block = goPlatform_block;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goPlatform1 = (function (_super) {
            __extends(goPlatform1, _super);
            function goPlatform1(game, x, y, width, angle) {
                if (width === void 0) { width = null; }
                if (angle === void 0) { angle = null; }
                var _this = _super.call(this, game, x, y, 'geAtlas', 'platform1') || this;
                if (width != null) {
                    _this.width = width;
                }
                _this.x = _this.x + _this.width / 2;
                _this.y = _this.y + _this.height / 2;
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.loadPolygon('physData', 'platform1');
                _this.body.static = true;
                _this.data.enable = true;
                if (angle != null) {
                    _this.body.angle = angle;
                }
                return _this;
            }
            goPlatform1.prototype.update = function () {
            };
            return goPlatform1;
        }(Phaser.Sprite));
        Client.goPlatform1 = goPlatform1;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goPlatform2 = (function (_super) {
            __extends(goPlatform2, _super);
            function goPlatform2(game, x, y, width, angle) {
                if (width === void 0) { width = null; }
                if (angle === void 0) { angle = null; }
                var _this = _super.call(this, game, x, y, 'geAtlas', 'platform1') || this;
                if (width != null) {
                    _this.width = width;
                }
                _this.x = _this.x + _this.width / 2;
                _this.y = _this.y + _this.height * 1.5;
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.setRectangle(_this.width, _this.height);
                _this.body.static = true;
                _this.data.enable = true;
                if (angle != null) {
                    _this.body.angle = angle;
                }
                return _this;
            }
            goPlatform2.prototype.update = function () {
            };
            return goPlatform2;
        }(Phaser.Sprite));
        Client.goPlatform2 = goPlatform2;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goPlatform3 = (function (_super) {
            __extends(goPlatform3, _super);
            function goPlatform3(game, x, y, width, angle) {
                if (width === void 0) { width = null; }
                if (angle === void 0) { angle = null; }
                var _this = _super.call(this, game, x, y, 'geAtlas', 'generic_platform') || this;
                _this.LEFT = 'left';
                _this.RIGHT = 'right';
                _this.NONE = 'none';
                _this.move = _this.NONE;
                _this.objects = [];
                if (width != null) {
                    _this.width = width;
                }
                _this.x = _this.x + _this.width / 2;
                _this.y = _this.y + _this.height / 2;
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.setRectangle(_this.width, _this.height);
                _this.body.static = true;
                _this.data.enable = true;
                if (angle != null) {
                    _this.body.angle = angle;
                }
                _this.posX = _this.x;
                return _this;
            }
            goPlatform3.prototype.setLength = function (len) {
                this.length = len;
            };
            goPlatform3.prototype.setObj = function (obj) {
                this.objects.push(obj);
            };
            goPlatform3.prototype.open = function () {
                this.move = this.LEFT;
            };
            goPlatform3.prototype.update = function () {
                if (this.move == this.LEFT) {
                    if (this.x > this.posX - this.length) {
                        this.body.velocity.x = -350;
                        for (var i = 0; i < this.objects.length; i++) {
                            this.objects[i].body.velocity.x = -350;
                        }
                    }
                    else {
                        this.move = this.NONE;
                    }
                }
                if (this.move == this.NONE) {
                    this.body.velocity.x = 0;
                    for (var i = 0; i < this.objects.length; i++) {
                        this.objects[i].body.velocity.x = 0;
                    }
                }
            };
            return goPlatform3;
        }(Phaser.Sprite));
        Client.goPlatform3 = goPlatform3;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goPlatform4 = (function (_super) {
            __extends(goPlatform4, _super);
            function goPlatform4(game, x, y, width, angle) {
                if (width === void 0) { width = null; }
                if (angle === void 0) { angle = null; }
                var _this = _super.call(this, game, x, y, 'geAtlas', 'generic_platform') || this;
                _this.LEFT = 'left';
                _this.RIGHT = 'right';
                _this.NONE = 'none';
                _this.move = _this.NONE;
                _this.objects = [];
                if (width != null) {
                    _this.width = width;
                }
                _this.x = _this.x + _this.width / 2;
                _this.y = _this.y + _this.height / 2;
                _this.x += 5;
                _this.y += 15;
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.setRectangle(_this.width, _this.height);
                _this.body.static = true;
                _this.data.enable = true;
                if (angle != null) {
                    _this.body.angle = angle;
                }
                _this.posX = _this.x;
                return _this;
            }
            goPlatform4.prototype.setLength = function (len) {
                this.length = len;
            };
            goPlatform4.prototype.setObj = function (obj) {
                this.objects.push(obj);
            };
            goPlatform4.prototype.open = function () {
                this.move = this.RIGHT;
                SndMng.sfxPlay(SndMng.SFX_SLIDING_SLAB, 1);
            };
            goPlatform4.prototype.close = function () {
                this.move = this.LEFT;
                SndMng.sfxPlay(SndMng.SFX_SLIDING_SLAB, 1);
            };
            goPlatform4.prototype.update = function () {
                if (this.move == this.LEFT) {
                    if (this.x > this.posX) {
                        this.body.velocity.x = -70;
                        for (var i = 0; i < this.objects.length; i++) {
                            this.objects[i].body.velocity.x = -70;
                        }
                    }
                    else {
                        this.move = this.NONE;
                    }
                }
                if (this.move == this.RIGHT) {
                    if (this.x < this.posX + this.length) {
                        this.body.velocity.x = 70;
                        for (var i = 0; i < this.objects.length; i++) {
                            this.objects[i].body.velocity.x = 70;
                        }
                    }
                    else {
                        this.move = this.NONE;
                    }
                }
                if (this.move == this.NONE) {
                    this.body.velocity.x = 0;
                    for (var i = 0; i < this.objects.length; i++) {
                        this.objects[i].body.velocity.x = 0;
                    }
                }
            };
            return goPlatform4;
        }(Phaser.Sprite));
        Client.goPlatform4 = goPlatform4;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goPlatformBlockBrick = (function (_super) {
            __extends(goPlatformBlockBrick, _super);
            function goPlatformBlockBrick(game, x, y, numBlock) {
                var _this = _super.call(this, game, x, y, 'geAtlas', 'block_greco') || this;
                _this.x = _this.x + _this.width / 2;
                _this.y = _this.y + _this.height / 2;
                _this.game.physics.p2.enable(_this);
                _this.body.setRectangle(((_this.width - 2) * numBlock), _this.height, (((_this.width - 2) * numBlock) / 2) - (_this.width / 2));
                _this.body.static = true;
                _this.data.enable = true;
                for (var i = 0; i < numBlock - 1; i++) {
                    var block = new Phaser.Sprite(_this.game, (_this.width / 2) - (2) + ((_this.width - 2) * i), -_this.height / 2, 'geAtlas', 'block_greco');
                    _this.addChild(block);
                }
                return _this;
            }
            goPlatformBlockBrick.prototype.update = function () {
            };
            return goPlatformBlockBrick;
        }(Phaser.Sprite));
        Client.goPlatformBlockBrick = goPlatformBlockBrick;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goPlatformBlockStone = (function (_super) {
            __extends(goPlatformBlockStone, _super);
            function goPlatformBlockStone(game, x, y, numBlock, platform) {
                if (platform === void 0) { platform = 1; }
                var _this = _super.call(this, game, x, y, 'geAtlas', 'block_stone' + platform) || this;
                _this.x = _this.x + _this.width / 2;
                _this.y = _this.y + _this.height / 2;
                _this.game.physics.p2.enable(_this);
                _this.body.setRectangle(((_this.width - 2) * numBlock), _this.height, (((_this.width - 2) * numBlock) / 2) - (_this.width / 2));
                _this.body.static = true;
                _this.data.enable = true;
                for (var i = 0; i < numBlock - 1; i++) {
                    var block = new Phaser.Sprite(_this.game, (_this.width / 2) - (2) + ((_this.width - 2) * i), -_this.height / 2, 'geAtlas', 'block_stone' + platform);
                    _this.addChild(block);
                }
                return _this;
            }
            goPlatformBlockStone.prototype.update = function () {
            };
            return goPlatformBlockStone;
        }(Phaser.Sprite));
        Client.goPlatformBlockStone = goPlatformBlockStone;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goPlayer = (function (_super) {
            __extends(goPlayer, _super);
            function goPlayer(game, x, y) {
                var _this = _super.call(this, game, x, y) || this;
                _this.posGBXactive = 80;
                _this.posGBXStart = -100;
                _this.trajectory = false;
                _this.RUNTOSTART = 'runToStart';
                _this.USEDGUMBALL = 'UsedGumball';
                _this.USEDARWIN = 'Useddarwin';
                _this.currentState = 'none';
                _this.onFire = new Phaser.Signal();
                _this.gumball = new Client.goGumball(_this.game, _this.posGBXStart, 0);
                _this.gumball.anchor.setTo(1, 0.5);
                _this.gumball.swichAnimIdle();
                _this.gumball.onReady.add(_this.onReady, _this);
                _this.addChild(_this.gumball);
                _this.darwin = new Client.goDarwin(_this.game, _this.posGBXStart - 80, 0);
                _this.darwin.anchor.setTo(0.9, 0.5);
                _this.darwin.swichAnimIdle();
                _this.darwin.onReady.add(_this.onReady, _this);
                _this.addChild(_this.darwin);
                return _this;
            }
            goPlayer.prototype.onReady = function (draw, pname) {
                if (this.currentState == pname) {
                    this.trajectory = draw;
                }
            };
            goPlayer.prototype.showPlayer = function () {
                SndMng.sfxPlay(SndMng.SFX_RUNNING_ONTO_STAGE, 1);
                this.currentState = this.RUNTOSTART;
                this.gumball.swichAnimRun();
                this.darwin.swichAnimRun();
            };
            goPlayer.prototype.update = function () {
                if (this.currentState == this.RUNTOSTART) {
                    if (this.gumball.x < this.posGBXactive) {
                        this.gumball.x += 2.5;
                        this.darwin.x += 2.5;
                    }
                    else {
                        this.currentState = this.USEDGUMBALL;
                        this.gumball.swichAnimReady();
                        this.darwin.swichAnimIdle();
                    }
                }
                if (this.currentState == this.USEDGUMBALL) {
                    var rotAngle = this.tangle - 180;
                    if (rotAngle > -90 && rotAngle < 0) {
                        this.gumball.power.angle = rotAngle;
                    }
                    else {
                        if (rotAngle < 0) {
                            this.gumball.power.angle = -90;
                        }
                        else {
                            if (rotAngle > -90) {
                                this.gumball.power.angle = 0;
                            }
                        }
                    }
                    this.gumball.head.angle = (this.gumball.power.angle) / 3;
                    this.gumball.fire.angle = (this.gumball.power.angle) / 6;
                    if (this.tPower >= 100) {
                        this.tPower = 99;
                    }
                    if (this.tPower <= 0) {
                        this.tPower = 1;
                    }
                    this.gumball.power.animations.currentAnim.frame = this.tPower;
                }
                if (this.currentState == this.USEDARWIN) {
                    var rotAngle = this.tangle - 180;
                    if (rotAngle > -90 && rotAngle < 0) {
                        this.darwin.power.angle = rotAngle;
                    }
                    else {
                        if (rotAngle < 0) {
                            this.darwin.power.angle = -90;
                        }
                        else {
                            if (rotAngle > -90) {
                                this.darwin.power.angle = 0;
                            }
                        }
                    }
                    this.darwin.head.angle = (this.darwin.power.angle) / 3;
                    this.darwin.fire.angle = (this.darwin.power.angle) / 6;
                    if (this.tPower >= 100) {
                        this.tPower = 99;
                    }
                    if (this.tPower <= 0) {
                        this.tPower = 1;
                    }
                    this.darwin.power.animations.currentAnim.frame = this.tPower - 1;
                }
            };
            goPlayer.prototype.ChangePlayer = function (pers) {
                if (this.currentState != pers) {
                    this.currentState = pers;
                    if (this.currentState == this.USEDGUMBALL) {
                        SndMng.sfxPlay(SndMng.SFX_SWITCH_ITEM, 1);
                        this.gumball.swichAnimIdle();
                        this.darwin.swichAnimIdle();
                        this.game.add.tween(this.darwin).to({ x: this.posGBXactive - 80 }, 100, Phaser.Easing.Linear.None, true);
                        this.game.add.tween(this.gumball).to({ x: this.posGBXactive }, 100, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.gumballReady, this);
                    }
                    if (this.currentState == this.USEDARWIN) {
                        SndMng.sfxPlay(SndMng.SFX_SWITCH_ITEM, 1);
                        this.gumball.swichAnimIdle();
                        this.darwin.swichAnimIdle();
                        this.game.add.tween(this.darwin).to({ x: this.posGBXactive }, 100, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.darwinReady, this);
                        this.game.add.tween(this.gumball).to({ x: this.posGBXactive - 80 }, 100, Phaser.Easing.Linear.None, true);
                    }
                }
            };
            goPlayer.prototype.setVictory = function () {
                this.gumball.swichAnimVictory();
                this.darwin.swichAnimVictory();
            };
            goPlayer.prototype.gumballReady = function () {
                this.gumball.swichAnimReady();
            };
            goPlayer.prototype.darwinReady = function () {
                this.darwin.swichAnimReady();
            };
            goPlayer.prototype.fireBall = function () {
                if (this.currentState == this.USEDGUMBALL) {
                    if (this.gumball.fireEnable) {
                        var type = 'baloon';
                        this.onFire.dispatch(type);
                        this.gumball.playAnimFire();
                    }
                }
                if (this.currentState == this.USEDARWIN) {
                    if (this.darwin.fireEnable) {
                        var type = 'stone';
                        this.onFire.dispatch(type);
                        this.darwin.playAnimFire();
                    }
                }
            };
            return goPlayer;
        }(Phaser.Sprite));
        Client.goPlayer = goPlayer;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goPortal = (function (_super) {
            __extends(goPortal, _super);
            function goPortal(game, x, y, portalTexture) {
                var _this = _super.call(this, game, x, y, 'geAtlas', portalTexture + '0001') || this;
                _this.Eject = false;
                _this.moved = false;
                _this.rotated = false;
                _this.mLeft = 'mLeft';
                _this.mRight = 'mRight';
                _this.rLeft = 'rLeft';
                _this.rRight = 'rRight';
                _this.sNone = 'None';
                _this.maxLeft = 0;
                _this.maxRight = 0;
                _this.rotRight = 0;
                _this.rotLeft = 0;
                _this.cState = _this.sNone;
                _this.animations.add('play', Phaser.Animation.generateFrameNames(portalTexture, 1, 50, '', 4), 60, true);
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.loadPolygon('physData', 'portal');
                _this.data.name = 'none';
                _this.body.kinematic = true;
                _this.data.enable = true;
                _this.body.data.shapes[0].sensor = true;
                _this.play('play');
                return _this;
            }
            goPortal.prototype.setLength = function (len) {
                this.length = len;
                this.maxLeft = this.x;
                this.maxRight = this.x + len;
            };
            goPortal.prototype.setMoved = function (mov) {
                this.moved = mov;
                this.cState = this.mRight;
            };
            goPortal.prototype.setRotated = function (rot) {
                this.rotated = rot;
                this.cState = this.rLeft;
            };
            goPortal.prototype.setRotateAngle = function (anglLeft, anglRight) {
                if (anglLeft === void 0) { anglLeft = 0; }
                if (anglRight === void 0) { anglRight = 0; }
                this.rotLeft = anglLeft;
                this.rotRight = anglRight;
            };
            goPortal.prototype.SetRotate = function (tAngle) {
                this.body.angle = tAngle;
            };
            goPortal.prototype.setEject = function (obj) {
                this.Eject = true;
                this.ejectPortal = obj;
                this.data.name = 'portal';
            };
            goPortal.prototype.getVel = function (oldvel) {
                var newVel = new Client.p2Vec2(Math.cos(uMath.toRadians(this.ejectPortal.body.angle)) * oldvel, Math.sin(uMath.toRadians(this.ejectPortal.body.angle)) * oldvel);
                return newVel;
            };
            goPortal.prototype.getPos = function () {
                SndMng.sfxPlay(SndMng.SFX_PORTAL_EXIT, 1);
                var newPos = new Client.p2Vec2(this.ejectPortal.x, this.ejectPortal.y);
                return newPos;
            };
            goPortal.prototype.update = function () {
                if (this.moved) {
                    if (this.cState == this.mRight) {
                        if (this.x < this.maxRight) {
                            this.body.velocity.x = 50;
                        }
                        else {
                            this.cState = this.mLeft;
                        }
                    }
                    if (this.cState == this.mLeft) {
                        if (this.x > this.maxLeft) {
                            this.body.velocity.x = -50;
                        }
                        else {
                            this.cState = this.mRight;
                        }
                    }
                }
                if (this.rotated) {
                    if (this.cState == this.rLeft) {
                        if ((this.body.angle < this.rotLeft) && (this.body.angle >= 0)) {
                            this.body.rotateRight(15);
                        }
                        else {
                            this.body.rotateRight(0);
                            this.body.angle = this.rotLeft;
                            this.cState = this.rRight;
                        }
                    }
                    if (this.cState == this.rRight) {
                        if (this.body.angle > this.rotRight) {
                            this.body.rotateRight(-15);
                        }
                        else {
                            this.body.rotateRight(0);
                            this.body.angle = this.rotRight;
                            this.cState = this.rLeft;
                        }
                    }
                }
            };
            return goPortal;
        }(Phaser.Sprite));
        Client.goPortal = goPortal;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goRubber = (function (_super) {
            __extends(goRubber, _super);
            function goRubber(game, x, y) {
                var _this = _super.call(this, game, x, y, 'geAtlas', 'ruubber0001') || this;
                _this.animations.add('play', Phaser.Animation.generateFrameNames('ruubber', 1, 4, '', 4), 60, false);
                _this.y = _this.y + (3) + _this.height / 2;
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.loadPolygon('physData', 'ruubber');
                _this.body.kinematic = true;
                _this.data.name = 'reflector';
                _this.data.enable = true;
                _this.scale.set(0.9);
                return _this;
            }
            goRubber.prototype.SetRotate = function (tAngle) {
                this.body.angle = tAngle;
            };
            goRubber.prototype.setForceBounce = function (forceX, forceY) {
                this.data.forceX = forceX;
                this.data.forceY = forceY;
            };
            goRubber.prototype.update = function () {
                if (!this.data.enable) {
                    this.data.enable = true;
                    this.play('play');
                    SndMng.sfxPlay(SndMng.SFX_BOUNCY_BLOCK, 1);
                }
            };
            return goRubber;
        }(Phaser.Sprite));
        Client.goRubber = goRubber;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goSmallStone = (function (_super) {
            __extends(goSmallStone, _super);
            function goSmallStone(game, x, y, swidth, sheight, numStone) {
                var _this = _super.call(this, game, x, y, 'geAtlas', 'small_stone_' + numStone) || this;
                _this.width = swidth;
                _this.height = sheight;
                _this.y = _this.y + _this.height / 2;
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.setRectangle(_this.width, _this.height);
                _this.data.enable = true;
                _this.data.name = 'stone';
                _this.body.mass = 5;
                return _this;
            }
            goSmallStone.prototype.update = function () {
            };
            return goSmallStone;
        }(Phaser.Sprite));
        Client.goSmallStone = goSmallStone;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goSpike = (function (_super) {
            __extends(goSpike, _super);
            function goSpike(game, x, y, element) {
                var _this = _super.call(this, game, x, y, 'geAtlas', element) || this;
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.loadPolygon('physData', element);
                _this.body.kinematic = true;
                _this.data.enable = true;
                _this.data.name = 'spike';
                return _this;
            }
            goSpike.prototype.setVel = function (vX, vY) {
                this.body.velocity.x = vX;
                this.body.velocity.y = vY;
            };
            goSpike.prototype.update = function () {
            };
            return goSpike;
        }(Phaser.Sprite));
        Client.goSpike = goSpike;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goStone = (function (_super) {
            __extends(goStone, _super);
            function goStone(game, x, y, atlas, frame) {
                var _this = _super.call(this, game, x, y, atlas, frame) || this;
                _this.timeToDestroy = 50;
                _this.talive = true;
                _this.anchor.set(0.5);
                _this.game.physics.p2.enable(_this);
                _this.body.setCircle(8);
                _this.body.rotateRight(50);
                _this.data.name = 'stone';
                _this.data.allowSleep = true;
                _this.body.mass = 2;
                return _this;
            }
            goStone.prototype.update = function () {
                if (this.body) {
                    if (this.data.enable == false) {
                        this.talive = false;
                        this.data.enable = null;
                        this.game.physics.p2.removeBody(this.body);
                        this.animations.add('splash', Phaser.Animation.generateFrameNames('stone_splash', 1, 20, '', 4), 60, false);
                        this.play('splash').onComplete.addOnce(this.onDestroy, this);
                        SndMng.sfxPlay(SndMng.SFX_ROCK_BREAKING, 1);
                    }
                }
                if (this.body) {
                    if (this.data.enableTarget == false) {
                        this.data.enable = null;
                        this.game.physics.p2.removeBody(this.body);
                        this.kill();
                        this.talive = false;
                    }
                }
                if (this.data.enable) {
                    if (this.body.velocity.x < 5) {
                        if (this.body.velocity.y < 5) {
                            if (this.timeToDestroy < 0) {
                                this.data.enable = false;
                            }
                            else {
                                this.timeToDestroy--;
                            }
                        }
                    }
                }
            };
            goStone.prototype.onDestroy = function () {
                this.kill();
            };
            return goStone;
        }(Phaser.Sprite));
        Client.goStone = goStone;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goStonePillar = (function (_super) {
            __extends(goStonePillar, _super);
            function goStonePillar(game, x, y, tstatic) {
                if (tstatic === void 0) { tstatic = true; }
                var _this = _super.call(this, game, x, y, 'geAtlas', 'stone_pillar0001') || this;
                _this.x = _this.x + _this.width / 2;
                _this.y = _this.y + _this.height / 2;
                _this.game.physics.p2.enable(_this);
                _this.animations.add('play', Phaser.Animation.generateFrameNames('stone_pillar', 1, 36, '', 4), 60, false);
                _this.body.clearShapes();
                _this.body.loadPolygon('physData', 'stone_pillar');
                if (tstatic) {
                    _this.body.kinematic = true;
                }
                _this.data.enable = true;
                _this.data.name = 'breaking_window';
                _this.body.fixedRotation = true;
                _this.body.mass = 10000;
                return _this;
            }
            goStonePillar.prototype.setVel = function (vX, vY) {
                this.body.velocity.x = vX;
                this.body.velocity.y = vY;
            };
            goStonePillar.prototype.update = function () {
                if (this.data.enable == false) {
                    if (!this.data.breaking) {
                        this.data.breaking = true;
                        this.play('play');
                        SndMng.sfxPlay(SndMng.SFX_PILLAR_SMASHING, 1);
                        this.onRemoveBody();
                    }
                }
            };
            goStonePillar.prototype.onRemoveBody = function () {
                this.body.clearShapes();
                this.body.loadPolygon('physData', 'stone_pillar_destroy');
            };
            return goStonePillar;
        }(Phaser.Sprite));
        Client.goStonePillar = goStonePillar;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goStreetLight = (function (_super) {
            __extends(goStreetLight, _super);
            function goStreetLight(game, x, y, texture, height) {
                if (height === void 0) { height = null; }
                var _this = _super.call(this, game, x, y, 'geAtlas', texture) || this;
                if (height) {
                    _this.height = height;
                }
                _this.y = _this.y - _this.height / 2;
                _this.game.physics.p2.enable(_this);
                if (height == null) {
                    _this.body.clearShapes();
                    _this.body.loadPolygon('physData', texture);
                }
                else {
                    _this.body.clearShapes();
                    _this.body.setRectangle(10, _this.height);
                }
                _this.body.static = true;
                _this.data.enable = true;
                return _this;
            }
            goStreetLight.prototype.update = function () {
            };
            return goStreetLight;
        }(Phaser.Sprite));
        Client.goStreetLight = goStreetLight;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goThreeStomp = (function (_super) {
            __extends(goThreeStomp, _super);
            function goThreeStomp(game, x, y) {
                var _this = _super.call(this, game, x, y, 'geAtlas', 'tree_stump') || this;
                _this.x = _this.x + _this.width / 2;
                _this.y = _this.y + _this.height / 2;
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.loadPolygon('physData', 'tree_stump');
                _this.body.static = true;
                _this.data.enable = true;
                return _this;
            }
            goThreeStomp.prototype.update = function () {
            };
            return goThreeStomp;
        }(Phaser.Sprite));
        Client.goThreeStomp = goThreeStomp;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goTobias = (function (_super) {
            __extends(goTobias, _super);
            function goTobias(game, x, y) {
                var _this = _super.call(this, game, x, y, 'tobiasAtlas', 'tobias_idle0001') || this;
                _this.tWater = false;
                _this.animations.add('idle', Phaser.Animation.generateFrameNames('tobias_idle', 1, 100, '', 4), 60, true);
                _this.play('idle');
                _this.y = _this.y - _this.height / 2;
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.loadPolygon('physData', 'tobias');
                _this.data.name = 'target';
                _this.body.fixedRotation = true;
                _this.body.kinematic = true;
                _this.thishand = new Phaser.Sprite(_this.game, 0, -_this.height / 2, 'tobiasAtlas', 'hand_anim0001');
                _this.thishand.anchor.set(0.5);
                _this.thishand.animations.add('play', Phaser.Animation.generateFrameNames('hand_anim', 1, 72, '', 4), 60, true);
                _this.thishand.play('play');
                _this.addChild(_this.thishand);
                return _this;
            }
            goTobias.prototype.update = function () {
                if (this.data.name == 'target') {
                    if (this.data.enable == false) {
                        this.data.name = 'pass';
                        this.setVictory();
                        this.tWater = true;
                    }
                }
            };
            goTobias.prototype.setVictory = function () {
                SndMng.sfxPlay(SndMng.SFX_BALOON_SPLASH, 1);
                this.thishand.visible = false;
                this.thisVictory = new Phaser.Sprite(this.game, 0, 8, 'tobiasAtlas', 'tobias_victory0001');
                this.thisVictory.anchor.set(0.55, 0.68);
                this.thisVictory.animations.add('victory', Phaser.Animation.generateFrameNames('tobias_victory', 1, 40, '', 4), 60, true);
                this.thisVictory.play('victory');
                this.addChild(this.thisVictory);
                this.animations.add('rotate', Phaser.Animation.generateFrameNames('rotate_effect', 1, 9, '', 4), 10, true);
                this.play('rotate');
                this.waterSplash = new Phaser.Sprite(this.game, 0, 0, 'tobiasAtlas', 'water_splash0001');
                this.waterSplash.anchor.set(0.5, 0.55);
                this.waterSplash.animations.add('play', Phaser.Animation.generateFrameNames('water_splash', 1, 49, '', 4), 60, false);
                this.waterSplash.play('play').onComplete.addOnce(this.onCompleteWaterSplash, this);
                this.addChild(this.waterSplash);
                this.cool = new Phaser.Sprite(this.game, 0, 0, 'tobiasAtlas', 'cool0001');
                this.cool.animations.add('play', Phaser.Animation.generateFrameNames('cool', 1, 8, '', 4), 60, true);
                this.cool.anchor.set(0.5);
                this.addChild(this.cool);
                this.game.add.tween(this.cool).to({ y: -47 }, 100, Phaser.Easing.Linear.None, true);
                this.cool.play('play');
            };
            goTobias.prototype.onCompleteWaterSplash = function () {
                this.waterSplash.visible = false;
            };
            goTobias.prototype.victoryLoop = function () {
                this.thisVictory.anchor.set(0.5);
                this.thisVictory.play('victory_loop');
            };
            return goTobias;
        }(Phaser.Sprite));
        Client.goTobias = goTobias;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goTrampolineBounce = (function (_super) {
            __extends(goTrampolineBounce, _super);
            function goTrampolineBounce(game, x, y, tangle, tdivX, tdivY) {
                if (tangle === void 0) { tangle = 0; }
                if (tdivX === void 0) { tdivX = 1; }
                if (tdivY === void 0) { tdivY = 1; }
                var _this = _super.call(this, game, x, y, 'geAtlas', 'trampoline_bounce0001') || this;
                _this.animations.add('play', Phaser.Animation.generateFrameNames('trampoline_bounce', 1, 21, '', 4), 60, false);
                _this.x = _this.x + _this.width / 2;
                _this.y = _this.y - _this.height / 2;
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.loadPolygon('physData', 'trampoline_bounce');
                _this.body.static = true;
                _this.data.enable = true;
                _this.data.name = 'trampoline';
                _this.body.angle = tangle;
                _this.divX = tdivX;
                _this.divY = tdivY;
                return _this;
            }
            goTrampolineBounce.prototype.update = function () {
                if (!this.data.enable) {
                    this.data.enable = true;
                    this.play('play');
                    SndMng.sfxPlay(SndMng.SFX_LEAF_BOUNCE, 1);
                }
            };
            goTrampolineBounce.prototype.getNewVel = function (velX, velY) {
                var v = new Client.p2Vec2(velX, velY);
                v.Normalize();
                var n = new Client.p2Vec2(this.x, this.y);
                n.NegativeSelf();
                var r = Client.p2Math.AddVV(v, Client.p2Math.MulFV(-2 * Client.p2Math.Dot(v, n), n));
                var newVel = Client.p2Math.MulFV(0.5, Client.p2Math.AddVV(n, r));
                var v2 = new Client.p2Vec2(velX, velY);
                newVel.Multiply(v2.Length());
                newVel.x = newVel.x / this.divX;
                newVel.y = newVel.y / this.divY;
                newVel.y = newVel.y - velX * 15;
                return newVel;
            };
            return goTrampolineBounce;
        }(Phaser.Sprite));
        Client.goTrampolineBounce = goTrampolineBounce;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goTrampolineBox = (function (_super) {
            __extends(goTrampolineBox, _super);
            function goTrampolineBox(game, x, y) {
                var _this = _super.call(this, game, x, y, 'geAtlas', 'trampoline_box') || this;
                _this.x = _this.x + _this.width / 2;
                _this.y = _this.y + _this.height / 2;
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.loadPolygon('physData', 'trampoline_box');
                _this.body.static = true;
                _this.data.enable = true;
                return _this;
            }
            goTrampolineBox.prototype.update = function () {
            };
            return goTrampolineBox;
        }(Phaser.Sprite));
        Client.goTrampolineBox = goTrampolineBox;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goTrapDoor = (function (_super) {
            __extends(goTrapDoor, _super);
            function goTrapDoor(game, x, y) {
                var _this = _super.call(this, game, x, y, 'geAtlas', 'trapdoor0001') || this;
                _this.LEFT = 'left';
                _this.RIGHT = 'right';
                _this.STOP = 'stop';
                _this.move = _this.LEFT;
                _this.length = 250;
                _this.x = _this.x + _this.width / 2;
                _this.y = _this.y + _this.height / 4;
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.loadPolygon('physData', 'trapdoor_close');
                _this.body.static = true;
                _this.data.enable = true;
                _this.RightPos = _this.x;
                _this.LeftPos = _this.x - _this.length;
                _this.animations.add('open', Phaser.Animation.generateFrameNames('trapdoor', 1, 30, '', 4), 60, false);
                _this.animations.add('close', Phaser.Animation.generateFrameNames('trapdoor', 31, 42, '', 4), 60, false);
                return _this;
            }
            goTrapDoor.prototype.setLength = function (newLength) {
                this.LeftPos += this.length;
                this.length = newLength;
                this.LeftPos -= this.length;
            };
            goTrapDoor.prototype.open = function () {
                this.move = this.STOP;
                this.play('open');
                this.body.clearShapes();
                this.body.loadPolygon('physData', 'trapdoor_open');
            };
            goTrapDoor.prototype.close = function () {
                this.play('close');
                this.move = this.LEFT;
                this.body.clearShapes();
                this.body.loadPolygon('physData', 'trapdoor_close');
            };
            goTrapDoor.prototype.update = function () {
                if (this.move == this.LEFT) {
                    if (this.x > this.LeftPos) {
                        this.body.velocity.x = -30;
                    }
                    else {
                        this.move = this.RIGHT;
                    }
                }
                if (this.move == this.RIGHT) {
                    if (this.x < this.RightPos) {
                        this.body.velocity.x = 30;
                    }
                    else {
                        this.move = this.LEFT;
                    }
                }
                if (this.move == this.STOP) {
                    this.body.velocity.x = 0;
                }
            };
            return goTrapDoor;
        }(Phaser.Sprite));
        Client.goTrapDoor = goTrapDoor;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var goWheel = (function (_super) {
            __extends(goWheel, _super);
            function goWheel(game, x, y) {
                var _this = _super.call(this, game, x, y, 'geAtlas', 'wheel') || this;
                _this.speed = 0;
                _this.game.physics.p2.enable(_this);
                _this.body.clearShapes();
                _this.body.setCircle(14);
                _this.width = _this.height = 28;
                _this.data.enable = true;
                _this.data.name = 'stone';
                _this.data.allowSleep = true;
                _this.sound = SndMng.sfxPlay(SndMng.SFX_WHEEL_ROLLING, 0);
                return _this;
            }
            goWheel.prototype.update = function () {
                var vel = new Client.p2Vec2(this.body.velocity.x, this.body.velocity.y);
                this.speed = vel.Normalize();
                this.sound.volume = this.speed / 20;
                if (this.sound.currentTime == this.sound.durationMS) {
                    this.sound = SndMng.sfxPlay(SndMng.SFX_WHEEL_ROLLING, this.speed / 20);
                }
            };
            return goWheel;
        }(Phaser.Sprite));
        Client.goWheel = goWheel;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Boot.prototype.preload = function () {
                this.load.atlasJSONArray('preloader_atlas', './assets/atlases/preloader_atlas.png', './assets/atlases/preloader_atlas.json');
            };
            Boot.prototype.create = function () {
                this.stage.setBackgroundColor(0xFFFFFF);
                this.input.maxPointers = 1;
                this.stage.disableVisibilityChange = true;
                ScaleManager.init(this.game, Config.DOM_PARENT_ID, Config.GW, Config.GH, Config.GSW, Config.GSH);
                uSaveData.Init();
                Params.isMacOS =
                    this.game.device.iOS ||
                        this.game.device.iPhone ||
                        this.game.device.iPhone4 ||
                        this.game.device.iPad ||
                        this.game.device.mobileSafari;
                this.time.events.add(100, this.onWaitComplete, this);
            };
            Boot.prototype.onWaitComplete = function () {
                this.game.state.start(States.PRELOADER, true, false);
            };
            return Boot;
        }(Phaser.State));
        Client.Boot = Boot;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Game = (function (_super) {
            __extends(Game, _super);
            function Game() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.launchX = 100;
                _this.launchY = 368;
                _this.pointerX = 0;
                _this.pointerY = 0;
                return _this;
            }
            Game.prototype.destroy = function () {
                this.mainDummy = null;
                this.objectDummy = null;
                this.backDummy = null;
                this.ballDummy = null;
                this.textLevel = null;
                this.trajectoryGraphics = null;
                this.balls = null;
                this.balls = [];
                this.myWorld = null;
                this.panel = null;
                this.FiledDialog = null;
                this.dialogDummy = null;
                this.CompleteDialog = null;
                this.door = null;
                this.input.onTap.remove(this.onClick, this);
            };
            Game.prototype.create = function () {
                this.destroy();
                this.mainDummy = new Phaser.Sprite(this.game, 0, 0);
                this.add.existing(this.mainDummy);
                this.backDummy = new Phaser.Sprite(this.game, 0, 0);
                this.mainDummy.addChild(this.backDummy);
                this.ballDummy = new Phaser.Sprite(this.game, 0, 0);
                this.mainDummy.addChild(this.ballDummy);
                this.objectDummy = new Phaser.Sprite(this.game, 0, 0);
                this.mainDummy.addChild(this.objectDummy);
                this.game.physics.startSystem(Phaser.Physics.P2JS);
                this.game.physics.p2.gravity.y = 400;
                this.game.physics.p2.restitution = 0.2;
                this.game.physics.p2.setBounds(-1000, -500, 2000, 1000);
                this.game.physics.p2.onBeginContact.add(this.ContactListeners, this);
                this.trajectoryGraphics = new Phaser.Graphics(this.game, 0, 0);
                this.trajectoryGraphics.visible = false;
                this.objectDummy.addChild(this.trajectoryGraphics);
                var level = Number(uSaveData.getItem('selectLevel'));
                switch (level) {
                    case 1: {
                        this.myWorld = new Client.Level1(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 2: {
                        this.myWorld = new Client.Level2(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 3: {
                        this.myWorld = new Client.Level3(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 4: {
                        this.myWorld = new Client.Level4(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 5: {
                        this.myWorld = new Client.Level5(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 6: {
                        this.myWorld = new Client.Level6(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 7: {
                        this.myWorld = new Client.Level7(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 8: {
                        this.myWorld = new Client.Level8(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 9: {
                        this.myWorld = new Client.Level9(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 10: {
                        this.myWorld = new Client.Level10(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 11: {
                        this.myWorld = new Client.Level11(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 12: {
                        this.myWorld = new Client.Level12(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 13: {
                        this.myWorld = new Client.Level13(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 14: {
                        this.myWorld = new Client.Level14(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 15: {
                        this.myWorld = new Client.Level15(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 16: {
                        this.myWorld = new Client.Level16(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 17: {
                        this.myWorld = new Client.Level17(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 18: {
                        this.myWorld = new Client.Level18(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 19: {
                        this.myWorld = new Client.Level19(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 20: {
                        this.myWorld = new Client.Level20(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 21: {
                        this.myWorld = new Client.Level21(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 22: {
                        this.myWorld = new Client.Level22(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 23: {
                        this.myWorld = new Client.Level23(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 24: {
                        this.myWorld = new Client.Level24(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 25: {
                        this.myWorld = new Client.Level25(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 26: {
                        this.myWorld = new Client.Level26(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 27: {
                        this.myWorld = new Client.Level27(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 28: {
                        this.myWorld = new Client.Level28(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                    case 29: {
                        this.myWorld = new Client.Level29(this.game, 0, 0, this.objectDummy, this.balls);
                        break;
                    }
                    case 30: {
                        this.myWorld = new Client.Level30(this.game, 0, 0, this.objectDummy);
                        break;
                    }
                }
                this.myWorld.onFireType.add(this.fireByType, this);
                this.myWorld.onComplete.add(this.onLevelComplete, this);
                this.backDummy.addChild(this.myWorld);
                this.launchX = this.myWorld.startPlayerX + 57;
                this.launchY = this.myWorld.startPlayerY + 3;
                this.textLevel = new Phaser.BitmapText(this.game, 590, 20, 'myFont', 'Level ' + uSaveData.getItem('selectLevel'), 15);
                this.textLevel.anchor.set(0.5);
                this.mainDummy.addChild(this.textLevel);
                this.panel = new Client.guiPanel(this.game, Config.GW / 2, Config.GH);
                this.panel.anchor.set(0.5, 1);
                this.mainDummy.addChild(this.panel);
                this.panel.SetMaxBullet(this.myWorld.numScrolls, this.myWorld.numStones);
                this.panel.onChange.add(this.changePesr, this);
                this.panel.onMenu.add(this.onMainMenu, this);
                this.panel.onRetry.add(this.onRestart, this);
                this.dialogDummy = new Phaser.Sprite(this.game, 0, 0);
                this.mainDummy.addChild(this.dialogDummy);
                this.door = new Client.doorEffect(this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas');
                this.door.anchor.set(0.5);
                this.door.openDoor();
                this.mainDummy.addChild(this.door);
                if (this.game.device.desktop) {
                    this.input.onTap.add(this.onClick, this);
                }
                else {
                    this.input.onUp.add(this.onClick, this);
                }
                this.game.input.addMoveCallback(this.onHold, this);
            };
            Game.prototype.onHold = function (pointer) {
                this.pointerX = pointer.x;
                this.pointerY = pointer.y;
            };
            Game.prototype.onClick = function (pointer) {
                if (pointer.y < this.panel.y - this.panel.height) {
                    if (this.myWorld.currentNumShot > 0) {
                        this.myWorld.onClick();
                    }
                }
            };
            Game.prototype.onLevelComplete = function (stars) {
                this.CompleteDialog = new Client.completeDialog(this.game, Config.GW / 2, Config.GH / 2, stars);
                this.CompleteDialog.anchor.set(0.5);
                this.CompleteDialog.onMenu.addOnce(this.onMainMenu, this);
                this.CompleteDialog.onRetry.addOnce(this.onRestart, this);
                this.CompleteDialog.onContinue.addOnce(this.onRestart, this);
                this.CompleteDialog.onGameComplete.addOnce(this.onOutro, this);
                this.dialogDummy.addChild(this.CompleteDialog);
            };
            Game.prototype.changePesr = function (pers) {
                this.myWorld.changePers(pers);
            };
            Game.prototype.fireByType = function (type) {
                var launchVelocity = this.getLaunchVelocity();
                var ball;
                if (type == 'stone') {
                    ball = new Client.goStone(this.game, this.launchX, this.launchY, 'gameAtlas', 'rock');
                }
                if (type == 'baloon') {
                    ball = new Client.goBaloon(this.game, this.launchX, this.launchY, 'gameAtlas', 'baloon');
                }
                this.ballDummy.addChild(ball);
                ball.body.velocity.x = launchVelocity.x;
                ball.body.velocity.y = launchVelocity.y;
                this.balls.push(ball);
            };
            Game.prototype.drawTrajectory = function () {
                var launchVelocity = this.getLaunchVelocity();
                this.trajectoryGraphics.clear();
                var EndLine = 0;
                for (var i = 0; i < 500; i++) {
                    var trajectoryPoint = this.getTrajectoryPoint(this.launchX, this.launchY, launchVelocity.x, launchVelocity.y, i, 500);
                    if (trajectoryPoint.y < this.panel.y) {
                        EndLine = i;
                    }
                }
                for (var i = 0; i < EndLine; i++) {
                    var trajectoryPoint = this.getTrajectoryPoint(this.launchX, this.launchY, launchVelocity.x, launchVelocity.y, i, EndLine);
                    this.trajectoryGraphics.lineStyle(1, 0xFF0000, 1 - ((1 / EndLine) * i));
                    this.trajectoryGraphics.drawRect(trajectoryPoint.x, trajectoryPoint.y, 1, 1);
                }
            };
            Game.prototype.getLaunchVelocity = function () {
                var dx = this.pointerX - this.launchX;
                var dy = this.pointerY - this.launchY;
                if (this.pointerX < this.launchX) {
                    dx = 0;
                }
                this.myWorld.tangle = uMath.toDegrees(uMath.getAngle(this.pointerX, this.pointerY, this.launchX, this.launchY));
                dx *= 3;
                dy *= 3;
                var distance = uMath.distance(0, 0, dx, dy);
                var percent = uMath.toPercent(distance, 800);
                if (distance > 800) {
                    var angl = uMath.getAngle(0, 0, dx, dy);
                    dx = Math.cos(angl) * 800;
                    dy = Math.sin(angl) * 800;
                    var percent = 100;
                }
                percent = Math.round(percent);
                this.myWorld.tPower = percent;
                return { x: dx, y: dy };
            };
            Game.prototype.ContactListeners = function (body, bodyB, shapeA, shapeB, equation) {
                if (bodyB && body) {
                    if (bodyB.parent && body.parent) {
                        if (bodyB.parent.sprite && body.parent.sprite) {
                            if (bodyB.parent.sprite.data.name == 'stone' && body.parent.sprite.data.name != 'stone') {
                                SndMng.sfxPlay(SndMng.SFX_STONE_BOUNCE, 1);
                            }
                            if (body.parent.sprite.data.name == 'stone' && bodyB.parent.sprite.data.name != 'stone') {
                                SndMng.sfxPlay(SndMng.SFX_STONE_BOUNCE, 1);
                            }
                        }
                    }
                }
                if (bodyB && body) {
                    if (bodyB.parent && body.parent) {
                        if (bodyB.parent.sprite && body.parent.sprite) {
                            if (bodyB.parent.sprite.data.name == 'baloon' && body.parent.sprite.data.name == 'target') {
                                bodyB.parent.sprite.data.enableTarget = false;
                                body.parent.sprite.data.enable = false;
                            }
                            if (body.parent.sprite.data.name == 'baloon' && bodyB.parent.sprite.data.name == 'target') {
                                body.parent.sprite.data.enableTarget = false;
                                bodyB.parent.sprite.data.enable = false;
                            }
                        }
                    }
                }
                if (bodyB && body) {
                    if (bodyB.parent && body.parent) {
                        if (bodyB.parent.sprite && body.parent.sprite) {
                            if (bodyB.parent.sprite.data.name == 'stone' && body.parent.sprite.data.name == 'breaking_window') {
                                body.parent.sprite.data.enable = false;
                            }
                            if (body.parent.sprite.data.name == 'stone' && bodyB.parent.sprite.data.name == 'breaking_window') {
                                bodyB.parent.sprite.data.enable = false;
                            }
                        }
                    }
                }
                if (bodyB && body) {
                    if (bodyB.parent && body.parent) {
                        if (bodyB.parent.sprite && body.parent.sprite) {
                            if (((bodyB.parent.sprite.data.name == 'stone') || ((bodyB.parent.sprite.data.name == 'baloon'))) && body.parent.sprite.data.name == 'close') {
                                body.parent.sprite.data.enable = false;
                            }
                            if (((body.parent.sprite.data.name == 'stone') || ((body.parent.sprite.data.name == 'baloon'))) && bodyB.parent.sprite.data.name == 'close') {
                                bodyB.parent.sprite.data.enable = false;
                            }
                        }
                    }
                }
                if (bodyB && body) {
                    if (bodyB.parent && body.parent) {
                        if (bodyB.parent.sprite && body.parent.sprite) {
                            if (((bodyB.parent.sprite.data.name == 'stone') || ((bodyB.parent.sprite.data.name == 'baloon'))) && body.parent.sprite.data.name == 'spike') {
                                bodyB.parent.sprite.data.enable = false;
                            }
                            if (((body.parent.sprite.data.name == 'stone') || ((body.parent.sprite.data.name == 'baloon'))) && bodyB.parent.sprite.data.name == 'spike') {
                                body.parent.sprite.data.enable = false;
                            }
                        }
                    }
                }
                if (bodyB && body) {
                    if (bodyB.parent && body.parent) {
                        if (bodyB.parent.sprite && body.parent.sprite) {
                            if (((bodyB.parent.sprite.data.name == 'stone') || ((bodyB.parent.sprite.data.name == 'baloon'))) && body.parent.sprite.data.name == 'reflector') {
                                if (bodyB.parent.sprite.data.reflectorUse != 'yes') {
                                    body.parent.sprite.data.enable = false;
                                    bodyB.parent.sprite.body.velocity.y = bodyB.parent.sprite.body.velocity.y / 2;
                                    bodyB.parent.sprite.body.velocity.x = -bodyB.parent.sprite.body.velocity.x + bodyB.parent.sprite.body.velocity.x / 10;
                                    bodyB.parent.sprite.data.reflectorUse = 'yes';
                                }
                            }
                            if (((body.parent.sprite.data.name == 'stone') || ((body.parent.sprite.data.name == 'baloon'))) && bodyB.parent.sprite.data.name == 'reflector') {
                                if (body.parent.sprite.data.reflectorUse != 'yes') {
                                    bodyB.parent.sprite.data.enable = false;
                                    body.parent.sprite.body.velocity.y = body.parent.sprite.body.velocity.y / 2;
                                    body.parent.sprite.body.velocity.x = -body.parent.sprite.body.velocity.x + body.parent.sprite.body.velocity.x / 10;
                                    body.parent.sprite.data.reflectorUse = 'yes';
                                }
                            }
                        }
                    }
                }
                if (bodyB && body) {
                    if (bodyB.parent && body.parent) {
                        if (bodyB.parent.sprite && body.parent.sprite) {
                            if (((bodyB.parent.sprite.data.name == 'stone') || ((bodyB.parent.sprite.data.name == 'baloon'))) && body.parent.sprite.data.name == 'trampoline') {
                                body.parent.sprite.data.enable = false;
                                var oldVelX = this.game.physics.p2.pxm(bodyB.parent.sprite.body.velocity.x);
                                var oldVelY = this.game.physics.p2.pxm(bodyB.parent.sprite.body.velocity.y);
                                var newVel = body.parent.sprite.getNewVel(oldVelX, oldVelY);
                                bodyB.parent.sprite.body.velocity.y = newVel.y;
                                bodyB.parent.sprite.body.velocity.x = newVel.x;
                            }
                            if (((body.parent.sprite.data.name == 'stone') || ((body.parent.sprite.data.name == 'baloon'))) && bodyB.parent.sprite.data.name == 'trampoline') {
                                bodyB.parent.sprite.data.enable = false;
                            }
                        }
                    }
                }
                if (bodyB && body) {
                    if (bodyB.parent && body.parent) {
                        if (bodyB.parent.sprite && body.parent.sprite) {
                            if (((bodyB.parent.sprite.data.name == 'stone') || ((bodyB.parent.sprite.data.name == 'baloon'))) && body.parent.sprite.data.name == 'portal') {
                                var newPos = body.parent.sprite.getPos();
                                bodyB.parent.sprite.body.y = newPos.y;
                                bodyB.parent.sprite.body.x = newPos.x;
                                var oldVelVec = new Client.p2Vec2(bodyB.parent.sprite.body.velocity.x, bodyB.parent.sprite.body.velocity.y);
                                var oldVel = oldVelVec.Length();
                                var newVel = body.parent.sprite.getVel(oldVel);
                                bodyB.parent.sprite.body.velocity.x = newVel.x;
                                bodyB.parent.sprite.body.velocity.y = newVel.y;
                            }
                            if (((body.parent.sprite.data.name == 'stone') || ((body.parent.sprite.data.name == 'baloon'))) && bodyB.parent.sprite.data.name == 'portal') {
                                var newPos = bodyB.parent.sprite.getPos();
                                body.parent.sprite.body.y = newPos.y;
                                body.parent.sprite.body.x = newPos.x;
                                var oldVelVec = new Client.p2Vec2(body.parent.sprite.body.velocity.x, body.parent.sprite.body.velocity.y);
                                var oldVel = oldVelVec.Length();
                                var newVel = bodyB.parent.sprite.getVel(oldVel);
                                body.parent.sprite.body.velocity.x = newVel.x;
                                body.parent.sprite.body.velocity.y = newVel.y;
                            }
                        }
                    }
                }
                if (bodyB && body) {
                    if (bodyB.parent && body.parent) {
                        if (bodyB.parent.sprite && body.parent.sprite) {
                            if (bodyB.parent.sprite.data.name == 'baloon' && body.parent.sprite.data.name != 'baloon') {
                                if ((body.parent.sprite.data.name != 'reflector') && (body.parent.sprite.data.name != 'trampoline') && (body.parent.sprite.data.name != 'portal') && (body.parent.sprite.data.name != 'none')) {
                                    if (bodyB.velocity[1] < -20 || bodyB.velocity[0] < -20) {
                                        bodyB.parent.sprite.data.enable = false;
                                    }
                                    SndMng.sfxPlay(SndMng.SFX_BALOON_BOUNCE, 1);
                                }
                            }
                            if (body.parent.sprite.data.name == 'baloon' && bodyB.parent.sprite.data.name != 'baloon') {
                                if ((bodyB.parent.sprite.data.name != 'reflector') && (bodyB.parent.sprite.data.name != 'trampoline') && (bodyB.parent.sprite.data.name != 'portal') && (bodyB.parent.sprite.data.name != 'none')) {
                                    if (body.velocity[1] < -20 || body.velocity[0] < -20) {
                                        body.parent.sprite.data.enable = false;
                                    }
                                    SndMng.sfxPlay(SndMng.SFX_BALOON_BOUNCE, 1);
                                }
                            }
                        }
                    }
                }
            };
            Game.prototype.getTrajectoryPoint = function (startX, startY, velocityX, velocityY, n, count) {
                var sfy = 4.8 - velocityY / 2100;
                var sfx = 4.7;
                velocityX = velocityX / sfy;
                velocityY = velocityY / sfx;
                var trajectoryTime = 20;
                var t = trajectoryTime * n / count;
                var gravity = this.game.physics.p2.pxm(this.game.physics.p2.gravity.y);
                var tpx = startX + velocityX * t;
                var tpy = startY + velocityY * t + gravity * t * t / 2;
                return { x: tpx, y: tpy };
            };
            Game.prototype.update = function () {
                this.panel.update();
                this.myWorld.update();
                this.drawTrajectory();
                this.trajectoryGraphics.visible = this.myWorld.trajectory;
                this.panel.setNumShot(this.myWorld.currentNumShot);
                var destrBaloon = 0;
                var fireBaloon = 0;
                for (var i = 0; i < this.balls.length; i++) {
                    this.balls[i].update();
                    if (this.balls[i].data.name == 'baloon') {
                        fireBaloon++;
                        if (this.balls[i].talive == false) {
                            destrBaloon++;
                        }
                    }
                }
                if (this.myWorld.numScrolls == 0) {
                    if (fireBaloon == destrBaloon) {
                        if (!this.CompleteDialog) {
                            if (!this.FiledDialog) {
                                this.FiledDialog = new Client.failedDialog(this.game, Config.GW / 2, Config.GH / 2);
                                this.FiledDialog.anchor.set(0.5);
                                this.FiledDialog.onMenu.addOnce(this.onMainMenu, this);
                                this.FiledDialog.onRetry.addOnce(this.onRestart, this);
                                this.dialogDummy.addChild(this.FiledDialog);
                            }
                        }
                    }
                }
            };
            Game.prototype.onMainMenu = function () {
                this.door.closeDoor();
                this.door.onComplete.addOnce(this.goMainMenu, this);
            };
            Game.prototype.goMainMenu = function () {
                this.game.state.start(States.LEVELSELECT, true, false);
            };
            Game.prototype.onRestart = function () {
                this.door.closeDoor();
                this.door.onComplete.addOnce(this.goRestart, this);
            };
            Game.prototype.goRestart = function () {
                this.game.state.start(States.GAME, true, false);
            };
            Game.prototype.onOutro = function () {
                this.door.closeDoor();
                this.door.onComplete.addOnce(this.goOutro, this);
            };
            Game.prototype.goOutro = function () {
                this.game.state.start(States.OUTRO, true, false);
            };
            return Game;
        }(Phaser.State));
        Client.Game = Game;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Intro = (function (_super) {
            __extends(Intro, _super);
            function Intro() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.showTime = 150;
                return _this;
            }
            Intro.prototype.create = function () {
                this.mainDummy = new Phaser.Sprite(this.game, Config.GW / 2, Config.GH / 2);
                this.mainDummy.anchor.set(0.5);
                this.add.existing(this.mainDummy);
                this.introDummy = new Phaser.Sprite(this.game, 0, 0);
                this.introDummy.anchor.set(0.5);
                this.mainDummy.addChild(this.introDummy);
                this.background = new Phaser.Sprite(this.game, 0, 0, 'cutSceneAtlas', 'backgraund');
                this.background.anchor.set(0.5);
                this.introDummy.addChild(this.background);
                this.game.add.tween(this.background).to({ rotation: uMath.toRadians(360) }, 5000, Phaser.Easing.Linear.None, true, 0, -1);
                this.plate = new Phaser.Sprite(this.game, 0, 0, 'cutSceneAtlas', 'plate');
                this.plate.anchor.set(0.5);
                this.introDummy.addChild(this.plate);
                this.scene1 = new Phaser.Sprite(this.game, 0, 0, 'cutSceneAtlas', 'intro_scene_1');
                this.scene1.anchor.set(0.5);
                this.scene1.scale.set(0);
                this.introDummy.addChild(this.scene1);
                this.scene2 = new Phaser.Sprite(this.game, 0, 0, 'cutSceneAtlas', 'intro_scene_20001');
                this.scene2.anchor.set(0.5);
                this.scene2.scale.set(0);
                this.scene2.animations.add('play', Phaser.Animation.generateFrameNames('intro_scene_2', 1, 180, '', 4), 60, false);
                this.introDummy.addChild(this.scene2);
                this.scene3 = new Phaser.Sprite(this.game, 0, 0, 'cutSceneAtlas', 'intro_scene_3');
                this.scene3.anchor.set(0.5);
                this.scene3.scale.set(0);
                this.introDummy.addChild(this.scene3);
                this.scene4 = new Phaser.Sprite(this.game, 0, 0, 'cutSceneAtlas', 'intro_scene_4');
                this.scene4.anchor.set(0.5);
                this.scene4.scale.set(0);
                this.introDummy.addChild(this.scene4);
                this.dialog = new Phaser.Sprite(this.game, 0, 170, 'cutSceneAtlas', 'dialog_intro_scene0001');
                this.dialog.anchor.set(0.5);
                this.introDummy.addChild(this.dialog);
                this.btnMusic = new Client.guiBtn(this.game, -290, -235, 'cutSceneAtlas', 'music_btn', 'hint_music', true);
                this.btnMusic.onClick.add(this.onClickMusic, this);
                this.btnMusic.setStatus(SndMng.getEnabledMusic());
                this.mainDummy.addChild(this.btnMusic);
                this.btnSfx = new Client.guiBtn(this.game, -245, -235, 'cutSceneAtlas', 'sfx_btn', 'hint_sfx', true);
                this.btnSfx.onClick.add(this.onClickSfx, this);
                this.btnSfx.setStatus(SndMng.getEnabledSfx());
                this.mainDummy.addChild(this.btnSfx);
                this.btnSkip = new Phaser.Button(this.game, 210, 225, 'cutSceneAtlas', this.ExitIntro, this, 'skip_btn0002', 'skip_btn0001');
                this.btnSkip.anchor.set(0.5);
                this.introDummy.addChild(this.btnSkip);
                this.door = new Client.doorEffect(this.game, 0, 0, 'gameAtlas');
                this.door.anchor.set(0.5);
                this.door.openDoor();
                this.door.onComplete.addOnce(this.startIntro, this);
                this.mainDummy.addChild(this.door);
            };
            Intro.prototype.onClickMusic = function () {
                SndMng.setEnabledMusic(!SndMng.getEnabledMusic());
                if (SndMng.getEnabledMusic()) {
                    var oldMusic = SndMng.currentMusic;
                    SndMng.currentMusic = '';
                    SndMng.playMusic(oldMusic, 0, 1, 1000);
                }
                this.btnMusic.setStatus(SndMng.getEnabledMusic());
            };
            Intro.prototype.onClickSfx = function () {
                SndMng.setEnabledSfx(!SndMng.getEnabledSfx());
                this.btnSfx.setStatus(SndMng.getEnabledSfx());
            };
            Intro.prototype.startIntro = function () {
                this.game.add.tween(this.scene1.scale).to({ x: 1.2 }, this.showTime, Phaser.Easing.Linear.None, true, 0, 0);
                this.game.add.tween(this.scene1.scale).to({ y: 1.2 }, this.showTime, Phaser.Easing.Linear.None, true, 0, 0).onComplete.addOnce(this.hideFirstScene, this);
            };
            Intro.prototype.hideFirstScene = function () {
                this.game.add.tween(this.scene1).to({ x: -140 }, this.showTime, Phaser.Easing.Linear.None, true, 5000, 0);
                this.game.add.tween(this.scene1).to({ y: -110 }, this.showTime, Phaser.Easing.Linear.None, true, 5000, 0);
                this.game.add.tween(this.scene1.scale).to({ x: 0.7 }, this.showTime, Phaser.Easing.Linear.None, true, 5000, 0);
                this.game.add.tween(this.scene1.scale).to({ y: 0.7 }, this.showTime, Phaser.Easing.Linear.None, true, 5000, 0).onComplete.addOnce(this.showSecondScene, this);
            };
            Intro.prototype.showSecondScene = function () {
                this.dialog.frameName = 'dialog_intro_scene0002';
                this.scene2.play('play');
                this.game.add.tween(this.scene2.scale).to({ x: 1.2 }, this.showTime, Phaser.Easing.Linear.None, true, 0, 0);
                this.game.add.tween(this.scene2.scale).to({ y: 1.2 }, this.showTime, Phaser.Easing.Linear.None, true, 0, 0).onComplete.addOnce(this.hideSecondScene, this);
            };
            Intro.prototype.hideSecondScene = function () {
                this.game.add.tween(this.scene2).to({ x: 140 }, this.showTime, Phaser.Easing.Linear.None, true, 5000, 0);
                this.game.add.tween(this.scene2).to({ y: -110 }, this.showTime, Phaser.Easing.Linear.None, true, 5000, 0);
                this.game.add.tween(this.scene2.scale).to({ x: 0.7 }, this.showTime, Phaser.Easing.Linear.None, true, 5000, 0);
                this.game.add.tween(this.scene2.scale).to({ y: 0.7 }, this.showTime, Phaser.Easing.Linear.None, true, 5000, 0).onComplete.addOnce(this.showThirdScene, this);
            };
            Intro.prototype.showThirdScene = function () {
                this.dialog.frameName = 'dialog_intro_scene0003';
                this.game.add.tween(this.scene3.scale).to({ x: 1.2 }, this.showTime, Phaser.Easing.Linear.None, true, 0, 0);
                this.game.add.tween(this.scene3.scale).to({ y: 1.2 }, this.showTime, Phaser.Easing.Linear.None, true, 0, 0).onComplete.addOnce(this.hideThirdScene, this);
            };
            Intro.prototype.hideThirdScene = function () {
                this.game.add.tween(this.scene3).to({ x: -140 }, this.showTime, Phaser.Easing.Linear.None, true, 5000, 0);
                this.game.add.tween(this.scene3).to({ y: 60 }, this.showTime, Phaser.Easing.Linear.None, true, 5000, 0);
                this.game.add.tween(this.scene3.scale).to({ x: 0.7 }, this.showTime, Phaser.Easing.Linear.None, true, 5000, 0);
                this.game.add.tween(this.scene3.scale).to({ y: 0.7 }, this.showTime, Phaser.Easing.Linear.None, true, 5000, 0).onComplete.addOnce(this.showFourScene, this);
            };
            Intro.prototype.showFourScene = function () {
                this.dialog.frameName = 'dialog_intro_scene0004';
                this.game.add.tween(this.scene4.scale).to({ x: 1.2 }, this.showTime, Phaser.Easing.Linear.None, true, 0, 0);
                this.game.add.tween(this.scene4.scale).to({ y: 1.2 }, this.showTime, Phaser.Easing.Linear.None, true, 0, 0).onComplete.addOnce(this.hideFourScene, this);
            };
            Intro.prototype.hideFourScene = function () {
                this.game.add.tween(this.scene4).to({ x: 140 }, this.showTime, Phaser.Easing.Linear.None, true, 5000, 0);
                this.game.add.tween(this.scene4).to({ y: 60 }, this.showTime, Phaser.Easing.Linear.None, true, 5000, 0);
                this.game.add.tween(this.scene4.scale).to({ x: 0.7 }, this.showTime, Phaser.Easing.Linear.None, true, 5000, 0);
                this.game.add.tween(this.scene4.scale).to({ y: 0.7 }, this.showTime, Phaser.Easing.Linear.None, true, 5000, 0).onComplete.addOnce(this.CompleteIntro, this);
            };
            Intro.prototype.CompleteIntro = function () {
                this.game.add.tween(this.scene4.scale).to({ y: 0.7 }, this.showTime, Phaser.Easing.Linear.None, true, 5000, 0).onComplete.addOnce(this.ExitIntro, this);
            };
            Intro.prototype.ExitIntro = function () {
                this.door.closeDoor();
                this.door.onComplete.addOnce(this.changeState, this);
                uSaveData.setItem('intro', 'true');
                uSaveData.saveData();
            };
            Intro.prototype.changeState = function () {
                if (uSaveData.getItem('selectLevel') == '-1') {
                    this.game.state.start(States.LEVELSELECT, true, false);
                }
                else {
                    uSaveData.setItem('selectLevel', '1');
                    this.game.state.start(States.GAME, true, false);
                }
            };
            Intro.prototype.update = function () {
            };
            return Intro;
        }(Phaser.State));
        Client.Intro = Intro;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var LevelSelect = (function (_super) {
            __extends(LevelSelect, _super);
            function LevelSelect() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            LevelSelect.prototype.create = function () {
                this.mainDummy = new Phaser.Sprite(this.game, Config.GW / 2, Config.GH / 2);
                this.mainDummy.anchor.set(0.5);
                this.mainDummy.alpha = 0;
                this.add.existing(this.mainDummy);
                this.background = new Phaser.Sprite(this.game, 0, 0, 'levelSelectAtlas', 'background');
                this.background.anchor.set(0.5);
                this.mainDummy.addChild(this.background);
                this.sun = new Client.sunShine(this.game, 280, -230, 'levelSelectAtlas');
                this.sun.scale.x = -1.3;
                this.sun.scale.y = 1.3;
                this.mainDummy.addChild(this.sun);
                this.btnMusic = new Client.guiBtn(this.game, -290, -235, 'levelSelectAtlas', 'music_btn', 'hint_music', true);
                this.btnMusic.onClick.add(this.onClickMusic, this);
                this.btnMusic.setStatus(SndMng.getEnabledMusic());
                this.mainDummy.addChild(this.btnMusic);
                this.btnSfx = new Client.guiBtn(this.game, -245, -235, 'levelSelectAtlas', 'sfx_btn', 'hint_sfx', true);
                this.btnSfx.onClick.add(this.onClickSfx, this);
                this.btnSfx.setStatus(SndMng.getEnabledSfx());
                this.mainDummy.addChild(this.btnSfx);
                this.carmen = new Phaser.Sprite(this.game, -265, 200, 'levelSelectAtlas', 'carmen0001');
                this.carmen.animations.add('play', Phaser.Animation.generateFrameNames('carmen', 1, 100, '', 4), 60, true);
                this.carmen.scale.set(1.2);
                this.carmen.anchor.set(0.5);
                this.carmen.play('play');
                this.mainDummy.addChild(this.carmen);
                this.carrie = new Phaser.Sprite(this.game, -170, 200, 'levelSelectAtlas', 'carrie0001');
                this.carrie.animations.add('play', Phaser.Animation.generateFrameNames('carrie', 1, 60, '', 4), 60, true);
                this.carrie.scale.set(1.2);
                this.carrie.anchor.set(0.5);
                this.carrie.play('play');
                this.mainDummy.addChild(this.carrie);
                this.joe = new Phaser.Sprite(this.game, -10, 180, 'levelSelectAtlas', 'joe0001');
                this.joe.animations.add('play', Phaser.Animation.generateFrameNames('joe', 1, 79, '', 4), 60, true);
                this.joe.scale.set(1.2);
                this.joe.anchor.set(0.5);
                this.joe.play('play');
                this.mainDummy.addChild(this.joe);
                this.penny = new Phaser.Sprite(this.game, 175, 190, 'levelSelectAtlas', 'penny0001');
                this.penny.animations.add('play', Phaser.Animation.generateFrameNames('penny', 1, 100, '', 4), 60, true);
                this.penny.scale.set(1.2);
                this.penny.anchor.set(0.5);
                this.penny.play('play');
                this.mainDummy.addChild(this.penny);
                this.tobias = new Phaser.Sprite(this.game, 270, 195, 'levelSelectAtlas', 'tobias0001');
                this.tobias.animations.add('play', Phaser.Animation.generateFrameNames('tobias', 1, 79, '', 4), 60, true);
                this.tobias.scale.set(1.2);
                this.tobias.anchor.set(0.5);
                this.tobias.play('play');
                this.mainDummy.addChild(this.tobias);
                this.btnBack = new Phaser.Button(this.game, 0, 225, 'levelSelectAtlas', this.onShowMenu, this, 'back_btn0002', 'back_btn0001');
                this.btnBack.anchor.set(0.5);
                this.mainDummy.addChild(this.btnBack);
                this.btnErase = new Phaser.Button(this.game, 290, -235, 'levelSelectAtlas', this.onShowErasePanel, this, 'erase_btn0002', 'erase_btn0001');
                this.btnErase.anchor.set(0.5);
                this.mainDummy.addChild(this.btnErase);
                this.levelButtons = new Array();
                for (var j = 0; j < 3; j++) {
                    for (var i = 0; i < 10; i++) {
                        this.levelButtons[this.levelButtons.length] = new Client.levelBtn(this.game, -275 + (i * 61), -30 + (j * 61));
                        this.levelButtons[this.levelButtons.length - 1].tLevel = j * 10 + i + 1;
                        this.mainDummy.addChild(this.levelButtons[this.levelButtons.length - 1]);
                        this.levelButtons[this.levelButtons.length - 1].anchor.set(0.5);
                        this.levelButtons[this.levelButtons.length - 1].onClick.add(this.selectLevel, this);
                    }
                }
                this.hand = new Phaser.Sprite(this.game, -295, -55, 'levelSelectAtlas', 'hand_anim0001');
                this.hand.animations.add('play', Phaser.Animation.generateFrameNames('hand_anim', 1, 72, '', 4), 60, true);
                this.hand.play('play');
                this.hand.rotation = uMath.toRadians(-45);
                this.hand.anchor.set(0.5);
                this.hand.inputEnabled = false;
                this.mainDummy.addChild(this.hand);
                this.btnIntro = new Phaser.Button(this.game, -295, -55, 'levelSelectAtlas', this.onClickIntro, this, 'intro_btn0002', 'intro_btn0001');
                this.btnIntro.visible = false;
                this.btnIntro.anchor.set(0.5);
                this.mainDummy.addChild(this.btnIntro);
                this.btnOutro = new Phaser.Button(this.game, 295, 70, 'levelSelectAtlas', this.onClickOutro, this, 'intro_btn0002', 'intro_btn0001');
                this.btnOutro.scale.x = -1;
                this.btnOutro.visible = false;
                this.btnOutro.anchor.set(0.5);
                this.mainDummy.addChild(this.btnOutro);
                this.modalWindow = new Phaser.Graphics(this.game);
                var pSize = window.outerWidth;
                var drawPol = new Phaser.Polygon(-pSize, -pSize, pSize, -pSize, pSize, pSize, -pSize, pSize);
                this.modalWindow.beginFill(0x000000, 0.3);
                this.modalWindow.drawPolygon(drawPol);
                this.modalWindow.endFill();
                this.modalWindow.visible = false;
                this.mainDummy.addChild(this.modalWindow);
                this.erasePanel = new Phaser.Sprite(this.game, 0, 0, 'levelSelectAtlas', 'erase_panel');
                this.erasePanel.anchor.set(0.5);
                this.modalWindow.addChild(this.erasePanel);
                this.btnCancel = new Phaser.Button(this.game, -100, 108, 'levelSelectAtlas', this.onCancelEracePanel, this, 'cancel_btn0002', 'cancel_btn0001');
                this.btnCancel.anchor.set(0.5);
                this.erasePanel.addChild(this.btnCancel);
                this.btnDelete = new Phaser.Button(this.game, 100, 108, 'levelSelectAtlas', this.onDeleteData, this, 'delete_btn0002', 'delete_btn0001');
                this.btnDelete.anchor.set(0.5);
                this.erasePanel.addChild(this.btnDelete);
                this.door = new Client.doorEffect(this.game, 0, 0, 'gameAtlas');
                this.door.anchor.set(0.5);
                this.mainDummy.addChild(this.door);
                this.game.add.tween(this.mainDummy).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true);
                SndMng.playMusic(SndMng.MUSIC_MENU, 1, 1);
                this.checkPassLevels();
            };
            LevelSelect.prototype.onClickIntro = function () {
                this.door.onComplete.addOnce(this.showIntro, this);
                this.door.closeDoor();
                uSaveData.setItem('selectLevel', '-1');
            };
            LevelSelect.prototype.onClickOutro = function () {
                this.door.onComplete.addOnce(this.showOutro, this);
                this.door.closeDoor();
                uSaveData.setItem('selectLevel', '-1');
            };
            LevelSelect.prototype.showOutro = function () {
                this.game.state.start(States.OUTRO, true, false);
            };
            LevelSelect.prototype.showIntro = function () {
                this.game.state.start(States.INTRO, true, false);
            };
            LevelSelect.prototype.onDeleteData = function () {
                uSaveData.clearData();
                uSaveData.saveData();
                this.onCancelEracePanel();
                this.checkPassLevels();
            };
            LevelSelect.prototype.onCancelEracePanel = function () {
                this.btnErase.loadTexture('levelSelectAtlas', 'erase_btn0001');
                this.btnErase.visible = false;
                this.btnErase.visible = true;
                this.modalWindow.inputEnabled = false;
                this.modalWindow.visible = false;
            };
            LevelSelect.prototype.selectLevel = function (blevel) {
                if (this.levelButtons[blevel - 1].unlock) {
                    var getDataIntro = uSaveData.getItem('intro');
                    if (getDataIntro == 'true') {
                        uSaveData.setItem('selectLevel', blevel);
                    }
                    else {
                        uSaveData.setItem('selectLevel', '0');
                    }
                    this.door.onComplete.addOnce(this.startLevelSelect, this);
                    this.door.closeDoor();
                }
            };
            LevelSelect.prototype.startLevelSelect = function () {
                var getDataIntro = uSaveData.getItem('intro');
                if (getDataIntro == 'true') {
                    this.game.state.start(States.GAME, true, false);
                }
                else {
                    this.game.state.start(States.INTRO, true, false);
                }
            };
            LevelSelect.prototype.onShowErasePanel = function () {
                this.btnCancel.loadTexture('levelSelectAtlas', 'cancel_btn0001');
                this.btnDelete.loadTexture('levelSelectAtlas', 'delete_btn0001');
                this.modalWindow.inputEnabled = true;
                this.modalWindow.visible = true;
                this.erasePanel.scale.set(0);
                this.erasePanel.alpha = 0;
                this.game.add.tween(this.erasePanel.scale).to({ x: 1 }, 300, Phaser.Easing.Bounce.Out, true);
                this.game.add.tween(this.erasePanel.scale).to({ y: 1 }, 300, Phaser.Easing.Bounce.Out, true);
                this.game.add.tween(this.erasePanel).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true);
                this.btnCancel.scale.set(0);
                this.game.add.tween(this.btnCancel.scale).to({ x: 1 }, 400, Phaser.Easing.Bounce.Out, true, 350);
                this.game.add.tween(this.btnCancel.scale).to({ y: 1 }, 400, Phaser.Easing.Bounce.Out, true, 350);
                this.btnDelete.scale.set(0);
                this.game.add.tween(this.btnDelete.scale).to({ x: 1 }, 400, Phaser.Easing.Bounce.Out, true, 400);
                this.game.add.tween(this.btnDelete.scale).to({ y: 1 }, 400, Phaser.Easing.Bounce.Out, true, 400);
            };
            LevelSelect.prototype.checkPassLevels = function () {
                var passCount = 0;
                this.hand.visible = true;
                this.btnIntro.visible = false;
                this.btnOutro.visible = false;
                for (var j = 0; j < 3; j++) {
                    for (var i = 0; i < 10; i++) {
                        var key = 'passLevel' + (j * 10 + i);
                        var starKey = 'starLevel' + (j * 10 + i);
                        var data = uSaveData.getItem(key);
                        var starData = uSaveData.getItem(starKey);
                        if (data == 'true') {
                            this.levelButtons[j * 10 + i].setUnlock();
                            this.levelButtons[j * 10 + i].setRating(starData);
                            passCount++;
                        }
                        else {
                            this.levelButtons[j * 10 + i].setUnlock(false);
                        }
                    }
                }
                if (passCount > 0) {
                    this.hand.visible = false;
                }
                var getDataIntro = uSaveData.getItem('intro');
                if (getDataIntro == 'true') {
                    this.btnIntro.visible = true;
                    this.hand.visible = false;
                }
                if (passCount < 30) {
                    this.levelButtons[passCount].setUnlock();
                }
                else {
                    this.btnOutro.visible = true;
                }
            };
            LevelSelect.prototype.onClickMusic = function () {
                SndMng.setEnabledMusic(!SndMng.getEnabledMusic());
                if (SndMng.getEnabledMusic()) {
                    var oldMusic = SndMng.currentMusic;
                    SndMng.currentMusic = '';
                    SndMng.playMusic(oldMusic, 0, 1, 1000);
                }
                this.btnMusic.setStatus(SndMng.getEnabledMusic());
            };
            LevelSelect.prototype.onClickSfx = function () {
                SndMng.setEnabledSfx(!SndMng.getEnabledSfx());
                this.btnSfx.setStatus(SndMng.getEnabledSfx());
            };
            LevelSelect.prototype.onShowMenu = function () {
                SndMng.sfxPlay(SndMng.SFX_GO_BACK);
                this.game.state.start(States.MAINMENU, true, false);
            };
            LevelSelect.prototype.update = function () {
            };
            return LevelSelect;
        }(Phaser.State));
        Client.LevelSelect = LevelSelect;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var MainMenu = (function (_super) {
            __extends(MainMenu, _super);
            function MainMenu() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MainMenu.prototype.create = function () {
                this.mainDummy = new Phaser.Sprite(this.game, Config.GW / 2, Config.GH / 2);
                this.mainDummy.anchor.set(0.5);
                this.mainDummy.alpha = 0;
                this.add.existing(this.mainDummy);
                this.menuBackground = new Phaser.Sprite(this.game, 0, 0, 'menuAtlas', 'background');
                this.menuBackground.anchor.set(0.5);
                this.mainDummy.addChild(this.menuBackground);
                this.btnPlay = new Phaser.Button(this.game, 0, 220, 'menuAtlas', this.onPlayClick, this, 'play_btn0002', 'play_btn0001');
                this.btnPlay.scale.set(0.75);
                this.btnPlay.anchor.set(0.5);
                this.mainDummy.addChild(this.btnPlay);
                this.hand = new Phaser.Sprite(this.game, 0, 190, 'menuAtlas', 'hand_anim0001');
                this.hand.animations.add('play', Phaser.Animation.generateFrameNames('hand_anim', 1, 72, '', 4), 60, true);
                this.hand.play('play');
                this.hand.anchor.set(0.5);
                this.hand.inputEnabled = false;
                this.mainDummy.addChild(this.hand);
                this.btnCredits = new Phaser.Button(this.game, -255, 220, 'menuAtlas', this.onShowCredits, this, 'credits_btn0002', 'credits_btn0001');
                this.btnCredits.anchor.set(0.5);
                this.mainDummy.addChild(this.btnCredits);
                this.creditsPanel = new Phaser.Sprite(this.game, -310, 220, 'menuAtlas', 'credits_panel');
                this.creditsPanel.anchor.set(0, 1);
                this.creditsPanel.visible = false;
                this.mainDummy.addChild(this.creditsPanel);
                this.btnBack = new Phaser.Button(this.game, -239, 220, 'menuAtlas', this.onHideCredits, this, 'back_btn0002', 'back_btn0001');
                this.btnBack.anchor.set(0.5);
                this.btnBack.visible = false;
                this.mainDummy.addChild(this.btnBack);
                this.btnMusic = new Client.guiBtn(this.game, -280, -160, 'menuAtlas', 'music_btn', 'hint_music', true);
                this.btnMusic.onClick.add(this.onClickMusic, this);
                this.btnMusic.setStatus(SndMng.getEnabledMusic());
                this.mainDummy.addChild(this.btnMusic);
                this.btnSfx = new Client.guiBtn(this.game, -235, -160, 'menuAtlas', 'sfx_btn', 'hint_sfx', true);
                this.btnSfx.onClick.add(this.onClickSfx, this);
                this.btnSfx.setStatus(SndMng.getEnabledSfx());
                this.mainDummy.addChild(this.btnSfx);
                this.game.add.tween(this.mainDummy).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true);
                SndMng.playMusic(SndMng.MUSIC_MENU, 1, 1);
            };
            MainMenu.prototype.onClickMusic = function () {
                SndMng.setEnabledMusic(!SndMng.getEnabledMusic());
                if (SndMng.getEnabledMusic()) {
                    var oldMusic = SndMng.currentMusic;
                    SndMng.currentMusic = '';
                    SndMng.playMusic(oldMusic, 0, 1, 1000);
                }
                this.btnMusic.setStatus(SndMng.getEnabledMusic());
            };
            MainMenu.prototype.onClickSfx = function () {
                SndMng.setEnabledSfx(!SndMng.getEnabledSfx());
                this.btnSfx.setStatus(SndMng.getEnabledSfx());
            };
            MainMenu.prototype.onShowCredits = function () {
                SndMng.sfxPlay(SndMng.SFX_GO_FORWARD);
                this.btnCredits.visible = false;
                this.btnCredits.inputEnabled = false;
                this.btnPlay.visible = false;
                this.btnPlay.inputEnabled = false;
                this.hand.visible = false;
                this.btnBack.visible = true;
                this.btnBack.inputEnabled = true;
                this.creditsPanel.visible = true;
                this.creditsPanel.scale.set(0);
                this.game.add.tween(this.creditsPanel.scale).to({ x: 1 }, 200, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.creditsPanel.scale).to({ y: 1 }, 200, Phaser.Easing.Linear.None, true);
            };
            MainMenu.prototype.onHideCredits = function () {
                if (this.creditsPanel.scale.x == 1) {
                    SndMng.sfxPlay(SndMng.SFX_GO_BACK);
                    this.game.add.tween(this.creditsPanel.scale).to({ x: 0 }, 200, Phaser.Easing.Linear.None, true);
                    this.game.add.tween(this.creditsPanel.scale).to({ y: 0 }, 200, Phaser.Easing.Linear.None, true).onComplete.addOnce(this.onCompleteTween, this);
                }
            };
            MainMenu.prototype.onCompleteTween = function () {
                this.btnBack.visible = false;
                this.btnBack.inputEnabled = false;
                this.btnCredits.visible = true;
                this.btnCredits.inputEnabled = true;
                this.btnPlay.visible = true;
                this.btnPlay.inputEnabled = true;
                this.hand.visible = true;
                this.creditsPanel.visible = false;
            };
            MainMenu.prototype.onPlayClick = function () {
                SndMng.sfxPlay(SndMng.SFX_GO_FORWARD);
                this.game.state.start(States.LEVELSELECT, true, false);
            };
            MainMenu.prototype.update = function () {
            };
            return MainMenu;
        }(Phaser.State));
        Client.MainMenu = MainMenu;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Outro = (function (_super) {
            __extends(Outro, _super);
            function Outro() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Outro.prototype.create = function () {
                SndMng.playMusic(SndMng.MUSIC_MENU, 1, 1);
                this.mainDummy = new Phaser.Sprite(this.game, Config.GW / 2, Config.GH / 2);
                this.mainDummy.anchor.set(0.5);
                this.add.existing(this.mainDummy);
                this.introDummy = new Phaser.Sprite(this.game, 0, 0);
                this.introDummy.anchor.set(0.5);
                this.mainDummy.addChild(this.introDummy);
                this.background = new Phaser.Sprite(this.game, 0, 0, 'cutSceneAtlas', 'backgraund');
                this.background.anchor.set(0.5);
                this.introDummy.addChild(this.background);
                this.game.add.tween(this.background).to({ rotation: uMath.toRadians(360) }, 5000, Phaser.Easing.Linear.None, true, 0, -1);
                this.plate = new Phaser.Sprite(this.game, 0, 0, 'cutSceneAtlas', 'plate');
                this.plate.anchor.set(0.5);
                this.introDummy.addChild(this.plate);
                this.btnMusic = new Client.guiBtn(this.game, -290, -235, 'cutSceneAtlas', 'music_btn', 'hint_music', true);
                this.btnMusic.onClick.add(this.onClickMusic, this);
                this.btnMusic.setStatus(SndMng.getEnabledMusic());
                this.mainDummy.addChild(this.btnMusic);
                this.btnSfx = new Client.guiBtn(this.game, -245, -235, 'cutSceneAtlas', 'sfx_btn', 'hint_sfx', true);
                this.btnSfx.onClick.add(this.onClickSfx, this);
                this.btnSfx.setStatus(SndMng.getEnabledSfx());
                this.mainDummy.addChild(this.btnSfx);
                this.endScene = new Phaser.Sprite(this.game, 0, 0, 'cutSceneAtlas', 'end_scene');
                this.endScene.anchor.set(0.5);
                this.introDummy.addChild(this.endScene);
                this.button = new Phaser.Button(this.game, 0, 200, 'cutSceneAtlas', this.onClickContinue, this, 'continue_btn0002', 'continue_btn0001');
                this.button.anchor.set(0.5);
                this.introDummy.addChild(this.button);
                this.door = new Client.doorEffect(this.game, 0, 0, 'gameAtlas');
                this.door.anchor.set(0.5);
                this.door.openDoor();
                this.mainDummy.addChild(this.door);
            };
            Outro.prototype.onClickContinue = function () {
                this.door.closeDoor();
                this.door.onComplete.addOnce(this.goLevelSelect, this);
            };
            Outro.prototype.goLevelSelect = function () {
                this.game.state.start(States.LEVELSELECT, true, false);
            };
            Outro.prototype.onClickMusic = function () {
                SndMng.setEnabledMusic(!SndMng.getEnabledMusic());
                if (SndMng.getEnabledMusic()) {
                    var oldMusic = SndMng.currentMusic;
                    SndMng.currentMusic = '';
                    SndMng.playMusic(oldMusic, 0, 1, 1000);
                }
                this.btnMusic.setStatus(SndMng.getEnabledMusic());
            };
            Outro.prototype.onClickSfx = function () {
                SndMng.setEnabledSfx(!SndMng.getEnabledSfx());
                this.btnSfx.setStatus(SndMng.getEnabledSfx());
            };
            Outro.prototype.update = function () {
            };
            return Outro;
        }(Phaser.State));
        Client.Outro = Outro;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Preloader = (function (_super) {
            __extends(Preloader, _super);
            function Preloader() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.soundsDecodeWaiting = false;
                _this.soundsLoading = [];
                return _this;
            }
            Preloader.prototype.preload = function () {
                this.dummyLoader = new Phaser.Sprite(this.game, Config.GW / 2, Config.GH / 2);
                this.dummyLoader.anchor.set(0.5);
                this.add.existing(this.dummyLoader);
                var preloader_bg = new Phaser.Sprite(this.game, 0, 0, 'preloader_atlas', 'cn_preloader_bg');
                preloader_bg.anchor.set(0.5);
                this.dummyLoader.addChild(preloader_bg);
                this.preloadBar = new Phaser.Sprite(this.game, 0, 0, 'preloader_atlas', 'cn_preloader_bar');
                this.preloadBar.anchor.set(0.5);
                this.dummyLoader.addChild(this.preloadBar);
                this.preloadProgress = new Phaser.Sprite(this.game, 0, 0, 'preloader_atlas', 'cn_preloader_line0001');
                this.preloadProgress.anchor.set(0.5);
                this.preloadProgress.animations.add('play', Phaser.Animation.generateFrameNames('cn_preloader_line', 1, 10, '', 4), 24, true);
                this.preloadProgress.play('play');
                this.dummyLoader.addChild(this.preloadProgress);
                var percent = uMath.toPercent(ScaleManager.gameViewW, preloader_bg.width);
                this.dummyLoader.scale.set(percent / 100);
                this.load.atlasJSONArray('game', './assets/atlases/game.png', './assets/atlases/game.json');
                this.load.atlasJSONArray('menuAtlas', './assets/atlases/menu_atlas.png', './assets/atlases/menu_atlas.json');
                this.load.atlasJSONArray('levelSelectAtlas', './assets/atlases/level_select_atlas.png', './assets/atlases/level_select_atlas.json');
                this.load.atlasJSONArray('gameAtlas', './assets/atlases/game_atlas.png', './assets/atlases/game_atlas.json');
                this.load.atlasJSONArray('cutSceneAtlas', './assets/atlases/cut_scene_atlas.png', './assets/atlases/cut_scene_atlas.json');
                this.load.atlasJSONArray('playerAtlas', './assets/atlases/player_atlas.png', './assets/atlases/player_atlas.json');
                this.load.atlasJSONArray('pennyAtlas', './assets/atlases/penny_atlas.png', './assets/atlases/penny_atlas.json');
                this.load.atlasJSONArray('carrieAtlas', './assets/atlases/carrie_atlas.png', './assets/atlases/carrie_atlas.json');
                this.load.atlasJSONArray('joeAtlas', './assets/atlases/joe_atlas.png', './assets/atlases/joe_atlas.json');
                this.load.atlasJSONArray('tobiasAtlas', './assets/atlases/tobias_atlas.png', './assets/atlases/tobias_atlas.json');
                this.load.atlasJSONArray('carmenAtlas', './assets/atlases/carmen_atlas.png', './assets/atlases/carmen_atlas.json');
                this.load.atlasJSONArray('geAtlas', './assets/atlases/game_elements.png', './assets/atlases/game_elements.json');
                this.load.bitmapFont('myFont', './assets/atlases/font.png', './assets/atlases/font.xml');
                this.load.bitmapFont('myFont2', './assets/atlases/font2.png', './assets/atlases/font2.xml');
                this.load.bitmapFont('myFont3', './assets/atlases/font3.png', './assets/atlases/font2.xml');
                this.load.physics('physData', './assets/phys/physData.json');
                SndMng.init(this.game, true, true);
                var sndFiles = SndMng.LOAD_SOUNDS;
                for (var i = 0; i < sndFiles.length; i++) {
                    var mp3 = './assets/audio/' + sndFiles[i] + '.mp3';
                    this.load.audio(sndFiles[i], [mp3]);
                    this.soundsLoading.push(sndFiles[i]);
                }
                this.load.setPreloadSprite(this.preloadProgress);
            };
            Preloader.prototype.create = function () {
                this.soundsDecodeWaiting = true;
            };
            Preloader.prototype.onSoundsDecoded = function () {
                this.game.time.events.add(1000, this.onContinueCreate, this);
            };
            Preloader.prototype.onContinueCreate = function () {
                if (Params.isMacOS) {
                    this.dummyLoader.visible = false;
                    var spr = new Phaser.Sprite(this.game, Config.GW / 2, Config.GH / 2, 'game', 'youtube-like-start-icon');
                    spr.anchor.set(0.5);
                    this.add.existing(spr);
                    this.input.onDown.addOnce(this.startMainMenu, this);
                }
                else {
                    this.showLogo();
                }
            };
            Preloader.prototype.showLogo = function () {
                this.game.add.tween(this.preloadProgress).to({ alpha: 0 }, 400, Phaser.Easing.Linear.None, true);
                this.game.add.tween(this.preloadBar).to({ alpha: 0 }, 400, Phaser.Easing.Linear.None, true);
                var logo = new Client.LogoAnim(this.game, 0, 0, this.startMainMenu);
                logo.anchor.set(0.5);
                this.dummyLoader.addChild(logo);
            };
            Preloader.prototype.startMainMenu = function () {
                if (Params.isMacOS) {
                }
                this.game.state.start(States.MAINMENU, true, false);
            };
            Preloader.prototype.update = function () {
                if (!this.soundsDecodeWaiting)
                    return;
                var sndDecoded = true;
                for (var i = 0; i < this.soundsLoading.length; i++) {
                    var sndName = this.soundsLoading[i];
                    if (!this.game.cache.isSoundDecoded(sndName)) {
                        sndDecoded = false;
                        break;
                    }
                }
                if (sndDecoded) {
                    this.soundsDecodeWaiting = false;
                    this.onSoundsDecoded();
                }
            };
            return Preloader;
        }(Phaser.State));
        Client.Preloader = Preloader;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var States;
(function (States) {
    States.BOOT = 'Boot';
    States.PRELOADER = 'Preloader';
    States.MAINMENU = 'MainMenu';
    States.GAME = 'Game';
    States.LEVELSELECT = 'LevelSelect';
    States.INTRO = 'Intro';
    States.OUTRO = 'Outro';
})(States || (States = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level1 = (function (_super) {
            __extends(Level1, _super);
            function Level1(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 100;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.numScrolls = 2;
                _this.numStones = 0;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_FIRST_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_1');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_1');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                _this.sun = new Client.sunShine(_this.game, 50, 50, 'gameAtlas');
                _this.addChild(_this.sun);
                _this.tutorial = new Phaser.Sprite(_this.game, 105, 20, 'gameAtlas', 'tutorial1');
                _this.addChild(_this.tutorial);
                _this.penny = new Client.goPenny(_this.game, 520, 400);
                _this.addChild(_this.penny);
                _this.targetObject.push(_this.penny);
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level1.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level1.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level1.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level1.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level1;
        }(Phaser.Sprite));
        Client.Level1 = Level1;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level10 = (function (_super) {
            __extends(Level10, _super);
            function Level10(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 50;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 3;
                _this.numStones = 0;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_FIRST_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_1');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_1');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                _this.sun = new Client.sunShine(_this.game, 50, 50, 'gameAtlas');
                _this.addChild(_this.sun);
                var penny = new Client.goPenny(_this.game, 520, 400);
                _this.addChild(penny);
                _this.targetObject.push(penny);
                for (var i = 0; i < 14; i++) {
                    var spike = new Client.goSpike(_this.game, 240 + i * 15, 392, 'spike_cactus');
                    _this.addChild(spike);
                    _this.otherObject.push(spike);
                }
                var platform = new Client.goPlatform_block(_this.game, 350, 200, 15);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var light = new Client.goStreetLight(_this.game, 200, 400, 'street_light');
                _this.addChild(light);
                _this.otherObject.push(light);
                var bplatform = new Client.goBucketPlatform(_this.game, 285, 200);
                _this.addChild(bplatform);
                _this.otherObject.push(bplatform);
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level10.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level10.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level10.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level10.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level10;
        }(Phaser.Sprite));
        Client.Level10 = Level10;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level11 = (function (_super) {
            __extends(Level11, _super);
            function Level11(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 50;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 2;
                _this.numStones = 2;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_SECOND_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_2');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_2');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                _this.sun = new Client.sunShine(_this.game, 50, 50, 'gameAtlas');
                _this.addChild(_this.sun);
                _this.tutorial = new Phaser.Sprite(_this.game, 105, 10, 'gameAtlas', 'tutorial5');
                _this.addChild(_this.tutorial);
                var carmen = new Client.goCarmen(_this.game, 500, 278);
                _this.addChild(carmen);
                _this.targetObject.push(carmen);
                var platform = new Client.goPlatformBlockBrick(_this.game, 400, 150, 10);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockBrick(_this.game, 400, 275, 10);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockBrick(_this.game, -30, 220, 6);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var gate = new Client.goGate(_this.game, 399, 175, 100);
                _this.addChild(gate);
                _this.otherObject.push(gate);
                var lever = new Client.goLever(_this.game, 70, 194, 'lever_block');
                lever.addObject(gate);
                _this.addChild(lever);
                _this.otherObject.push(lever);
                var rubber = new Client.goRubber(_this.game, 399, 150);
                rubber.SetRotate(-90);
                _this.addChild(rubber);
                _this.otherObject.push(rubber);
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level11.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level11.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level11.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level11.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level11;
        }(Phaser.Sprite));
        Client.Level11 = Level11;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level12 = (function (_super) {
            __extends(Level12, _super);
            function Level12(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 50;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 2;
                _this.numStones = 2;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_SECOND_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_2');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_2');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                _this.sun = new Client.sunShine(_this.game, 50, 50, 'gameAtlas');
                _this.addChild(_this.sun);
                var tobias = new Client.goTobias(_this.game, 500, 400);
                _this.addChild(tobias);
                _this.targetObject.push(tobias);
                var platform = new Client.goPlatformBlockBrick(_this.game, 350, 275, 13);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockBrick(_this.game, 400, 0, 9);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockBrick(_this.game, 400, 100, 4);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockBrick(_this.game, 400, 26, 1);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockBrick(_this.game, 400, 52, 1);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockBrick(_this.game, 400, 78, 1);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var gate = new Client.goGate(_this.game, 350, 300, 100);
                _this.addChild(gate);
                _this.otherObject.push(gate);
                var lever = new Client.goLever(_this.game, 470, 73, 'lever_block');
                lever.addObject(gate);
                _this.addChild(lever);
                _this.otherObject.push(lever);
                var trampBox = new Client.goTrampolineBox(_this.game, 580, 200);
                _this.addChild(trampBox);
                _this.otherObject.push(trampBox);
                var trampBounce = new Client.goTrampolineBounce(_this.game, 580, 200, 0, 50000, 15000);
                _this.addChild(trampBounce);
                _this.otherObject.push(trampBounce);
                for (var i = 0; i < 4; i++) {
                    var spike = new Client.goSpike(_this.game, 385 + i * 25, 392, 'cone');
                    _this.addChild(spike);
                    _this.otherObject.push(spike);
                }
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level12.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level12.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level12.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level12.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level12;
        }(Phaser.Sprite));
        Client.Level12 = Level12;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level13 = (function (_super) {
            __extends(Level13, _super);
            function Level13(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 50;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 3;
                _this.numStones = 4;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_SECOND_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_2');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_2');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                _this.sun = new Client.sunShine(_this.game, 50, 50, 'gameAtlas');
                _this.addChild(_this.sun);
                var joe = new Client.goJoe(_this.game, 550, 400);
                _this.addChild(joe);
                _this.targetObject.push(joe);
                var platform = new Client.goPlatformBlockBrick(_this.game, 0, 290, 4);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockBrick(_this.game, 0, 190, 4);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockBrick(_this.game, 0, 90, 4);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockBrick(_this.game, 400, 255, 10);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var py = 255 + 25.5;
                function getPY() {
                    py -= 25.5;
                    return py;
                }
                for (var i = 0; i <= 10; i++) {
                    var platform = new Client.goPlatformBlockBrick(_this.game, 400, getPY(), 1);
                    _this.addChild(platform);
                    _this.otherObject.push(platform);
                    var rubber = new Client.goRubber(_this.game, 399, py);
                    rubber.SetRotate(-90);
                    _this.addChild(rubber);
                    _this.otherObject.push(rubber);
                }
                var gate = new Client.goGate(_this.game, 399, 280, 120);
                _this.addChild(gate);
                _this.otherObject.push(gate);
                var lever = new Client.goLever(_this.game, 70, 263, 'lever_block');
                lever.addObject(gate);
                _this.addChild(lever);
                _this.otherObject.push(lever);
                var gate = new Client.goGate(_this.game, 439, 280, 120);
                _this.addChild(gate);
                _this.otherObject.push(gate);
                var lever = new Client.goLever(_this.game, 70, 163, 'lever_block');
                lever.addObject(gate);
                _this.addChild(lever);
                _this.otherObject.push(lever);
                var gate = new Client.goGate(_this.game, 479, 280, 120);
                _this.addChild(gate);
                _this.otherObject.push(gate);
                var lever = new Client.goLever(_this.game, 70, 63, 'lever_block');
                lever.addObject(gate);
                _this.addChild(lever);
                _this.otherObject.push(lever);
                for (var i = 0; i < 8; i++) {
                    var spike = new Client.goSpike(_this.game, 200 + i * 25, 392, 'cone');
                    _this.addChild(spike);
                    _this.otherObject.push(spike);
                }
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level13.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level13.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level13.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level13.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level13;
        }(Phaser.Sprite));
        Client.Level13 = Level13;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level14 = (function (_super) {
            __extends(Level14, _super);
            function Level14(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 50;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 3;
                _this.numStones = 2;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_SECOND_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_2');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_2');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                _this.sun = new Client.sunShine(_this.game, 50, 50, 'gameAtlas');
                _this.addChild(_this.sun);
                var penny = new Client.goPenny(_this.game, 500, 400);
                _this.addChild(penny);
                _this.targetObject.push(penny);
                var platform = new Client.goPlatformBlockBrick(_this.game, 320, 200, 15);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var trapDoor = new Client.goTrapDoor(_this.game, 500, 250);
                _this.addChild(trapDoor);
                _this.otherObject.push(trapDoor);
                var lever = new Client.goLever(_this.game, 185, 220, 'lever_block_3');
                lever.setTime(200);
                lever.addObject(trapDoor);
                _this.addChild(lever);
                _this.otherObject.push(lever);
                var light = new Client.goStreetLight(_this.game, 200, 400, 'street_light_both');
                _this.addChild(light);
                _this.otherObject.push(light);
                for (var i = 0; i < 5; i++) {
                    var spike = new Client.goSpike(_this.game, 240 + i * 25, 392, 'cone');
                    _this.addChild(spike);
                    _this.otherObject.push(spike);
                }
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level14.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level14.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level14.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level14.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level14;
        }(Phaser.Sprite));
        Client.Level14 = Level14;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level15 = (function (_super) {
            __extends(Level15, _super);
            function Level15(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 30;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 2;
                _this.numStones = 2;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_SECOND_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_2');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_2');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                _this.sun = new Client.sunShine(_this.game, 50, 50, 'gameAtlas');
                _this.addChild(_this.sun);
                var tobias = new Client.goTobias(_this.game, 550, 382);
                _this.addChild(tobias);
                _this.targetObject.push(tobias);
                var platformMove = new Client.goPlatform3(_this.game, 500, 380, 100);
                platformMove.setLength(265);
                platformMove.setObj(tobias);
                _this.addChild(platformMove);
                _this.otherObject.push(platformMove);
                var lever = new Client.goLever(_this.game, 570, 223, 'lever_block_3');
                lever.addObject(platformMove);
                _this.addChild(lever);
                _this.otherObject.push(lever);
                var light = new Client.goStreetLight(_this.game, 200, 400, 'street_light_both');
                _this.addChild(light);
                _this.otherObject.push(light);
                var py = 250 + 25.5;
                function getPY() {
                    py -= 25.5;
                    return py;
                }
                for (var i = 0; i <= 8; i++) {
                    var platform = new Client.goPlatformBlockBrick(_this.game, 376, getPY(), 1);
                    _this.addChild(platform);
                    _this.otherObject.push(platform);
                }
                py = 250 + 25.5;
                for (var i = 0; i <= 10; i++) {
                    var platform = new Client.goPlatformBlockBrick(_this.game, 626, getPY(), 1);
                    _this.addChild(platform);
                    _this.otherObject.push(platform);
                }
                var platform = new Client.goPlatformBlockBrick(_this.game, 376, -17, 10);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockBrick(_this.game, 320, 250, 15);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatform2(_this.game, 404, 50, 170, 10);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatform2(_this.game, 445, 115, 180, -10);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatform2(_this.game, 404, 180, 140, 10);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var wheel = new Client.goWheel(_this.game, 390, 25);
                _this.addChild(wheel);
                _this.otherObject.push(wheel);
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level15.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level15.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level15.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level15.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level15;
        }(Phaser.Sprite));
        Client.Level15 = Level15;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level16 = (function (_super) {
            __extends(Level16, _super);
            function Level16(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 50;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 4;
                _this.numStones = 2;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_SECOND_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_2');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_2');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                _this.sun = new Client.sunShine(_this.game, 50, 50, 'gameAtlas');
                _this.addChild(_this.sun);
                var carrie = new Client.goCarrie(_this.game, 275, 400);
                _this.addChild(carrie);
                _this.targetObject.push(carrie);
                var carmen = new Client.goCarmen(_this.game, 425, 400);
                _this.addChild(carmen);
                _this.targetObject.push(carmen);
                var platformMove = new Client.goPlatform4(_this.game, 180, 194, 180);
                platformMove.setLength(150);
                _this.addChild(platformMove);
                _this.otherObject.push(platformMove);
                for (var i = 0; i < 5; i++) {
                    var spike = new Client.goHeadgehog(_this.game, 205 + i * 35, 201);
                    _this.addChild(spike);
                    _this.otherObject.push(spike);
                    platformMove.setObj(spike);
                }
                var lever = new Client.goLever(_this.game, 521, 300, 'lever_block');
                lever.addObject(platformMove);
                lever.body.angle = 90;
                lever.setTime(420);
                _this.addChild(lever);
                _this.otherObject.push(lever);
                var light = new Client.goStreetLight(_this.game, 200, 400, 'street_light', 180);
                _this.addChild(light);
                _this.otherObject.push(light);
                var light = new Client.goStreetLight(_this.game, 350, 400, 'street_light', 180);
                _this.addChild(light);
                _this.otherObject.push(light);
                var light = new Client.goStreetLight(_this.game, 500, 400, 'street_light', 180);
                _this.addChild(light);
                _this.otherObject.push(light);
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level16.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level16.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level16.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level16.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level16;
        }(Phaser.Sprite));
        Client.Level16 = Level16;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level17 = (function (_super) {
            __extends(Level17, _super);
            function Level17(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 100;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 2;
                _this.numStones = 2;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_SECOND_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_2');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_2');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                _this.sun = new Client.sunShine(_this.game, 50, 50, 'gameAtlas');
                _this.addChild(_this.sun);
                var penny = new Client.goPenny(_this.game, 150, 200);
                _this.addChild(penny);
                _this.targetObject.push(penny);
                var platform = new Client.goPlatformBlockBrick(_this.game, 0, 200, 8);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var trampBox = new Client.goTrampolineBox(_this.game, 580, 320);
                _this.addChild(trampBox);
                _this.otherObject.push(trampBox);
                var trampBounce = new Client.goTrampolineBounce(_this.game, 580, 320, 0, 30000, 40000);
                _this.addChild(trampBounce);
                _this.otherObject.push(trampBounce);
                var stone = new Client.goSmallStone(_this.game, 380, 350, 30, 45, 1);
                _this.addChild(stone);
                _this.otherObject.push(stone);
                var stone = new Client.goSmallStone(_this.game, 380, 305, 30, 45, 1);
                _this.addChild(stone);
                _this.otherObject.push(stone);
                var stone = new Client.goSmallStone(_this.game, 380, 255, 30, 45, 1);
                _this.addChild(stone);
                _this.otherObject.push(stone);
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level17.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level17.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level17.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level17.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level17;
        }(Phaser.Sprite));
        Client.Level17 = Level17;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level18 = (function (_super) {
            __extends(Level18, _super);
            function Level18(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 50;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 4;
                _this.numStones = 2;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_SECOND_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_2');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_2');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                _this.sun = new Client.sunShine(_this.game, 50, 50, 'gameAtlas');
                _this.addChild(_this.sun);
                var joe = new Client.goJoe(_this.game, 198, 202);
                _this.addChild(joe);
                _this.targetObject.push(joe);
                var tobias = new Client.goTobias(_this.game, 500, 400);
                _this.addChild(tobias);
                _this.targetObject.push(tobias);
                var platform = new Client.goPlatformBlockBrick(_this.game, 0, 200, 8);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var py = -8 - 25.5;
                function getPY() {
                    py += 25.5;
                    return py;
                }
                for (var i = 0; i <= 5; i++) {
                    var platform = new Client.goPlatformBlockBrick(_this.game, 612, getPY(), 1);
                    _this.addChild(platform);
                    _this.otherObject.push(platform);
                    var rubber = new Client.goRubber(_this.game, 611, py);
                    rubber.SetRotate(-90);
                    _this.addChild(rubber);
                    _this.otherObject.push(rubber);
                }
                for (var i = 0; i <= 9; i++) {
                    var platform = new Client.goPlatformBlockBrick(_this.game, 612, getPY(), 1);
                    _this.addChild(platform);
                    _this.otherObject.push(platform);
                }
                var platform = new Client.goPlatformBlockBrick(_this.game, 196, 350, 3);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockBrick(_this.game, 196, 375.5, 1);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockBrick(_this.game, 250, 375.5, 1);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var window = new Client.goBreaking_window(_this.game, 192, 225, 133);
                _this.addChild(window);
                _this.otherObject.push(window);
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level18.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level18.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level18.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level18.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level18;
        }(Phaser.Sprite));
        Client.Level18 = Level18;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level19 = (function (_super) {
            __extends(Level19, _super);
            function Level19(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 50;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 4;
                _this.numStones = 0;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_SECOND_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_2');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_2');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                _this.sun = new Client.sunShine(_this.game, 50, 50, 'gameAtlas');
                _this.addChild(_this.sun);
                var penny = new Client.goPenny(_this.game, 360, 400);
                _this.addChild(penny);
                _this.targetObject.push(penny);
                var carrie = new Client.goCarrie(_this.game, 550, 100);
                _this.addChild(carrie);
                _this.targetObject.push(carrie);
                var platform = new Client.goPlatformBlockBrick(_this.game, 0, 200, 3);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockBrick(_this.game, 284, 200, 4);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockBrick(_this.game, 500, 100, 6);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var py = 225 - 25.5;
                function getPY() {
                    py += 25.5;
                    return py;
                }
                for (var i = 0; i <= 6; i++) {
                    var platform = new Client.goPlatformBlockBrick(_this.game, 284, getPY(), 1);
                    _this.addChild(platform);
                    _this.otherObject.push(platform);
                }
                py = 325 - 25.5;
                for (var i = 0; i <= 2; i++) {
                    var platform = new Client.goPlatformBlockBrick(_this.game, 610, getPY(), 1);
                    _this.addChild(platform);
                    _this.otherObject.push(platform);
                }
                var gate = new Client.goGate(_this.game, 82, 223, 200, -90);
                _this.addChild(gate);
                gate.setTimeToAutoOpen(3 * 60);
                _this.otherObject.push(gate);
                var trampBounce = new Client.goTrampolineBounce(_this.game, 560, 395, -25, 22000, 80000);
                _this.addChild(trampBounce);
                _this.otherObject.push(trampBounce);
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level19.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level19.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level19.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level19.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level19;
        }(Phaser.Sprite));
        Client.Level19 = Level19;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level2 = (function (_super) {
            __extends(Level2, _super);
            function Level2(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 100;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 2;
                _this.numStones = 2;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_FIRST_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_1');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_1');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                _this.sun = new Client.sunShine(_this.game, 50, 50, 'gameAtlas');
                _this.addChild(_this.sun);
                _this.tutorial = new Phaser.Sprite(_this.game, 105, 20, 'gameAtlas', 'tutorial2');
                _this.addChild(_this.tutorial);
                var carrie = new Client.goCarrie(_this.game, 520, 250);
                _this.addChild(carrie);
                _this.targetObject.push(carrie);
                var platform = new Client.goPlatform1(_this.game, 440, 250);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatform1(_this.game, 440, 148);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var window = new Client.goBreaking_window(_this.game, 440, 160);
                _this.addChild(window);
                _this.otherObject.push(window);
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level2.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level2.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level2.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level2.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level2;
        }(Phaser.Sprite));
        Client.Level2 = Level2;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level20 = (function (_super) {
            __extends(Level20, _super);
            function Level20(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 100;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 2;
                _this.numStones = 2;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_SECOND_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_2');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_2');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                _this.sun = new Client.sunShine(_this.game, 50, 50, 'gameAtlas');
                _this.addChild(_this.sun);
                var carmen = new Client.goCarmen(_this.game, 200, 175);
                _this.addChild(carmen);
                _this.targetObject.push(carmen);
                var platform = new Client.goPlatformBlockBrick(_this.game, 0, 175, 11);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var py = 175;
                function getPY() {
                    py += 25.5;
                    return py;
                }
                for (var i = 0; i <= 1; i++) {
                    var platform = new Client.goPlatformBlockBrick(_this.game, 270, getPY(), 1);
                    _this.addChild(platform);
                    _this.otherObject.push(platform);
                    var rubber = new Client.goRubber(_this.game, 270, py);
                    rubber.SetRotate(-90);
                    _this.addChild(rubber);
                    _this.otherObject.push(rubber);
                }
                var gate = new Client.goGate(_this.game, 275, 250, 150, 0);
                _this.addChild(gate);
                _this.otherObject.push(gate);
                var lever = new Client.goLever(_this.game, 54, 235, 'lever_block');
                lever.addObject(gate);
                lever.body.angle = 180;
                _this.addChild(lever);
                _this.otherObject.push(lever);
                var trampBox = new Client.goTrampolineBox(_this.game, 580, 340);
                _this.addChild(trampBox);
                _this.otherObject.push(trampBox);
                var trampBounce = new Client.goTrampolineBounce(_this.game, 580, 340, 0, 40000, 60000);
                _this.addChild(trampBounce);
                _this.otherObject.push(trampBounce);
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level20.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level20.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level20.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level20.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level20;
        }(Phaser.Sprite));
        Client.Level20 = Level20;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level21 = (function (_super) {
            __extends(Level21, _super);
            function Level21(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 100;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 4;
                _this.numStones = 0;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_THIRD_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_3');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_2');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                _this.tutorial = new Phaser.Sprite(_this.game, 105, 10, 'gameAtlas', 'tutorial6');
                _this.addChild(_this.tutorial);
                var carrie = new Client.goCarrie(_this.game, 530, 400);
                _this.addChild(carrie);
                _this.targetObject.push(carrie);
                var tobias = new Client.goTobias(_this.game, 560, 196);
                _this.addChild(tobias);
                _this.targetObject.push(tobias);
                var platform = new Client.goPlatformBlockStone(_this.game, 400, 196, 9);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var py = 196;
                function getPY() {
                    py += 25.5;
                    return py;
                }
                for (var i = 0; i <= 6; i++) {
                    var platform = new Client.goPlatformBlockStone(_this.game, 400, getPY(), 1, 2);
                    _this.addChild(platform);
                    _this.otherObject.push(platform);
                }
                var portalOut = new Client.goPortal(_this.game, 590, 290, 'portal_pink_out');
                portalOut.body.angle = -120 - 90;
                _this.addChild(portalOut);
                _this.otherObject.push(portalOut);
                var portalIn = new Client.goPortal(_this.game, 300, 200, 'portal_pink_in');
                portalIn.body.angle = -120 - 90;
                portalIn.setEject(portalOut);
                _this.addChild(portalIn);
                _this.otherObject.push(portalIn);
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level21.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level21.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level21.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level21.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level21;
        }(Phaser.Sprite));
        Client.Level21 = Level21;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level22 = (function (_super) {
            __extends(Level22, _super);
            function Level22(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 50;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 2;
                _this.numStones = 0;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_THIRD_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_3');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_2');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                var penny = new Client.goPenny(_this.game, 530, 400);
                _this.addChild(penny);
                _this.targetObject.push(penny);
                var platform = new Client.goPlatformBlockStone(_this.game, 0, 200, 6);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockStone(_this.game, 0, 0, 24);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var py = 0;
                function getPY() {
                    py += 25.5;
                    return py;
                }
                for (var i = 0; i <= 14; i++) {
                    var platform = new Client.goPlatformBlockStone(_this.game, 378, getPY(), 1, 2);
                    _this.addChild(platform);
                    _this.otherObject.push(platform);
                }
                var portalOut = new Client.goPortal(_this.game, 535, 100, 'portal_pink_out');
                portalOut.body.angle = -180 - 90;
                _this.addChild(portalOut);
                _this.otherObject.push(portalOut);
                var portalIn = new Client.goPortal(_this.game, 50, 150, 'portal_pink_in');
                portalIn.body.angle = 60 - 90;
                portalIn.setEject(portalOut);
                _this.addChild(portalIn);
                _this.otherObject.push(portalIn);
                var trampBox = new Client.goTrampolineBox(_this.game, 317, 327);
                _this.addChild(trampBox);
                _this.otherObject.push(trampBox);
                var trampBounce = new Client.goTrampolineBounce(_this.game, 317, 327, 0, 15000, 60000);
                _this.addChild(trampBounce);
                _this.otherObject.push(trampBounce);
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level22.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level22.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level22.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level22.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level22;
        }(Phaser.Sprite));
        Client.Level22 = Level22;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level23 = (function (_super) {
            __extends(Level23, _super);
            function Level23(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 50;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 3;
                _this.numStones = 0;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_THIRD_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_3');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_2');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                var joe = new Client.goJoe(_this.game, 550, 158);
                _this.addChild(joe);
                _this.targetObject.push(joe);
                var platform = new Client.goPlatformBlockStone(_this.game, 0, 158, 24);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockStone(_this.game, 0, 183.5, 24, 2);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var portalOut = new Client.goPortal(_this.game, 100, 60, 'portal_pink_out');
                portalOut.body.angle = 90 - 90;
                _this.addChild(portalOut);
                _this.otherObject.push(portalOut);
                var portalIn = new Client.goPortal(_this.game, 600, 300, 'portal_pink_in');
                portalIn.body.angle = -90 - 90;
                portalIn.setEject(portalOut);
                _this.addChild(portalIn);
                _this.otherObject.push(portalIn);
                var bee = new Client.goBeeHave(_this.game, 220, 305, false, 70);
                bee.setUp();
                _this.addChild(bee);
                _this.otherObject.push(bee);
                bee.setMoveCenter(280, 200, 180);
                var bee = new Client.goBeeHave(_this.game, 420, 305, false, 70);
                bee.setUp(false);
                _this.addChild(bee);
                _this.otherObject.push(bee);
                bee.setMoveCenter(280, 200, 180);
                var fire = new Client.goFire(_this.game, 200, 160);
                _this.addChild(fire);
                _this.otherObject.push(fire);
                var fire = new Client.goFire(_this.game, 408, 160);
                _this.addChild(fire);
                _this.otherObject.push(fire);
                for (var i = 0; i < 11; i++) {
                    var spike = new Client.goSpike(_this.game, 226 + i * 15, 150, 'spike_cactus');
                    _this.addChild(spike);
                    _this.otherObject.push(spike);
                }
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level23.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level23.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level23.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level23.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level23;
        }(Phaser.Sprite));
        Client.Level23 = Level23;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level24 = (function (_super) {
            __extends(Level24, _super);
            function Level24(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 20;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 5;
                _this.numStones = 3;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_THIRD_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_3');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_2');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                var carmen = new Client.goCarmen(_this.game, 400, 400);
                _this.addChild(carmen);
                _this.targetObject.push(carmen);
                var carrie = new Client.goCarrie(_this.game, 500, 400);
                _this.addChild(carrie);
                _this.targetObject.push(carrie);
                var tobias = new Client.goTobias(_this.game, 600, 400);
                _this.addChild(tobias);
                _this.targetObject.push(tobias);
                var trapDoor = new Client.goTrapDoor(_this.game, 550, 250);
                _this.addChild(trapDoor);
                _this.otherObject.push(trapDoor);
                trapDoor.setLength(300);
                var lever = new Client.goLever(_this.game, 187, 220, 'lever_block_3');
                lever.setTime(120);
                lever.addObject(trapDoor);
                _this.addChild(lever);
                _this.otherObject.push(lever);
                var light = new Client.goStreetLight(_this.game, 200, 400, 'street_light_both', 155);
                _this.addChild(light);
                _this.otherObject.push(light);
                var platform = new Client.goPlatformBlockStone(_this.game, 320, 200, 15);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                for (var i = 0; i < 8; i++) {
                    var spike = new Client.goSpike(_this.game, 240 + i * 15, 392, 'spike_cactus');
                    _this.addChild(spike);
                    _this.otherObject.push(spike);
                }
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level24.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level24.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level24.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level24.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level24;
        }(Phaser.Sprite));
        Client.Level24 = Level24;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level25 = (function (_super) {
            __extends(Level25, _super);
            function Level25(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 50;
                _this.startPlayerY = 170;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 5;
                _this.numStones = 3;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_THIRD_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_3');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_2');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                var penny = new Client.goPenny(_this.game, 100, 400);
                _this.addChild(penny);
                _this.targetObject.push(penny);
                var platform = new Client.goPlatformBlockStone(_this.game, 0, 200, 24);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockStone(_this.game, 0, 225.5, 24, 2);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var portalOut = new Client.goPortal(_this.game, 600, 300, 'portal_pink_out');
                portalOut.body.angle = -90 - 90;
                _this.addChild(portalOut);
                _this.otherObject.push(portalOut);
                var portalIn = new Client.goPortal(_this.game, 600, 40, 'portal_pink_in');
                portalIn.body.angle = -90 - 90;
                portalIn.setEject(portalOut);
                _this.addChild(portalIn);
                _this.otherObject.push(portalIn);
                var fire = new Client.goFire(_this.game, 300, 100, false);
                _this.addChild(fire);
                _this.otherObject.push(fire);
                var stonePillar = new Client.goStonePillar(_this.game, 280, 110);
                _this.addChild(stonePillar);
                _this.otherObject.push(stonePillar);
                var fire = new Client.goFire(_this.game, 350, 405);
                _this.addChild(fire);
                _this.otherObject.push(fire);
                var gate = new Client.goGate(_this.game, 200, 251, 150);
                _this.addChild(gate);
                gate.setTimeToAutoOpen(4 * 60);
                _this.otherObject.push(gate);
                for (var i = 0; i < 5; i++) {
                    var spike = new Client.goSpike(_this.game, 180 + i * 15, 192, 'spike_cactus');
                    _this.addChild(spike);
                    _this.otherObject.push(spike);
                }
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level25.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level25.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level25.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level25.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level25;
        }(Phaser.Sprite));
        Client.Level25 = Level25;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level26 = (function (_super) {
            __extends(Level26, _super);
            function Level26(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 50;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 6;
                _this.numStones = 0;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_THIRD_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_3');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_2');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                var carmen = new Client.goCarmen(_this.game, 160, 200);
                _this.addChild(carmen);
                _this.targetObject.push(carmen);
                var carrie = new Client.goCarrie(_this.game, 320, 200);
                _this.addChild(carrie);
                _this.targetObject.push(carrie);
                var joe = new Client.goJoe(_this.game, 480, 200);
                _this.addChild(joe);
                _this.targetObject.push(joe);
                var platform = new Client.goPlatformBlockStone(_this.game, 0, 200, 24);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockStone(_this.game, 0, 225.5, 24, 2);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var portalOut = new Client.goPortal(_this.game, 100, 30, 'portal_pink_out');
                portalOut.body.angle = 180 - 90;
                portalOut.setLength(440);
                portalOut.setMoved(true);
                _this.addChild(portalOut);
                _this.otherObject.push(portalOut);
                var portalIn = new Client.goPortal(_this.game, 600, 330, 'portal_pink_in');
                portalIn.body.angle = -90 - 90;
                portalIn.setEject(portalOut);
                _this.addChild(portalIn);
                _this.otherObject.push(portalIn);
                var gate = new Client.goGate(_this.game, 500, 400, 150, 180);
                _this.addChild(gate);
                gate.setTimeToAutoOpen(2 * 60, 6 * 60);
                _this.otherObject.push(gate);
                for (var i = 0; i < 5; i++) {
                    var spike = new Client.goSpike(_this.game, 206 + i * 15, 194, 'spike_cactus');
                    _this.addChild(spike);
                    _this.otherObject.push(spike);
                    var spike = new Client.goSpike(_this.game, 366 + i * 15, 194, 'spike_cactus');
                    _this.addChild(spike);
                    _this.otherObject.push(spike);
                }
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level26.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level26.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level26.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level26.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level26;
        }(Phaser.Sprite));
        Client.Level26 = Level26;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level27 = (function (_super) {
            __extends(Level27, _super);
            function Level27(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 50;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 2;
                _this.numStones = 2;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_THIRD_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_3');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_2');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                var tobias = new Client.goTobias(_this.game, 560, 174);
                _this.addChild(tobias);
                _this.targetObject.push(tobias);
                var platform = new Client.goPlatformBlockStone(_this.game, 460, -30, 7);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockStone(_this.game, 460, 174, 7);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var py = -30 - 25.5;
                function getPY() {
                    py += 25.5;
                    return py;
                }
                for (var i = 0; i < 9; i++) {
                    var platform = new Client.goPlatformBlockStone(_this.game, 460, getPY(), 1, 2);
                    _this.addChild(platform);
                    _this.otherObject.push(platform);
                    var rubber = new Client.goRubber(_this.game, 460, py);
                    rubber.SetRotate(-90);
                    _this.addChild(rubber);
                    _this.otherObject.push(rubber);
                }
                var platform = new Client.goPlatformBlockStone(_this.game, 550, 250, 4);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockStone(_this.game, 0, 100, 7);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockStone(_this.game, 0, 202, 6);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                py = 100;
                for (var i = 0; i < 4; i++) {
                    var platform = new Client.goPlatformBlockStone(_this.game, 162, getPY(), 1, 2);
                    _this.addChild(platform);
                    _this.otherObject.push(platform);
                }
                var portalOutB = new Client.goPortal(_this.game, 550, 30, 'portal_blue_out');
                portalOutB.body.angle = 180 - 90;
                _this.addChild(portalOutB);
                _this.otherObject.push(portalOutB);
                var portalInB = new Client.goPortal(_this.game, 600, 340, 'portal_blue_in');
                portalInB.body.angle = -90 - 90;
                portalInB.setEject(portalOutB);
                _this.addChild(portalInB);
                _this.otherObject.push(portalInB);
                var portalOutP = new Client.goPortal(_this.game, 130, 160, 'portal_pink_out');
                portalOutP.body.angle = -90 - 90;
                _this.addChild(portalOutP);
                _this.otherObject.push(portalOutP);
                var portalInP = new Client.goPortal(_this.game, 140, 60, 'portal_pink_in');
                portalInP.body.angle = 90 - 90;
                portalInP.setEject(portalOutP);
                _this.addChild(portalInP);
                _this.otherObject.push(portalInP);
                var gate = new Client.goGate(_this.game, 550, 275, 125);
                _this.addChild(gate);
                _this.otherObject.push(gate);
                var lever = new Client.goLever(_this.game, 50, 175, 'lever_block');
                lever.addObject(gate);
                _this.addChild(lever);
                _this.otherObject.push(lever);
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level27.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level27.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level27.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level27.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level27;
        }(Phaser.Sprite));
        Client.Level27 = Level27;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level28 = (function (_super) {
            __extends(Level28, _super);
            function Level28(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 50;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 4;
                _this.numStones = 2;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_THIRD_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_3');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_2');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                var joe = new Client.goTobias(_this.game, 405, 203);
                _this.addChild(joe);
                _this.targetObject.push(joe);
                var carmen = new Client.goCarmen(_this.game, 555, 203);
                _this.addChild(carmen);
                _this.targetObject.push(carmen);
                var platform = new Client.goPlatformBlockStone(_this.game, 320, 50, 15);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockStone(_this.game, 320, 203, 15);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var py = 50;
                function getPY() {
                    py += 25.5;
                    return py;
                }
                for (var i = 0; i < 6; i++) {
                    var platform = new Client.goPlatformBlockStone(_this.game, 320, getPY(), 1, 2);
                    _this.addChild(platform);
                    _this.otherObject.push(platform);
                    var platform = new Client.goPlatformBlockStone(_this.game, 455, py, 1, 2);
                    _this.addChild(platform);
                    _this.otherObject.push(platform);
                    var platform = new Client.goPlatformBlockStone(_this.game, 617, py, 1, 2);
                    _this.addChild(platform);
                    _this.otherObject.push(platform);
                }
                var portalOutB = new Client.goPortal(_this.game, 405, 100, 'portal_pink_out');
                portalOutB.body.angle = 180 - 90;
                _this.addChild(portalOutB);
                _this.otherObject.push(portalOutB);
                var portalInB = new Client.goPortal(_this.game, 405, 350, 'portal_pink_in');
                portalInB.body.angle = 0 - 90;
                portalInB.setEject(portalOutB);
                _this.addChild(portalInB);
                _this.otherObject.push(portalInB);
                var portalOutP = new Client.goPortal(_this.game, 555, 100, 'portal_blue_out');
                portalOutP.body.angle = 180 - 90;
                _this.addChild(portalOutP);
                _this.otherObject.push(portalOutP);
                var portalInP = new Client.goPortal(_this.game, 555, 350, 'portal_blue_in');
                portalInP.body.angle = 0 - 90;
                portalInP.setEject(portalOutP);
                _this.addChild(portalInP);
                _this.otherObject.push(portalInP);
                for (var i = 0; i < 24; i++) {
                    var spike = new Client.goSpike(_this.game, 260 + i * 15, 392, 'spike_cactus');
                    _this.addChild(spike);
                    _this.otherObject.push(spike);
                }
                var trapDoor = new Client.goTrapDoor(_this.game, 500, 250);
                _this.addChild(trapDoor);
                _this.otherObject.push(trapDoor);
                var lever = new Client.goLever(_this.game, 185, 220, 'lever_block_3');
                lever.setTime(200);
                lever.addObject(trapDoor);
                _this.addChild(lever);
                _this.otherObject.push(lever);
                var light = new Client.goStreetLight(_this.game, 200, 400, 'street_light_both');
                _this.addChild(light);
                _this.otherObject.push(light);
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level28.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level28.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level28.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level28.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level28;
        }(Phaser.Sprite));
        Client.Level28 = Level28;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level29 = (function (_super) {
            __extends(Level29, _super);
            function Level29(game, x, y, tobjectDummy, bArray) {
                if (bArray === void 0) { bArray = null; }
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 50;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 0;
                _this.numStones = 5;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_THIRD_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls + 1;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_3');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_2');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                var penny = new Client.goPenny(_this.game, 501, 160);
                _this.addChild(penny);
                _this.targetObject.push(penny);
                var platform = new Client.goPlatformBlockStone(_this.game, 0, 160, 24);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockStone(_this.game, 0, 185.5, 24, 2);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                for (var i = 0; i < 7; i++) {
                    var spike = new Client.goSpike(_this.game, 93 + i * 15, 156, 'spike_cactus');
                    _this.addChild(spike);
                    _this.otherObject.push(spike);
                    var spike = new Client.goSpike(_this.game, 273 + i * 15, 156, 'spike_cactus');
                    _this.addChild(spike);
                    _this.otherObject.push(spike);
                }
                var blatform = new Client.goBreakingPlatform(_this.game, 300, 240);
                _this.addChild(blatform);
                _this.otherObject.push(blatform);
                var arrayRandomPortal = [];
                for (var i = 0; i < 3; i++) {
                    var portalOut = new Client.goPortal(_this.game, 140 + i * 180, 30, 'portal_pink_out');
                    portalOut.body.angle = 180 - 90;
                    _this.addChild(portalOut);
                    _this.otherObject.push(portalOut);
                    arrayRandomPortal.push(portalOut);
                }
                for (var i = 0; i < 3; i++) {
                    var rndportal = uMath.random(0, arrayRandomPortal.length - 1);
                    var portalIn = new Client.goPortal(_this.game, 260 + 140 * i, 380, 'portal_pink_in');
                    portalIn.body.angle = 0 - 90;
                    portalIn.setEject(arrayRandomPortal[rndportal]);
                    _this.addChild(portalIn);
                    _this.otherObject.push(portalIn);
                    arrayRandomPortal.splice(rndportal, 1);
                    console.log(arrayRandomPortal.length);
                }
                arrayRandomPortal = null;
                var scroll = new Client.goBaloon(_this.game, 315, 220, 'gameAtlas', 'baloon');
                _this.addChild(scroll);
                bArray.push(scroll);
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level29.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level29.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level29.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level29.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level29;
        }(Phaser.Sprite));
        Client.Level29 = Level29;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level3 = (function (_super) {
            __extends(Level3, _super);
            function Level3(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 50;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 5;
                _this.numStones = 3;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_FIRST_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_1');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_1');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                _this.sun = new Client.sunShine(_this.game, 50, 50, 'gameAtlas');
                _this.addChild(_this.sun);
                _this.tutorial = new Phaser.Sprite(_this.game, 105, 20, 'gameAtlas', 'tutorial3');
                _this.addChild(_this.tutorial);
                var tobias = new Client.goTobias(_this.game, 570, 190);
                _this.addChild(tobias);
                _this.targetObject.push(tobias);
                var joe = new Client.goJoe(_this.game, 560, 400);
                _this.addChild(joe);
                _this.targetObject.push(joe);
                var platform = new Client.goPlatform_block(_this.game, 470, 190, 8);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var three = new Client.goThreeStomp(_this.game, 210, 242);
                _this.addChild(three);
                _this.otherObject.push(three);
                var stone = new Client.goSmallStone(_this.game, 240, 200, 70, 40, 3);
                _this.addChild(stone);
                _this.otherObject.push(stone);
                var stone = new Client.goSmallStone(_this.game, 240, 150, 50, 40, 2);
                _this.addChild(stone);
                _this.otherObject.push(stone);
                var stone = new Client.goSmallStone(_this.game, 240, 100, 30, 45, 1);
                _this.addChild(stone);
                _this.otherObject.push(stone);
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level3.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level3.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level3.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level3.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level3;
        }(Phaser.Sprite));
        Client.Level3 = Level3;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level30 = (function (_super) {
            __extends(Level30, _super);
            function Level30(game, x, y, tobjectDummy, bArray) {
                if (bArray === void 0) { bArray = null; }
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 50;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 4;
                _this.numStones = 2;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_THIRD_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_3');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_2');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                var joe = new Client.goJoe(_this.game, 455, 300);
                tobjectDummy.addChild(joe);
                _this.targetObject.push(joe);
                var carrie = new Client.goCarrie(_this.game, 370, 221.5);
                tobjectDummy.addChild(carrie);
                _this.targetObject.push(carrie);
                for (var i = 0; i < 3; i++) {
                    var spike = new Client.goSpike(_this.game, 200 + i * 15, 113, 'spike_cactus');
                    _this.addChild(spike);
                    _this.otherObject.push(spike);
                    var spike = new Client.goSpike(_this.game, 28, 80 - i * 15, 'spike_cactus');
                    _this.addChild(spike);
                    _this.otherObject.push(spike);
                    spike.body.angle = 90;
                }
                var gate = new Client.goGate(_this.game, 410, 128, 170);
                _this.addChild(gate);
                _this.otherObject.push(gate);
                var lever = new Client.goLever(_this.game, 220, 195, 'lever_block');
                lever.addObject(gate);
                _this.addChild(lever);
                _this.otherObject.push(lever);
                var platform = new Client.goPlatformBlockStone(_this.game, 0, 221.5, 15);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockStone(_this.game, 432, 221.5, 8);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatformBlockStone(_this.game, 189, 119.5, 9);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var py = 119.5;
                function getPY() {
                    py += 25.5;
                    return py;
                }
                for (var i = 0; i < 4; i++) {
                    var platform = new Client.goPlatformBlockStone(_this.game, 297, getPY(), 1, 2);
                    _this.addChild(platform);
                    _this.otherObject.push(platform);
                }
                var platform = new Client.goPlatformBlockStone(_this.game, 405, 298, 4);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                py = 221.5;
                for (var i = 0; i < 3; i++) {
                    var platform = new Client.goPlatformBlockStone(_this.game, 486, getPY(), 1, 2);
                    _this.addChild(platform);
                    _this.otherObject.push(platform);
                }
                py = -33.5;
                for (var i = 0; i < 10; i++) {
                    var platform = new Client.goPlatformBlockStone(_this.game, 0, getPY(), 1, 2);
                    _this.addChild(platform);
                    _this.otherObject.push(platform);
                    var platform = new Client.goPlatformBlockStone(_this.game, 621, py, 1, 2);
                    _this.addChild(platform);
                    _this.otherObject.push(platform);
                    if ((i > 3) && (i < 9)) {
                        var rubber = new Client.goRubber(_this.game, 27, py);
                        rubber.SetRotate(90);
                        _this.addChild(rubber);
                        _this.otherObject.push(rubber);
                        var rubber = new Client.goRubber(_this.game, 621, py);
                        rubber.SetRotate(-90);
                        _this.addChild(rubber);
                        _this.otherObject.push(rubber);
                    }
                }
                var portalOut = new Client.goPortal(_this.game, 320, 40, 'portal_pink_out');
                portalOut.body.angle = 90 - 90;
                portalOut.setRotated(true);
                portalOut.setRotateAngle(179, 0);
                _this.addChild(portalOut);
                _this.otherObject.push(portalOut);
                var portalIn = new Client.goPortal(_this.game, 400, 360, 'portal_pink_in');
                portalIn.body.angle = -70 - 90;
                portalIn.setEject(portalOut);
                _this.addChild(portalIn);
                _this.otherObject.push(portalIn);
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level30.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level30.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level30.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level30.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level30;
        }(Phaser.Sprite));
        Client.Level30 = Level30;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level4 = (function (_super) {
            __extends(Level4, _super);
            function Level4(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 50;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 2;
                _this.numStones = 2;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_FIRST_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_1');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_1');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                _this.sun = new Client.sunShine(_this.game, 50, 50, 'gameAtlas');
                _this.addChild(_this.sun);
                _this.tutorial = new Phaser.Sprite(_this.game, 105, 20, 'gameAtlas', 'tutorial4');
                _this.addChild(_this.tutorial);
                var carmen = new Client.goCarmen(_this.game, 520, 400);
                _this.addChild(carmen);
                _this.targetObject.push(carmen);
                var platform = new Client.goPlatform_block(_this.game, 350, 255, 13);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var gate = new Client.goGate(_this.game, 350, 280, 120);
                _this.addChild(gate);
                _this.otherObject.push(gate);
                var lever = new Client.goLever(_this.game, 544, 230, 'lever_block');
                lever.addObject(gate);
                _this.addChild(lever);
                _this.otherObject.push(lever);
                for (var i = 0; i < 7; i++) {
                    var spike = new Client.goSpike(_this.game, 385 + i * 15, 392, 'spike_cactus');
                    _this.addChild(spike);
                    _this.otherObject.push(spike);
                }
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level4.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level4.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level4.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level4.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level4;
        }(Phaser.Sprite));
        Client.Level4 = Level4;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level5 = (function (_super) {
            __extends(Level5, _super);
            function Level5(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 50;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 4;
                _this.numStones = 1;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_FIRST_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_1');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_1');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                _this.sun = new Client.sunShine(_this.game, 50, 50, 'gameAtlas');
                _this.addChild(_this.sun);
                var penny = new Client.goPenny(_this.game, 520, 400);
                _this.addChild(penny);
                _this.targetObject.push(penny);
                var basket = new Client.goBasketball_hoop(_this.game, 300, 172);
                _this.addChild(basket);
                _this.otherObject.push(basket);
                var nail = new Client.go_Nail_bed(_this.game, 400, -30);
                _this.addChild(nail);
                _this.otherObject.push(nail);
                var platform = new Client.goPlatform1(_this.game, 400, -8);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var lever = new Client.goLever(_this.game, 400, 62, 'lever_block_2');
                lever.addObject(nail);
                _this.addChild(lever);
                _this.otherObject.push(lever);
                var cerrie = new Client.goCarrie(_this.game, 570, 88);
                _this.addChild(cerrie);
                _this.targetObject.push(cerrie);
                nail.setObj(lever);
                nail.setObj(cerrie);
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level5.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level5.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level5.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level5.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level5;
        }(Phaser.Sprite));
        Client.Level5 = Level5;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level6 = (function (_super) {
            __extends(Level6, _super);
            function Level6(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 50;
                _this.startPlayerY = 300;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 5;
                _this.numStones = 2;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_FIRST_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_1');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_1');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                _this.sun = new Client.sunShine(_this.game, 50, 50, 'gameAtlas');
                _this.addChild(_this.sun);
                var carmen = new Client.goCarmen(_this.game, 550, 400);
                _this.addChild(carmen);
                _this.targetObject.push(carmen);
                var joe = new Client.goJoe(_this.game, 550, 280);
                _this.addChild(joe);
                _this.targetObject.push(joe);
                var tobias = new Client.goTobias(_this.game, 550, 160);
                _this.addChild(tobias);
                _this.targetObject.push(tobias);
                var platform = new Client.goPlatform_block(_this.game, 0, 330, 5);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var lever = new Client.goLever(_this.game, 220, 375, 'lever_block');
                lever.setTime(5 * 60);
                _this.addChild(lever);
                _this.otherObject.push(lever);
                var platform = new Client.goPlatform_block(_this.game, 450, 280, 13);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var gate = new Client.goGate(_this.game, 449, 304, 95);
                _this.addChild(gate);
                _this.otherObject.push(gate);
                lever.addObject(gate);
                var gate = new Client.goGate(_this.game, 449, 184, 95);
                _this.addChild(gate);
                _this.otherObject.push(gate);
                lever.addObject(gate);
                var gate = new Client.goGate(_this.game, 449, 54, 105);
                _this.addChild(gate);
                _this.otherObject.push(gate);
                lever.addObject(gate);
                var platform = new Client.goPlatform_block(_this.game, 450, 160, 13);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatform_block(_this.game, 450, 30, 13);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level6.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level6.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level6.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level6.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level6;
        }(Phaser.Sprite));
        Client.Level6 = Level6;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level7 = (function (_super) {
            __extends(Level7, _super);
            function Level7(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 50;
                _this.startPlayerY = 300;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 4;
                _this.numStones = 0;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_FIRST_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_1');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_1');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                _this.sun = new Client.sunShine(_this.game, 50, 50, 'gameAtlas');
                _this.addChild(_this.sun);
                var penny = new Client.goPenny(_this.game, 550, 300);
                _this.addChild(penny);
                _this.targetObject.push(penny);
                var carrie = new Client.goCarrie(_this.game, 550, 160);
                _this.addChild(carrie);
                _this.targetObject.push(carrie);
                var platform = new Client.goPlatform_block(_this.game, 0, 330, 5);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatform_block(_this.game, 450, 300, 13);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatform_block(_this.game, 450, 160, 13);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatform_block(_this.game, 450, 40, 13);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var bee = new Client.goBeeHave(_this.game, 180, 200);
                _this.addChild(bee);
                _this.otherObject.push(bee);
                bee.setMoveCenter(280, 200, 180);
                var bee = new Client.goBeeHave(_this.game, 380, 200);
                _this.addChild(bee);
                _this.otherObject.push(bee);
                bee.setMoveCenter(280, 200, 0);
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level7.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level7.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level7.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level7.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level7;
        }(Phaser.Sprite));
        Client.Level7 = Level7;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level8 = (function (_super) {
            __extends(Level8, _super);
            function Level8(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 50;
                _this.startPlayerY = 365;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 4;
                _this.numStones = 0;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_FIRST_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_1');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_1');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                _this.sun = new Client.sunShine(_this.game, 50, 50, 'gameAtlas');
                _this.addChild(_this.sun);
                var tobias = new Client.goTobias(_this.game, 310, 400);
                _this.addChild(tobias);
                _this.targetObject.push(tobias);
                var carmen = new Client.goCarmen(_this.game, 460, 400);
                _this.addChild(carmen);
                _this.targetObject.push(carmen);
                var light = new Client.goStreetLight(_this.game, 240, 400, 'street_light');
                _this.addChild(light);
                _this.otherObject.push(light);
                var light = new Client.goStreetLight(_this.game, 530, 400, 'street_light');
                _this.addChild(light);
                _this.otherObject.push(light);
                for (var i = 0; i < 4; i++) {
                    var spike = new Client.goSpike(_this.game, 361 + i * 15, 392, 'spike_cactus');
                    _this.addChild(spike);
                    _this.otherObject.push(spike);
                }
                var genericp = new Client.goGenericPlatform(_this.game, 340, 250);
                _this.addChild(genericp);
                _this.otherObject.push(genericp);
                for (var i = 0; i < 6; i++) {
                    var spike = new Client.goSpike(_this.game, 350 + i * 16, 243, 'spike_cactus');
                    _this.addChild(spike);
                    _this.otherObject.push(spike);
                    genericp.setObj(spike);
                }
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level8.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level8.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level8.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level8.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level8;
        }(Phaser.Sprite));
        Client.Level8 = Level8;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var Level9 = (function (_super) {
            __extends(Level9, _super);
            function Level9(game, x, y, tobjectDummy) {
                var _this = _super.call(this, game, x, y) || this;
                _this.startPlayerX = 50;
                _this.startPlayerY = 300;
                _this.targetObject = [];
                _this.otherObject = [];
                _this.numScrolls = 4;
                _this.numStones = 4;
                _this.trajectory = false;
                _this.levelComplete = false;
                _this.onComplete = new Phaser.Signal();
                _this.onFireType = new Phaser.Signal();
                SndMng.playMusic(SndMng.MUSIC_FIRST_BLOCK, 1);
                _this.maxNumScrolls = _this.numScrolls;
                _this.background = new Phaser.Sprite(_this.game, Config.GW / 2, Config.GH / 2, 'gameAtlas', 'back_1');
                _this.background.anchor.set(2);
                _this.addChild(_this.background);
                _this.game.physics.p2.enable(_this.background, false);
                _this.background.body.clearShapes();
                _this.background.body.loadPolygon('physData', 'back_1');
                _this.background.body.fixedRotation = true;
                _this.background.body.static = true;
                _this.sun = new Client.sunShine(_this.game, 50, 50, 'gameAtlas');
                _this.addChild(_this.sun);
                var joe = new Client.goJoe(_this.game, 550, 300);
                _this.addChild(joe);
                _this.targetObject.push(joe);
                var carrie = new Client.goCarrie(_this.game, 550, 180);
                _this.addChild(carrie);
                _this.targetObject.push(carrie);
                var platform = new Client.goPlatform_block(_this.game, 0, 330, 5);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatform_block(_this.game, 450, 300, 13);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatform_block(_this.game, 450, 180, 13);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var platform = new Client.goPlatform_block(_this.game, 450, 60, 13);
                _this.addChild(platform);
                _this.otherObject.push(platform);
                var window = new Client.goBreaking_window(_this.game, 450, 89);
                _this.addChild(window);
                _this.otherObject.push(window);
                var window = new Client.goBreaking_window(_this.game, 450, 209);
                _this.addChild(window);
                _this.otherObject.push(window);
                var bee = new Client.goBeeHave(_this.game, 204, 224, false);
                bee.setUp();
                _this.addChild(bee);
                _this.otherObject.push(bee);
                bee.setMoveCenter(280, 200, 180);
                var bee = new Client.goBeeHave(_this.game, 304, 224, false);
                bee.setUp(false);
                _this.addChild(bee);
                _this.otherObject.push(bee);
                bee.setMoveCenter(280, 200, 0);
                var bee = new Client.goBeeHave(_this.game, 404, 224, false);
                bee.setUp();
                _this.addChild(bee);
                _this.otherObject.push(bee);
                bee.setMoveCenter(280, 200, 180);
                _this.player = new Client.goPlayer(_this.game, _this.startPlayerX, _this.startPlayerY);
                _this.player.showPlayer();
                _this.player.onFire.add(_this.onFire, _this);
                tobjectDummy.addChild(_this.player);
                return _this;
            }
            Level9.prototype.changePers = function (pers) {
                this.player.ChangePlayer(pers);
            };
            Level9.prototype.onFire = function (type) {
                this.onFireType.dispatch(type);
            };
            Level9.prototype.onClick = function () {
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    if (this.trajectory) {
                        this.numScrolls -= 1;
                    }
                }
                if (this.player.currentState == this.player.USEDARWIN) {
                    if (this.trajectory) {
                        this.numStones -= 1;
                    }
                }
                this.player.fireBall();
                this.trajectory = false;
            };
            Level9.prototype.update = function () {
                this.player.tangle = this.tangle;
                this.player.tPower = this.tPower;
                this.trajectory = this.player.trajectory;
                this.player.update();
                for (var i = 0; i < this.otherObject.length; i++) {
                    this.otherObject[i].update();
                }
                var isWater = 0;
                for (var i = 0; i < this.targetObject.length; i++) {
                    this.targetObject[i].update();
                    if (this.targetObject[i].tWater == true) {
                        isWater++;
                    }
                }
                if (isWater == this.targetObject.length) {
                    if (!this.levelComplete) {
                        var checkScrolls = this.maxNumScrolls - this.targetObject.length;
                        var stars;
                        if (checkScrolls == this.numScrolls) {
                            stars = 3;
                        }
                        else {
                            if (checkScrolls - 1 == this.numScrolls) {
                                stars = 2;
                            }
                            else {
                                if (checkScrolls - 2 == this.numScrolls) {
                                    stars = 1;
                                }
                                else {
                                    if (checkScrolls - 3 == this.numScrolls) {
                                        stars = 0;
                                    }
                                }
                            }
                        }
                        this.game.physics.clear();
                        this.player.setVictory();
                        this.onComplete.dispatch(stars);
                        this.levelComplete = true;
                    }
                }
                if (this.player.currentState == this.player.USEDGUMBALL) {
                    this.currentNumShot = this.numScrolls;
                }
                else if (this.player.currentState == this.player.USEDARWIN) {
                    this.currentNumShot = this.numStones;
                }
                else {
                    this.currentNumShot = this.numScrolls;
                }
            };
            return Level9;
        }(Phaser.Sprite));
        Client.Level9 = Level9;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var LoadMng;
(function (LoadMng) {
    var SceneLoader = (function () {
        function SceneLoader(game) {
            this.isLoadingComplete = false;
            this.game = game;
        }
        SceneLoader.prototype.startLoading = function () {
            this.onLoading1Complete();
        };
        SceneLoader.prototype.onLoading1Complete = function () {
            LogMng.debug('LoadMng: loading complete!');
            this.isLoadingComplete = true;
        };
        return SceneLoader;
    }());
    LoadMng.SceneLoader = SceneLoader;
})(LoadMng || (LoadMng = {}));
var LogMng;
(function (LogMng) {
    LogMng.MODE_DEBUG = 'MODE_DEBUG';
    LogMng.MODE_RELEASE = 'MODE_RELEASE';
    var DEBUG = 'DEBUG';
    var INFO = 'INFO';
    var NETWORK = 'NETWORK';
    var WARNING = 'WARNING';
    var ERROR = 'ERROR';
    var mode = LogMng.MODE_DEBUG;
    var levels = [DEBUG, INFO, NETWORK, WARNING, ERROR];
    function setMode(aMode) {
        mode = aMode;
        switch (mode) {
            case LogMng.MODE_DEBUG:
                levels = [DEBUG, INFO, NETWORK, WARNING, ERROR];
                break;
            case LogMng.MODE_RELEASE:
                levels = [WARNING, ERROR];
                break;
        }
    }
    LogMng.setMode = setMode;
    function getMode() {
        return mode;
    }
    LogMng.getMode = getMode;
    function getCSS(bgColor) {
        return 'background: ' + bgColor + ';' +
            'background-repeat: no-repeat;' +
            'color: #1df9a8;' +
            'line-height: 16px;' +
            'padding: 1px 0;' +
            'margin: 0;' +
            'user-select: none;' +
            '-webkit-user-select: none;' +
            '-moz-user-select: none;';
    }
    ;
    function getLink(color) {
        return 'background: ' + color + ';' +
            'background-repeat: no-repeat;' +
            'font-size: 12px;' +
            'color: #446d96;' +
            'line-height: 14px';
    }
    ;
    function log(aMsg, aLevel) {
        if (aLevel === void 0) { aLevel = DEBUG; }
        if (levels.indexOf(aLevel) < 0)
            return;
        var css = '';
        switch (aLevel) {
            case INFO:
                css = 'background: #308AE4; color: #fff; padding: 1px 4px';
                break;
            case WARNING:
                css = 'background: #f7a148; color: #fff; padding: 1px 4px';
                break;
            case ERROR:
                css = 'background: #DB5252; color: #fff; padding: 1px 4px';
                break;
            case NETWORK:
                css = 'background: #7D2998; color: #fff; padding: 1px 4px';
                break;
            case DEBUG:
            default:
                css = 'background: #ADADAD; color: #fff; padding: 1px 4px';
        }
        console.log("%c%s", css, aLevel, aMsg);
    }
    ;
    function system(aMsg, aLink) {
        if (aLink === void 0) { aLink = ''; }
        console.log("%c %c %c %s %c %c %c %c%s", getCSS('#5C6166'), getCSS('#4F5357'), getCSS('#313335'), aMsg, getCSS('#4F5357'), getCSS('#5C6166'), getLink('none'), getLink('none'), aLink);
    }
    LogMng.system = system;
    function debug(aMsg) {
        log(aMsg, DEBUG);
    }
    LogMng.debug = debug;
    function info(aMsg) {
        log(aMsg, INFO);
    }
    LogMng.info = info;
    function net(aMsg) {
        log(aMsg, NETWORK);
    }
    LogMng.net = net;
    function warn(aMsg) {
        log(aMsg, WARNING);
    }
    LogMng.warn = warn;
    function error(aMsg) {
        log(aMsg, ERROR);
    }
    LogMng.error = error;
})(LogMng || (LogMng = {}));
var ScaleManager = (function () {
    function ScaleManager() {
    }
    ScaleManager.init = function (aGame, aDomId, GW, GH, GSW, GSH) {
        this.game = aGame;
        this.dom_id = aDomId;
        this.dom = document.getElementById(this.dom_id);
        this.game_w = GW;
        this.game_h = GH;
        this.game_sw = GSW;
        this.game_sh = GSH;
        aGame.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        this.isDesktop = this.game.device.desktop;
        ScaleManager.SizeCalculation();
        window.onresize = function () {
            ScaleManager.SizeCalculation();
        };
    };
    ScaleManager.doEventOriChange = function () {
        this.onOrientationChange.dispatch(this.isPortrait);
    };
    ScaleManager.SizeCalculation = function () {
        var wnd = {
            w: window.innerWidth,
            h: window.innerHeight
        };
        var oldOri = this.isPortrait;
        this.isPortrait = wnd.h > wnd.w;
        var g = {
            w: ScaleManager.game_w,
            h: ScaleManager.game_h,
            sw: ScaleManager.game_sw,
            sh: ScaleManager.game_sh
        };
        var gw;
        var gh;
        if (g.h / g.w > wnd.h / wnd.w) {
            if (g.sh / g.w > wnd.h / wnd.w) {
                gh = wnd.h * g.h / g.sh;
                gw = gh * g.w / g.h;
            }
            else {
                gw = wnd.w;
                gh = gw * g.h / g.w;
            }
        }
        else {
            if (g.h / g.sw > wnd.h / wnd.w) {
                gh = wnd.h;
                gw = gh * g.w / g.h;
            }
            else {
                gw = wnd.w * g.w / g.sw;
                gh = gw * g.h / g.w;
            }
        }
        var scale_x = gw / g.w;
        var scale_y = gh / g.h;
        var newScale = Math.min(scale_x, scale_y);
        ScaleManager.game.scale.setUserScale(newScale, newScale, 0, 0);
        this.dtx = (wnd.w - gw) / 2;
        this.dty = (wnd.h - gh) / 2;
        this.gameViewW = this.game_w + 2 * this.dtx / newScale;
        if (this.gameViewW > this.game_w)
            this.gameViewW = this.game_w;
        this.gameViewH = this.game_h + 2 * this.dty / newScale;
        if (this.gameViewH > this.game_h)
            this.gameViewH = this.game_h;
        this.dom.style.marginLeft = Math.round(this.dtx).toString() + 'px';
        if (!this.isDesktop && this.isPortrait) {
            this.dom.style.marginTop = '0px';
        }
        else {
            this.dom.style.marginTop = Math.round(this.dty).toString() + 'px';
        }
        this.dom.style.maxWidth = String(gw) + 'px';
        this.dom.style.maxHeight = String(gh) + 'px';
        ScaleManager.game.scale.refresh();
        this.updateRotationIcon();
        if (this.isPortrait != oldOri) {
            this.doEventOriChange();
        }
    };
    ScaleManager.updateRotationIcon = function () {
        var MAX_PERC = 24;
        if (!this.isDesktop) {
            if (this.isPortrait) {
                this.showRotateIcon();
            }
            else {
                this.hideRotateIcon();
                return;
            }
            var wnd = {
                w: window.innerWidth,
                h: window.innerHeight
            };
            var rp_div = document.getElementById("rp-div");
            var rp_img = document.getElementById("rp-img");
            var com_h = this.dom.clientHeight + rp_div.clientHeight;
            var perc = MAX_PERC;
            if (rp_img.style.height != null && rp_img.style.height != undefined && rp_img.style.height != '') {
                if (rp_img.style.height.indexOf('%') > 0)
                    perc = Number(rp_img.style.height.split('%')[0]);
            }
            if (com_h > wnd.h) {
                while (com_h > wnd.h) {
                    perc--;
                    rp_img.style.width = rp_img.style.height = String(perc) + '%';
                    com_h = this.dom.clientHeight + rp_div.clientHeight;
                }
            }
            else {
                while (perc < MAX_PERC && com_h < wnd.h - 10) {
                    perc++;
                    rp_img.style.width = rp_img.style.height = String(perc) + '%';
                    com_h = this.dom.clientHeight + rp_div.clientHeight;
                }
            }
            var bot_h = wnd.h - this.dom.clientHeight;
            rp_div.style.paddingTop = String((bot_h - rp_img.clientHeight) / 2) + 'px';
        }
    };
    ScaleManager.showRotateIcon = function () {
        document.getElementById("rp-div").style.display = "block";
    };
    ScaleManager.hideRotateIcon = function () {
        document.getElementById("rp-div").style.display = "none";
    };
    ScaleManager.dom_id = '';
    ScaleManager.isDesktop = false;
    ScaleManager.dtx = 0;
    ScaleManager.dty = 0;
    ScaleManager.onOrientationChange = new Phaser.Signal();
    return ScaleManager;
}());
var SndMng;
(function (SndMng) {
    SndMng.currentMusic = '';
    SndMng.MUSIC_MENU = 'music_main_menu';
    SndMng.MUSIC_GAME = 'music_game';
    SndMng.MUSIC_FIRST_BLOCK = 'first_block';
    SndMng.MUSIC_SECOND_BLOCK = 'second_block';
    SndMng.MUSIC_THIRD_BLOCK = 'third_block';
    SndMng.SFX_TRANSOPEN = 'trans_open';
    SndMng.SFX_TRANSCLOSE = 'trans_close';
    SndMng.SFX_GO_FORWARD = 'go_forward';
    SndMng.SFX_GO_BACK = 'go_back';
    SndMng.SFX_STONE_BOUNCE = 'stone_bounce';
    SndMng.SFX_BALOON_BOUNCE = 'baloon_bounce';
    SndMng.SFX_THROW_WOOSH = 'throw_woosh';
    SndMng.SFX_THROW_WOOSH_2 = 'throw_woosh_2';
    SndMng.SFX_RUNNING_ONTO_STAGE = 'running_onto_stage';
    SndMng.SFX_BALOON_SPLASH = 'balloon_splash';
    SndMng.SFX_SWITCH_ITEM = 'switch_item';
    SndMng.SFX_LEVEL_FAIL = 'level_fail';
    SndMng.SFX_RATE_1 = 'rate_1';
    SndMng.SFX_RATE_2 = 'rate_2';
    SndMng.SFX_RATE_3 = 'rate_3';
    SndMng.SFX_GLASS_WINDOW_BREAK = 'glass_window_break';
    SndMng.SFX_SWITCH_HIT = 'switch_hit';
    SndMng.SFX_GATE_OPEN = 'gate_open';
    SndMng.SFX_ROCK_BREAKING = 'rock_breaking';
    SndMng.SFX_NAIL_BED_FALLING = 'nail_bed_falling';
    SndMng.SFX_BOUNCY_BLOCK = 'bouncy_block';
    SndMng.SFX_WHEEL_ROLLING = 'wheel_rolling';
    SndMng.SFX_SLIDING_SLAB = 'sliding_slab';
    SndMng.SFX_LEAF_BOUNCE = 'leaf_bounce';
    SndMng.SFX_PORTAL_EXIT = 'portal_exit';
    SndMng.SFX_FIRE_LOOP = 'fire_loop';
    SndMng.SFX_PILLAR_SMASHING = 'pillar_smashing';
    SndMng.LOAD_SOUNDS = [SndMng.MUSIC_MENU, SndMng.MUSIC_GAME, SndMng.SFX_TRANSOPEN, SndMng.SFX_TRANSCLOSE, SndMng.SFX_GO_FORWARD,
        SndMng.SFX_GO_BACK, SndMng.SFX_STONE_BOUNCE, SndMng.SFX_THROW_WOOSH, SndMng.SFX_THROW_WOOSH_2, SndMng.SFX_BALOON_BOUNCE,
        SndMng.SFX_RUNNING_ONTO_STAGE, SndMng.SFX_BALOON_SPLASH, SndMng.SFX_SWITCH_ITEM, SndMng.SFX_LEVEL_FAIL, SndMng.SFX_RATE_1,
        SndMng.SFX_RATE_2, SndMng.SFX_RATE_3, SndMng.SFX_GLASS_WINDOW_BREAK, SndMng.SFX_SWITCH_HIT, SndMng.SFX_GATE_OPEN, SndMng.SFX_ROCK_BREAKING,
        SndMng.SFX_NAIL_BED_FALLING, SndMng.MUSIC_FIRST_BLOCK, SndMng.SFX_BOUNCY_BLOCK, SndMng.MUSIC_SECOND_BLOCK,
        SndMng.SFX_WHEEL_ROLLING, SndMng.SFX_SLIDING_SLAB, SndMng.MUSIC_THIRD_BLOCK, SndMng.SFX_LEAF_BOUNCE, SndMng.SFX_PORTAL_EXIT,
        SndMng.SFX_FIRE_LOOP, SndMng.SFX_PILLAR_SMASHING];
    var MUS_MAX_VOL = 1;
    var game;
    var enabledMusic;
    var enabledSfx;
    var musics = [];
    var previos;
    function getMusic(aName) {
        for (var i = 0; i < musics.length; i++) {
            var data = musics[i];
            if (data.name == aName)
                return data.mus;
        }
        return null;
    }
    function init(aGame, aEnabledMusic, aEnabledSfx) {
        game = aGame;
        enabledMusic = aEnabledMusic;
        enabledSfx = aEnabledSfx;
    }
    SndMng.init = init;
    function playMusic(aName, aVolFrom, aVolEnd, aDuration) {
        if (aVolFrom === void 0) { aVolFrom = 0; }
        if (aVolEnd === void 0) { aVolEnd = 1; }
        if (aDuration === void 0) { aDuration = 500; }
        if (SndMng.currentMusic != aName) {
            SndMng.currentMusic = aName;
            stopAllMusic();
            if (!enabledMusic)
                return;
            if (aVolEnd > MUS_MAX_VOL)
                aVolEnd = MUS_MAX_VOL;
            var music = game.add.audio(aName, aVolFrom, true);
            music.volume = aVolFrom;
            music.play();
            game.add.tween(music).to({ volume: aVolEnd }, aDuration, Phaser.Easing.Linear.None, true);
            musics.push({ name: aName, mus: music });
        }
    }
    SndMng.playMusic = playMusic;
    function stopMusicById(id, aVol, aDuration) {
        if (aVol === void 0) { aVol = 0; }
        if (aDuration === void 0) { aDuration = 500; }
        try {
            var data = musics[id];
            var music = data.mus;
            var tw = game.add.tween(music).to({ volume: aVol }, aDuration, Phaser.Easing.Linear.None, true);
            tw.onComplete.add(function (mus) { mus.stop(); }, null, null, music);
            musics.splice(id, 1);
        }
        catch (e) {
            LogMng.error('SndMng.stopMusicById: ' + e);
        }
    }
    function stopMusicByName(aName, aVol, aDuration) {
        if (aVol === void 0) { aVol = 0; }
        if (aDuration === void 0) { aDuration = 500; }
        for (var i = musics.length - 1; i >= 0; i++) {
            var data = musics[i];
            if (data.name == aName) {
                stopMusicById(i, aVol, aDuration);
            }
        }
    }
    SndMng.stopMusicByName = stopMusicByName;
    function stopAllMusic(aVol, aDuration) {
        if (aVol === void 0) { aVol = 0; }
        if (aDuration === void 0) { aDuration = 500; }
        for (var i = musics.length - 1; i >= 0; i--) {
            stopMusicById(i);
        }
    }
    SndMng.stopAllMusic = stopAllMusic;
    function setEnabledMusic(aEnabled) {
        enabledMusic = aEnabled;
        if (enabledMusic) {
        }
        else {
            stopAllMusic();
        }
    }
    SndMng.setEnabledMusic = setEnabledMusic;
    function getEnabledMusic() {
        return enabledMusic;
    }
    SndMng.getEnabledMusic = getEnabledMusic;
    function getEnabledSfx() {
        return enabledSfx;
    }
    SndMng.getEnabledSfx = getEnabledSfx;
    function setEnabledSfx(aEnable) {
        enabledSfx = aEnable;
    }
    SndMng.setEnabledSfx = setEnabledSfx;
    function sfxPlay(aName, aVol) {
        if (aVol === void 0) { aVol = 1; }
        if (!enabledSfx)
            return;
        var snd = game.add.audio(aName, aVol);
        snd.play();
        return snd;
    }
    SndMng.sfxPlay = sfxPlay;
    function update(dt) {
    }
    SndMng.update = update;
})(SndMng || (SndMng = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var completeDialog = (function (_super) {
            __extends(completeDialog, _super);
            function completeDialog(game, x, y, numStar) {
                var _this = _super.call(this, game, x, y, 'gameAtlas', 'modal') || this;
                _this.onMenu = new Phaser.Signal();
                _this.onRetry = new Phaser.Signal();
                _this.onContinue = new Phaser.Signal();
                _this.onGameComplete = new Phaser.Signal();
                _this.thisNumStar = 0;
                _this.factList = [
                    "Gumball and all of his friends live in the town of Elmore.",
                    "Gumball has a huge crush on Penny Fitzgerald, but they are both too coy to tell each other how they feel.",
                    "Darwin was originally Gumball’s pet fish, but after growing legs he became part of the family.",
                    "Anais is the smartest member of the family, but no one will listen to her because she's a 4-year-old.",
                    "Gumball's mother is a well-trained martial artist.",
                    "Richard has been named 'laziest person in Elmore' since 1983.",
                    "Gumball's middle name is 'Tristopher.'",
                    "The Sun is about 93 million miles away!",
                    "Gumball's favorite video game is The Tale of Zelmore.",
                    "Darwin's full name is Darwin Raglan Caspian Ahab Poseidon Nicodemius Watterson III.",
                    "Tobias can change his color on command.",
                    "Tobias acts like a jock, but he's really a wimp.",
                    "Win or Don't Win is the most popular game show in Elmore.",
                    "Daisy the Donkey is Anais' favorite doll.",
                    "Banana Joe wears his peel like a shirt, and has a closet full of spares!",
                    "Banana Joe is a great whistler!",
                    "Banana Joe's most cherished possession is a pen used by Obadiah Banana when he started the family.",
                    "Penny is a peanut with antlers.",
                    "Ironically, Penny is allergic to peanuts.",
                    "Penny is a cheerleader at Elmore Junior High.",
                    "Penny has a pet tarantula named Mr. Cuddles. It has attacked Gumball twice!",
                    "Richard may be a dimwit, but he dresses in a smart shirt and tie every day.",
                    "Richard drools a lot, particularly in his sleep.",
                    "Darwin is Richard's favorite child. ",
                    "Carmen is one of the smartest students at Elmore Junior High.",
                    "Carmen is crazy in love with Alan the balloon, although being a cactus makes it very hard for them to be close.",
                    "Carrie's last name is Krueger.",
                    "Gumball's mother has a nasty temper that sometimes gets a bit wild. You don’t want to push her to her limit.",
                    "Darwin only knows the numbers 7, 5, 2 and 9.",
                    "Elmore has a population of 20,000!"
                ];
                _this.inputEnabled = true;
                _this.alpha = 0;
                _this.rainbow = new Phaser.Sprite(_this.game, 0, -160, 'gameAtlas', 'rainbow0001');
                _this.rainbow.anchor.set(0.5);
                _this.rainbow.animations.add('play', Phaser.Animation.generateFrameNames('rainbow', 1, 219, '', 4), 60, false);
                _this.rainbow.play('play');
                _this.addChild(_this.rainbow);
                _this.back = new Phaser.Sprite(_this.game, 0, 0, 'gameAtlas', 'complete');
                _this.back.anchor.set(0.5);
                _this.addChild(_this.back);
                _this.btnMenu = new Phaser.Button(_this.game, -170, 165, 'gameAtlas', _this.onClickMenu, _this, 'btn_main_menu0002', 'btn_main_menu0001');
                _this.btnMenu.anchor.set(0.5);
                _this.addChild(_this.btnMenu);
                _this.btnRetry = new Phaser.Button(_this.game, 0, 165, 'gameAtlas', _this.onClickRetry, _this, 'btn_retry0002', 'btn_retry0001');
                _this.btnRetry.anchor.set(0.5);
                _this.addChild(_this.btnRetry);
                _this.btnContinue = new Phaser.Button(_this.game, 170, 165, 'gameAtlas', _this.onClickContinue, _this, 'btn_continue0002', 'btn_continue0001');
                _this.btnContinue.anchor.set(0.5);
                _this.addChild(_this.btnContinue);
                _this.richard = new Phaser.Sprite(_this.game, 200, -70, 'gameAtlas', 'richard0001');
                _this.richard.animations.add('play', Phaser.Animation.generateFrameNames('richard', 1, 16, '', 4), 60, false);
                _this.richard.anchor.set(0.5);
                _this.addChild(_this.richard);
                _this.rating = new Phaser.Sprite(_this.game, 0, -80, 'gameAtlas', 'rating');
                _this.rating.anchor.set(0.5);
                _this.addChild(_this.rating);
                _this.star1 = new Phaser.Sprite(_this.game, -90, -80, 'gameAtlas', 'star0001');
                _this.star1.animations.add('play', Phaser.Animation.generateFrameNames('star', 1, 21, '', 4), 60, false);
                _this.star1.anchor.set(0.5);
                _this.addChild(_this.star1);
                _this.star2 = new Phaser.Sprite(_this.game, 0, -80, 'gameAtlas', 'star0001');
                _this.star2.animations.add('play', Phaser.Animation.generateFrameNames('star', 1, 21, '', 4), 60, false);
                _this.star2.anchor.set(0.5);
                _this.addChild(_this.star2);
                _this.star3 = new Phaser.Sprite(_this.game, 90, -80, 'gameAtlas', 'star0001');
                _this.star3.animations.add('play', Phaser.Animation.generateFrameNames('star', 1, 21, '', 4), 60, false);
                _this.star3.anchor.set(0.5);
                _this.addChild(_this.star3);
                _this.game.add.tween(_this).to({ alpha: 1 }, 300, Phaser.Easing.Linear.None, true, 1000).onComplete.addOnce(_this.showAnim, _this);
                _this.textFact = new Phaser.BitmapText(_this.game, 0, 85, 'myFont', _this.factList[Number(uSaveData.getItem('selectLevel')) - 1], 15);
                _this.textFact.anchor.set(0.5);
                _this.textFact.autoCull = true;
                _this.textFact.maxWidth = 400;
                _this.textFact.align = 'center';
                _this.addChild(_this.textFact);
                _this.thisNumStar = numStar;
                return _this;
            }
            completeDialog.prototype.showAnim = function () {
                this.richard.play('play');
                if (this.thisNumStar > 0) {
                    this.star1.play('play').onComplete.addOnce(this.playSecondStar, this);
                    SndMng.sfxPlay(SndMng.SFX_RATE_1, 1);
                }
            };
            completeDialog.prototype.playSecondStar = function () {
                if (this.thisNumStar > 1) {
                    this.star2.play('play').onComplete.addOnce(this.playThirdStar, this);
                    SndMng.sfxPlay(SndMng.SFX_RATE_2, 1);
                }
            };
            completeDialog.prototype.playThirdStar = function () {
                if (this.thisNumStar > 2) {
                    this.star3.play('play');
                    SndMng.sfxPlay(SndMng.SFX_RATE_3, 1);
                }
            };
            completeDialog.prototype.onClickContinue = function () {
                var numLevel = Number((uSaveData.getItem('selectLevel')));
                var key = 'passLevel' + (numLevel - 1);
                uSaveData.setItem('selectLevel', '' + (numLevel + 1));
                uSaveData.setItem(key, 'true');
                var oldRating = uSaveData.getItem('starLevel' + (numLevel - 1));
                if (this.thisNumStar > Number(oldRating)) {
                    uSaveData.setItem('starLevel' + (numLevel - 1), '' + this.thisNumStar);
                }
                uSaveData.saveData();
                if (numLevel >= 30) {
                    this.onGameComplete.dispatch();
                }
                else {
                    this.onContinue.dispatch();
                }
            };
            completeDialog.prototype.onClickMenu = function () {
                this.onMenu.dispatch();
            };
            completeDialog.prototype.onClickRetry = function () {
                this.onRetry.dispatch();
            };
            return completeDialog;
        }(Phaser.Sprite));
        Client.completeDialog = completeDialog;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var doorEffect = (function (_super) {
            __extends(doorEffect, _super);
            function doorEffect(game, x, y, atlasName) {
                var _this = _super.call(this, game, x, y) || this;
                _this.useDoor = false;
                _this.onComplete = new Phaser.Signal();
                _this.leftDoor = new Phaser.Sprite(_this.game, 0, 0, atlasName, 'part_storka');
                _this.leftDoor.anchor.set(0.99, 0.5);
                _this.addChild(_this.leftDoor);
                _this.leftDoor.x = -_this.leftDoor.width;
                _this.rightDoor = new Phaser.Sprite(_this.game, 0, 0, atlasName, 'part_storka');
                _this.rightDoor.anchor.set(0.01, 0.5);
                _this.addChild(_this.rightDoor);
                _this.rightDoor.x = _this.rightDoor.width;
                _this.logoDoor = new Phaser.Sprite(_this.game, 0, 0, atlasName, 'logo_storka');
                _this.logoDoor.anchor.set(0.5);
                _this.logoDoor.alpha = 0;
                _this.logoDoor.scale.set(1.4);
                _this.addChild(_this.logoDoor);
                _this.lightLogo = new Phaser.Sprite(_this.game, 0, 0, atlasName, 'logo_storka_light');
                _this.lightLogo.anchor.set(0.5);
                _this.logoDoor.addChild(_this.lightLogo);
                return _this;
            }
            doorEffect.prototype.closeDoor = function () {
                if (!this.useDoor) {
                    this.useDoor = true;
                    SndMng.sfxPlay(SndMng.SFX_TRANSCLOSE, 1);
                    this.rightDoor.x = this.rightDoor.width;
                    this.leftDoor.x = -this.leftDoor.width;
                    this.logoDoor.alpha = 0;
                    this.logoDoor.scale.set(1.4);
                    this.lightLogo.alpha = 1;
                    this.logoDoor.y = 0;
                    this.game.add.tween(this.rightDoor).to({ x: 0 }, 200, Phaser.Easing.Linear.None, true, 0, 0);
                    this.game.add.tween(this.leftDoor).to({ x: 0 }, 200, Phaser.Easing.Linear.None, true, 0, 0).onComplete.addOnce(this.showLogo, this);
                }
            };
            doorEffect.prototype.showLogo = function () {
                this.logoDoor.alpha = 1;
                this.game.add.tween(this.lightLogo).to({ alpha: 0 }, 400, Phaser.Easing.Linear.None, true, 50, 0);
                this.game.add.tween(this.logoDoor.scale).to({ x: 1 }, 600, Phaser.Easing.Elastic.Out, true, 50, 0);
                this.game.add.tween(this.logoDoor.scale).to({ y: 1 }, 600, Phaser.Easing.Elastic.Out, true, 50, 0).onComplete.addOnce(this.onCloseDoor, this);
            };
            doorEffect.prototype.onCloseDoor = function () {
                this.useDoor = false;
                this.onComplete.dispatch();
            };
            doorEffect.prototype.openDoor = function () {
                if (!this.useDoor) {
                    this.useDoor = true;
                    SndMng.sfxPlay(SndMng.SFX_TRANSOPEN, 1);
                    this.rightDoor.x = 0;
                    this.leftDoor.x = 0;
                    this.logoDoor.alpha = 1;
                    this.logoDoor.scale.set(1);
                    this.lightLogo.alpha = 0;
                    this.logoDoor.y = 0;
                    this.game.add.tween(this.logoDoor).to({ y: -100 }, 100, Phaser.Easing.Linear.None, true, 0, 0).onComplete.addOnce(this.downLogo, this);
                    this.game.add.tween(this.rightDoor).to({ x: this.rightDoor.width }, 400, Phaser.Easing.Linear.None, true, 0, 0);
                    this.game.add.tween(this.leftDoor).to({ x: -this.rightDoor.width }, 400, Phaser.Easing.Linear.None, true, 0, 0);
                }
            };
            doorEffect.prototype.downLogo = function () {
                this.game.add.tween(this.logoDoor).to({ y: 600 }, 300, Phaser.Easing.Linear.None, true, 0, 0).onComplete.addOnce(this.onOpenDoor, this);
            };
            doorEffect.prototype.onOpenDoor = function () {
                this.useDoor = false;
                this.onComplete.dispatch();
            };
            return doorEffect;
        }(Phaser.Sprite));
        Client.doorEffect = doorEffect;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var failedDialog = (function (_super) {
            __extends(failedDialog, _super);
            function failedDialog(game, x, y) {
                var _this = _super.call(this, game, x, y, 'gameAtlas', 'modal') || this;
                _this.onMenu = new Phaser.Signal();
                _this.onRetry = new Phaser.Signal();
                _this.inputEnabled = true;
                _this.rainbow = new Phaser.Sprite(_this.game, 0, -160, 'gameAtlas', 'rainbow0001');
                _this.rainbow.anchor.set(0.5);
                _this.rainbow.animations.add('play', Phaser.Animation.generateFrameNames('rainbow', 1, 219, '', 4), 60, false);
                _this.rainbow.play('play');
                _this.addChild(_this.rainbow);
                _this.back = new Phaser.Sprite(_this.game, 0, 0, 'gameAtlas', 'lose');
                _this.back.anchor.set(0.5);
                _this.addChild(_this.back);
                _this.btnMenu = new Phaser.Button(_this.game, -100, 165, 'gameAtlas', _this.onClickMenu, _this, 'btn_main_menu0002', 'btn_main_menu0001');
                _this.btnMenu.anchor.set(0.5);
                _this.addChild(_this.btnMenu);
                _this.btnRetry = new Phaser.Button(_this.game, 100, 165, 'gameAtlas', _this.onClickRetry, _this, 'btn_retry0002', 'btn_retry0001');
                _this.btnRetry.anchor.set(0.5);
                _this.addChild(_this.btnRetry);
                SndMng.sfxPlay(SndMng.SFX_LEVEL_FAIL, 1);
                return _this;
            }
            failedDialog.prototype.onClickMenu = function () {
                this.onMenu.dispatch();
            };
            failedDialog.prototype.onClickRetry = function () {
                this.onRetry.dispatch();
            };
            return failedDialog;
        }(Phaser.Sprite));
        Client.failedDialog = failedDialog;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var guiBtn = (function (_super) {
            __extends(guiBtn, _super);
            function guiBtn(game, x, y, atlas, textureBtn, textureHint, disableStatus) {
                var _this = _super.call(this, game, x, y) || this;
                _this.onClick = new Phaser.Signal();
                _this.button = new Phaser.Button(_this.game, 0, 0, atlas, _this.onClickButton, _this, textureBtn + '0002', textureBtn + '0001');
                _this.button.onInputOver.add(_this.onInputOver, _this);
                _this.button.onInputOut.add(_this.onInputOut, _this);
                _this.button.anchor.set(0.5);
                _this.addChild(_this.button);
                _this.disabled = new Phaser.Sprite(_this.game, 0, 0, atlas, 'audio_disable');
                _this.disabled.anchor.set(0.5);
                _this.addChild(_this.disabled);
                _this.disabled.visible = !disableStatus;
                _this.hint = new Phaser.Sprite(_this.game, 0, 33, atlas, textureHint);
                _this.hint.anchor.set(0.5);
                _this.hint.visible = false;
                _this.addChild(_this.hint);
                return _this;
            }
            guiBtn.prototype.onInputOut = function () {
                this.hint.visible = false;
            };
            guiBtn.prototype.onInputOver = function () {
                this.hint.visible = true;
                this.hint.scale.set(0);
                this.game.add.tween(this.hint.scale).to({ x: 1 }, 200, Phaser.Easing.Bounce.Out, true);
                this.game.add.tween(this.hint.scale).to({ y: 1 }, 200, Phaser.Easing.Bounce.Out, true);
            };
            guiBtn.prototype.setStatus = function (sEnable) {
                this.disabled.visible = !sEnable;
            };
            guiBtn.prototype.onClickButton = function () {
                this.onClick.dispatch();
            };
            return guiBtn;
        }(Phaser.Sprite));
        Client.guiBtn = guiBtn;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var guiDarwinBtn = (function (_super) {
            __extends(guiDarwinBtn, _super);
            function guiDarwinBtn(game, x, y) {
                var _this = _super.call(this, game, x, y) || this;
                _this.onClick = new Phaser.Signal();
                _this.button = new Phaser.Button(_this.game, 0, 0, '', _this.onClickButton, _this);
                _this.button.anchor.set(0.5);
                _this.addChild(_this.button);
                _this.unUnselect = new Phaser.Sprite(_this.game, 0, 0, 'gameAtlas', 'no_active_pers0001');
                _this.unUnselect.anchor.set(0.5);
                _this.unUnselect.animations.add('play', Phaser.Animation.generateFrameNames('no_active_pers', 1, 30, '', 4), 60, true);
                _this.button.addChild(_this.unUnselect);
                _this.unUnselect.play('play');
                _this.portrait = new Phaser.Sprite(_this.game, 0, 9, 'gameAtlas', 'darwin_portrait0001');
                _this.portrait.anchor.set(0.5);
                _this.portrait.animations.add('play', Phaser.Animation.generateFrameNames('darwin_portrait', 1, 75, '', 4), 60, true);
                _this.addChild(_this.portrait);
                _this.portrait.play('play');
                _this.portrait.visible = false;
                return _this;
            }
            guiDarwinBtn.prototype.Activate = function (state) {
                this.button.visible = !state;
                this.portrait.visible = state;
            };
            guiDarwinBtn.prototype.getActivate = function () {
                return this.button.visible;
            };
            guiDarwinBtn.prototype.onClickButton = function () {
                this.onClick.dispatch();
            };
            return guiDarwinBtn;
        }(Phaser.Sprite));
        Client.guiDarwinBtn = guiDarwinBtn;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var guiGumballBtn = (function (_super) {
            __extends(guiGumballBtn, _super);
            function guiGumballBtn(game, x, y) {
                var _this = _super.call(this, game, x, y) || this;
                _this.onClick = new Phaser.Signal();
                _this.button = new Phaser.Button(_this.game, 0, 0, '', _this.onClickButton, _this);
                _this.button.anchor.set(0.5);
                _this.addChild(_this.button);
                _this.unUnselect = new Phaser.Sprite(_this.game, 0, 0, 'gameAtlas', 'no_active_pers0001');
                _this.unUnselect.anchor.set(0.5);
                _this.unUnselect.animations.add('play', Phaser.Animation.generateFrameNames('no_active_pers', 1, 30, '', 4), 60, true);
                _this.button.addChild(_this.unUnselect);
                _this.unUnselect.play('play');
                _this.portrait = new Phaser.Sprite(_this.game, 2, 8, 'gameAtlas', 'gumball_portrait0001');
                _this.portrait.anchor.set(0.5);
                _this.portrait.animations.add('play', Phaser.Animation.generateFrameNames('gumball_portrait', 1, 75, '', 4), 60, true);
                _this.addChild(_this.portrait);
                _this.portrait.play('play');
                _this.portrait.visible = false;
                return _this;
            }
            guiGumballBtn.prototype.Activate = function (state) {
                this.button.visible = !state;
                this.portrait.visible = state;
            };
            guiGumballBtn.prototype.getActivate = function () {
                return this.button.visible;
            };
            guiGumballBtn.prototype.onClickButton = function () {
                this.onClick.dispatch();
            };
            return guiGumballBtn;
        }(Phaser.Sprite));
        Client.guiGumballBtn = guiGumballBtn;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var guiPanel = (function (_super) {
            __extends(guiPanel, _super);
            function guiPanel(game, x, y) {
                var _this = _super.call(this, game, x, y, 'gameAtlas', 'panel') || this;
                _this.onChange = new Phaser.Signal();
                _this.maxScrols = 0;
                _this.maxStones = 0;
                _this.onMenu = new Phaser.Signal();
                _this.onRetry = new Phaser.Signal();
                _this.upSpace = true;
                _this.typeBomb = new Phaser.Sprite(_this.game, -225, -22, 'gameAtlas', 'type_bombs0001');
                _this.typeBomb.smoothed = false;
                _this.typeBomb.anchor.set(0.5);
                _this.addChild(_this.typeBomb);
                _this.BombCurrent = new Phaser.BitmapText(_this.game, -260, -60, 'myFont2', '4', 44);
                _this.BombCurrent.anchor.set(0.5);
                _this.addChild(_this.BombCurrent);
                _this.BombNumCount = new Phaser.BitmapText(_this.game, -190, -53, 'myFont3', '4', 30);
                _this.BombNumCount.anchor.set(0.5);
                _this.addChild(_this.BombNumCount);
                _this.gumballBtn = new Client.guiGumballBtn(_this.game, -80, -45);
                _this.gumballBtn.anchor.set(0.5);
                _this.gumballBtn.onClick.add(_this.onClickGumball, _this);
                _this.addChild(_this.gumballBtn);
                _this.gumballBtn.Activate(true);
                _this.darwinBtn = new Client.guiDarwinBtn(_this.game, -12, -45);
                _this.darwinBtn.anchor.set(0.5);
                _this.darwinBtn.onClick.add(_this.onClickDarwin, _this);
                _this.addChild(_this.darwinBtn);
                _this.darwinBtn.Activate(false);
                _this.btnMusic = new Client.guiBtn(_this.game, 200, -45, 'gameAtlas', 'music_btn', 'hint_music', true);
                _this.btnMusic.onClick.add(_this.onClickMusic, _this);
                _this.btnMusic.setStatus(SndMng.getEnabledMusic());
                _this.addChild(_this.btnMusic);
                _this.btnSfx = new Client.guiBtn(_this.game, 250, -45, 'gameAtlas', 'sfx_btn', 'hint_sfx', true);
                _this.btnSfx.onClick.add(_this.onClickSfx, _this);
                _this.btnSfx.setStatus(SndMng.getEnabledSfx());
                _this.addChild(_this.btnSfx);
                _this.btnRetry = new Client.guiBtn(_this.game, 100, -45, 'gameAtlas', 'restart_btn', 'hint_restart', true);
                _this.btnRetry.onClick.add(_this.onClickRetry, _this);
                _this.addChild(_this.btnRetry);
                _this.btnMenu = new Client.guiBtn(_this.game, 150, -45, 'gameAtlas', 'menu_btn', 'hint_menu', true);
                _this.btnMenu.onClick.add(_this.onClickMenu, _this);
                _this.addChild(_this.btnMenu);
                _this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                return _this;
            }
            guiPanel.prototype.onClickMenu = function () {
                this.onMenu.dispatch();
            };
            guiPanel.prototype.onClickRetry = function () {
                this.onRetry.dispatch();
            };
            guiPanel.prototype.onClickMusic = function () {
                SndMng.setEnabledMusic(!SndMng.getEnabledMusic());
                if (SndMng.getEnabledMusic()) {
                    var oldMusic = SndMng.currentMusic;
                    SndMng.currentMusic = '';
                    SndMng.playMusic(oldMusic, 0, 1, 1000);
                }
                this.btnMusic.setStatus(SndMng.getEnabledMusic());
            };
            guiPanel.prototype.onClickSfx = function () {
                SndMng.setEnabledSfx(!SndMng.getEnabledSfx());
                this.btnSfx.setStatus(SndMng.getEnabledSfx());
            };
            guiPanel.prototype.SetMaxBullet = function (scrolls, stones) {
                this.maxStones = stones;
                this.maxScrols = scrolls;
                this.BombNumCount.text = '' + this.maxScrols;
            };
            guiPanel.prototype.onClickDarwin = function () {
                this.BombNumCount.text = String(this.maxStones);
                this.gumballBtn.Activate(false);
                this.darwinBtn.Activate(true);
                this.typeBomb.frameName = 'type_bombs0002';
                this.onChange.dispatch('Useddarwin');
            };
            guiPanel.prototype.onClickGumball = function () {
                this.BombNumCount.text = String(this.maxScrols);
                this.darwinBtn.Activate(false);
                this.gumballBtn.Activate(true);
                this.typeBomb.frameName = 'type_bombs0001';
                this.onChange.dispatch('UsedGumball');
            };
            guiPanel.prototype.setNumShot = function (num) {
                this.BombCurrent.text = '' + num;
            };
            guiPanel.prototype.upKey = function () {
                this.upSpace = true;
            };
            guiPanel.prototype.update = function () {
                if (this.game.input.keyboard.isDown(Phaser.Keyboard.R)) {
                    this.onClickRetry();
                }
                if (this.upSpace) {
                    if (this.spaceKey.downDuration(1)) {
                        if (this.darwinBtn.getActivate()) {
                            this.onClickDarwin();
                        }
                        else {
                            this.onClickGumball();
                        }
                    }
                }
            };
            return guiPanel;
        }(Phaser.Sprite));
        Client.guiPanel = guiPanel;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var levelBtn = (function (_super) {
            __extends(levelBtn, _super);
            function levelBtn(game, x, y) {
                var _this = _super.call(this, game, x, y) || this;
                _this.tLevel = 1;
                _this.onClick = new Phaser.Signal();
                _this.unlock = false;
                _this.tButton = new Phaser.Button(_this.game, 0, 0, 'levelSelectAtlas', _this.onClickButton, _this, 'select_btn0002', 'select_btn0001');
                _this.tButton.anchor.set(0.5);
                _this.addChild(_this.tButton);
                _this.tRatings = new Phaser.Sprite(_this.game, 0, 20, 'levelSelectAtlas', 'level_ratings0001');
                _this.tRatings.visible = false;
                _this.tRatings.anchor.set(0.5);
                _this.addChild(_this.tRatings);
                _this.textNumber = new Phaser.BitmapText(_this.game, 0, 5, 'myFont', '', 18);
                _this.textNumber.anchor.set(0.5);
                _this.addChild(_this.textNumber);
                _this.lock = new Phaser.Sprite(_this.game, 0, 5, 'levelSelectAtlas', 'lock_level');
                _this.lock.anchor.set(0.5);
                _this.addChild(_this.lock);
                return _this;
            }
            levelBtn.prototype.onClickButton = function () {
                this.onClick.dispatch(this.tLevel);
            };
            levelBtn.prototype.setRating = function (num) {
                this.tRatings.visible = true;
                this.tRatings.frameName = 'level_ratings000' + (Number(num) + 1);
            };
            levelBtn.prototype.setUnlock = function (enable) {
                if (enable === void 0) { enable = true; }
                this.lock.visible = !enable;
                this.unlock = enable;
                if (!enable) {
                    this.tRatings.visible = enable;
                }
                if (enable) {
                    this.textNumber.text = '' + this.tLevel;
                }
                else {
                    this.textNumber.text = '';
                }
            };
            return levelBtn;
        }(Phaser.Sprite));
        Client.levelBtn = levelBtn;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var LogoAnim = (function (_super) {
            __extends(LogoAnim, _super);
            function LogoAnim(game, x, y, cb) {
                var _this = _super.call(this, game, x, y) || this;
                _this.callBack = cb;
                _this.pic = new Phaser.Sprite(_this.game, 0, 0, 'preloader_atlas', 'preload_movie0001');
                _this.pic.anchor.set(0.5);
                _this.pic.animations.add('logo', Phaser.Animation.generateFrameNames('preload_movie', 1, 41, '', 4), 24, true);
                _this.pic.play('logo', 24, false);
                _this.pic.events.onAnimationComplete.addOnce(_this.completeLogo, _this);
                _this.addChild(_this.pic);
                return _this;
            }
            LogoAnim.prototype.completeLogo = function () {
                this.callBack();
            };
            return LogoAnim;
        }(Phaser.Sprite));
        Client.LogoAnim = LogoAnim;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var sunShine = (function (_super) {
            __extends(sunShine, _super);
            function sunShine(game, x, y, atlasName) {
                var _this = _super.call(this, game, x, y) || this;
                _this.sunBody = new Phaser.Sprite(_this.game, 0, 0, atlasName, 'sun_body');
                _this.sunBody.anchor.set(0.5);
                _this.addChild(_this.sunBody);
                _this.sunFace = new Phaser.Sprite(_this.game, 10, 10, atlasName, 'sun_face0001');
                _this.sunFace.anchor.set(0.5);
                _this.sunFace.animations.add('play', Phaser.Animation.generateFrameNames('sun_face', 1, 219, '', 4), 60, true);
                _this.sunFace.play('play');
                _this.addChild(_this.sunFace);
                _this.game.add.tween(_this.sunBody).to({ rotation: uMath.toRadians(360) }, 5000, Phaser.Easing.Linear.None, true, 0, -1);
                _this.game.add.tween(_this).to({ y: y - 5 }, 1000, Phaser.Easing.Linear.None, true, 0, -1, true);
                return _this;
            }
            return sunShine;
        }(Phaser.Sprite));
        Client.sunShine = sunShine;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var MyUtils;
(function (MyUtils) {
    var query_values = null;
    function readQueryValues() {
        var vals = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (typeof vals[pair[0]] === "undefined") {
                vals[pair[0]] = decodeURIComponent(pair[1]);
            }
            else if (typeof vals[pair[0]] === "string") {
                var arr = [vals[pair[0]], decodeURIComponent(pair[1])];
                vals[pair[0]] = arr;
            }
            else {
                vals[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        query_values = vals;
    }
    function getQueryValue(aValName) {
        if (query_values == null)
            readQueryValues();
        return query_values[aValName];
    }
    MyUtils.getQueryValue = getQueryValue;
})(MyUtils || (MyUtils = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var p2Math = (function () {
            function p2Math() {
            }
            p2Math.AddVV = function (a, b) {
                var v = new Client.p2Vec2(a.x + b.x, a.y + b.y);
                return v;
            };
            p2Math.MulFV = function (s, a) {
                var v = new Client.p2Vec2(s * a.x, s * a.y);
                return v;
            };
            p2Math.Dot = function (a, b) {
                return a.x * b.x + a.y * b.y;
            };
            return p2Math;
        }());
        Client.p2Math = p2Math;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var PhaserGame;
(function (PhaserGame) {
    var Client;
    (function (Client) {
        var p2Vec2 = (function () {
            function p2Vec2(_x, _y) {
                this.x = _x;
                this.y = _y;
            }
            p2Vec2.prototype.Normalize = function () {
                var length = Math.sqrt(this.x * this.x + this.y * this.y);
                if (length < Number.MIN_VALUE) {
                    return 0.0;
                }
                var invLength = 1.0 / length;
                this.x *= invLength;
                this.y *= invLength;
                return length;
            };
            p2Vec2.prototype.NegativeSelf = function () {
                this.x = -this.x;
                this.y = -this.y;
            };
            p2Vec2.prototype.Multiply = function (a) {
                this.x *= a;
                this.y *= a;
            };
            p2Vec2.prototype.Length = function () {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            };
            return p2Vec2;
        }());
        Client.p2Vec2 = p2Vec2;
    })(Client = PhaserGame.Client || (PhaserGame.Client = {}));
})(PhaserGame || (PhaserGame = {}));
var TextUtils;
(function (TextUtils) {
    function addZero(aNum, aLen) {
        var text = String(aNum);
        while (text.length < aLen)
            text = '0' + text;
        return text;
    }
    TextUtils.addZero = addZero;
    function sizingBitmapTextByW(aBmpText, aW, aInc, aDec) {
        if (aBmpText.text == '' || aBmpText.height == 0 || aBmpText.width == 0) {
            LogMng.debug('TextUtils.ts sizingBitmapTextByW(): aBmpText.text == ""');
            LogMng.debug('TextUtils.ts sizingBitmapTextByW(): aBmpText.width = ' + aBmpText.width);
            LogMng.debug('TextUtils.ts sizingBitmapTextByW(): aBmpText.height = ' + aBmpText.height);
            return;
        }
        if (aInc) {
            if (aBmpText.width < aW) {
                while (aBmpText.width < aW) {
                    aBmpText.fontSize++;
                }
            }
        }
        if (aDec) {
            if (aBmpText.width > aW) {
                while (aBmpText.width > aW) {
                    aBmpText.fontSize--;
                }
            }
        }
    }
    TextUtils.sizingBitmapTextByW = sizingBitmapTextByW;
    function sizingBitmapTextByH(aBmpText, aH, aInc, aDec) {
        if (aBmpText.text == '' || aBmpText.height == 0 || aBmpText.width == 0) {
            LogMng.debug('TextUtils.ts sizingBitmapTextByH(): aBmpText.text == ""');
            LogMng.debug('TextUtils.ts sizingBitmapTextByH(): aBmpText.width = ' + aBmpText.width);
            LogMng.debug('TextUtils.ts sizingBitmapTextByH(): aBmpText.height = ' + aBmpText.height);
            return;
        }
        if (aInc) {
            if (aBmpText.height < aH) {
                while (aBmpText.height < aH) {
                    aBmpText.fontSize++;
                }
            }
        }
        if (aDec) {
            if (aBmpText.height > aH) {
                while (aBmpText.height > aH) {
                    aBmpText.fontSize--;
                }
            }
        }
    }
    TextUtils.sizingBitmapTextByH = sizingBitmapTextByH;
})(TextUtils || (TextUtils = {}));
var uMath = (function () {
    function uMath() {
    }
    uMath.toPercent = function (current, total) {
        return (current / total) * 100;
    };
    uMath.fromPercent = function (percent, total) {
        return (percent * total) / 100;
    };
    uMath.random = function (lower, upper) {
        return Math.round(Math.random() * (upper - lower)) + lower;
    };
    uMath.toDegrees = function (radians) {
        return radians * 180 / Math.PI;
    };
    uMath.toRadians = function (degrees) {
        return degrees * Math.PI / 180;
    };
    uMath.distance = function (x1, y1, x2, y2) {
        var dx = x2 - x1;
        var dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    };
    uMath.prototype.getVelocity = function (x1, y1, velX, velY) {
    };
    uMath.getAngle = function (x1, y1, x2, y2, norm) {
        if (norm === void 0) { norm = true; }
        var dx = x2 - x1;
        var dy = y2 - y1;
        var angle = Math.atan2(dy, dx);
        if (norm) {
            if (angle < 0) {
                angle = Math.PI * 2 + angle;
            }
            else if (angle >= Math.PI * 2) {
                angle = angle - Math.PI * 2;
            }
        }
        return angle;
    };
    return uMath;
}());
var uSaveData = (function () {
    function uSaveData() {
    }
    uSaveData.Init = function () {
        uSaveData.myLocalData = [];
        uSaveData.myLocalData = Array();
        var JSONString = localStorage.getItem(uSaveData.nameGame);
        if (!JSONString) {
            JSONString = JSON.stringify(uSaveData.myLocalData);
        }
        uSaveData.myLocalData = JSON.parse(JSONString);
    };
    uSaveData.setItem = function (key, data) {
        var keyName = this.nameGame + key;
        var flag = false;
        for (var i = 0; i < this.myLocalData.length; i++) {
            if (!flag) {
                if (this.myLocalData[i].key == keyName) {
                    this.myLocalData[i].data = data;
                    flag = true;
                }
            }
        }
        if (!flag) {
            this.myLocalData[this.myLocalData.length] = new Object();
            this.myLocalData[this.myLocalData.length - 1].key = keyName;
            this.myLocalData[this.myLocalData.length - 1].data = data;
        }
    };
    uSaveData.saveData = function () {
        var JSONString = JSON.stringify(this.myLocalData);
        localStorage.setItem(uSaveData.nameGame, JSONString);
    };
    uSaveData.getItem = function (key) {
        var keyName = this.nameGame + key;
        var index = -1;
        for (var i = 0; i < this.myLocalData.length; i++) {
            if (this.myLocalData[i].key == keyName) {
                index = i;
            }
        }
        if (index >= 0) {
            return this.myLocalData[index].data;
        }
        else {
            return null;
        }
    };
    uSaveData.clearData = function () {
        localStorage.clear();
        this.myLocalData = [];
        this.myLocalData = null;
        this.myLocalData = new Array();
    };
    uSaveData.myLocalData = new Array();
    uSaveData.nameGame = 'waterSon';
    return uSaveData;
}());
var PhaserNineSlice;
(function (PhaserNineSlice) {
    var NineSlice = (function (_super) {
        __extends(NineSlice, _super);
        function NineSlice(game, x, y, key, frame, width, height, data) {
            var _this = _super.call(this, game, x, y, key, frame) || this;
            _this.baseTexture = _this.texture.baseTexture;
            _this.baseFrame = _this.texture.frame;
            if (frame !== null && !data) {
                data = game.cache.getNineSlice(frame);
            }
            else if (!data) {
                data = game.cache.getNineSlice(key);
            }
            if (undefined === data) {
                return _this;
            }
            _this.topSize = data.top;
            if (!data.left) {
                _this.leftSize = _this.topSize;
            }
            else {
                _this.leftSize = data.left;
            }
            if (!data.right) {
                _this.rightSize = _this.leftSize;
            }
            else {
                _this.rightSize = data.right;
            }
            if (!data.bottom) {
                _this.bottomSize = _this.topSize;
            }
            else {
                _this.bottomSize = data.bottom;
            }
            _this.loadTexture(new Phaser.RenderTexture(_this.game, _this.localWidth, _this.localHeight));
            _this.resize(width, height);
            return _this;
        }
        NineSlice.prototype.renderTexture = function () {
            this.texture.resize(this.localWidth, this.localHeight, true);
            var textureXs = [0, this.leftSize, this.baseFrame.width - this.rightSize, this.baseFrame.width];
            var textureYs = [0, this.topSize, this.baseFrame.height - this.bottomSize, this.baseFrame.height];
            var finalXs = [0, this.leftSize, this.localWidth - this.rightSize, this.localWidth];
            var finalYs = [0, this.topSize, this.localHeight - this.bottomSize, this.localHeight];
            for (var yi = 0; yi < 3; yi++) {
                for (var xi = 0; xi < 3; xi++) {
                    var s = this.createTexturePart(textureXs[xi], textureYs[yi], textureXs[xi + 1] - textureXs[xi], textureYs[yi + 1] - textureYs[yi]);
                    s.width = finalXs[xi + 1] - finalXs[xi];
                    s.height = finalYs[yi + 1] - finalYs[yi];
                    this.texture.renderXY(s, finalXs[xi], finalYs[yi]);
                }
            }
        };
        NineSlice.prototype.resize = function (width, height) {
            this.localWidth = width;
            this.localHeight = height;
            this.renderTexture();
        };
        NineSlice.prototype.createTexturePart = function (x, y, width, height) {
            var frame = new PIXI.Rectangle(this.baseFrame.x + this.texture.frame.x + x, this.baseFrame.y + this.texture.frame.y + y, Math.max(width, 1), Math.max(height, 1));
            return new Phaser.Sprite(this.game, 0, 0, new PIXI.Texture(this.baseTexture, frame));
        };
        return NineSlice;
    }(Phaser.Sprite));
    PhaserNineSlice.NineSlice = NineSlice;
})(PhaserNineSlice || (PhaserNineSlice = {}));
var PhaserNineSlice;
(function (PhaserNineSlice) {
    var Plugin = (function (_super) {
        __extends(Plugin, _super);
        function Plugin(game, parent) {
            var _this = _super.call(this, game, parent) || this;
            _this.addNineSliceCache();
            _this.addNineSliceFactory();
            _this.addNineSliceLoader();
            return _this;
        }
        Plugin.prototype.addNineSliceLoader = function () {
            Phaser.Loader.prototype.nineSlice = function (key, url, top, left, right, bottom) {
                var cacheData = {
                    top: top
                };
                if (left) {
                    cacheData.left = left;
                }
                if (right) {
                    cacheData.right = right;
                }
                if (bottom) {
                    cacheData.bottom = bottom;
                }
                this.addToFileList('image', key, url);
                this.game.cache.addNineSlice(key, cacheData);
            };
        };
        Plugin.prototype.addNineSliceFactory = function () {
            Phaser.GameObjectFactory.prototype.nineSlice = function (x, y, key, frame, width, height, group) {
                if (group === undefined) {
                    group = this.world;
                }
                var nineSliceObject = new PhaserNineSlice.NineSlice(this.game, x, y, key, frame, width, height);
                return group.add(nineSliceObject);
            };
            Phaser.GameObjectCreator.prototype.nineSlice = function (x, y, key, frame, width, height) {
                return new PhaserNineSlice.NineSlice(this.game, x, y, key, frame, width, height);
            };
        };
        Plugin.prototype.addNineSliceCache = function () {
            Phaser.Cache.prototype.nineSlice = {};
            Phaser.Cache.prototype.addNineSlice = function (key, data) {
                this.nineSlice[key] = data;
            };
            Phaser.Cache.prototype.getNineSlice = function (key) {
                var data = this.nineSlice[key];
                if (undefined === data) {
                    console.warn('Phaser.Cache.getNineSlice: Key "' + key + '" not found in Cache.');
                }
                return data;
            };
        };
        return Plugin;
    }(Phaser.Plugin));
    PhaserNineSlice.Plugin = Plugin;
})(PhaserNineSlice || (PhaserNineSlice = {}));
//# sourceMappingURL=game.js.map