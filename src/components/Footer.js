function Footer(props) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      &copy;
      <span id="copyright"> {currentYear} Lorenzo Ippolito 🇮🇹</span>
    </footer>
  );
}

export default Footer;
