# ElectrOS

ElectrOS is the official desktop client application for [Elemento](https://elemento.cloud), designed to enhance your cloud computing experience with seamless integration and advanced features. Built with Electron, it offers a rich, native user interface that bridges the gap between cloud resources and desktop convenience.

## Features

- **Seamless Cloud Integration**: Directly manage your Elemento cloud resources without the need for a web browser.
- **Cross-Platform Support**: Available for Windows, macOS, and Linux.
- **Advanced Security**: Incorporates the latest security protocols to ensure your data and operations are safe.
- **Customizable Interface**: Tailor the app to your needs with customizable settings and themes.
- **Offline Capabilities**: Some features are available offline, providing flexibility in how and where you work.

## Getting Started

To get started with ElectrOS, follow these simple steps:

1. **Download the Application**: Visit the [releases page](https://github.com/Elemento-Modular-Cloud/electros/releases) to download the latest version of ElectrOS for your operating system.
2. **Install**: Open the downloaded file and follow the installation instructions.
3. **Launch ElectrOS**: Once installed, launch ElectrOS and log in with your Elemento credentials.

## CI/CD
![Develop Branch](https://github.com/filippo-ferrando/elemento-gui/actions/workflows/build-beta.yml/badge.svg?branch=develop)

## Building from Source

If you prefer to build ElectrOS from source, ensure you have Node.js and Yarn installed, then follow these steps:

```sh
git clone https://github.com/Elemento-Modular-Cloud/electros.git
cd electros
yarn install
yarn build
```