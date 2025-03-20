"use client";

export function NewsletterForm() {
  return (
    <div className="mt-8">
      <iframe
        src="https://embeds.beehiiv.com/5dcd5171-ba40-489f-9ed2-99e2288d3899"
        data-test-id="beehiiv-embed"
        width="100%"
        height="320"
        title="Newsletter subscription form"
        loading="lazy"
        sandbox="allow-scripts allow-forms allow-same-origin"
        style={{
          borderRadius: "4px",
          margin: "0",
          backgroundColor: "transparent",
        }}
      ></iframe>
    </div>
  );
}
