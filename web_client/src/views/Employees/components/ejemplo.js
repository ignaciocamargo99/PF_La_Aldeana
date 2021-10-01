const { UareU, CONSTANTS } = require('uareu-node'); // Import
const uareu = UareU.getInstance(); // Get a unique instance of library handler.
let reader; // Create a variable to keep the reader handle after 'open' the device.

// Probably the code below will also work for you.
uareu.loadLibs() // Load libs
    .then(() => uareu.dpfpddInit()) // Init libs
    .then(() => uareu.dpfpddQueryDevices()) // Search reader devices connected
    .then((res) => uareu.dpfpddOpen(res.devicesList[0])) // 'Open' the reader device, it's needed for use others functions like: dpfpddCaptureAsync
    .then((res) => { if (res) reader = res }) // Set reader variable
    .catch((err) => { throw err; });

// After this initial configuration you can create some functions to capture a fingerprint, identify it, compare it and etc...
// Note: Identify and Compare are different, the main diference between it are: - Compare only compares two fingerprints;  - Identify compares a fingerprint against a list of fingerprints;

uareu.dpfpddCaptureAsync(reader, CONSTANTS.DPFPDD_IMAGE_FMT.DPFPDD_IMG_FMT_ANSI381, CONSTANTS.DPFPDD_IMAGE_PROC.DPFPDD_IMG_PROC_DEFAULT, (data, dataSize) => {
    // Here you receive the data of a fingerprint image data (FID)
    // Before compare it, you need to generate a fingerprint minutie data (FMD)
    uareu.dpfjCreateFmdFromFid(data, CONSTANTS.DPFJ_FMD_FORMAT.DPFJ_FMD_ANSI_378_2004)
    .then((res) => {
        // Here you receive the FMD and then you can compare it, save it to compare with the next fingerprint, identify it with a database, etc...
        return uareu.dpfjIdentify(res, [FMD LIST]);
    })
    .then((res) => {
        // Finger was identified or not? The answer you get here.
    })
    .catch((err) => console.log(err));
});