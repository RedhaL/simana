import type { NextPage } from 'next';
import Layout from '../components/Layout';
import Calendar from '../components/Calendar';
import { AppProvider } from '../store/context';

const Planner: NextPage = () => {
    return (
        <AppProvider>
            <Layout pageTitle="Calendar">
                <Calendar />
            </Layout>
        </AppProvider>
    )
}

export default Planner;