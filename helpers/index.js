import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
export const timeInDecimals = {
    1: 0.017,
    2: 0.033,
    3: 0.050,
    4: 0.067,
    5: 0.083,
    6: 0.100,
    7: 0.117,
    8: 0.133,
    9: 0.150,
    10: 0.167,
    11: 0.183,
    12: 0.200,
    13: 0.217,
    14: 0.233,
    15: 0.250,
    16: 0.267,
    17: 0.283,
    18: 0.300,
    19: 0.317,
    20: 0.333,
    21: 0.350,
    22: 0.367,
    23: 0.383,
    24: 0.400,
    25: 0.417,
    26: 0.433,
    27: 0.450,
    28: 0.467,
    29: 0.483,
    30: 0.500,
    31: 0.517,
    32: 0.533,
    33: 0.550,
    34: 0.567,
    35: 0.583,
    36: 0.600,
    37: 0.617,
    38: 0.633,
    39: 0.650,
    40: 0.667,
    41: 0.683,
    42: 0.700,
    43: 0.717,
    44: 0.733,
    45: 0.750,
    46: 0.767,
    47: 0.783,
    48: 0.800,
    49: 0.817,
    50: 0.833,
    51: 0.850,
    52: 0.867,
    53: 0.883,
    54: 0.900,
    55: 0.917,
    56: 0.933,
    57: 0.950,
    58: 0.967,
    59: 0.983,
    60: 1.000
}

//MARKDOWN
export const Text = ({ children }) => {
    return <p className="text-sm text-justify">{children}</p>
};

export const options = {
    renderText: text => {
        return text.split('\n').reduce((children, textSegment, index) => {
            return [...children, index > 0 && <br key={index} />, textSegment];
        }, []);
    },
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
        [BLOCKS.UL_LIST]: (node, children) => <UlList>{children}</UlList>,
        [BLOCKS.OL_LIST]: (node, children) => <OlList>{children}</OlList>,
        [BLOCKS.HEADING_1]: (node, children) => <HEADING1>{children}</HEADING1>,
        [BLOCKS.HEADING_3]: (node, children) => <HEADING3>{children}</HEADING3>,
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
            return <img src={node.data.target.fields.file.url} className='my-10' />
        },
        [INLINES.HYPERLINK]: (node, children) => <MyLink>{children}</MyLink>,
    },
};