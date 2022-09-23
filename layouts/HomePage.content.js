import BodyComponent from '../components/Body.component';
import FooterComponent from '../components/Footer.component';
import HeadComponent from '../components/Head.component';
import NavbarComponent from '../components/Navbar.component';
import ScriptComponent from '../components/Script.component';

function HomePage() {
  return (
    <div>
      <HeadComponent />
      <NavbarComponent />
      <BodyComponent />
      <FooterComponent />

      <ScriptComponent />
    </div>
  );
}

export default HomePage;
