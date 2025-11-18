module.exports = {
  ROLES: Object.freeze({
    ADMIN: "admin",
    USER: "user",
  }),

  LOGIN_TYPES: Object.freeze({
    EMAIL: "email",
    MOBILE: "mobile",
    GOOGLE: "google",
    PASSWORD: "password",
    OTHER: "other",
  }),

  PLATFORMS: Object.freeze({
    WEB: "web",
    ANDROID: "android",
    IOS: "ios",
  }),

  SUBSCRIPTION_TYPES: Object.freeze({
    WEEKLY: "weekly",
    MONTHLY: "monthly",
    QUATERLY: "quarterly",
    HALF_YEARLY: "half_yearly",
    YEARLY: "yearly",
  }),

  DURATION_MAP: Object.freeze({
    weekly: 7,
    monthly: 30,
    quarterly: 90,
    half_yearly: 180,
    yearly: 365,
  }),

  SUBSCRIPTION_PLANS: Object.freeze({
    FREE: "free",
    BASIC: "basic",
    PREMIUM: "premium",
    Family: "family",
  }),

  DEFAULT_IMAGES: Object.freeze({
    CATEGORY:
      "https://t4.ftcdn.net/jpg/15/54/43/11/360_F_1554431124_YJnAIC7lp6um4hEb4Lop0NEWMUEyA96h.jpg",
    SUBCATEGORY:
      "https://media.istockphoto.com/id/615254324/vector/music-genres-signs-and-symbols.jpg?s=612x612&w=0&k=20&c=nsrIJ3p3MuArr7UkfK-knvBTr3SwIRXlqthKU-5TLCQ=",
    ALBUM:
      "https://www.shutterstock.com/shutterstock/photos/1458500159/display_1500/stock-vector-music-album-logo-design-template-1458500159.jpg",
    MUSIC:
      "https://img.freepik.com/free-vector/music-note-flat-style_78370-7394.jpg?semt=ais_incoming&w=740&q=80",
    LIBRARY: "https://i1.sndcdn.com/avatars-000651302358-h75ud8-t240x240.jpg",
  }),
};
