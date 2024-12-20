# Projects Page Embed

A beautiful and interactive projects page embed that can be easily integrated into any website. Features a hierarchical display of research fields, focus areas, and projects with publication popups on hover.

## Features

- Clean, modern UI with UC Davis colors (navy blue and gold)
- Hierarchical display of research projects
- Hover effects with publication popups
- Responsive design
- Easy integration

## Usage

To use this embed in your website, simply add the following script tag:

```html
<script src="https://your-render-service.onrender.com/embed.js"></script>
```

The embed will automatically create a container with the ID `projects-embed`. If you want to place it in a specific location, you can create a div with this ID:

```html
<div id="projects-embed"></div>
```

## Development

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

The server will start at http://localhost:5050. During development, you can test the embed by including:
```html
<script src="http://localhost:5050/embed.js"></script>
```

## Production Deployment

1. Create a new service on render.com
2. Connect your repository
3. Set the following:
   - Build Command: `npm install`
   - Start Command: `npm start`

## Structure

- `server.js` - Express server setup
- `public/embed.js` - Main embed script
- `public/` - Static files directory

## License

ISC