# OnPoint
This is a capstone project of Master of Engineering program at UCBerkeley. We are aiming to build an ios application that can help patients keep in track of their health condition and more effeciently communicate with their care-giving team. There are five main modules of this application : Medications, Measurements, Appointments, Symptoms and Goals.

## Resources feature
The Resources tab uses the Dropbox API to programmatically load all folders and files located in a Dropbox folder, shared with Dmitri and Sarah. NOTE: The
resources/index.html displays only folders. Clicking on a folder will take you to resources/show.html view which can be a combination of files and folders. Clicking on a folder will, again, display resources/show.html with contents of the new folder. Clicking on a file will take you to the "download" page where the user can copy the download link or click the Download button to download the file.

Keep this structure in mind when you're adding/modifying files in this directory.

## Running iOS simulator
You can run the app in an iOS simulator. First, figure out your available options by running `ios-sim showdevicetypes` and then running `ionic run ios --target="iPad-Air" -l -c`

### Issue 1: Simulator loads with a blank screen
Run with `-l -c` flags to ensure you have livereload and console running.

## Running Android simulator
Make sure you have these variables set:
```
ANDROID_HOME=/Applications/adt-bundle-mac-x86_64-20140702/sdk
JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_111.jdk/Contents/Home
```

and that you have GenyMotion installed. Run GenyMotion, click Settings, choose
ADB, and click "Use Custom Android SDK Tools" and input
```
/Applications/adt-bundle-mac-x86_64-20140702/sdk
```

Then run GenyMotion device, and then `ionic run android` in console.


## Installing npm
Clear the cache for npm: https://stackoverflow.com/questions/37914824/cordova-not-updating-to-latest-version

## Authors
Angela Hsueh ([angela.hsueh@berkeley.edu](mailto:angela.hsueh@berkeley.edu))  
Bill Kim ([bkim54@berkeley.edu](mailto:bkim54@berkeley.edu))    
Hansen Liu ([hliu@berkeley.edu](mailto:hliu@berkeley.edu))    
Zhuosi Wang ([zhuosi.wang@berkeley.edu](mailto:zhuosi.wang@berkeley.edu))
Dmitri Skjorshammer([dmitriskj@gmail.com](mailto:dmitriskj@gmail.com))  
