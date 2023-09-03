import Head from "next/head";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>FBD DB</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="justify-center items-center gap-4">
        <h1 className="text-default">Trabalho Final FBD</h1>
        <h2>Selecione uma das consultas no menu lateral</h2>
      </main>
    </>
    )
}

export default Home;