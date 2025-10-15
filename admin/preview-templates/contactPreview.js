CMS.registerPreviewTemplate("contact", ({ entry }) => {
  const title = entry.getIn(["data", "title"]);
  const address = entry.getIn(["data", "address"]);
  const phone = entry.getIn(["data", "phone"]);
  const email = entry.getIn(["data", "email"]);
  const mapEmbed = entry.getIn(["data", "map_embed"]);
  const message = entry.getIn(["data", "form_message"]);

  return `
    <div style="font-family: sans-serif; padding: 2rem;">
      <h1>${title}</h1>
      <section>
        <h2>Contact Information</h2>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
      </section>
      <section>
        <h3>Message</h3>
        <p>${message}</p>
      </section>
      ${
        mapEmbed
          ? `<section><h3>Map</h3><div>${mapEmbed}</div></section>`
          : ""
      }
    </div>
  `;
});
