# Insomnia Bybit signature generator

This plugin allows to make authenticated requests to the Bybit API.

## Installation

1. Add the npm package to Insomnia `@dogecash/insomnia-plugin-bybit-signature-generator`
2. Add this property to your Bybit enviroment:

```json
"bybitSignature": {
    "enabled": true,
    "secret": "your-secret-key"
}
```