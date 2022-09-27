import styles from './Navbar.module.scss';
const NavbarComponent = () => {
  return (
    <ul className={styles['navbar']}>
      <li>portfolio</li>
      <li>resume</li>
      <li>about</li>
    </ul>
  );
};

export default NavbarComponent;
