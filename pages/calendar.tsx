import type { NextPage } from 'next';
import Layout from '../components/layout';

const Calendar: NextPage = () => {
    return (
        <Layout pageTitle="Calendar">
            <div className="flex flex-col">
                <div className="grid grid-cols-6 gap-3">
                    <div>
                        <h2 className="border-b-2 border-black">Monday</h2>
                        <div className="inputLines divide-y divide-gray-400">
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                        </div>
                    </div>
                    <div>
                        <h2 className="border-b-2 border-black">Tuesday</h2>
                        <div className="inputLines divide-y divide-gray-400">
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                        </div>
                    </div>
                    <div>
                        <h2 className="border-b-2 border-black">Wednesday</h2>
                        <div className="inputLines divide-y divide-gray-400">
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                        </div>
                    </div>
                    <div>
                        <h2 className="border-b-2 border-black">Thursday</h2>
                        <div className="inputLines divide-y divide-gray-400">
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                        </div>
                    </div>
                    <div>
                        <h2 className="border-b-2 border-black">Friday</h2>
                        <div className="inputLines divide-y divide-gray-400">
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                        </div>
                    </div>
                    <div>
                        <h2 className="border-b-2 border-black">Saturday/Sunday</h2>
                        <div className="inputLines divide-y divide-gray-400">
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                            <div className="h-12"></div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Calendar;