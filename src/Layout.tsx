import { Outlet } from 'react-router-dom';

export default function Layout() {
  // const location = useLocation();
  // const isLandingPage =
  //   location.pathname === '/about' ||
  //   location.pathname === '/aboutnext' ||
  //   location.pathname === '/qrtreasure';
  // const isQrTreasurePage = location.pathname.startsWith('/qrtreasure');

  return (
    <div className='max-w-[600px] min-h-screen bg-[#BEDEFE] mx-auto flex flex-col items-center justify-start overflow-y-auto'>
      {/* {{!isQrTreasurePage && (
        <div className='w-full flex justify-between'>
          <Link to='/klandingk' className='border-2 border-black p-2 m-2'>
            Home
          </Link>
          <ConnectButton connectText='임시 Connect Wallet' />
        </div>
      )}} */}
      <Outlet />
    </div>
  );
}
