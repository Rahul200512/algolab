import classes from './footer.module.scss';

function Footer() {
  return (
    <footer className={classes.footer}>
      <p>
        Built by{' '}
        <a
          href="https://www.linkedin.com/in/rahul-reddy-avula/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Rahul Reddy Avula
        </a>{' '}
        ·{' '}
        <a
          href="https://github.com/Rahul200512/algolab"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}

export default Footer;
