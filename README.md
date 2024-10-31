
# EchoSlate

## Overview

EchoSlate is a digital profile and portfolio website built using the Hugo framework and Tailwind CSS, designed for creating and showcasing resumes and projects for Full Stack Development, Data Analytics, and Cybersecurity. The site includes multilingual support, user authentication, file upload capabilities, and a customizable layout with an emphasis on accessibility.

## Features

- **User Profiles**: Supports user profile creation, with a resume directory featuring individual `.md` files for each user.
- **Search Functionality**: Uses Fuse.js for efficient and flexible in-site search.
- **Multilingual Support**: Built with English and Spanish translations via TOML files.
- **Dark Mode Toggle**: Allows users to switch between light and dark themes.
- **File Upload**: Users can upload resumes and other documents, managed via a dedicated upload form.
- **Responsive Design**: Tailwind CSS ensures a responsive layout across all devices.
- **Accessibility**: Designed with ARIA accessibility features for inclusive user experience.

## Project Structure

- **config.toml**: Configuration file for Hugo, defining site parameters.
- **content/**: Contains the content pages (in both English and Spanish) organized by sections like `home`, `about`, `contact`, `upload`, and `users`.
- **layouts/**: HTML templates defining the structure for different pages, including partials for the header, footer, hero, and contact forms.
- **static/**: Contains static files like CSS stylesheets, JavaScript files, and images.
- **public/**: Generated HTML files from Hugo for static site deployment.

## Installation and Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/deanmastria/EchoSlate.git
   cd EchoSlate
   ```

2. **Install Hugo**: Ensure you have Hugo installed on your system. Visit [Hugo's installation page](https://gohugo.io/getting-started/installing/) for instructions.

3. **Install Node Dependencies**:
   ```bash
   npm install
   ```

4. **Run the Development Server**:
   ```bash
   hugo server
   ```
   The site will be available at `http://localhost:1313`.

## Usage

### Adding New Resumes

To add a new resume:
1. Navigate to `content/en/users/resumes` (or the equivalent in Spanish).
2. Create a new Markdown file with the user’s name.
3. Add front matter with fields like `title`, `date`, and `tags`.

### Search Functionality

The search feature is powered by `Fuse.js` and can be found in `static/js/search.js`. It provides real-time search suggestions and is designed to be highly customizable.

### Multilingual Support

Multilingual content is managed using TOML files located in the `i18n/` directory. Add or edit translations within these files to update the language options for each page.

## Scripts and Customization

- **CSS**: Custom CSS is located in `assets/css`, with `main.css` and `resume.css` for overall styling.
- **JavaScript**: JavaScript files for various functionalities (authentication, dark mode toggle, and search) are located in `static/js`.

## Deployment

1. Run the Hugo build command:
   ```bash
   hugo -D
   ```
2. Deploy the generated `public/` folder to your preferred hosting provider.

## License

This project is open source and available under the [MIT License](LICENSE).