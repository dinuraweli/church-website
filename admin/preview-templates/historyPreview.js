CMS.registerPreviewTemplate("history", ({ entry }) => {
  const title = entry.getIn(["data", "title"]);
  const content = entry.getIn(["data", "history_content"]);
  const timeline = entry.getIn(["data", "timeline"]);

  const timelineItems = timeline
    ? timeline
        .map(
          (item) => `
        <li><strong>${item.get("year")}</strong> — ${item.get("event")}</li>
      `
        )
        .join("")
    : "<li>No timeline entries yet.</li>";

  return `
    <div style="font-family: sans-serif; padding: 2rem;">
      <h1>${title}</h1>
      <section>
        <h2>Church History</h2>
        <p>${content}</p>
      </section>
      <section>
        <h3>Timeline</h3>
        <ul>${timelineItems}</ul>
      </section>
    </div>
  `;
});
