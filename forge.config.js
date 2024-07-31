module.exports = {
  packagerConfig: {
    name: 'ElectrOS',
    icon: './public/icon',
    prune: true,
    osxSign: {
      identity: 'Developer ID Application: Elemento SRL (9WTDB7G2C7)', // the name of your Developer ID certificate
      optionsForFile: (filePath) => {
        // Here, we keep it simple and return a single entitlements.plist file.
        // You can use this callback to map different sets of entitlements
        // to specific files in your packaged app.
        return {
          entitlements: 'entitlements.mac.plist'
        }
      }
    },
    osxNotarize: {
      tool: 'notarytool',
      appleId: 'fferrando@elemento.cloud',
      appleIdPassword: 'iswt-hmsx-xinw-ppef', // Apple App-specific password
      teamId: '9WTDB7G2C7'
    },
    ignore: [
      'dist',
      'notarize',
      'out',
      '.env',
      '.gitignore',
      'forge.config.js'
    ]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        // certificateFile: './cert.pfx',
        // certificatePassword: CERTIFICATE_PASSWORD
      }
    },
    {
      name: '@electron-forge/maker-dmg',
      platforms: ['darwin']
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          icon: './public/icon.png'
        }
      }
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {}
    }
  ]
}
