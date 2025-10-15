CMS.registerPreviewTemplate('about', ({ entry }) => {
  const title = entry.getIn(['data', 'title']);
  const about = entry.getIn(['data', 'about_content']);
  const mission = entry.getIn(['data', 'mission']);
  const vision = entry.getIn(['data', 'vision']);

  return `
    <div style="font-family: sans-serif; padding: 2rem;">
      <h1>${title}</h1>
      <section><h2>About</h2><p>${about}</p></section>
      <section><h2>Mission</h2><p>${mission}</p></section>
      <section><h2>Vision</h2><p>${vision}</p></section>
    </div>
  `;
});
