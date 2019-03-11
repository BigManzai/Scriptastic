(function(){
    // This file depends on the runtime extensions, which should probably be moved into this namespace rather than made global

// Raphael Extensions (making life easier on our script templates)

// Provide the arc of a circle, given the radius and the angles to start and stop at
Raphael.fn.arcslice = function(radius, fromangle, toangle){
       var x1 = Math.cos(deg2rad(fromangle)) * radius,
           y1 = Math.sin(deg2rad(fromangle)) * radius,
           x2 = Math.cos(deg2rad(toangle)) * radius,
           y2 = Math.sin(deg2rad(toangle)) * radius;
        var arc = this.path();
        arc.moveTo(x1, y1).arcTo(radius, radius, 0, 1, x2,y2, rad2deg(toangle - fromangle));
        return arc;
};

Raphael.fn.regularPolygon = function(cx,cy,radius, sides, pointsOnly){
    var angle = 0;
    var theta = Math.PI * 2 / sides;
    var x = Math.cos(0) * radius + cx;
    var y = Math.sin(0) * radius + cy;
    if (pointsOnly){
        var points = [[x,y]];
    }else{
        var path = this.path();
        path.moveTo(x,y);
    }
    for (var i = 1; i < sides; i++){
        x = Math.cos(theta * i) * radius + cx;
        y = Math.sin(theta * i) * radius + cy;
        if (pointsOnly){
            points.push([x,y]);
        }else{
            path.lineTo(x,y);
        }
    }
    if (pointsOnly){
        return points;
    }else{
        path.andClose();
        return path;
    }
};

Raphael.fn.imageWithNaturalHeight = function(url){
    var img = this.image(url, 0, 0, 0, 0);
    function getWidthAndHeight() {
        img.attr({width: this.width, height: this.height});
        return true;
    }
    function loadFailure() {
        console.log("'" + this.name + "' failed to load.");
        return true;
    }
    var myImage = new Image();
    myImage.name = url;
    myImage.onload = getWidthAndHeight;
    myImage.onerror = loadFailure;
    myImage.src = "";
    return img;
};



// expose these globally so the Block/Label methods can find them
window.choice_lists = {
    keys: 'abcdefghijklmnopqrstuvwxyz0123456789*+-./'
        .split('').concat(['up', 'down', 'left', 'right',
        'backspace', 'tab', 'return', 'shift', 'ctrl', 'alt',
        'pause', 'capslock', 'esc', 'space', 'pageup', 'pagedown',
        'end', 'home', 'insert', 'del', 'numlock', 'scroll', 'meta']),
    linecap: ['round', 'butt', 'square'],
    linejoin: ['round', 'bevel', 'mitre'],
    easing: ['>', '<', '<>', 'backIn', 'backOut', 'bounce', 'elastic'],
    fontweight: ['normal', 'bold', 'inherit']
};


var menus = {
    events: menu('Events', [
        {
            label: 'Wenn das Skript zurückgesetzt wird',
            trigger: true,
            script: ' state_entry(){ // Dies geschieht, wenn das Skript zurückgesetzt wird. \n[[next]]\n }\n'
         },{
            label: 'Wenn das Objekt gerezzd ist',
            trigger: true,
            script: ' on_rez(integer param){ // Wenn das Objekt gerezzd ist\n[[next]]\n }\n'
         },{
            label: 'When attached',
            trigger: true,
            script: ' attach(key id){ // object is attached\n[[next]]\n }\n'
         },{
            label: 'When timer expires',
            trigger: true,
            script: ' timer(){ // timer triggered by llSetTimerEvent()\n[[next]]\n }\n'
         },{
            label: 'When Link Message [string:SomeText] received',
            trigger: true,
            script: ' link_message(integer sender_num, integer num, string str, key id ) { // message sent by llMessage_linked arrived\n  if (str == "{{1}}"){\n[[next]]\n  }\n }\n'
        },{
            label: 'When chat message [string:Yay] received',
            trigger: true,
            script: ' listen(integer chan, string name, key id, string msg) {  // chat message heard\n  if (msg == "{{1}}") {\n[[next]]\n  }\n }\n'
        },{
            label: 'When object clicked',
            trigger: true,
            script: ' touch_start(integer total_number){ \n[[next]]\n }\n'
         },{
              label: 'Accept money',
              trigger: true,
              script: ' money(key id, integer amount) {     // Some money has been received \n[[next]]\n }\n'
         },{
            label: 'When object collides',
            trigger: true,
            script: ' collision(integer num_detected){ \n[[next]]\n }\n'
         },{
            label: 'When land collides',
            trigger: true,
            script: ' land_collision(vector pos){ // triggered in the root when physical object or attached avatar is colliding with land\n[[next]]\n }\n'
         },{
            label: 'When something is sensed',
            trigger: true,
            script: ' sensor(integer num_detected){\n[[next]]\n }\n'
         },{
            label: 'When something is not sensed',
            trigger: true,
            script: ' no_sensor(){\n[[next]]\n }\n'
         },{
           label: 'Object contents changed',
            trigger: true,
            script: ' changed(integer what) {\n  if(what & CHANGED_INVENTORY) {\n[[next]]\n  }\n }\n'
        },{
           label: 'Object changed regions',
            trigger: true,
            script: ' changed(integer what) {\n  if(what & CHANGED_REGION) {\n[[next]]\n  }\n }\n'
        },{
           label: 'Avatar teleported',
            trigger: true,
            script: ' changed(integer what) {\n  if(what & CHANGED_TELEPORT) {\n[[next]]\n  }\n }\n'
        },{
           label: 'Object sat on ',
            trigger: true,
            script: ' changed(integer what) {\n  if(what & CHANGED_LINK) {\n   key av = llAvatarOnSitTarget();\n   if (av) { // evaluated as true if key is valid and not NULL_KEY\n[[next]]\n   }\n  }\n }\n'
        },{
           label: 'Object contents changed',
            trigger: true,
            script: ' changed(integer what) {\n  if(what & CHANGED_INVENTORY) {\n   // Object contents changed\n[[next]]\n  }\n }\n'
        }

    ], false),


    sensing: menu('Sensing', [
       {
           label: 'Sense Avatar [string:AvatarName] once',
            script: '  llSensor( "{{1}}", "", AGENT_BY_LEGACY_NAME, 96.0, PI) ; // Sense Avatar {{1}} once'
        },{
           label: 'Sense Object [string:ObjectName] once',
            script: '  llSensor( "{{1}}", "", PASSIVE|ACTIVE, 96.0, PI) ; // Sense Object {{1}} once'
        },{
           label: 'Sense any Avatar every [number:10] seconds',
            script: '  llSensorRepeat( "", "", AGENT, 96.0, PI, {{1}}); // Sense any Avatar every {{1}} seconds\n'
        },{
           label: 'Sense Object [string:ObjectName] every [number:2] seconds',
            script: '  llSensorRepeat( "{{1}}", "", PASSIVE|ACTIVE, 96.0, PI, {{2}}); // Sense Object {[1}} every {{2}} seconds at a range of 96 meters\n'
        },{
            label: 'Remove Sensor',
            script: '  llSensorRemove(); // remove sensor\n'
        },{
           label: 'Listen for chat from anyone',
            script: '  llListen(0, "", "", ""); // Listen for chat from anyone\n'
        },{
           label: 'Listen for chat from owner',
            script: '  llListen(0, "", llGetOwner(), "");// Listen for chat from owner\n'
        },{
           label: 'Listen for chat from object on channel [number:1]',
            script: '  llListen({{1}}, "", "", ""); // Listen for chat from object on channel {{1}}\n'
        }

    ]),

       control: menu('Flow-Control', [
       {
           label: 'Repeat [number:10] times',
            containers: 1,
            script: '  integer a;\n  do {\n  [[1]]  }  while(++a < {{1}});\n'
        },{
           label: 'if [string:Expression1] ',
            containers: 2,
            script: '  if({{1}}) {\n   [[1]]\n  } else {\n   [[2]]  } // end if\n'
        },{
            label: 'Reset the script',
            slot: false,
            script: '  llResetScript();  // reset this script\n'
        },{
            label: 'Pause [number:1] seconds     ',
            script: '  llSleep({{1}});\n'
        },{
            label: 'Return',
            slot: false,
            script: '  return();\n'
        }


    ]),





    shapes: menu('Looks', [
        {
            label: 'Add hover text [string:Hello Avatar!]',
            script: '  llSetText("{{1}}", <1.0,1.0,1.0>, 1.0); // add hover text\n'
        },{
              label: 'Apply texture [string: textureName]',
              script: '  llSetTexture("{{1}}", ALL_SIDES); // change texture'
        },{
            label: 'Turn red',
            script: '  llSetColor(<1.0, 0.0, 0.0>,ALL_SIDES); // turn red\n'
        },{
            label: 'Turn green',
            script: '  llSetColor(<0.0, 1.0, 0.0>,ALL_SIDES); // turn green\n'
        },{
            label: 'Turn blue',
            script: '  llSetColor(<0.0, 0.0, 1.0>,ALL_SIDES);// turn blue\n'
        },{
            label: 'Grow x2',
            script: '  llSetScale(<2.0, 2.0, 2.0>); // grow\n'
        },{
            label: 'Shrink x2',
            script: '  llSetScale(<0.5, 0.5, 0.5>); // shrink\n'
        },{
            label: 'Turn glow on',
            script: '  llSetPrimitiveParams([PRIM_GLOW, ALL_SIDES, .6]); // glow off\n'
        },{
            label: 'Turn glow off',
            script: '  llSetPrimitiveParams([PRIM_GLOW, ALL_SIDES, 0]); // glow on\n'
        },{
            label: 'Make transparent',
            script: '  llSetAlpha(0.0,ALL_SIDES); // make invisible\n'
        },{
            label: 'Make opaque',
            script: '  llSetAlpha(1,ALL_SIDES); // make opaque\n'
       },{
            label: 'Slide Texture',
            script: '  llSetTextureAnim(ANIM_ON | SMOOTH | LOOP , ALL_SIDES, 1, 1, 1.0, 1.0, 1.0);// slides a texture smoothly and loops it when it gets to the end. \n'
        },{
            label: 'Rotate Texture constantly',
            script: '  llSetTextureAnim(ANIM_ON | SMOOTH | ROTATE | LOOP, ALL_SIDES,1,1,0, TWO_PI, 2*TWO_PI);// rotates a texture counter-clockwise at 2 revolutions per second. Change the last value to -2*TWO_PI to rotate clockwise. \n'
        },{
            label: 'Rotate Texture 1/4 turn',
            script: '  llRotateTexture(PI_BY_TWO, ALL_SIDES);//   objects\'s texture rotates a quarter of turn\n'
        },{
            label: 'Scale Texture',
            script: '  llSetTextureAnim(ANIM_ON | SMOOTH | SCALE | PING_PONG | LOOP, ALL_SIDES, 1, 1, 1.0, 3.0, 2.0); // scales a texture larger and smaller. '
        },{
            label: 'Disable Texture Animation',
            script: '  llSetTextureAnim(FALSE, ALL_SIDES, 0, 0, 0.0, 0.0, 1.0);//  turns off all texture animations \n'
        }

     ]),


    text: menu('Motion', [
        {
            label: 'Prim Animate [string:AnimationName]',
            script: '  llMessageLinked(LINK_SET,1,"{{1}}",""); // play animation named {{1}}\n'
        },{
            label: 'Make Physical',
            script: '  llSetStatus(STATUS_PHYSICS,TRUE); // object will fall\n  llSleep(0.1); // wait for a moment until it kicks in\n'
        },{
            label: 'Make Mon-Physical',
            script: '  llSetStatus(STATUS_PHYSICS,FALSE); // now just an ordinary prim\n'
        },{
              label: 'Anti-gravity [string: 1.05]',
              script: '  llSetBuoyancy({{1}}); // float upward - must also "Make Physical" for this to work\n'
        },{
              label: 'Fly up',
              script: '  llSetForce(<0,0,0x7FFFFFFF>, 0);  // fly  up fast! must also "Make Physical" for this to work\n'
        },{
            label: 'Move forward [number:1] meters',
            script: '  llSetPos(llGetPos()+<0,{{1}},0>); // move forward\n'
        },{
            label: 'Move back [number:1] meters',
            script: '  llSetPos(llGetPos()+<0,-{{1}},0>); // move back\n'
        },{
            label: 'Move right [number:1] meters',
            script: '  llSetPos(llGetPos()+<{{1}},0,0>); // move right\n'
        },{
            label: 'Move left [number:1] meters',
            script: '  llSetPos(llGetPos()+<-{{1}},0,0>); // move left\n'
        },{
            label: 'Move up [number:1] meters',
            script: '  llSetPos(llGetPos()+<0,0,{{1}}>); // move up\n'
        },{
            label: 'Move down [number:1] meters',
            script: '  llSetPos(llGetPos()+<0,0,-{{1}}>); // move down\n'
        },{
            label: 'Rotate[number:30] degrees vertically',
            script: '  llSetRot(llGetRot() * llEuler2Rot(<0,0,{{1}}>*DEG_TO_RAD));  // spins around the vertical axis \n'
        },{
            label: 'Rotate[number:30] degrees front',
            script: '  llSetRot(llGetRot() * llEuler2Rot(<0,{{1}},0>*DEG_TO_RAD));  // spins around the front axis \n'
        },{
            label: 'Rotate[number:30] degrees vertically',
            script: '  llSetRot(llGetRot() * llEuler2Rot(<{{1}},0,0,>*DEG_TO_RAD));  // spins around the side axis \n'
        },{
            label: 'Spin object [number:2] radians/sec',
            script: '  llTargetOmega(<0,0,1>,{{1},1);// spin object\n'
        },{
            label: 'Stop spinning object',
            script: '  llTargetOmega(<0,0,0>,0,0); // stop spinning\n'
        },{
            label: 'Rez Object [string:objectName]',
            script: '  llRezObject("{{1}}", llGetPos() + <0.0,0.0,0.0>, <0.0,0.0,0.0>, ZERO_ROTATION, 0); //  rezzes a copy of an object named {{1}} \n'
        },{
            label: 'Start Animation [string:animationName]',
            script: ' llStartAnimation("{{1}}") // animation must be in the object\n'
        },{
            label: 'Stop Animation [string:animationName]',
            script: '  llStopAnimation("{{1}}")// stops named animation \n'
        }

     ]),

    functions: menu('Chat', [
        {
            label: 'Send Script a Message [string:Message]',
            script: '  llMessageLinked(LINK_SET,0,"{{1}}",""); // send string {{1}} to link_message() in another script\n'
        },{
            label: 'Shout: [string:Hello World!] 100 meters',
            script: '  llSay(0,"{{1}}");// travels 100 meters\n'
        },{
            label: 'Say: [string:Hello World!] 20 meters',
            script: '  llSay(0,"{{1}}"); // travels 20 meters\n'
        },{
            label: 'Whisper: [string:Hello World!] 10 meters',
            script: '  llSay(0,"{{1}}");// travels 10 meters\n'
        }
     ]),

    functions: menu('Functions', [
        {
            label: 'Comment: [string:Enter a comment] ',
            script: '// {{1}} \n'
        },{
            label: 'LSL Code: [string:llResetScript();] ',
            script: '  {{1}} // User code\n'
        },{
            label: 'Die',
             slot: false,
            script: '  llDie(); // Program and primitive will disappear\n'
        },{
            label: 'Start a Timer for [number:10] seconds',
            script: '  llSetTimerEvent({{1}});// trigger a timer() event in {{1}} second\n'
        },{
           label: 'Load web page [string:http://www.outworldz.com]',
            script: ' llLoadURL(llDetectedKey(0), "Visit the website!", "{{1}}");\n'
        },{
            label: 'Play Sound named [string:SomeSoundName]',
            script: '  llPlaySound("{{1}}",1.0);// full volume = 1.0\n'
        },{
            label: 'Loop Sound named [string:SomeSoundName]',
            script: '  llLoopSound("{{1}}",1.0);// full volume = 1.0\n'
        },{
            label: 'Stop all Sounds',
            script: '  llStopSound();\n'
        },{
            label: 'float [string:Variable] = [number:1.0]',
            script: '  float {{1}} = {{2}}; // Declare a variable that hold the value {{2}}\n'
        },{
            label: 'integer [string:Variable] = [number:1]',
            script: '  integer {{1}} = {{2}}; // Declare a variable that hold the value {{2}}\n'
        },{
            label: 'vector [string:Variable] = [string:<1,2,3>]',
            script: '  vector {{1}} = {{2}}; // Declare a variable that hold the vector {{2}}\n'
        }

     ]),
	 
    functions: menu('Avatars', [
		{
            label: 'osAgentSaveAppearance [string:Variable]',
            script: '  osAgentSaveAppearance();//  Erklaerung im Skript\n'
        },
		{
            label: 'osAvatarName2Key [string:Variable]',
            script: '  osAvatarName2Key();//  Erklaerung im Skript\n'
        },
		{
            label: 'osAvatarPlayAnimation [string:Variable]',
            script: '  osAvatarPlayAnimation();//  Erklaerung im Skript\n'
        },
		{
            label: 'osAvatarStopAnimation [string:Variable]',
            script: '  osAvatarStopAnimation();//  Erklaerung im Skript\n'
        },
		{
            label: 'osCauseDamage [string:Variable]',
            script: '  osCauseDamage();//  Erklaerung im Skript\n'
        },
		{
            label: 'osCauseHealing [string:Variable]',
            script: '  osCauseHealing();//  Erklaerung im Skript\n'
        },
		{
            label: 'osDetectedCountry [string:Variable]',
            script: '  osDetectedCountry();//  Erklaerung im Skript\n'
        },
		{
            label: 'osDropAttachment [string:Variable]',
            script: '  osDropAttachment();//  Erklaerung im Skript\n'
        },
		{
            label: 'osDropAttachmentAt [string:Variable]',
            script: '  osDropAttachmentAt();//  Erklaerung im Skript\n'
        },
		{
            label: 'osEjectFromGroup [string:Variable]',
            script: '  osEjectFromGroup();//  Erklaerung im Skript\n'
        },
		{
            label: 'osForceAttachToAvatar [string:Variable]',
            script: '  osForceAttachToAvatar();//  Erklaerung im Skript\n'
        },
		{
            label: 'osForceAttachToAvatarFromInventory [string:Variable]',
            script: '  osForceAttachToAvatarFromInventory();//  Erklaerung im Skript\n'
        },
		{
            label: 'osForceAttachToOtherAvatarFromInventory [string:Variable]',
            script: '  osForceAttachToOtherAvatarFromInventory();//  Erklaerung im Skript\n'
        },
		{
            label: 'osForceDetachFromAvatar [string:Variable]',
            script: '  osForceDetachFromAvatar();//  Erklaerung im Skript\n'
        },
		{
            label: 'osForceDropAttachment [string:Variable]',
            script: '  osForceDropAttachment();//  Erklaerung im Skript\n'
        },
		{
            label: 'osForceDropAttachmentAt [string:Variable]',
            script: '  osForceDropAttachmentAt();//  Erklaerung im Skript\n'
        },
		{
            label: 'osForceOtherSit [string:Variable]',
            script: '  osForceOtherSit();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetAgentIP [string:Variable]',
            script: '  osGetAgentIP();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetAgents [string:Variable]',
            script: '  osGetAgents();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetAgentCountry [string:Variable]',
            script: '  osGetAgentCountry();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osGetAvatarHomeURI [string:Variable]',
            script: '  osGetAvatarHomeURI();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetAvatarList [string:Variable]',
            script: '  osGetAvatarList();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetGender [string:Variable]',
            script: '  osGetGender();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetHealRate [string:Variable]',
            script: '  osGetHealRate();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osGetHealth( [string:Variable]',
            script: '  osGetHealth();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetNumberOfAttachments [string:Variable]',
            script: '  osGetNumberOfAttachments();//  Erklaerung im Skript\n'
        },
		{
            label: 'osInviteToGroup [string:Variable]',
            script: '  osInviteToGroup();//  Erklaerung im Skript\n'
        },
		{
            label: 'osKickAvatar [string:Variable]',
            script: '  osKickAvatar();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osOwnerSaveAppearance [string:Variable]',
            script: '  osOwnerSaveAppearance();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetHealRate [string:Variable]',
            script: '  osSetHealRate();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osSetHealth [string:Variable]',
            script: '  osSetHealth();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osSetOwnerSpeed [string:Variable]',
            script: '  osSetOwnerSpeed();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osSetSpeed [string:Variable]',
            script: '  osSetSpeed();//  Erklaerung im Skript\n'
        },
		{
            label: 'osTeleportAgent [string:Variable]',
            script: '  osTeleportAgent();//  Erklaerung im Skript\n'
        },
		{
            label: 'osTeleportOwner [string:Variable]',
            script: '  osTeleportOwner();//  Erklaerung im Skript\n'
        }

     ]),

    functions: menu('NPCs', [
		{
            label: 'osIsNpc [string:Variable]',
            script: '  osIsNpc();//  Erklaerung im Skript\n'
        },
		{
            label: 'osNpcCreate [string:Variable]',
            script: '  osNpcCreate();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetNpcList [string:Variable]',
            script: '  osGetNpcList();//  Erklaerung im Skript\n'
        },
		{
            label: 'osNpcGetPos [string:Variable]',
            script: '  osNpcGetPos();//  Erklaerung im Skript\n'
        },
		{
            label: 'osNpcGetRot [string:Variable]',
            script: '  osNpcGetRot();//  Erklaerung im Skript\n'
        },
		{
            label: 'osNpcGetOwner [string:Variable]',
            script: '  osNpcGetOwner();//  Erklaerung im Skript\n'
        },
		{
            label: 'osNpcLoadAppearance [string:Variable]',
            script: '  osNpcLoadAppearance();//  Erklaerung im Skript\n'
        },
		{
            label: 'osNpcMoveTo [string:Variable]',
            script: '  osNpcMoveTo();//  Erklaerung im Skript\n'
        },
		{
            label: 'osNpcMoveToTarget [string:Variable]',
            script: '  osNpcMoveToTarget();//  Erklaerung im Skript\n'
        },
		{
            label: 'osNpcPlayAnimation [string:Variable]',
            script: '  osNpcPlayAnimation();//  Erklaerung im Skript\n'
        },
		{
            label: 'osNpcRemove [string:Variable]',
            script: '  osNpcRemove();//  Erklaerung im Skript\n'
        },
		{
            label: 'osNpcSaveAppearance [string:Variable]',
            script: '  osNpcSaveAppearance();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osNpcSay [string:Variable]',
            script: '  osNpcSay();//  Erklaerung im Skript\n'
        },
		{
            label: 'osNpcSayTo [string:Variable]',
            script: '  osNpcSayTo();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osNpcSetProfileAbout [string:Variable]',
            script: '  osNpcSetProfileAbout();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osNpcSetProfileImage [string:Variable]',
            script: '  osNpcSetProfileImage();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osNpcSetRot [string:Variable]',
            script: '  osNpcSetRot();//  Erklaerung im Skript\n'
        },
		{
            label: 'osNpcShout [string:Variable]',
            script: '  osNpcShout();//  Erklaerung im Skript\n'
        },
		{
            label: 'osNpcSit [string:Variable]',
            script: '  osNpcSit();//  Erklaerung im Skript\n'
        },
		{
            label: 'osNpcStand [string:Variable]',
            script: '  osNpcStand();//  Erklaerung im Skript\n'
        },
		{
            label: 'osNpcStopMoveToTarget [string:Variable]',
            script: '  osNpcStopMoveToTarget();//  Erklaerung im Skript\n'
        },
		{
            label: 'osNpcStopAnimation [string:Variable]',
            script: '  osNpcStopAnimation();//  Erklaerung im Skript\n'
        },
		{
            label: 'osNpcTouch [string:Variable]',
            script: '  osNpcTouch();//  Erklaerung im Skript\n'
        },
		{
            label: 'osNpcWhisper [string:Variable]',
            script: '  osNpcWhisper();//  Erklaerung im Skript\n'
        }
     ]),
	 
    functions: menu('Manipulation', [

		{
            label: 'osClearInertia [string:Variable]',
            script: '  osClearInertia();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osForceBreakAllLinks [string:Variable]',
            script: '  osForceBreakAllLinks();//  Erklaerung im Skript\n'
        },
		{
            label: 'osForceBreakLink [string:Variable]',
            script: '  osForceBreakLink();//  Erklaerung im Skript\n'
        },
		{
            label: 'osForceCreateLink [string:Variable]',
            script: '  osForceCreateLink();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetInertiaData [string:Variable]',
            script: '  osGetInertiaData();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osGetInventoryName [string:Variable]',
            script: '  osGetInventoryName();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osGetInventoryDesc [string:Variable]',
            script: '  osGetInventoryDesc();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetInventoryLastOwner [string:Variable]',
            script: '  osGetInventoryLastOwner();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osGetLastChangedEventKey [string:Variable]',
            script: '  osGetLastChangedEventKey();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osGetLinkNumber [string:Variable]',
            script: '  osGetLinkNumber();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osGetLinkPrimitiveParams [string:Variable]',
            script: '  osGetLinkPrimitiveParams();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osGetPrimitiveParams [string:Variable]',
            script: '  osGetPrimitiveParams();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetRezzingObject [string:Variable]',
            script: '  osGetRezzingObject();//  Erklaerung im Skript\n'
        },
		{
            label: 'osListenRegex [string:Variable]',
            script: '  osListenRegex();//  Erklaerung im Skript\n'
        },
		{
            label: 'osMessageAttachments [string:Variable]',
            script: '  osMessageAttachments();//  Erklaerung im Skript\n'
        },
		{
            label: 'osMessageObject [string:Variable]',
            script: '  osMessageObject();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetInertia [string:Variable]',
            script: '  osSetInertia();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osSetInertiaAsBox [string:Variable]',
            script: '  osSetInertiaAsBox();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osSetInertiaAsCylinder [string:Variable]',
            script: '  osSetInertiaAsCylinder();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osSetInertiaAsSphere [string:Variable]',
            script: '  osSetInertiaAsSphere();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osSetPrimitiveParams [string:Variable]',
            script: '  osSetPrimitiveParams();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetProjectionParams [string:Variable]',
            script: '  osSetProjectionParams();//  Erklaerung im Skript\n'
        },
		{
            label: 'osTeleportObject [string:Variable]',
            script: '  osTeleportObject();//  Erklaerung im Skript\n'
        }
     ]),
	 
    functions: menu('Drawing', [
		{
            label: 'osDrawEllipse [string:Variable]',
            script: '  osDrawEllipse();//  Erklaerung im Skript\n'
        },
		{
            label: 'osDrawFilledEllipse [string:Variable]',
            script: '  osDrawFilledEllipse();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osDrawFilledPolygon [string:Variable]',
            script: '  osDrawFilledPolygon();//  Erklaerung im Skript\n'
        },
		{
            label: 'osDrawFilledRectangle [string:Variable]',
            script: '  osDrawFilledRectangle();//  Erklaerung im Skript\n'
        },
		{
            label: 'osDrawImage [string:Variable]',
            script: '  osDrawImage();//  Erklaerung im Skript\n'
        },
		{
            label: 'osDrawLine [string:Variable]',
            script: '  osDrawLine();//  Erklaerung im Skript\n'
        },
		{
            label: 'osDrawPolygon [string:Variable]',
            script: '  osDrawPolygon();//  Erklaerung im Skript\n'
        },
		{
            label: 'osDrawRectangle [string:Variable]',
            script: '  osDrawRectangle();//  Erklaerung im Skript\n'
        },
		{
            label: 'osDrawResetTransform [string:Variable]',
            script: '  osDrawResetTransform();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'Os Erklaerung [string:Variable]',
            script: '  osDrawRotationTransform();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osDrawScaleTransform [string:Variable]',
            script: '  osDrawScaleTransform();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osDrawText [string:Variable]',
            script: '  osDrawText();//  Erklaerung im Skript\n'
        },
		{
            label: 'osDrawTranslationTransform [string:Variable]',
            script: '  osDrawTranslationTransform();//  Erklaerung im Skript\n'
        },  
		{
            label: 'osGetDrawStringSize [string:Variable]',
            script: '  osGetDrawStringSize();//  Erklaerung im Skript\n'
        },
		{
            label: 'osMovePen [string:Variable]',
            script: '  osMovePen();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetFontName [string:Variable]',
            script: '  osSetFontName();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetFontSize [string:Variable]',
            script: '  osSetFontSize();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetPenCap [string:Variable]',
            script: '  osSetPenCap();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetPenColor [string:Variable]',
            script: '  osSetPenColor();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetPenSize [string:Variable]',
            script: '  osSetPenSize();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetDynamicTextureData [string:Variable]',
            script: '  osSetDynamicTextureData();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetDynamicTextureDataBlend [string:Variable]',
            script: '  osSetDynamicTextureDataBlend();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetDynamicTextureDataBlendFace [string:Variable]',
            script: '  osSetDynamicTextureDataBlendFace();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetDynamicTextureDataFace [string:Variable]',
            script: '  osSetDynamicTextureDataFace();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osSetDynamicTextureURL [string:Variable]',
            script: '  osSetDynamicTextureURL();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetDynamicTextureURLBlend [string:Variable]',
            script: '  osSetDynamicTextureURLBlend();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetDynamicTextureURLBlendFace [string:Variable]',
            script: '  osSetDynamicTextureURLBlendFace();//  Erklaerung im Skript\n'
        }
     ]),

    functions: menu('Notecard', [
		{
            label: 'osGetNotecard [string:Variable]',
            script: '  osGetNotecard();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetNotecardLine [string:Variable]',
            script: '  osGetNotecardLine();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetNumberOfNotecardLines [string:Variable]',
            script: '  osGetNumberOfNotecardLines();//  Erklaerung im Skript\n'
        },
		{
            label: 'osMakeNotecard [string:Variable]',
            script: '  osMakeNotecard();//  Erklaerung im Skript\n'
        }
     ]),

    functions: menu('Sound', [
		{
            label: 'osAdjustSoundVolume: linknum [number:1] volume [string: 1.0]',
            script: '  osAdjustSoundVolume({{1}},{{2}}); //Adjust the volume of attached sound for a prim in a linkset.\n'
        }, 
		{
            label: 'osCollisionSound: sound [string:SomeSoundName] volume [string: 1.0]',
            script: '  osCollisionSound("{{1}}",{{2}}); //Sets collision sound to impact_sound with specified volume.\n'
        }, 
		{
            label: 'osLoopSound:linknum [number:1] [string:SomeSoundName] volume [string: 1.0]',
            script: '  osLoopSound({{1}},"{{2}}",{{3}});// Loop Sound Play, full volume = 1.0\n'
        }, 
		{
            label: 'osLoopSoundMaster linknum [number:1] [string:SomeSoundName] volume [string: 1.0]',
            script: '  osLoopSoundMaster({{1}},"{{2}}",{{3}});  //Play the specified sound at the specified volume and loop it indefinitely.\n'
        }, 
		{
            label: 'osLoopSoundSlave: linknum [number:1] [string:SomeSoundName] volume [string: 1.0]',
            script: '  osLoopSoundSlave({{1}},"{{2}}",{{3}});  //Play the specified sound at the specified volume and loop it indefinitely.\n'
        }, 
		{
            label: 'osPlaySound: linknum [number:1] [string:SomeSoundName] volume [string: 1.0]',
            script: '  osPlaySound({{1}},"{{2}}",{{3}}); //Play the specified sound once at the specified volume.\n'
        },  
		{
            label: 'osPlaySoundSlave: linknum [number:1] [string:SomeSoundName] volume [string: 1.0]',
            script: '  osPlaySoundSlave({{1}},"{{2}}",{{3}}); //Play the specified sound at the specified volume and loop it indefinitely.\n'
        }, 
		{
            label: 'osPreloadSound: linknum [number:1] [string:SomeSoundName]',
            script: '  osPreloadSound({{1}},"{{2}}");  //Preload the specified sound in viewers of nearby avatars.\n'
        }, 
		{
            label: 'osSetSoundRadius: linknum [number:1] radius[string: 1.0]',
            script: '  osSetSoundRadius({{1}},{{2}});  //Establishes a hard cut-off radius for audibility of scripted sounds (both attached and triggered) in the specified prim of a linkset.\n'
        }, 
		{
            label: 'osStopSound: linknum [number:1]',
            script: '  osStopSound({{1}}); //Stop the sound playing in the specified prim of a linkset. \n'
        }, 
		{
            label: 'osTriggerSound: linknum [number:1] [string:SomeSoundName] volume [string: 1.0]',
            script: '  osTriggerSound({{1}},"{{2}}",{{3}});  //Start playing the specified sound in the viewers of nearby avatars once at the specified volume. \n'
        }, 
		{
            label: 'osTriggerSoundLimited: linknum [number:1] [string:SomeSoundName] volume [string: 1.0] vector north east corner [string: <30,30,22>]  vector south west corner [string: <50,50,30>]',
            script: '  osTriggerSoundLimited({{1}},"{{2}}",{{3}},{{4}},{{5}});  //Start a one time play of the specified sound once at the specified volume in the viewers of avatars located within the box defined by the two vectors.\n'
        }
     ]),

    functions: menu('HTTP', [
		{
            label: 'osRequestSecureURL: [string:allowXss]',
            script: '  osRequestSecureURL([ "allowXss" ]);  //  Option supported :allowXss - Add Access-Control-Allow-Origin: to response header\n'
        },
		{
            label: 'osRequestURL: [string:allowXss]',
            script: '  osRequestURL([ "allowXss" ]);  //  Option supported :allowXss - Add Access-Control-Allow-Origin: to response header\n'
        },
		{
            label: 'osSetContentType: key [number:1] string [string:type]',
            script: '  osSetContentType({{1}},"{{2}}");  //  Sets an arbitrary content return type for an llRequestUrl()\n'
        }
     ]),
	 
    functions: menu('Parcel', [
		{
            label: 'osParcelJoin: vector start[string:<0.0, 0.0, 0.0>] vector end[string:<100.0, 100.0, 0.0>]',
            script: '  osParcelJoin({{1}},{{2}});  //  Joins two adjacent parcels within the same region. \n'
        },
		{
            label: 'osParcelSubdivide: vector start[string:<0.0, 0.0, 0.0>] vector end[string:<100.0, 100.0, 0.0>]',
            script: '  osParcelSubdivide({{1}},{{2}});//  Subdivides a parcel into two adjacent parcels within the same region.\n'
        },
		{
            label: 'osSetParcelDetails: vector pos[string:<0.0, 0.0, 0.0>] list rules[string:PARCEL_DETAILS_OWNER]',
            script: '  osSetParcelDetails({{1}},{{2}});//  This function is the counterpart to llGetParcelDetails\n'
        }
     ]),
    functions: menu('Terrain', [

		{
            label: 'osGetTerrainHeight [string:Variable]',
            script: '  osGetTerrainHeight();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetTerrainHeight [string:Variable]',
            script: '  osSetTerrainHeight();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetTerrainTexture [string:Variable]',
            script: '  osSetTerrainTexture();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetTerrainTextureHeight [string:Variable]',
            script: '  osSetTerrainTextureHeight();//  Erklaerung im Skript\n'
        },
		{
            label: 'osTerrainFlush [string:Variable]',
            script: '  osTerrainFlush();//  Erklaerung im Skript\n'
        }
     ]), 

    functions: menu('WindLight', [
		{
            label: 'osGetCurrentSunHour [string:Variable]',
            script: '  osGetCurrentSunHour();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetSunParam [string:Variable]',
            script: '  osGetSunParam();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetWindParam [string:Variable]',
            script: '  osGetWindParam();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetEstateSunSettings [string:Variable]',
            script: '  osSetEstateSunSettings();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetRegionSunSettings [string:Variable]',
            script: '  osSetRegionSunSettings();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osSetRegionWaterHeight [string:Variable]',
            script: '  osSetRegionWaterHeight();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetSunParam [string:Variable]',
            script: '  osSetSunParam();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetWindParam [string:Variable]',
            script: '  osSetWindParam();//  Erklaerung im Skript\n'
        },
		{
            label: 'osWindActiveModelPluginName [string:Variable]',
            script: '  osWindActiveModelPluginName();//  Erklaerung im Skript\n'
        }
     ]),

    functions: menu('GridRegion', [
		{
            label: 'osCheckODE [string:Variable]',
            script: '  osCheckODE();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetGridCustom [string:Variable]',
            script: '  osGetGridCustom();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetGridGatekeeperURI [string:Variable]',
            script: '  osGetGridGatekeeperURI();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetGridHomeURI [string:Variable]',
            script: '  osGetGridHomeURI();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetGridLoginURI [string:Variable]',
            script: '  osGetGridLoginURI();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetGridName [string:Variable]',
            script: '  osGetGridName();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetGridNick [string:Variable]',
            script: '  osGetGridNick();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetMapTexture [string:Variable]',
            script: '  osGetMapTexture();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetPhysicsEngineName [string:Variable]',
            script: '  osGetPhysicsEngineName();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetPhysicsEngineType [string:Variable]',
            script: '  osGetPhysicsEngineType();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osGetRegionMapTexture [string:Variable]',
            script: '  osGetRegionMapTexture();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetRegionSize [string:Variable]',
            script: '  osGetRegionSize();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetRegionStats [string:Variable]',
            script: '  osGetRegionStats();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetScriptEngineName [string:Variable]',
            script: '  osGetScriptEngineName();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetSimulatorMemory [string:Variable]',
            script: '  osGetSimulatorMemory();//  Erklaerung im Skript\n'
        },
		{
            label: 'osGetSimulatorMemoryKB [string:Variable]',
            script: '  osGetSimulatorMemoryKB();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osGetSimulatorVersion [string:Variable]',
            script: '  osGetSimulatorVersion();//  Erklaerung im Skript\n'
        },
		{
            label: 'osLoadedCreationDate [string:Variable]',
            script: '  osLoadedCreationDate();//  Erklaerung im Skript\n'
        },
		{
            label: 'osLoadedCreationID [string:Variable]',
            script: '  osLoadedCreationID();//  Erklaerung im Skript\n'
        },
		{
            label: 'osLoadedCreationTime [string:Variable]',
            script: '  osLoadedCreationTime();//  Erklaerung im Skript\n'
        }
     ]),

    functions: menu('Administration', [
		{
            label: 'osConsoleCommand [string:Variable]',
            script: '  osConsoleCommand();//  Erklaerung im Skript\n'
        },
		{
            label: 'osRegionNotice [string:Variable]',
            script: '  osRegionNotice();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osRegionRestart [string:Variable]',
            script: '  osRegionRestart();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetParcelMediaURL [string:Variable]',
            script: '  osSetParcelMediaURL();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetParcelSIPAddress [string:Variable]',
            script: '  osSetParcelSIPAddress();//  Erklaerung im Skript\n'
        },
		{
            label: 'osSetPrimFloatOnWater [string:Variable]',
            script: '  osSetPrimFloatOnWater();//  Erklaerung im Skript\n'
        }
     ]),

    functions: menu('Permissions', [
		{
            label: 'osGrantScriptPermissions: allowed_key[number:1] function[string:Variable]',
            script: '  osGrantScriptPermissions({{1}},"{{2}}"); //  Dynamically allow ossl execution to owner/creator/group by function name.\n'
        },
		{
            label: 'osRevokeScriptPermissions: revoked_key[number:1] function[string:Variable]',
            script: '  osRevokeScriptPermissions({{1}},"{{2}}"); //  Dynamically allow/disallow ossl execution to owner/creator/group by function name.\n'
        }
     ]),

    functions: menu('String', [
		{
            label: 'osFormatString format[string:format] params[string:params]',
            script: '  osFormatString("{{1}}","{{2}}"); //  Return the string with parameters substituted into it.\n'
        },
		{
            label: 'osMatchString [string:Variable]',
            script: '  osMatchString();//  Erklaerung im Skript\n'
        },
		{
            label: 'osRegexIsMatch [string:Variable]',
            script: '  osRegexIsMatch();//  Erklaerung im Skript\n'
        },
		{
            label: 'osReplaceString [string:Variable]',
            script: '  osReplaceString();//  Erklaerung im Skript\n'
        },
		{
            label: 'osStringSubString [string:Variable]',
            script: '  osStringSubString();//  Erklaerung im Skript\n'
        },
		{
            label: 'osStringStartsWith [string:Variable]',
            script: '  osStringStartsWith();//  Erklaerung im Skript\n'
        },  
		{
            label: 'osStringEndsWith [string:Variable]',
            script: '  osStringEndsWith();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osStringIndexOf [string:Variable]',
            script: '  osStringIndexOf();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osStringLastIndexOf [string:Variable]',
            script: '  osStringLastIndexOf();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osStringRemove [string:Variable]',
            script: '  osStringRemove();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osStringReplace [string:Variable]',
            script: '  osStringReplace();//  Erklaerung im Skript\n'
        }
     ]),

    functions: menu('Misc', [
		{
            label: 'osAngleBetween [string:Variable]',
            script: '  osAngleBetween();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osApproxEquals [string:Variable]',
            script: '  osApproxEquals();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osDie',
             slot: false,
            script: '  osDie(); // Program and primitive will disappear\n'
        }, 
		{
            label: 'osIsUUID [string:Variable]',
            script: '  osIsUUID();//  Erklaerung im Skript\n'
        },
		{
            label: 'osKey2Name [string:Variable]',
            script: '  osKey2Name();//  Erklaerung im Skript\n'
        },
		{
            label: 'osList2Double [string:Variable]',
            script: '  osList2Double();//  Erklaerung im Skript\n'
        },
		{
            label: 'osMax [string:Variable]',
            script: '  osMax();//  Erklaerung im Skript\n'
        },
		{
            label: 'osMin [string:Variable]',
            script: '  osMin();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osRound [string:Variable]',
            script: '  osRound();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osUnixTimeToTimestamp [string:Variable]',
            script: '  osUnixTimeToTimestamp();//  Erklaerung im Skript\n'
        },
		{
            label: 'osVecDistSquare [string:Variable]',
            script: '  osVecDistSquare();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osVecMagSquare [string:Variable]',
            script: '  osVecMagSquare();//  Erklaerung im Skript\n'
        }, 
		{
            label: 'osVolumeDetect [string:Variable]',
            script: '  osVolumeDetect();//  Erklaerung im Skript\n'
        }  
     ])
	
	 
 };

})();