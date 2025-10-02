/*:
 * @author SYnrec / Kylestclr
 * @plugindesc v2.1 Plays videos on scene.
 * @url https://synrec.itch.io
 * @target MZ
 * 
 * @command End Video
 * @desc Stops and removes video from the scene
 * 
 * @command Clear Reserve Videos
 * @desc Clears all reserve videos
 * 
 * @command Clear Delay Video
 * @desc Clears delay video
 * 
 * @command Play Video
 * @desc Plays a video from movies foldier
 * 
 * @arg Name
 * @desc Select the video to play
 * @type file
 * @dir movies
 * @default video
 * 
 * @arg Loop
 * @desc Play video on loop
 * @type boolean
 * @default false
 * 
 * @arg Event
 * @desc Event to play when video ends
 * @type common_event
 * @default 1
 * 
 * @arg Position X
 * @desc Video location setting
 * @type number
 * @default 0
 * 
 * @arg Position Y
 * @desc Video location setting
 * @type number
 * @default 0
 * 
 * @arg Video Width
 * @desc Video size setting
 * @type number
 * @default 0
 * 
 * @arg Video Height
 * @desc Video size setting
 * @type number
 * @default 0
 * 
 * @arg Video Transparency
 * @desc Video transparency. 1 = None, 0 = Full.
 * @type number
 * @default 1
 * @decimals 3
 * 
 * @arg Blocked Buttons
 * @desc Block these buttons during video play
 * @type select[]
 * @option play
 * @option pause
 * @option stop
 * @option repeat
 * @default []
 * 
 * @command Delay Video
 * @desc Plays a video when scene condition met
 * 
 * @arg Delay
 * @desc Time in frame count for video delay
 * @type number
 * @default 60
 * 
 * @arg Name
 * @desc Name of the video to play
 * @type file
 * @dir movies
 * @default video
 * 
 * @arg Loop
 * @desc Play video on loop
 * @type boolean
 * @default false
 * 
 * @arg Event
 * @desc Event to play when video ends
 * @type common_event
 * @default 1
 * 
 * @arg Position X
 * @desc Video location setting
 * @type number
 * @default 0
 * 
 * @arg Position Y
 * @desc Video location setting
 * @type number
 * @default 0
 * 
 * @arg Video Width
 * @desc Video size setting
 * @type number
 * @default 0
 * 
 * @arg Video Height
 * @desc Video size setting
 * @type number
 * @default 0
 * 
 * @arg Video Transparency
 * @desc Video transparency. 1 = None, 0 = Full.
 * @type number
 * @default 1
 * @decimals 3
 * 
 * @arg Blocked Buttons
 * @desc Block these buttons during video play
 * @type select[]
 * @option play
 * @option pause
 * @option stop
 * @option repeat
 * @default []
 * 
 * @command Reserve Video
 * @desc Plays a video when scene condition met
 * 
 * @arg Scene
 * @desc The valid scene for the video
 * @type select
 * @option Scene_Title
 * @option Scene_Map
 * @option Scene_Menu
 * @option Scene_Item
 * @option Scene_Skill
 * @option Scene_Equip
 * @option Scene_Status
 * @option Scene_Options
 * @option Scene_Save
 * @option Scene_Load
 * @option Scene_Shop
 * @option Scene_Name
 * @option Scene_Battle
 * @option Scene_Gameover
 * @default Scene_Map
 * 
 * @arg Name
 * @desc Name of the video to play
 * @type file
 * @dir movies
 * @default video
 * 
 * @arg Loop
 * @desc Play video on loop
 * @type boolean
 * @default false
 * 
 * @arg Event
 * @desc Event to play when video ends
 * @type common_event
 * @default 1
 * 
 * @arg Position X
 * @desc Video location setting
 * @type number
 * @default 0
 * 
 * @arg Position Y
 * @desc Video location setting
 * @type number
 * @default 0
 * 
 * @arg Video Width
 * @desc Video size setting
 * @type number
 * @default 0
 * 
 * @arg Video Height
 * @desc Video size setting
 * @type number
 * @default 0
 * 
 * @arg Video Transparency
 * @desc Video transparency. 1 = None, 0 = Full.
 * @type number
 * @default 1
 * @decimals 3
 * 
 * @arg Blocked Buttons
 * @desc Block these buttons during video play
 * @type select[]
 * @option play
 * @option pause
 * @option stop
 * @option repeat
 * @default []
 * 
 * @command Modify Video
 * @desc Plays a video from videos foldier
 * 
 * @arg Event
 * @desc Set this as the event to play when video ends
 * @type common_event
 * @default 1
 * 
 * @arg Position X
 * @desc Video location setting
 * @type number
 * @default 0
 * 
 * @arg Position Y
 * @desc Video location setting
 * @type number
 * @default 0
 * 
 * @arg Video Width
 * @desc Video size setting
 * @type number
 * @default 0
 * 
 * @arg Video Height
 * @desc Video size setting
 * @type number
 * @default 0
 * 
 * @arg Video Transparency
 * @desc Video transparency. 1 = None, 0 = Full.
 * @type number
 * @default 1
 * @decimals 3
 * 
 * @arg Video Restart
 * @desc Video plays from beginning.
 * @type boolean
 * @default false
 * 
 * @arg Below Layer
 * @desc Shift video below object layer
 * @type boolean
 * @default false
 * 
 * @arg Below Object
 * @parent Below Layer
 * @desc What to shift the video sprite below
 * @type text
 * @default WindowLayer
 * 
 * @help
 * TERMS OF USE
 * - Credit to Synrec/Kylestclr
 * - Free to use in Free/Commercial projects
 * - Only method of redistribution must be to link to: https://synrec.itch.io
 * 
 * Videos go in the videos folder in the parent directory of the project.
 * Videos must be in the .webm format.
 * Videos will end if the scene is changed in any way.
 * 
 * MZ users may use plugin commands to control video during play.
 * 
 * For MV users, here are the script calls:
 * - SceneManager.reserveVideoTexture(name)
 * -- name = Name of the video in the folder. Must be wrapped in quotation marks, eg: "name"
 * 
 * - SceneManager.startVideo(name, loop, e, x, y, w, h, a)
 * -- name = Name of the video in the folder. Must be wrapped in quotation marks, eg: "name"
 * -- loop = Video will loop to start after playing. No auto deletion
 * -- e = Common event ID to reserve/play when video ends.
 * -- x = Position on screen of video
 * -- y = Position on screen of video
 * -- w = Width of the video (Forced), 0 to ignore. Must be set for MZ.
 * -- h = Height of the video (Forced), 0 to ignore. Must be set for MZ.
 * -- a = Transparency of the video. 1 = No transparency, 0 = Full Transparency.
 * 
 * - SceneManager.modifyVideo(e, x, y, w, h, a, r, below, below_object)
 * -- e = Common event ID to reserve/play when video ends.
 * -- x = Position on screen of video
 * -- y = Position on screen of video
 * -- w = Width of the video.
 * -- h = Height of the video.
 * -- a = Transparency of the video. 1 = No transparency, 0 = Full Transparency.
 * -- r = Restart the video.
 * -- below = Allow video to play below object (Window_Layer by default)
 * -- below_object = Specify what object the video plays behind.
 * 
 * - SceneManager.isVideoPlaying()
 * -- Check if scene video is playing.
 * 
 * - SceneManager.endVideo()
 * -- Ends the video.
 * 
 * - SceneManager.clearReserveVideos()
 * -- Clears reserve videos.
 * 
 * - SceneManager.clearDelayVideo()
 * -- Clears delay video.
 * 
 * @param Auto-Reserve Videos
 * @desc Stores video data to prevent reloading
 * @type boolean
 * @default false
 * 
 * @param Play Button
 * @desc Setup button to play video when paused
 * @type struct<vidBtn>
 * 
 * @param Pause Button
 * @desc Setup button to pause video when playing
 * @type struct<vidBtn>
 * 
 * @param Stop Button
 * @desc Setup button to stop video
 * @type struct<vidBtn>
 * 
 * @param Repeat Button
 * @desc Setup button to play video from start
 * @type struct<vidBtn>
 * 
 */
/*~struct~animGfx:
 * 
 * @param File
 * @desc Graphic file
 * @type file
 * @dir img/pictures/
 * 
 * @param X
 * @desc Position Setting
 * @type number
 * @default  0
 * 
 * @param Y
 * @desc Position Setting
 * @type number
 * @default  0
 * 
 * @param Max Frames
 * @desc Number of frames the graphic uses
 * @type number
 * @min 1
 * @default 1
 * 
 * @param Frame Rate
 * @desc Speed at which frames update
 * @type number
 * @default 0
 * 
 */
/*~struct~vidBtn:
 * 
 * @param X
 * @desc Button position
 * @type text
 * @default 0
 * 
 * @param Y
 * @desc Button position
 * @type text
 * @default 0
 * 
 * @param Keyboard Trigger Key
 * @desc Keyboard key used to trigger button
 * @type select
 * @option ok
 * @option cancel
 * @option up
 * @option down
 * @option left
 * @option right
 * @option pageup
 * @option pagedown
 * 
 * @param Cold Graphic
 * @desc Graphic for button when not mouse over.
 * @type struct<animGfx>
 * 
 * @param Hot Graphic
 * @desc Graphic for button when mouse over.
 * @type struct<animGfx>
 * 
 */
const Syn_Video = {};
Syn_Video.Plugin = PluginManager.parameters(`Synrec_VideoPlayer`);
Syn_Video.AUTO_RESERVE = Syn_Video.Plugin['Auto-Reserve Videos'];
const Is_MZ_VideoPlayback = Utils.RPGMAKER_NAME == "MZ";

function ANIMATED_GRAPHIC_PARSER_VIDPLYR(obj){
    try{
        obj = JSON.parse(obj);
        return obj
    }catch(e){
        return;
    }
}

function BUTTON_PARSER_VIDPLYR(obj){
    try{
        obj = JSON.parse(obj);
        obj['Cold Graphic'] = ANIMATED_GRAPHIC_PARSER_VIDPLYR(obj['Cold Graphic']);
        obj['Hot Graphic'] = ANIMATED_GRAPHIC_PARSER_VIDPLYR(obj['Hot Graphic']);
        return obj;
    }catch(e){
        return;
    }
}

Syn_Video.PLAY_BUTTON = BUTTON_PARSER_VIDPLYR(Syn_Video.Plugin['Play Button']);
Syn_Video.PAUSE_BUTTON = BUTTON_PARSER_VIDPLYR(Syn_Video.Plugin['Pause Button']);
Syn_Video.STOP_BUTTON = BUTTON_PARSER_VIDPLYR(Syn_Video.Plugin['Stop Button']);
Syn_Video.REPEAT_BUTTON = BUTTON_PARSER_VIDPLYR(Syn_Video.Plugin['Repeat Button']);

if(Is_MZ_VideoPlayback){
    PluginManager.registerCommand(`Synrec_VideoPlayer`, 'Play Video', (obj)=>{
        const name = obj['Name'];
        const loop = obj['Loop'];
        const event = obj['Event'];
        const x = obj['Position X'];
        const y = obj['Position Y'];
        const w = obj['Video Width'];
        const h = obj['Video Height'];
        const a = obj['Video Transparency'];
        const bv = JSON.parse(obj['Blocked Buttons'] || []);
        SceneManager.startVideo(name, loop, event, x, y, w, h, a, bv);
    })

    PluginManager.registerCommand(`Synrec_VideoPlayer`, 'Delay Video', (obj)=>{
        const delay = Number(obj['Delay']);
        const name = obj['Name'];
        const loop = obj['Loop'];
        const event = obj['Event'];
        const x = obj['Position X'];
        const y = obj['Position Y'];
        const w = obj['Video Width'];
        const h = obj['Video Height'];
        const a = obj['Video Transparency'];
        const bv = JSON.parse(obj['Blocked Buttons'] || []);
        SceneManager.delayVideo(delay, name, loop, event, x, y, w, h, a, bv);
    })

    PluginManager.registerCommand(`Synrec_VideoPlayer`, 'Reserve Video', (obj)=>{
        const scene = obj['Scene'];
        const name = obj['Name'];
        const loop = obj['Loop'];
        const event = obj['Event'];
        const x = obj['Position X'];
        const y = obj['Position Y'];
        const w = obj['Video Width'];
        const h = obj['Video Height'];
        const a = obj['Video Transparency'];
        const bv = JSON.parse(obj['Blocked Buttons'] || []);
        SceneManager.reserveVideo(scene, name, loop, event, x, y, w, h, a, bv);
    })

    PluginManager.registerCommand(`Synrec_VideoPlayer`, 'Modify Video', (obj)=>{
        const event = obj['Event'];
        const x = obj['Position X'];
        const y = obj['Position Y'];
        const w = obj['Video Width'];
        const h = obj['Video Height'];
        const a = obj['Video Transparency'];
        const r = obj['Video Restart'];
        const below = obj['Below Layer'];
        const below_obj = eval(obj['Below Object']);
        SceneManager.modifyVideo(event, x, y, w, h, a, r, below, below_obj);
    })

    PluginManager.registerCommand(`Synrec_VideoPlayer`, 'End Video', ()=>{
        SceneManager.endVideo();
    })

    PluginManager.registerCommand(`Synrec_VideoPlayer`, 'Clear Reserve Videos', ()=>{
        SceneManager.clearReserveVideos();
    })

    PluginManager.registerCommand(`Synrec_VideoPlayer`, 'Clear Delay Video', ()=>{
        SceneManager.clearDelayVideo();
    })
}

function Sprite_SceneVideo(){
    this.initialize();
}

Sprite_SceneVideo.initialize = function(){
    this._videoSprite = new PIXI.Sprite();
    this._videoSprite._reservedVideos = [];
    this._scene = SceneManager._scene;
}

Sprite_SceneVideo.reserveVideoTexture = function(name){
    const rsvp_videos = this._videoSprite._reservedVideos;
    if(rsvp_videos.some((video_obj)=>{
        return video_obj.name == name;
    }))return;
    const src = `movies/${name}.webm`;
    const videoTexture = Is_MZ_VideoPlayback ? new PIXI.Texture.from(src) : new PIXI.Texture.fromVideo(src);
    const source = Is_MZ_VideoPlayback ? videoTexture.baseTexture.resource.source : videoTexture.baseTexture.source;
    source.autoload = true;
    source.preload = 'auto';
    const video_obj = {name, source, texture: videoTexture};
    this._videoSprite._reservedVideos.push(video_obj);
}

Sprite_SceneVideo.setVideoTexture = function(name, loop, event, x, y, w, h, a){
    const rsvp_videos = this._videoSprite._reservedVideos
    let video = rsvp_videos.find((video_obj)=>{
        return video_obj.name == name;
    })
    if(video){
        const source = video.source;
        source.currentTime = 0;
        source.muted = false;
    }
    loop = eval(loop);
    event = Number(event);
    x = Number(x);
    y = Number(y);
    w = Number(w);
    h = Number(h);
    a = Number(a);
    if(this._video_texture && video){
        if(video.name != name){
            this.endVideoTexture();
        }
    }
    const src = `movies/${name}.webm`;
    if(this._videoSprite.parent){
        this._videoSprite.parent.removeChild(this._videoSprite);
    }
    this._scene = SceneManager._scene;
    const videoTexture = video ? video.texture : Is_MZ_VideoPlayback ? new PIXI.Texture.from(src) : new PIXI.Texture.fromVideo(src);
    const source = Is_MZ_VideoPlayback ? videoTexture.baseTexture.resource.source : videoTexture.baseTexture.source;
    if(!video && Syn_Video.AUTO_RESERVE){
        this.reserveVideoTexture(name);
    }
    source.currentTime = 0;
    source.muted = false;
    source.loop = loop;
    source.preload = 'auto';
    source.autoload = true;
    source.autoplay = true;
    this._videoSprite.texture = videoTexture;
    if(!isNaN(x))this._videoSprite.x = x || 0;
    if(!isNaN(y))this._videoSprite.y = y || 0;
    if(!isNaN(w))this._videoSprite.width = w || source.width;
    if(!isNaN(h))this._videoSprite.height = h || source.height;
    this._video_texture = videoTexture;
    this._videoSprite.alpha = isNaN(a) ? 1 : a >= 0 ? a : 1;
    this._rsvpEvent = !isNaN(event) && event > 0 ? event : null;
    video ? source.play() : null;
    this._scene.addChild(this._videoSprite);
}

Sprite_SceneVideo.modifyVideo = function(obj){
    const x = Number(obj.x);
    const y = Number(obj.y);
    const w = Number(obj.width);
    const h = Number(obj.height);
    const a = Number(obj.alpha);
    const r = eval(obj.restart);
    const below = eval(obj.below);
    const below_obj = obj.below_obj || WindowLayer;
    if(!isNaN(x))this._videoSprite.x = x;
    if(!isNaN(y))this._videoSprite.y = y;
    if(!isNaN(w))this._videoSprite.width = w;
    if(!isNaN(h))this._videoSprite.height = h;
    if(!isNaN(a))this._videoSprite.alpha = a;
    if(r){
        const texture = this._video_texture;
        if(!texture)return;
        const video = Is_MZ_VideoPlayback ? texture.baseTexture.resource.source : texture.baseTexture.source;
        video.currentTime = 0;
    }
    if(below){
        const scene = SceneManager._scene;
        const children = scene.children;
        const layer = children.find((child)=>{
            return child instanceof below_obj;
        })
        if(layer){
            const video = this._videoSprite;
            const index_windows = children.indexOf(layer);
            const index_video = children.indexOf(video);
            scene.children.splice(
                index_video,
                1
            )
            scene.addChildAt(this._videoSprite, index_windows)
        }
    }
}

Sprite_SceneVideo.endVideoTexture = function(){
    const texture = this._video_texture;
    if(!texture)return;
    const video = Is_MZ_VideoPlayback ? texture.baseTexture.resource.source : texture.baseTexture.source;
    video.currentTime = JsonEx.makeDeepCopy(video.duration);
    video.loop = false;
    video.muted = true;
    video.autoplay = false;
    video.pause();
    //! video.remove(); Potentially problematic line? Need user feedback.
    if(this._videoSprite.parent){
        this._videoSprite.parent.removeChild(this._videoSprite);
    }
    this._video_texture = null;
    if(this._rsvpEvent){
        const id = JsonEx.makeDeepCopy(this._rsvpEvent);
        $gameTemp.reserveCommonEvent(id);
        this._rsvpEvent = null;
    }
    SceneManager.clearVideoButtons()
}

Sprite_SceneVideo.update = function(){
    const cur_texture = this._video_texture;
    const rsvp_videos = this._videoSprite._reservedVideos;
    if(Array.isArray(rsvp_videos)){
        rsvp_videos.forEach((video)=>{
            if(video.texture != cur_texture){
                video.source.currentTime = 0;
                video.source.pause();
                video.texture.update();
            }
        })
    }
    if(this._video_texture){
        const texture = this._video_texture;
        this._video_texture.update();
        const video = Is_MZ_VideoPlayback ? texture.baseTexture.resource.source : texture.baseTexture.source;
        const is_loop = video.loop;
        const is_end = video.currentTime >= video.duration;
        if(
            (SceneManager._scene != this._scene) ||
            (
                !is_loop &&
                is_end
            )
        ){
            this.endVideoTexture();
        }
    }
}

function Sprite_SynVidAnimGfx(){
    this.initialize(...arguments);
}

Sprite_SynVidAnimGfx.prototype = Object.create(Sprite.prototype);
Sprite_SynVidAnimGfx.prototype.constructor = Sprite_SynVidAnimGfx;

Sprite_SynVidAnimGfx.prototype.initialize = function(data){
    Sprite.prototype.initialize.call(this);
    this._gfx_data = data;
    this.setupGfx();
}

Sprite_SynVidAnimGfx.prototype.setupGfx = function(gfx_data){
    const gfx_config = gfx_data || this._gfx_data;
    if(!gfx_config)return;
    const file_name = gfx_config['File'];
    if(!file_name)return;
    const bitmap = ImageManager.loadPicture(file_name);
    this._cur_frame = 0;
    this._max_frames = eval(gfx_config['Max Frames']);
    this._frame_rate = eval(gfx_config['Frame Rate']);
    this._frame_time = eval(gfx_config['Frame Rate']);
    this.bitmap = bitmap;
    const mx = eval(gfx_config['X']);
    const my = eval(gfx_config['Y']);
    this.move(mx,my);
    this.updateFrames();
}

Sprite_SynVidAnimGfx.prototype.update = function(){
    Sprite.prototype.update.call(this);
    this.updateFrames();
}

Sprite_SynVidAnimGfx.prototype.updateFrames = function(){
    const bitmap = this.bitmap;
    if(!bitmap)return;
    if(isNaN(this._frame_time) || this._frame_time >= this._frame_rate){
        this._frame_time = 0;
        const frames = this._max_frames;
        const w = bitmap.width / frames;
        const h = bitmap.height;
        const x = w * this._cur_frame;
        const y = 0;
        this.setFrame(x,y,w,h);
        this._cur_frame++;
        if(this._cur_frame >= frames){
            this._cur_frame = 0;
        }
    }else{
        this._frame_time++;
    }
}

function Sprite_SynVidButton(){
    this.initialize(...arguments);
}

Sprite_SynVidButton.prototype = Object.create(Sprite.prototype);
Sprite_SynVidButton.prototype.constructor = Sprite_SynVidButton;

Sprite_SynVidButton.prototype.initialize = function(data, type){
    Sprite.prototype.initialize.call(this);
    this._button_data = data;
    this._type = type;
    this.createColdGraphic();
    this.createHotGraphic();
    this.setPosition();
}

Sprite_SynVidButton.prototype.createColdGraphic = function(){
    const sprite = new Sprite_SynVidAnimGfx();
    const btn_data = this._button_data;
    if(btn_data){
        const cold_graphic_data = btn_data['Cold Graphic'];
        sprite.setupGfx(cold_graphic_data);
    }
    this.addChild(sprite);
    this._cold_gfx = sprite;
}

Sprite_SynVidButton.prototype.createHotGraphic = function(){
    const sprite = new Sprite_SynVidAnimGfx();
    sprite.visible = false;
    const btn_data = this._button_data;
    if(btn_data){
        const hot_graphic_data = btn_data['Hot Graphic'];
        sprite.setupGfx(hot_graphic_data);
    }
    this.addChild(sprite);
    this._hot_gfx = sprite;
}

Sprite_SynVidButton.prototype.setPosition = function(){
    const btn_data = this._button_data;
    if(btn_data){
        const x = eval(btn_data['X']);
        const y = eval(btn_data['Y']);
        this.move(x,y);
    }
}

Sprite_SynVidButton.prototype.update = function(){
    Sprite.prototype.update.call(this);
    this.updateSelected();
    this.updateGraphic();
    this.updateOnClick();
    this.updateKeyInput();
}

Sprite_SynVidButton.prototype.updateSelected = function(){
    const tx = TouchInput.x;
    const ty = TouchInput.y;
    const gfx = this._cold_gfx;
    const x = this.x;
    const y = this.y;
    const w = gfx.width;
    const h = gfx.height;
    if(
        tx >= x &&
        tx <= x + w &&
        ty >= y &&
        ty <= y + h
    ){
        this._hover = true;
    }else{
        this._hover = false;
    }
}

Sprite_SynVidButton.prototype.updateGraphic = function(){
    if(this._hover || this._active){
        this._cold_gfx.visible = false;
        this._hot_gfx.visible = true;
    }else{
        this._cold_gfx.visible = true;
        this._hot_gfx.visible = false;
    }
}

Sprite_SynVidButton.prototype.updateOnClick = function(){
    if(this._hover && TouchInput.isTriggered()){
        const type = this._type;
        const video_sprite = SceneManager._sceneVideo
        if(!video_sprite)return;
        const baseTexture = video_sprite._video_texture.baseTexture;
        const video = Is_MZ_VideoPlayback ? baseTexture.resource.source : baseTexture.source;
        switch(type){
            case 'play':
                video.play();
                break;
            case 'pause':
                video.pause();
                break;
            case 'stop':
                SceneManager.endVideo();
                break;
            case 'repeat':
                video.currentTime = 0;
                break;
        }
        $gameTemp.clearDestination();
        TouchInput.clear();
    }
}

Sprite_SynVidButton.prototype.updateKeyInput = function(){
    const btn_data = this._button_data;
    const trigger_key = btn_data['Keyboard Trigger Key'];
    if(Input.isPressed(trigger_key)){
        this._active = true;
    }else if(this._active && !Input.isPressed(trigger_key)){
        const type = this._type;
        const video_sprite = SceneManager._sceneVideo
        if(!video_sprite)return;
        const baseTexture = video_sprite._video_texture.baseTexture;
        const video = Is_MZ_VideoPlayback ? baseTexture.resource.source : baseTexture.source;
        switch(type){
            case 'play':
                video.play();
                break;
            case 'pause':
                video.pause();
                break;
            case 'stop':
                SceneManager.endVideo();
                break;
            case 'repeat':
                video.currentTime = 0;
                break;
        }
        $gameTemp.clearDestination();
        Input.clear();
        this._active = false;
    }
}

Syn_Video_GmTemp_SetDest = Game_Temp.prototype.setDestination;
Game_Temp.prototype.setDestination = function(x, y) {
    if(SceneManager.isVideoPlaying())return;
    Syn_Video_GmTemp_SetDest.call(this, ...arguments);
}

Syn_Video_GmPlyr_CnMov = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
    return Syn_Video_GmPlyr_CnMov.call(this) && !SceneManager.isVideoPlaying();
}

Syn_Video_ScnBse_IsBsy = Scene_Base.prototype.isBusy;
Scene_Base.prototype.isBusy = function() {
    return Syn_Video_ScnBse_IsBsy.call(this) || SceneManager.isVideoPlaying();
}

Syn_Video_ScnMap_IsMnuEnbld = Scene_Map.prototype.isMenuEnabled;
Scene_Map.prototype.isMenuEnabled = function() {
    return Syn_Video_ScnMap_IsMnuEnbld.call(this) && !SceneManager.isVideoPlaying();
}

SceneManager.isVideoPlaying = function(){
    if(!this._sceneVideo)return false;
    if(!this._sceneVideo._video_texture)return false;
    const baseTexture = this._sceneVideo._video_texture.baseTexture;
    const video = Is_MZ_VideoPlayback ? baseTexture.resource.source : baseTexture.source;
    if(video.currentTime >= video.duration){
        return false;
    }
    return true;
}

SceneManager.playReserveVideo = function(){
    if(!Array.isArray(this._reserveVideos))return;
    const obj = this._reserveVideos[0];
    if(!obj)return;
    try{
        const chk_scene = eval(obj.scene);
        const scene = this._scene;
        if(scene instanceof chk_scene){
            const video_obj = this._reserveVideos.shift();
            if(video_obj){
                const name = video_obj.name;
                const loop = video_obj.loop;
                const x = video_obj.x;
                const y = video_obj.y;
                const w = video_obj.width;
                const h = video_obj.height;
                const a = video_obj.alpha;
                const e = video_obj.event;
                this.startVideo(name, loop, e, x, y, w, h, a);
            }
        }
    }catch(e){
        console.warn(`Invalid reserve playback, reserve videos cleared., ${e}`);
        this._reserveVideos = [];
    }
}

SceneManager.playDelayVideo = function(){
    if(!this._delayVideo)return;
    const video_obj = this._delayVideo;
    if(Graphics.frameCount >= video_obj.delay){
        const name = video_obj.name;
        const loop = video_obj.loop;
        const x = video_obj.x;
        const y = video_obj.y;
        const w = video_obj.width;
        const h = video_obj.height;
        const a = video_obj.alpha;
        const e = video_obj.event;
        this.startVideo(name, loop, e, x, y, w, h, a);
        this._delayVideo = null;
    }
}

SceneManager.reserveVideo = function(scene, name, loop, e, x, y, w, h, a){
    if(!Array.isArray(this._reserveVideos))this._reserveVideos = [];
    const obj = {};
    obj.scene = scene;
    obj.name = name;
    obj.loop = loop;
    obj.event = e;
    obj.x = x;
    obj.y = y;
    obj.width = w;
    obj.height = h;
    obj.alpha = a;
    this._reserveVideos.push(obj);
    this.reserveVideoTexture(name);
}

SceneManager.delayVideo = function(delay, name, loop, e, x, y, w, h, a){
    if(this._delayVideo)return console.warn(`You may only delay one video at a time.`);
    const obj = {};
    obj.delay = Graphics.frameCount + delay;
    obj.name = name;
    obj.loop = loop;
    obj.event = e;
    obj.x = x;
    obj.y = y;
    obj.width = w;
    obj.height = h;
    obj.alpha = a;
    this._delayVideo = obj;
}

Syn_Video_ScnMngr_UpdtMain = SceneManager.updateMain
SceneManager.updateMain = function(){
    Syn_Video_ScnMngr_UpdtMain.call(this);
    this.updateSceneVideo();
}

SceneManager.updateSceneVideo = function(){
    if(!this._sceneVideo){
        this._sceneVideo = Sprite_SceneVideo;
        this._sceneVideo.initialize();
    }
    this._sceneVideo.update();
    this.updateDelayVideo();
    this.updateReserveVideo();
}

SceneManager.updateDelayVideo = function(){
    if(this.isVideoPlaying())return;
    this.playDelayVideo();
}

SceneManager.updateReserveVideo = function(){
    if(this.isVideoPlaying())return;
    this.playReserveVideo();
}

SceneManager.reserveVideoTexture = function(name){
    if(!this._sceneVideo){
        this._sceneVideo = Sprite_SceneVideo;
        this._sceneVideo.initialize();
    }
    this._sceneVideo.reserveVideoTexture(name);
}

SceneManager.startVideo = function(name, loop, e, x, y, w, h, a, bv){
    if(!this._sceneVideo){
        this._sceneVideo = Sprite_SceneVideo;
        this._sceneVideo.initialize();
    }
    this._banned_video_btns = bv;
    if(name)this._sceneVideo.setVideoTexture(name, loop, e, x, y, w, h, a);
    this.loadVideoButtons();
}

SceneManager.modifyVideo = function(e, x, y, w, h, a, r, below, below_obj){
    if(!below_obj)below_obj = WindowLayer;
    if(!this._sceneVideo){
        return;
    }
    const obj = {};
    if(!isNaN(e))obj.event = e;
    if(!isNaN(x))obj.x = x;
    if(!isNaN(y))obj.y = y;
    if(!isNaN(w))obj.width = w;
    if(!isNaN(h))obj.height = h;
    if(!isNaN(a))obj.alpha = a;
    obj.restart = !!r;
    obj.below = below;
    obj.below_obj = below_obj;
    this._sceneVideo.modifyVideo(obj);
}

SceneManager.endVideo = function(){
    if(!this._sceneVideo){
        return;
    }
    this._sceneVideo.endVideoTexture()
    this.clearVideoButtons();
}

SceneManager.clearReserveVideos = function(){
    this._reserveVideos = [];
    if(this._sceneVideo){
        this._sceneVideo._videoSprite._reservedVideos = [];
    }
}

SceneManager.clearDelayVideo = function(){
    this._delayVideo = null;
}

Syn_Video_ScnMngr_ChngScn = SceneManager.changeScene;
SceneManager.changeScene = function() {
    if (this.isSceneChanging()) {
        this.endVideo();
    }
    Syn_Video_ScnMngr_ChngScn.call(this);
}

Syn_Video_ScnMngr_OnErr = SceneManager.onError;
SceneManager.onError = function(e) {
    this.endVideo();
    Syn_Video_ScnMngr_OnErr.call(this, e);
};

SceneManager.loadVideoButtons = function(){
    const scene = this._scene;
    const buttons = [];
    const play_btn = Syn_Video.PLAY_BUTTON;
    const pause_btn = Syn_Video.PAUSE_BUTTON;
    const stop_btn = Syn_Video.STOP_BUTTON;
    const repeat_btn = Syn_Video.REPEAT_BUTTON
    const banned = this._banned_video_btns || [];
    if(
        play_btn &&
        !banned.includes('play')
    ){
        const sprite = new Sprite_SynVidButton(play_btn, 'play');
        buttons.push(sprite);
    }
    if(
        pause_btn &&
        !banned.includes('pause')
    ){
        const sprite = new Sprite_SynVidButton(pause_btn, 'pause');
        buttons.push(sprite);
    }
    if(
        stop_btn &&
        !banned.includes('stop')
    ){
        const sprite = new Sprite_SynVidButton(stop_btn, 'stop');
        buttons.push(sprite);
    }
    if(
        repeat_btn &&
        !banned.includes('repeat')
    ){
        const sprite = new Sprite_SynVidButton(repeat_btn, 'repeat');
        buttons.push(sprite);
    }
    buttons.forEach((sprite)=>{
        scene.addChild(sprite);
    })
    console.log(buttons)
    this._loaded_video_btns = buttons;
}

SceneManager.clearVideoButtons = function(){
    const buttons = this._loaded_video_btns;
    if(!Array.isArray(buttons))return;
    buttons.forEach((sprite)=>{
        if(sprite._destroyed)return;
        if(sprite.parent){
            sprite.parent.removeChild(sprite);
        }
        if(sprite.destroy)sprite.destroy();
        delete sprite;
    })
    this._loaded_video_btns = [];
}