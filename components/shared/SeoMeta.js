import Head from 'next/head'
// import { GA_TRACKING_ID } from '../../lib/gtag';

const Meta = ({ title, description, ogUrl, ogType = "website", ogImage, ogImageAlt, ogSiteName, articleTag }) => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />

            <meta property="og:url" content={ogUrl} />
            <meta property="og:type" content={ogType} />
            <meta property="og:image" itemprop="image" content={ogImage} />
            <meta property="og:image:alt" content={ogImageAlt} />
            <meta property="og:site_name" content={ogSiteName} />
            <meta property="og:article:tag" content={articleTag} />
            <meta property="og:locale" content="en_UK" />

            {/* <meta property="og:quote" content={quote} /> */}
            {/* <meta property="og:hashtag" content={hashtag} /> */}
            <meta content="image/*" property="og:image:type" />


            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:site" content="" />
            <meta name="twitter:creator" content="" />
            <meta name="twitter:image" content="" />

            <link rel="icon" type="image/png" href="/favicon-32x32.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/favicon-32x32.png" />
            {/* <link rel="stylesheet" href="" /> */}
            {/* <link rel="canonical" href="" /> */}
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
}
export default Meta;