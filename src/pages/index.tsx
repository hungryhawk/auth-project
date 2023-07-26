import { useSession, signIn, signOut } from 'next-auth/react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center">
        {session ? (
          <div className="flex flex-col gap-1 items-center">
            <h2>{session?.user?.name}</h2>
            {session?.user?.image && (
              <img
                src={session?.user?.image}
                alt=""
                className="w-[128px] h-32 rounded-full"
              />
            )}

            <h4>{session?.user?.email}</h4>
            <button onClick={() => signOut()} className="bg-blue-500">
              Sign Out
            </button>
          </div>
        ) : (
          <button onClick={() => signIn()} className="bg-blue-500">
            Sign In
          </button>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  console.log(session);
  return {
    props: {
      session,
    },
  };
}

// https://github.com/settings/developers
// https://console.cloud.google.com/getting-started
// https://discord.com/developers/applications
