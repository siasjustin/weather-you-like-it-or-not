module.exports = {
  
  "plugins": [ "react" ],

  "parser": "babel-eslint",
  
  "settings": {
    "react": {
      "createClass": "createClass", // Regex for Component Factory to use, default to "createClass"
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "15.0" // React version, default to the latest React stable release
    }
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  }

};
