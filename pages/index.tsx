import type { NextPage } from 'next'
import Layout from '../components/Layout';
import styled from 'styled-components';
import tw from 'twin.macro';

const Button = tw.button`
bg-blue-500
hover:bg-blue-700
text-white
font-bold
py-2
px-4
rounded
`;

const Home: NextPage = () => {
  return (
    <Layout>
      <Button>
        Button
      </Button>
    </Layout>
  )
}

export default Home