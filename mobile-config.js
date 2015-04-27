App.info({
    name: 'UniTimelister',
    description: 'En enkel app for registrering av timer',
    author: 'Armaz Mellati',
    email: 'armaz@uninett.no',
    website: 'http://unitimelister.meteor.com',
    version: '0.0.1'
});

App.icons({
    // iOS
    'iphone': 'resources/iphone/appicon-60.png',
    'iphone_2x': 'resources/iphone/appicon-60@2x.png',
    //'ipad': 'resources/icons/icon-72x72.png',
    //'ipad_2x': 'resources/icons/icon-72x72@2x.png',

    // Android
    'android_mdpi':  'resources/icons/mipmap-mdpi/ic_launcher.png',
    'android_hdpi':  'resources/icons/mipmap-hdpi/ic_launcher.png',
    'android_xhdpi': 'resources/icons/mipmap-xhdpi/ic_launcher.png'
});

App.launchScreens({
    // iOS
    'iphone': 'resources/iphone/Default.png',
    'iphone_2x': 'resources/iphone/Default@2x.png',
    'iphone5': 'resources/iphone/Default-568h@2x.png',
    //'ipad_portrait': 'resources/splash/splash-768x1024.png',
    //'ipad_portrait_2x': 'resources/splash/splash-768x1024@2x.png',
    //'ipad_landscape': 'resources/splash/splash-1024x768.png',
    //'ipad_landscape_2x': 'resources/splash/splash-1024x768@2x.png',

    // Android
    'android_ldpi_portrait':   'resources/android/splash/res-long-port-ldpi/default.png',
    'android_ldpi_landscape':  'resources/android/splash/res-long-land-ldpi/default.png',
    'android_mdpi_portrait':   'resources/android/splash/res-long-port-mdpi/default.png',
    'android_mdpi_landscape':  'resources/android/splash/res-long-land-mdpi/default.png',
    'android_hdpi_portrait':   'resources/android/splash/res-long-port-hdpi/default.png',
    'android_hdpi_landscape':  'resources/android/splash/res-long-land-hdpi/default.png',
    'android_xhdpi_portrait':  'resources/android/splash/res-long-port-xhdpi/default.png',
    'android_xhdpi_landscape': 'resources/android/splash/res-long-land-xhdpi/default.png'
});

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#000000');

App.configurePlugin("org.apache.cordova.media");
App.configurePlugin("org.apache.cordova.device");
App.accessRule("*");