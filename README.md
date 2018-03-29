# Vue line-clamp directive

This is a basic line-clamp directive for Vue, extended with some extra features. In addition to restricting the text in question to configured amount of lines, it will also an event that indicates if the original text overflows specified amount of lines or not. It also allows for the overflow to be controlled from outside, i.e. toggle the line-clamp on-and-off.

# Install

```
npm install vue-line-clamp-extended --save
```

# Usage

Import the directive 

```js
import { lineClamp } from 'vue-line-clamp-extended'
```
or

```js
var lineClamp = require('vue-line-clamp-extended').lineClamp
```

and then configure it to your Vue (must be done before instantiating your application)

```js
Vue.directive('line-clamp', lineClamp)
```

after this, you can use the directive on elements as follows:

```js
const longText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis mauris fermentum, lacinia odio in, varius magna. Cras lobortis tortor sed eros pellentesque tempor."
```
```html
<p v-line-clamp="{ 
  lines: 5,
  text: longText
}"></p>
```

# Options

The directive is configured by passing a configuration object as the attribute value.

Following options are supported:

- **opts.text** - (mandatory) text to be shortened
- **opts.lines** - (optional, defaults to ```3```) number of lines that are to be shown
- **opts.expanded** - (optional, defaults to ```false```) boolean or a function that returns a boolean. This allows you to arbitrarily control whether you want to show the whole text or not.

The directive will additionally emit an ```is-expandable``` event in the context of it's parent that tells you if the text would overflow it's container or not.

# Advanced use-cases

### Toggle line-clamping

```vue
<template>
  <p @click="toggle()" v-line-clamp="{ text: someText, expanded: showMore }">
</template>

<script>
module.exports = {
  data: function() {
    return {
      showMore: false, // This can also be a function that returns a boolean
      someText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis mauris fermentum, lacinia odio in, varius magna. Cras lobortis tortor sed eros pellentesque tempor."
    }
  },
  methods: {
    toggle() {
      this.showMore = !this.showMore
    }
  }
}
</script>
```

### Listen to is-expandable event

```vue
<template>
  <p v-line-clamp="{ text: someText }">
</template>

<script>
module.exports = {
  data: function() {
    return {
      someText: "text text"
    }
  },
  created() {
    this.$on('is-expandable', bool => console.log(bool ? 'text overflows' : 'text does not overflow'))
  }
}
</script>
```
