
/*
Object.prototype.getNameX = function() {
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec((this).constructor.toString());
    return (results && results.length > 1) ? results[1] : "";
};
*/
getDaysUrl= function getDaysUrl(m){
    //console.log("got this moment : "+m);
    var url="/w/"+m.week()+"/d/"+m.day();
    return url;
}

scrollToElement=function(el,ms){
    var speed = (ms) ? ms : 600;
    $('html,body').animate({
        scrollTop: $(el).offset().top
    }, speed);
}

var html5_audiotypes={ //define list of audio file extensions and their associated audio types. Add to it if your specified audio file isn't on this list:
    "mp3": "audio/mpeg",
    "mp4": "audio/mp4",
    "ogg": "audio/ogg",
    "wav": "audio/wav"
}

mediaError = function(e){
    console.log("Faen, feilet med å lage Media :"+JSON.stringify(e));
}


mediaSuccess = function(e){
    console.log("Media playing :)");
}

getSoundUri = function(sound){
    console.log("App Path: "+window.location.pathname);
    if(device.platform.toLowerCase() === "android") {
        return "/android_asset/www/application/sound/" + sound;
    }else{
        return "/sound/"+sound;
    }
    
}

createsoundbite=function (sound){
    console.log("Er i createsoundbite : "+sound);
    if (Meteor.isCordova){
        console.log("Er i cordova ");
        var uri=getSoundUri(sound);
        console.log("SoundUri ="+uri);
        var media = new Media(uri, mediaSuccess, mediaError);
        media.play();
        return {playclip:function(){console.log("fake-playclip")}}
    }else{
        var html5audio=document.createElement('audio')
        if (html5audio.canPlayType){ //check support for HTML5 audio
            for (var i=0; i<arguments.length; i++){
                var sourceel=document.createElement('source')
                sourceel.setAttribute('src', '/sound/'+arguments[i])
                if (arguments[i].match(/\.(\w+)$/i))
                    sourceel.setAttribute('type', html5_audiotypes[RegExp.$1])
                html5audio.appendChild(sourceel)
            }
            html5audio.load()
            html5audio.playclip=function(){
                html5audio.pause()
                html5audio.play()
            }
            return html5audio
        }
        else{
            return {playclip:function(){throw new Error("Your browser doesn't support HTML5 audio unfortunately")}}
        }
    }
}


playAudio=function (id) {
    var audioElement = document.getElementById(id);
    var url = audioElement.getAttribute('src');
    console.log("soundurl="+url);

    var my_media = new Media(url,
        // success callback
        function () { console.log("playAudio():Audio Success"); },
        // error callback
        function (err) { console.log("playAudio():Audio Error: " + err); }
    );
    // Play audio
    //my_media.play();
}


pageTransition = function (element,transitionOut,transitionIn){
    var node=$(element);
    //transitionOut=$("#dayView").data('transition-out');
    //console.log('data-transition-out: ' + transitionOut);
    $(node).addClass('transition-out ' + transitionOut);

    animationDuration = calculateAnimationDuration(node);

    Meteor.setTimeout(function() {
        $(node).removeClass('transition-out ' + transitionOut);
        //$(node).remove();
        //Inn Fase
        //transitionIn=$(node).data('transition-in');
        console.log('data-transition-in: ' + transitionIn);
        $(node).addClass('transition-in ' + transitionIn);

        animationDuration = calculateAnimationDuration(node);

        Meteor.setTimeout(function() {
            $(node).removeClass('transition-in ' + transitionIn);
            if (transitionIn) transitionIn = '';
        }, animationDuration);



        if (transitionOut) transitionOut = '';
    }, animationDuration);

}
