import "./ContactPage.css";

export const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-intro">
          Have questions, feedback, or suggestions? We'd love to hear from you!
        </p>
        <div className="contact-section">
          <h2 className="contact-section-title">📧 Email</h2>
          <a className="contact-link" href="mailto:wishlist.app@example.com">
            wishlist.app@example.com
          </a>
        </div>
        <div className="contact-section">
          <h2 className="contact-section-title">💬 Telegram</h2>
          <a
            className="contact-link"
            href="https://t.me/your_wishlist_support"
            target="_blank"
            rel="noopener noreferrer"
          >
            @your_wishlist_support
          </a>
        </div>
        <div className="contact-footer">
          We usually reply within 24 hours.<br />
          &copy; {new Date().getFullYear()} Wishlist App
        </div>
      </div>
    </div>
  );
};