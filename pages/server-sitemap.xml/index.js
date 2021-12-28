import { GetServerSideProps } from "next";
import { getServerSideSitemap } from "next-sitemap";
import contentfulClient from '../../lib/contentful';


export const getServerSideProps = async (ctx) => {
    const response = await contentfulClient.getEntries({
        content_type: 'blogPost',
    });
    const data = response.items.map(item => item.fields);
    const fields = data.map(i => ({
        loc: `https://theiranianvegan.com/recipes/${i.slug}`,
        lastmod: new Date().toISOString()
    }));

    return getServerSideSitemap(ctx, fields)
}
export default function Site() { }


