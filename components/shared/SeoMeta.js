import Head from 'next/head'
// import { GA_TRACKING_ID } from '../../lib/gtag';

const Meta = ({ title, description, desc }) => (
    <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="og:title" property="og:title" content="" />
        <meta name="og:description" property="og:description" content="" />
        <meta property="og:site_name" content="" />
        <meta property="og:url" content="" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="" />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:site" content="" />
        <meta name="twitter:creator" content="" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon-32x32.png" />
        <link rel="stylesheet" href="" />
        <meta property="og:image" content="" />
        <meta name="twitter:image" content="" />
        <link rel="canonical" href="" />
        <script type="text/javascript" src="" ></script>

        <meta name="theme-color" content="#f1f3f5"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        {/* <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        /> */}
        {/* <script
            dangerouslySetInnerHTML={{
                __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
            page_path: window.location.pathname,
            });
        `,
            }}
        /> */}
    </Head>
)
export default Meta;