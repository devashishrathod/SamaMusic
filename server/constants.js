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
      "https://res.cloudinary.com/drvdnqydw/image/upload/f_auto,q_auto/v1/Images/hrhc8iwbjl2qnnqu9kaq?_a=BAMAK+Jw0",
    SUBCATEGORY:
      "https://res.cloudinary.com/drvdnqydw/image/upload/f_auto,q_auto/v1/Images/zsbowllown6ddeb4jnw0?_a=BAMAK+Jw0",
    ALBUM:
      "https://res.cloudinary.com/drvdnqydw/image/upload/f_auto,q_auto/v1/Images/zsbowllown6ddeb4jnw0?_a=BAMAK+Jw0",
    LIBRARY:
      "https://res.cloudinary.com/drvdnqydw/image/upload/f_auto,q_auto/v1/Images/zsbowllown6ddeb4jnw0?_a=BAMAK+Jw0",
    MUSIC:
      "https://res.cloudinary.com/drvdnqydw/image/upload/f_auto,q_auto/v1/Images/zsbowllown6ddeb4jnw0?_a=BAMAK+Jw0",
  }),
};
