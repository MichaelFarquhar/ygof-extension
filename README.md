# YGO - Find Cards

A Firefox extension that allows you to quickly search for Yu-Gi-Oh! cards across multiple popular card-selling websites simultaneously.

## Features

- Search across multiple websites with a single click
- Configurable website selection
- Opens each search in a new tab
- All major card-selling websites supported

## Supported Websites

- 401 Games
- Ebay.ca
- CardBrawlers
- CG Realm
- TCGPlayer

## Installation

1. Download the extension files
2. Open Firefox and go to `about:debugging`
3. Click "This Firefox" on the left sidebar
4. Click "Load Temporary Add-on"
5. Select any file from the extension directory

## Adding New Sites

To add new sites, modify the `sites.js` file and add a new object to the `sites` array with the following structure:

```javascript
{
  name: 'Site Name',
  checked: true,  // default checkbox state
  url: 'https://example.com/search?q={searchTerm}'
}
```

## License

See LICENSE file for details.
