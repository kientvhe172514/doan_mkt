import Head from 'next/head';
import MagicHourDashboard from '../components/magic-hour/MagicHourDashboard';
// import Layout from '../layout/Layout';

const MagicHourPage = () => {
    return (
        <>
            <Head>
                <title>MagicHour AI - Shofy</title>
                <meta name="description" content="Generate AI-powered product images and marketing copy with MagicHour" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            {/* <Layout> */}
            <div className="magichour-page">
                <div className="container-fluid py-4">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-header mb-4">
                                <h1 className="page-title">
                                    <i className="fas fa-magic me-3 text-primary"></i>
                                    MagicHour AI Tools
                                </h1>
                                <p className="text-muted">
                                    Generate stunning product images and compelling marketing copy using AI
                                </p>
                            </div>
                            <MagicHourDashboard />
                        </div>
                    </div>
                </div>
            </div>
            {/* </Layout> */}
        </>
    );
};

export default MagicHourPage; 