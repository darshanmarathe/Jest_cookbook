const { createAnalyser } = require('./Utils');
const AppConf = require('./__mock__/appconf')

const BUFFER_SIZE = AppConf.volumeIndicator.bufferSize;
const CHECK_RATE = AppConf.volumeIndicator.checkRate;

const MUTE_THRESHOLD = AppConf.volumeIndicator.muteThreshold;
const LOW_THRESHOLD = AppConf.volumeIndicator.lowThreshold;

const SOUND_THRESHOLD = AppConf.volumeIndicator.soundThreshold;

const MUTE_EVENT = 'mute';
const LOW_EVENT = 'low';
const HIGH_EVENT = 'high';

/**
 * Accepts a stream and emits events for the volume of the audio detected. Events are only emitted when the current
 * volume state changes. Following are the emitted events.
 *
 * high - Volume is high
 * low - Volume is low
 * mute - no volume has been detected on the stream yet
 */
 class VolumeIndicator {
  // Stream management
  stream = null;
  analyser = null;
  interval = undefined;

  // Listeners
  lowHighListener = null;
  soundListener = null;

  // Low High Listener
  delay = null;
  streak = null;
  current = null;
  last = null;
  muted = null;

  /**
   * Creates a new Volume Indicator
   *
   * @param {MediaStream} stream Audio stream to tap into.
   */
  constructor(stream) {
    this.stream = stream;
    this.analyser = createAnalyser(stream, BUFFER_SIZE);
  }

  /**
   * Sets a listener that responds to detect when a user is constantly speaking and stops. Events are only sent when
   * the user changes from talking to not talking and not talking to talking.
   *
   * Events:
   * - 'MUTE': The customer has not spoken whatsoever
   * - 'LOW': The customer has spoken but is now quiet
   * - 'HIGH': The customer is speaking
   *
   * @param {function} listener
   * @param {number} delayTime Approximate amount of seconds to wait before emitting a lower volume event.
   */
  setLowHighListener(listener, delayTime) {
    this.lowHighListener = listener;
    this.streak = 0;
    this.current = MUTE_EVENT;
    this.last = '';
    this.muted = true;
    this.delay = Math.ceil((delayTime * 1000) / CHECK_RATE);
  }

  /**
   * Sends events on a periodic fashion indicating if there was a sound since the last event.
   *
   * Events:
   * - true: There was a sound
   * - false: There was not a sound
   *
   * @param {function} listener
   */
  setSoundListener(listener) {
    this.soundListener = listener;
  }

  /**
   * Stop emitting events.
   */
  stop() {
    clearInterval(this.interval);
  }

  /**
   * Start emitting events.
   */
  start() {
    let indicator = this;
    this.interval = setInterval(() => {
      indicator._check();
    }, CHECK_RATE);
  }

  /**
   * @private
   */
  _check() {
    let dataArray = new Uint8Array(BUFFER_SIZE);
    this.analyser.getByteTimeDomainData(dataArray);
    let x = _calculateAvgVariance(dataArray);
    if (this.lowHighListener) {
      this._checkLowHighEvent(x);
    }
    if (this.soundListener) {
      this._checkSoundEvent(x);
    }
  }

  _checkLowHighEvent(x) {
    switch (x) {
      case x < MUTE_THRESHOLD:
        if (this.muted) {
          this._muteEvent();
        } else {
          this._lowEvent();
        }
        break;
      case x < LOW_THRESHOLD:
        if (this.muted) {
          this.muted = false;
          this.streak = 0;
        }
        this._lowEvent();
        break;
      default:
        if (this.muted) {
          this.muted = false;
          this.streak = 0;
        }
        this._highEvent();
    }
  }

  _checkSoundEvent(x) {
    if (x < SOUND_THRESHOLD) {
      this.soundListener({ hasSound: false, interval: CHECK_RATE });
    } else {
      this.soundListener({ hasSound: true, interval: CHECK_RATE });
    }
  }

  /**
   * @private
   */
  _muteEvent() {
    this.streak++;
    if (this.streak === this.delay) {
      this._sendLowHighEvent(MUTE_EVENT);
    }
  }

  /**
   * @private
   */
  _lowEvent() {
    if (this.current === HIGH_EVENT) {
      this.current = LOW_EVENT;
      this.streak = 1;
    } else {
      this.streak++;
    }
    if (this.streak === this.delay) {
      this._sendLowHighEvent(LOW_EVENT);
    }
  }

  /**
   * @private
   */
  _highEvent() {
    if (this.current !== HIGH_EVENT) {
      this.current = HIGH_EVENT;
      this.streak = 0;
      this._sendLowHighEvent(HIGH_EVENT);
    } else {
      this.streak++;
    }
  }

  /**
   * @private
   */
  _sendLowHighEvent(event) {
    if (event !== this.last) {
      this.listener(event);
      this.last = event;
    }
  }
}

/**
 * calculates the average variance over the data array.
 *
 * @param dataArray The data array to check
 * @returns {number} The average variance
 */
function _calculateAvgVariance(dataArray) {
  let total = 0;
  let bufferLength = dataArray.byteLength;

  for (let i = 0; i < bufferLength; i++) {
    total += Math.abs(dataArray[i] - 127);
  }
  return total / bufferLength;
}


module.exports = {
  VolumeIndicator
}