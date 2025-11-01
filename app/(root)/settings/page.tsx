import HeaderBox from '@/components/HeaderBox'
import SettingsPanel from '@/components/SettingsPanel';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

const Settings = async () => {
  const isLoggedIn = await getLoggedInUser();
  if(!isLoggedIn) redirect('/sign-in');

  return (
    <section className='flex flex-col gap-8 p-8'>
      <HeaderBox 
        title='Settings'
        subtext='Manage your account preferences and security'
      />
      <SettingsPanel user={isLoggedIn} />
    </section>
  );
}

export default Settings;

