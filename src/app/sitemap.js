const baseUrl = "https://alaminxab.vercel.app";

export default function sitemap() {
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${baseUrl}/Works`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/Lab`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
