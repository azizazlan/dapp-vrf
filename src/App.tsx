import Typography from '@mui/material/Typography';
import MetaMaskOnboarding from '@metamask/onboarding';
import Metamaskonboard from './metamaskonboard';
import Vrf from './vrf';

const Header = () => {
  return (
    <div
      style={{ marginBottom: '7px', display: 'flex', flexDirection: 'column' }}
    >
      <Typography variant="h3">DApp VRF</Typography>
      <Typography variant="h6" color="primary">
        Get your flooky number!
      </Typography>
    </div>
  );
};

function App() {
  if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
    return (
      <div>
        <Header />
        <Metamaskonboard />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <Vrf />
    </div>
  );
}

export default App;
