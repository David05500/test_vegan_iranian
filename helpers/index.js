import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import Image from 'next/image';
import Link from 'next/link';
export * from "./structuredData"


const HEADING1 = ({ children }) => <p className="align-center text-gray-800 text-xl">{children}</p>;
const HEADING3 = ({ children }) => <p className="align-center text-gray-800 text-lg ">{children}</p>;
const MyLink = ({ link, children }) => <Link href={`${link}`}><a className="text-gray-600 pointer hover:opacity-60 transform ease-in duration-300">{children}</a></Link>;

const ORDEREDLIST = ({ isEnglish, children }) => {
    return (
        <ol className="text-base lg:text-lg listDecimal" style={{ listStyle: "decimal", direction: isEnglish ? 'unset' : 'rtl', marginRight: isEnglish ? 'unset' : '1.5rem' }}>{children}</ol>
    );
};

const LISTITEM = ({ node, children }) => {
    if (!_.isEmpty(node.data) && node.data.type === 'instructions') {
        return <li id={node.data.id}>{children}</li>
    };
    return (
        <li>{children}</li>
    );
};

export const options = (isEnglish) => {
    return ({
        renderText: text => {
            return text.split('\n').reduce((children, textSegment, index) => {
                return [...children, index > 0 && <br key={index} />, textSegment];
            }, []);
        },
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => <p className={`text-base mb-4 mt-4 ${isEnglish ? 'lg:text-justify' : 'text-right'}`}>{children}</p>,
            [BLOCKS.UL_LIST]: (node, children) => <ul className={`text-base lg:text-lg text-gray-700  list-disc`} style={{ direction: isEnglish ? 'unset' : 'rtl', marginRight: isEnglish ? 'unset' : '1.5rem' }}>{children}</ul>,
            [BLOCKS.OL_LIST]: (node, children) => <ORDEREDLIST node={node} isEnglish={isEnglish}>{children}</ORDEREDLIST>,
            [BLOCKS.HEADING_1]: (node, children) => <HEADING1>{children}</HEADING1>,
            [BLOCKS.HEADING_3]: (node, children) => <HEADING3>{children}</HEADING3>,
            [BLOCKS.LIST_ITEM]: (node, children) => <LISTITEM node={node}>{children}</LISTITEM>,
            [BLOCKS.EMBEDDED_ASSET]: (node) => <Image
                height="880px"
                width="704px"
                src={`https:${node.data.target.fields.file.url}`}
                alt={node.data.target.fields.description}
                title={node.data.target.fields.title}
                className='my-10' />,
            [INLINES.HYPERLINK]: (node, children) => <MyLink link={node.data.uri}>{children}</MyLink>,
        }
    })
};