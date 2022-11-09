const AppConf = {
  firstNameCookie : "firstNameCookie",
  defaultRedirectURL : "http://google.com"
}
/**
 * Creates a new audio analyser from the given audio stream.
 *
 * @param {MediaStream} stream Audio stream to create analyser from.
 * @param {number} lookbackSize The amount of bytes of audio from current to analyze at once. Must be a power of 2
 * @returns {AnalyserNode} A new audio analyser
 */
  function createAnalyser(stream, lookbackSize) {
    let source;
  
    var AudioContext =
      window.AudioContext || // Default
      window.webkitAudioContext || // Safari and old versions of Chrome
      false;
  
    if (AudioContext) {
      source = new AudioContext().createMediaStreamSource(stream);
      /* eslint-disable no-undef */
    } else {
      throw 'Web Audio API not supported!';
    }
  
    let analyser = source.context.createAnalyser();
    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;
    analyser.smoothingTimeConstant = 0.85;
    analyser.fftSize = lookbackSize;
  
    source.connect(analyser);
    return analyser;
  }
  

  async function getCookies(cookie, vm) {
    if (vm) {
      return vm.$cookies.get(cookie);
    } else {
      return this.$cookies.get(cookie);
    }
  }

   function setVXfirstNameCookie(vm, firstName) {
    vm.$cookies.remove(AppConf.firstNameCookie);
    vm.$cookies.set(AppConf.firstNameCookie, firstName);
  }

  function fetchVXfirstNameCookie(vm) {
    let cookie;
    try {
      cookie = getCookies(AppConf.firstNameCookie, vm);
      if (!cookie) {
       // debugLog(`Cookie '${AppConf.firstNameCookie}' could not be fetched!`);
        window.location.href = AppConf.defaultRedirectURL;
      }
    } catch (e) {
      // debugLog(`Fetch cookie '${AppConf.firstNameCookie}' failed: ${e.toString()}`);
      window.location.href = AppConf.defaultRedirectURL;
    }
    return cookie;
  }
  
  

  module.exports = {
    createAnalyser,
    setVXfirstNameCookie,
    fetchVXfirstNameCookie
  }

