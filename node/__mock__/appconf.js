'use strict';

const conf = {
  tokenEndpointEnabled: 'dummyTokenEndpointEnabled',
  defaultRedirectURL: 'dummyDefaultRedirectURL',
  customerApiUrl: 'dummyCustomerApiUrl',
  passthroughApiUrl: 'dummyPassthroughApiUrl',
  staticApiUrl: 'dummyStaticApiUrl',
  ecsUrl: 'dummyEcsUrl',
  isProd: false,
  uiLogForwarding: false,
  defaultAuthSuccessRedirect: 'dummyDefaultAuthSuccessRedirect',
  ensightenChannelDefault: 'dummyEnsightenChannelDefault',
  piSecurityWidgetHost: 'dummyPiSecurityWidgetHost',
  twoFAScriptSource: 'dummyTwoFAScriptSource',
  defaultTitle: 'dummyDefaultTitle',
  errorRedirect: 'dummyErrorRedirect',
  trackingIdKeyName: 'dummyTrackingIdKeyName',
  appId: 'dummyAppId',
  enableMockEntryPages: 'dummyEnableMockEntryPages',
  ecaap: {
    baseUrl: 'dummyPassthroughApiUrl',
    appId: 'dummyAppId',
    appName: 'dummyAppName'
  },
  reset: {
    appName: 'dummyAppName',
    appId: 'dummyResetAppId',
    errorMap: {
      default: {
        forceExit: true,
        message: 'defaultMessage'
      },
      1450: {
        message: 'Password has been used before.',
        forceExit: false
      }
    },
    ecsErrorMap: {
      default: '2000',
      1450: '2001'
    },
    voiceXErrorMap: {
      default: {
        message: 'defaultMessage',
        forceExit: true
      },
      2000: {
        message: 'dummyMessage',
        forceExit: false
      }
    },
    requireQueryParams: false,
    defaultAppId: 'dummyResetDefaultAppId',
    defaultSuccessRedirect: 'dummyResetDefaultSuccessRedirect',
    defaultFailRedirect: 'dummyResetDefaultFailRedirect',
    defaultTitle: 'dummyDefaultTitle'
  },
  eReview: {
    authentication: 'dummyAuthentication',
    enrollment: 'dummyEnrollment',
    passreset: 'dummyPassreset'
  },
  enroll: {
    requireQueryParams: false,
    twofa: true,
    defaultAppId: 'dummyDefaultAppId',
    defaultSuccessRedirect: 'dummyDefaultSuccessRedirect',
    defaultFailRedirect: 'dummyDefaultFailRedirect',
    defaultTitle: 'dummyDefaultTitle',
    surveyUrl: 'dummySurveyUrl'
  },
  otp: {
    appId: 'dummyOTPAppId',
    defaultAppId: 'dummyOtpDefaultAppId',
    defaultSuccessRedirect: 'dummyOtpDefaultSuccessRedirect',
    defaultFailRedirect: 'dummyOtpDefaultFailRedirect',
    defaultTitle: 'dummyOtpDefaultTitle'
  },
  params: {
    title: 'dummyTitleParam',
    appId: 'dummyAppIdParam',
    failureRedirect: 'dummyFailParam',
    successRedirect: 'dummySuccessParam',
    ensightenChannel: 'dummyEnsightenParam'
  },
  paths: {
    enrollmentCapture: '/ftgw/digital/voicexp/enrollment/capture',
    enrollmentIntro: '/ftgw/digital/voicexp/enrollment/intro',
    enrollmentAbandon: '/prgw/digital/voicexp/abandon/enroll',
    enrollment: '/ftgw/digital/voicexp/enrollment',
    enrollmentEntry: '/prgw/digital/voicexp/entry/enroll',
    reset: '/ftgw/digital/voicexp/passreset',
    resetEntry: '/prgw/digital/voicexp/entry/passreset',
    otp: '/ftgw/digital/voicexp/otp',
    otpEntry: '/prgw/digital/voicexp/entry/otp',
    auth: '/prgw/digital/voicexp/auth',
    stepup: '/prgw/digital/voicexp/internal/stepup',
    error: '/prgw/digital/voicexp/error'
  },
  maxTimeout: 5555,
  vaAppId: 'dummyVaAppId',
  cookieExpiresMs: 900000,
  cookieName: 'dummyCookieName',
  cookieNamePReset: 'dummyPRCookieName',
  firstNameCookie: 'dummyFirstnameCookie',
  ensighten: 'dummyEnsighten',
  volumeIndicator: {
    checkRate: 200,
    bufferSize: 512,
    lowThreshold: 0,
    muteThreshold: 0
  },
  maxVerifyAttempts: 3,
  maxEnrollAttempts: 3,
  ensightenExperienceTags: {
    passReset: 'dummyPassReset',
    login: 'dummyAuthenticate',
    stepUp: 'dummyStepUp'
  },
  loginVerifyContent: {
    intro: 'dummyIntro',
    errorGeneral: 'dummyError',
    errorNoMic: 'dummyNoMic',
    errorMicNice: 'dummyMicNice',
    errorMicAssertive: 'dummyMicAssertive',
    errorMicMuted: 'dummyMuted',
    errorMicLow: 'dummyLow',
    promptWaitTime: 1000,
    promptIntro: 'dummyPromptIntro',
    exitButton: 'dummyExit'
  }
};

module.exports = conf;
