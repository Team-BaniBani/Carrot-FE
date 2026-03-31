type TypographyValue = [
  string,
  {
    lineHeight: string;
    fontWeight: string;
    letterSpacing?: string;
  },
];

export const typography: Record<string, TypographyValue> = {
  "heading-xl": ["36px", { lineHeight: "54px", fontWeight: "700", letterSpacing: "1.44px" }],
  "heading-l": ["32px", { lineHeight: "48px", fontWeight: "700", letterSpacing: "1.28px" }],
  "heading-m": ["28px", { lineHeight: "42px", fontWeight: "700", letterSpacing: "1.12px" }],
  "heading-s": ["24px", { lineHeight: "36px", fontWeight: "700", letterSpacing: "0.96px" }],
  "heading-xs": ["20px", { lineHeight: "30px", fontWeight: "700", letterSpacing: "0.8px" }],
  "heading-xxs": ["16px", { lineHeight: "24px", fontWeight: "700", letterSpacing: "0.64px" }],

  "body-l": ["20px", { lineHeight: "30px", fontWeight: "400" }],
  "body-m": ["16px", { lineHeight: "24px", fontWeight: "400" }],
  "body-s": ["12px", { lineHeight: "18px", fontWeight: "400" }],

  "label-input": ["24px", { lineHeight: "36px", fontWeight: "500" }],
  "label-button": ["20px", { lineHeight: "30px", fontWeight: "500" }],

  // Legacy aliases
  title: ["20px", { lineHeight: "30px", fontWeight: "700" }],
  subtitle: ["16px", { lineHeight: "24px", fontWeight: "600" }],
  body: ["14px", { lineHeight: "21px", fontWeight: "400" }],
  caption: ["12px", { lineHeight: "18px", fontWeight: "400" }],
};

