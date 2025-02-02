import Head from 'next/head';
import dynamic from 'next/dynamic'; 

const GameContainer = dynamic(() => import('../components/GameContainer'), { ssr: false });
export default function Home() {
  return (
    <>
      {/* Add metadata for SEO */}
      <Head>
        <title>Phonics Adventure</title>
        <meta name="description" content="A fun and interactive phonics learning game for preschoolers!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main Game Content */}
      <div>
        <h1>Phonics Adventure!</h1>
        <GameContainer />
      </div>
    </>
  );
}
