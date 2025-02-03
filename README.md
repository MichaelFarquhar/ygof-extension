# YGO - Find Cards

A Firefox extension that allows you to quickly search for Yu-Gi-Oh! cards across multiple popular card-selling websites simultaneously.

## Features

- Search across multiple websites with a single click or by pressing Enter
- Configurable website selection with persistent preferences
- Opens all searches in a new window
- All major card-selling websites supported
- Minimum 1 character required for search
- Saves checkbox preferences between sessions

## Supported Websites

- 401 Games
- Ebay.ca
- CardBrawlers
- CG Realm
- TCGPlayer
- Face to Face Games

## Testing Extension

1. Open Firefox and go to `about:debugging`
2. Click "This Firefox" on the left sidebar
3. Click "Load Temporary Add-on"
4. Select any file from the extension directory

## Building A New Release

Distrbuted files are located within the `dist` folder. Upon building, a zip folder is generated and tag with the version, matching the same one found in package.json. To release a new version to distribution, perform the following:

1. Update the version number in package.json.
2. Run the following command:

```bash
npm run build
```

3. Use the new zip file created in the base directory for release.

## License

See LICENSE file for details.
