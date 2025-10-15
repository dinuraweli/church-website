CMS.registerPreviewTemplate('home', ({ entry }) => {
  const title = entry.getIn(['data', 'title']);
  const welcome = entry.getIn(['data', 'welcome_message']);
  const serviceTimes = entry.getIn(['data', 'service_times']);
  const contact = entry.getIn(['data', 'contact_info']);

  return `
    <div style="font-family: sans-serif; padding: 2rem;">
      <h1>${title}</h1>
      <section>
        <h2>Welcome Message</h2>
        <p>${welcome}</p>
      </section>
      <section>
        <h2>Service Times</h2>
        <p>${serviceTimes}</p>
      </section>
      <section>
        <h2>Contact Information</h2>
        <p>${contact}</p>
      </section>
    </div>
  `;
});
