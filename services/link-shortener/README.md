# Shorten!

The Shorten Web Application allows users to generate shortened URLs for their long URLs. It is a simple and easy-to-use tool built using FetchAPI, HTML, CSS, and JavaScript.

## Features

- Generates short URLs for long URLs to make them more manageable and shareable.
- Uses the [short.io](https://short.io/) API service to handle URL shortening and redirection.
- Provides a clean and intuitive user interface for quick URL shortening.

## Prerequisites

Before getting started, make sure you have the following:

- A domain or subdomain to host the application.
- Registration of your domain/subdomain with [short.io](https://short.io/). (Completely free of cost)

Note: Preferably use a subdomain so it doesn't take up the whole domain ie. **link.example.com** instead of **example.com**

## Installation and Setup

1. Fork this repository to your GitHub account.
2. Clone the forked repository to your local machine.
3. Register your domain/subdomain with short.io to generate a public API key.
4. Go to [api integrations](https://app.short.io/settings/integrations/api-key) in short.io and generate a public key.
5. Open the `assets/script.js` file in a text editor.
6. Replace the placeholder API key in the `'authorization'` field with your short.io API key.
7. Rename the domain `'link.laavesh.ml'` to your own domain or subdomain in the following files:
   - `index.html`
   - `assets/script.js`

## Usage

1. Deploy the application to your domain or subdomain.
2. Visit your domain or subdomain in a web browser.
3. Enter a long URL in the input field.
4. Click on the "Shorten" button.
5. The application will generate a shortened URL using the short.io API and display it to the user.
6. Copy the shortened URL and use it wherever you need.

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or bug fixes, feel free to create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
