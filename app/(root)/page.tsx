import HeaderBox from '@/components/HeaderBox'
import RecentTransactions from '@/components/RecentTransactions';
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import DashboardStats from '@/components/DashboardStats'
import QuickActions from '@/components/QuickActions'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

interface SearchParamProps {
  searchParams: {
    id?: string;
    page?: string;
  };
}


const Home = async ({ searchParams }: SearchParamProps) => {
  // `searchParams` can be an async/dynamic object in the App Router.
  // Awaiting it (or wrapping with Promise.resolve) avoids the sync dynamic API usage error.
  const { id, page } = await Promise.resolve(searchParams || {});

  const currentPage = Number(page as string) || 1;

  const isLoggedIn = await getLoggedInUser();

  if(!isLoggedIn){
    redirect('/sign-in');
  };

  const accounts = (await getAccounts({ userId: isLoggedIn.$id })) || { data: [], totalBanks: 0, totalCurrentBalance: 0 };

  const accountsData = accounts?.data || [];

  // Determine which account to show: prefer explicit id param, otherwise first available
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  let account = null;
  if (appwriteItemId) {
    account = await getAccount({ appwriteItemId });
  }
  
  return (
    <section className='home'>
      <div className="home-content">
        <header className='home-header'>
          <HeaderBox
          type="greeting"
          title="Welcome"
          user={isLoggedIn?.firstName || 'Guest'}
          subtext="Access and manage your account and transactions efficiently."
          />
          <TotalBalanceBox
          accounts = {accountsData}
          totalBanks = {accounts?.totalBanks}
          totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </header>
        
        {/* Dashboard Stats */}
        {account?.transactions && account.transactions.length > 0 && (
          <div className="mb-8">
            <DashboardStats 
              transactions={account.transactions} 
              totalBalance={accounts?.totalCurrentBalance || 0}
            />
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-8">
          <QuickActions />
        </div>

        <RecentTransactions
        accounts={accountsData}
        transactions={account?.transactions}
        appwriteItemId={appwriteItemId}
        page={currentPage}
        />
      </div>
      <RightSidebar
      user={isLoggedIn}
      transactions={account?.transactions}
      banks={accountsData?.slice(0,2)}
      />
    </section>
  )
}

export default Home
