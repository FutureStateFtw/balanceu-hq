---
applyTo: '**'
---
Stack: Vue 3, Pinia, Vue Router, Vite, Vuetify 3
PINIA STORE AND OPTIONS API USAGE
I have an unorthodox way of using the Pinia Store.
I use a <setup script> block to import each store in a single line, like this: 
import { ui, restServices, mapLayers, mapFunctions, mapEvents, mapLabels, space } 
Then I use a <script> block and do all my script using the Options API.
This allows me to skip using .value suffixes, and skip store boilplate and the need to preface stores with '.this'
Please adhere to this pattern in all my code.
I use the Options API in my Vue components.

CODE FORMATTING AND STYLE
Template Blocks:
4-space indentation - Applied consistently throughout the template
All-caps comments - Added descriptive comments above each feature (PHOTO REVIEW OVERLAY, TOP BAR, PAGINATION CONTROLS, etc.)
Line feeds between features - Added proper spacing between each major section
Prop density - Started props with class when possible, grouped 3+ props per line, and put long props (like style or complex click handlers) on their own lines
Closing brackets - Removed standalone closing brackets and kept them on the same line as the last prop

Script Blocks:
Normal case comments - Added descriptive comments above each computed property and method
Line feeds between methods/computed - Added proper spacing between each function for better readability

If using an api call in api.js, assume this code is correct and do not change it unless specifically requested.

Vuetify 3
I use Vuetify 3 in my code.
Before adding divs, or custom creations, always consider using Vuetify components's properties to achieve the same result.
Instead of doing custom flex layouts always try to use Vuetify's v-row / v-col components.

CSS
Whenever possible try to use Vuetify's built-in helper classes and properties to style components instead of writing custom CSS.  Consider this for spacing, colors, alignments, and more.

COMMENTS
I like the comments that I have written in my code.
I want to keep all comments in my code.
Do not remove or modify any comments
Do not add comments like "this was changed" or "this was added"
Do not add comments unless they explain the logic of the code.

APPLICATION SPECIFIC
