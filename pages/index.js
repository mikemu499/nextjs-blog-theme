import Head from 'next/head';
import dynamic from 'next/dynamic'; 

const GameContainer = dynamic(() => import('../components/GameContainer'), { ssr: false });
export default function Home() {
  return (
    <>
      {/* Add metadata for SEO */}
    <div className="flex flex-col items-center justify-center">
      <Head>
        <title>Phonics Adventure</title>
        <meta name="description" content="A fun and interactive phonics learning game for preschoolers!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
 </div>
      {/* Main Game Content */}
   <div className="flex flex-col min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/background.jpg')" }}>
            <h1 className="text-5xl font-bold text-green-500 mb-8 drop-shadow-lg">Phonics Adventure!</h1>
            <GameContainer />
        </div>
    </>
  );
}
