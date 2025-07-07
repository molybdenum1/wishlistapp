import "./AboutPage.css";

export const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="about-title">Welcome to Wishlist!</h1>
        <p className="about-intro">
          🎁 <b>Wishlist</b> helps you easily create, organize, and share your
          wishes and gift ideas with friends and family.
        </p>
        <div className="about-section">
          <h2 className="about-section-title">✨ Key Features</h2>
          <ul className="about-list">
            <li>📝 Create and manage multiple wishlists</li>
            <li>➕ Add, edit, and remove wishlist items</li>
            <li>📱 Access your wishlists from any device</li>
            <li>🔒 Secure authentication with Firebase</li>
          </ul>
        </div>
        <div className="about-section">
          <h2 className="about-section-title">🚀 Technologies Used</h2>
          <ul className="about-list">
            <li>⚛️ React</li>
            <li>🔥 Firebase</li>
            <li>🎨 Material UI</li>
          </ul>
        </div>
        <div className="about-footer">
          <span>
            Made with ❤️ for your dreams.
            <br />
          </span>
          &copy; {new Date().getFullYear()} Wishlist App
        </div>
      </div>
    </div>
  );
};
