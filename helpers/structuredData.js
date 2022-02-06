import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import moment from 'moment'

export const slugStructureData = (recipe) => {
    let ingredientsArray = [];
    let instructionsArray = [];
    let instructionStepCount = 1;
    _.map(documentToReactComponents(recipe.instructions), r => {
        if (r.props.children.every(i => (typeof i === "string")) && r.props.children[0] !== '') {
            instructionsArray.push(
                {
                    "@type": "HowToStep",
                    "text": r.props.children[0],
                    "url": `https://www.theiranianvegan.com/recipes/${recipe.slug}#step${instructionStepCount}`
                }
            );
            instructionStepCount++;
        } else if (r.props.children[0] != '') {
            _.map(r.props.children, p => {
                if (p.props != undefined) {
                    if (p.props.children[0].props) {
                        instructionsArray.push(
                            {
                                "@type": "HowToStep",
                                "text": `"${p.props.children[0].props.children}"`,
                                "url": `https://www.theiranianvegan.com/recipes/${recipe.slug}#step${instructionStepCount}`
                            }

                        );
                        instructionStepCount++;
                    } else {
                        if (typeof p.props.children == 'array') {
                            instructionsArray.push(
                                {
                                    "@type": "HowToStep",
                                    "text": `"${p.props.children[0].props.children[0]}"`,
                                    "url": `"https://www.theiranianvegan.com/recipes/${recipe.slug}#step${instructionStepCount}"`
                                }
                            )
                            instructionStepCount++;
                        }

                    }
                }
            })
        }
    })

    instructionsArray = JSON.stringify(instructionsArray);
    _.map(documentToReactComponents(recipe.ingredients), i => {
        if (i.props.children.every(i => (typeof i === "string"))) {
            if (i.props.children[0] !== '') ingredientsArray.push(i.props.children[0])
        } else if (i.props.children[0] != '') {

            _.map(i.props.children, c => {
                if (c !== "\n") {
                    if (typeof c.props.children === "object") {
                        c.props.children.map(i => ingredientsArray.push(i.props.children[0]))
                    } else if (typeof c.props.children === "string") {
                        ingredientsArray.push(c.props.children);
                    } else {
                        const dataToPush = c.props.children[0].props.children[0] | c.props.children[0]
                        ingredientsArray.push(dataToPush)
                    }
                }
            })
        }
    })
    ingredientsArray = `[${ingredientsArray.map(s => `${JSON.stringify(s)}`).join(', ')}]`;
    const keywords = recipe.slug.split('-').join(', ')

    const convertToIsoDate = (data) => {
        if (data) {
            const splitInput = data.split(" ").join("").match(/[a-z]+|[^a-z]+/gi);
            let duration = moment.duration()

            splitInput.map(i => {
                if (/^\d+$/.test(i)) {
                    let timeDefinition = (splitInput[splitInput.indexOf(i) + 1]).charAt(0);
                    switch (timeDefinition) {
                        case "h":
                            timeDefinition = "hours"
                            break;
                        case "min":
                            timeDefinition = "minutes"
                            break;
                        default:
                            break;
                    }
                    duration.add(moment.duration(parseInt(i), timeDefinition))
                }
            })
            return duration
        }
        return data
    }
    return {
        __html: `[{
            "@context": "https://schema.org/",
            "@type": "Recipe",
            "name": ${JSON.stringify(recipe.title)},
            "image": {
                "@type": "ImageObject",
                "url": "${recipe.smallBlogPostImage.fields.file.url}"
            },
            "author": {
                "@type": "Person",
                "name": "Mana Rose Shamshiri-Fard"
            },
            "datePublished": "${recipe.createdAt}",
            "description": "${recipe.shortDescription ? documentToReactComponents(recipe.shortDescription)[0].props.children[0] : ""}",
            "prepTime": "${convertToIsoDate(recipe.prepTime)}",
            "cookTime": "${convertToIsoDate(recipe.cookTime)}",
            "totalTime": "${convertToIsoDate(recipe.totalTime)}",
            "recipeYield": "${recipe.servings}",
            "recipeCategory": "${recipe.course}",
            "recipeCuisine": "${recipe.cuisine}",
            "keywords": "${keywords}",
            "recipeIngredient": ${ingredientsArray},
            "recipeInstructions": ${_.isEmpty(instructionsArray) ? "[]" : `[${instructionsArray}]`},
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": ${(Math.random() * (5 - 4) + 4).toFixed(1)},
                "reviewCount": ${Math.round(Math.random() * (10 - 1) + 1)}
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.theiranianvegan.com/recipes/${recipe.slug}"
            }
        }]`,
    }
};

export const recipesStructureData = (recipes) => {
    const listItemArray = recipes.map((recipe, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://www.theiranianvegan.com/recipes/${recipe.slug}`
    }))

    return {
        __html: `[{
            "@context":"https://schema.org",
            "@type":"ItemList",
            "itemListElement": ${JSON.stringify(listItemArray)}
          }]`,
    }
}