# fruitbench

An over-engineered benchmark for my friends to rank the best fruits. 

## Tech stack

- Framework: Astro 5.15
- Language: TypeScript
- Runtime: bun
- CSS framework: Tailwind CSS 4.1 
- Component library: DaisyUI 5.3
- Styling & formatting: antfu/eslint-config (ESLint 9 + Prettier 3.6)
- Deployment: Cloudflare 
- etc. 

## Features 

- Interactive fruit ranking system
- Hosted on Cloudflare Pages

## Fruit ranking system idea

The webapp allows users to rank their favorite fruits through an interactive interface.

A fruit's total score will be determined by the following criteria: 

- Flavor: How good the fruit tastes
- Nourishment: How nutritious or substantial the fruit is
- Reliability: How consistently the fruit meets expectations
- Practicality: How easy it is to access, eat and/or prepare the fruit

Some examples:

- One may rate a peach extremely high for flavor and modestly for nourishment but lower for reliability due to its messy nature and lower for practicality due to its narrow seasonable availability and hit-or-miss ripeness between batches
- A watermelon may rank highly in flavor, mediocre in reliability, and lower in practicality and nourishment.
- A banana could rank highest in consistency due to its predictable ripening process and single cultivar dominance, high in nourishment for its nutrient density and satiating qualities, high in practicality for its portability and ease of consumption, but only modestly in flavor due to its relatively mundane taste profile. 
- An apple may have the best overall score as it is generally tasty (flavor), consistent within cultivars (reliability), easy to eat on-the-go without preparation or significant risk of damage while also having a wide variety of uses in baking (practicality), and fairly substantial and nutritious (nourishment)
- A durian might score very high in nourishment due to its rich nutrient profile, but lower in flavor for those who dislike its strong odor, and lower in practicality due to its spiky exterior and limited availability.
- A dragonfruit could rank terribly in flavor due to its mild taste and poorly in practicality due to expensive cost. 