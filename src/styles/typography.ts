type TypographyValue = [
  string,
  {
    lineHeight: string;
    fontWeight: string;
  },
];

export const typography: Record<string, TypographyValue> = {
  title: ["22px", { lineHeight: "1.5", fontWeight: "700" }],
  subtitle: ["16px", { lineHeight: "1.5", fontWeight: "600" }],
  body: ["14px", { lineHeight: "1.6", fontWeight: "400" }],
  caption: ["12px", { lineHeight: "1.6", fontWeight: "400" }],
};
