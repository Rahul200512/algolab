import Challenges from '@/host/components/challenges/challenges';
import Footer from '@/lib/components/footer/footer';
import Navbar from '@/lib/components/navbar/navbar';
import ThemeIcon from '@/lib/components/theme-icon/theme-icon';

function Index() {
  return (
    <>
      <ThemeIcon top={10} right={20} />
      <Navbar title="AlgoLab" />
      <Challenges />
      <Footer />
    </>
  );
}

export default Index;
