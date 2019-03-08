# Scriptastic
Scripting for Opensim on a web page - Like Scratch, but with no download needed

Testing insert OSSL.


# GET STARTED

* open default.html in your browser


# NOTES

* Scriptastic is based on the Waterbear project - http://waterbearlang.com
* index.html - contains the main interface
* scripts/raphael_demo.js  - contains the Block Definition & Syntax
* stylesheets/blocks.css - contains the Block shapes
* stylesheets/raphael_demo.css  - contains the Block & Boarder colors

# TODO
Step 1 Insert all ossl OK

Step 2 Insert all Parameters for
      Avatars
      NPCs
      Prim Manipulation
      Prim Drawing / Dynamic Texture
      Notecard
      Sound
      HTTP
      Parcel
      Terrain
      WindLight
      Grid / Region Information
      Administration
      Script Permissions
      String Functions
      Misc
      


# Inserts

// Avatars

osAgentSaveAppearance
osAvatarName2Key
osAvatarPlayAnimation
osAvatarStopAnimation
osCauseDamage
osCauseHealing
osDetectedCountry 
osDropAttachment
osDropAttachmentAt
osEjectFromGroup
osForceAttachToAvatar
osForceAttachToAvatarFromInventory
osForceAttachToOtherAvatarFromInventory
osForceDetachFromAvatar
osForceDropAttachment
osForceDropAttachmentAt
osForceOtherSit
osGetAgentIP 
osGetAgents
osGetAgentCountry 
osGetAvatarHomeURI
osGetAvatarList
osGetGender
osGetHealRate 
osGetHealth
osGetNumberOfAttachments
osInviteToGroup
osKickAvatar 
osOwnerSaveAppearance
osSetHealRate 
osSetHealth 
osSetOwnerSpeed 
osSetSpeed
osTeleportAgent
osTeleportOwner 

// NPCs

osIsNpc
osNpcCreate
osGetNpcList 
osNpcGetPos
osNpcGetRot
osNpcGetOwner
osNpcLoadAppearance
osNpcMoveTo
osNpcMoveToTarget
osNpcPlayAnimation
osNpcRemove
osNpcSaveAppearance 
osNpcSay
osNpcSayTo 
osNpcSetProfileAbout 
osNpcSetProfileImage 
osNpcSetRot
osNpcShout
osNpcSit
osNpcStand
osNpcStopMoveToTarget
osNpcStopAnimation
osNpcTouch
osNpcWhisper 

// Prim Manipulation

osClearInertia 
osForceBreakAllLinks
osForceBreakLink
osForceCreateLink
osGetInertiaData 
osGetInventoryName 
osGetInventoryDesc
osGetInventoryLastOwner 
osGetLastChangedEventKey 
osGetLinkNumber 
osGetLinkPrimitiveParams 
osGetPrimitiveParams
osGetRezzingObject
osListenRegex
osMessageAttachments
osMessageObject
osSetInertia 
osSetInertiaAsBox 
osSetInertiaAsCylinder 
osSetInertiaAsSphere 
osSetPrimitiveParams
osSetProjectionParams
osTeleportObject  

// Prim Drawing / Dynamic Texture

osDrawEllipse
osDrawFilledEllipse 
osDrawFilledPolygon
osDrawFilledRectangle
osDrawImage
osDrawLine
osDrawPolygon
osDrawRectangle
osDrawResetTransform 
osDrawRotationTransform 
osDrawScaleTransform 
osDrawText
osDrawTranslationTransform  
osGetDrawStringSize
osMovePen
osSetFontName
osSetFontSize
osSetPenCap
osSetPenColor
osSetPenSize
osSetDynamicTextureData
osSetDynamicTextureDataBlend
osSetDynamicTextureDataBlendFace
osSetDynamicTextureDataFace 
osSetDynamicTextureURL
osSetDynamicTextureURLBlend
osSetDynamicTextureURLBlendFace 

// Notecard

osGetNotecard
osGetNotecardLine
osGetNumberOfNotecardLines
osMakeNotecard 

// Sound

osAdjustSoundVolume 
osCollisionSound 
osLoopSound 
osLoopSoundMaster 
osLoopSoundSlave 
osPlaySound  
osPlaySoundSlave 
osPreloadSound 
osSetSoundRadius 
osStopSound 
osTriggerSound 
osTriggerSoundLimited  

// HTTP

osRequestSecureURL
osRequestURL
osSetContentType 

// Parcel

osParcelJoin
osParcelSubdivide
osSetParcelDetails 

// Terrain

osGetTerrainHeight
osSetTerrainHeight
osSetTerrainTexture
osSetTerrainTextureHeight
osTerrainFlush 

// WindLight

osGetCurrentSunHour
osGetSunParam
osGetWindParam
osSetEstateSunSettings
osSetRegionSunSettings 
osSetRegionWaterHeight
osSetSunParam
osSetWindParam
osWindActiveModelPluginName 

// Grid / Region Information

osCheckODE
osGetGridCustom
osGetGridGatekeeperURI
osGetGridHomeURI
osGetGridLoginURI
osGetGridName
osGetGridNick
osGetMapTexture
osGetPhysicsEngineName 
osGetPhysicsEngineType 
osGetRegionMapTexture
osGetRegionSize
osGetRegionStats
osGetScriptEngineName
osGetSimulatorMemory
osGetSimulatorMemoryKB 
osGetSimulatorVersion
osLoadedCreationDate
osLoadedCreationID
osLoadedCreationTime 

// Administration

osConsoleCommand
osRegionNotice 
osRegionRestart
osSetParcelMediaURL
osSetParcelSIPAddress
osSetPrimFloatOnWater 

// Script Permissions (Pending Peer Review)

osGrantScriptPermissions
osRevokeScriptPermissions 

// String Functions

osFormatString
osMatchString
osRegexIsMatch
osReplaceString
osStringSubString 
osStringStartsWith  
osStringEndsWith 
osStringIndexOf 
osStringLastIndexOf 
osStringRemove 
osStringReplace  

// Misc

osAngleBetween 
osApproxEquals 
osDie 
osIsUUID
osKey2Name
osList2Double
osMax
osMin 
osRound 
osUnixTimeToTimestamp
osVecDistSquare 
osVecMagSquare 
osVolumeDetect  

