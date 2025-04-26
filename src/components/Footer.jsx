function Footer(props) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      &copy;
      <span id="copyright">{currentYear} f4ncyz4nz4 🇮🇹</span>
    </footer>
  );
}

export default Footer;
