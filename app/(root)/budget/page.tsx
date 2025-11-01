import HeaderBox from '@/components/HeaderBox'
import BudgetTracker from '@/components/BudgetTracker';
import { getAccount, getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

interface SearchParamProps {
  searchParams: {
    id?: string;
    page?: string;
  };
}

const Budget = async ({ searchParams }: SearchParamProps) => {
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
        title='Budget Tracker'
        subtext='Set budgets and track your spending goals'
      />
      <BudgetTracker 
        transactions={account?.transactions || []}
        accounts={accountsData}
      />
    </section>
  );
}

export default Budget;

