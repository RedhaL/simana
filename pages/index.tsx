import type { NextPage } from 'next'
import Layout from '../components/layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Button
      </button>
    </Layout>
  )
}

export default Home
