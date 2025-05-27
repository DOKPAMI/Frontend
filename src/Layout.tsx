import { Outlet } from 'react-router-dom';
// import { Link, useLocation } from 'react-router-dom';
// import { ConnectButton } from './components/YourConnectButton'; // 필요 시 활성화

export default function Layout() {
  // const location = useLocation();
  // const isLandingPage =
  //   location.pathname === '/about' ||
  //   location.pathname === '/aboutnext' ||
  //   location.pathname === '/qrtreasure';
  // const isQrTreasurePage = location.pathname.startsWith('/qrtreasure');

  return (
    <div className='w-screen h-screen overflow-y-auto bg-[#BEDEFE]'>
      <div className='max-w-[600px] h-full mx-auto flex flex-col overflow-y-auto items-center justify-start'>
        {/* {!isQrTreasurePage && (
          <div className='w-full flex justify-between px-4 py-2'>
            <Link to='/klandingk' className='border-2 border-black p-2'>
              Home
            </Link>
            <ConnectButton connectText='임시 Connect Wallet' />
          </div>
        )} */}
        <Outlet />
      </div>
    </div>
  );
}
