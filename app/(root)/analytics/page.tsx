import HeaderBox from '@/components/HeaderBox'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

interface SearchParamProps {
  searchParams: {
    id?: string;
    page?: string;
  };
}

const Analytics = async ({ searchParams }: SearchParamProps) => {
  const { id } = await Promise.resolve(searchParams || {});
  
  const isLoggedIn = await getLoggedInUser();
  if(!isLoggedIn) redirect('/sign-in');

  const accounts = (await getAccounts({ userId: isLoggedIn.$id })) || { data: [], totalBanks: 0, totalCurrentBalance: 0 };
  const accountsData = accounts?.data || [];
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  let account = null;
  if (appwriteItemId) {
    try {
      account = await getAccount({ appwriteItemId });
    } catch (error) {
      console.error('Error fetching account:', error);
    }
  }

  return (
    <section className='flex flex-col gap-8 p-8'>
      <HeaderBox 
        title='Analytics & Insights'
        subtext='Track your spending patterns and financial trends'
      />
      <AnalyticsDashboard 
        transactions={account?.transactions || []}
        accounts={accountsData}
        totalBalance={accounts?.totalCurrentBalance || 0}
      />
    </section>
  );
}

export default Analytics;

