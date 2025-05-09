# Saqlain Abbas - AI & Machine Learning Portfolio

A modern, responsive portfolio website built with React and TypeScript, showcasing my journey as an AI & Machine Learning student with projects, skills, and educational background.

## 🚀 Features

- **Modern UI/UX**: Built with Material-UI and Framer Motion for smooth animations
- **Responsive Design**: Fully responsive across all devices
- **Interactive Sections**: 
  - About Me
  - Education Timeline
  - Technical Expertise Showcase
  - Project Gallery with GitHub Links
  - Functional Contact Form (via Formspree)
  - Downloadable CV
- **Performance Optimized**: Built with Vite for lightning-fast load times
- **Clean Architecture**: TypeScript for type safety and better code organization

## 🛠️ Technologies Used

- **Frontend Framework**: React.js with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **Animations**: 
  - Framer Motion
  - GSAP
- **Styling**: 
  - Emotion
  - Styled Components
- **Form Handling**: 
  - Formspree integration
  - Form validation
- **Type Checking**: TypeScript
- **Code Quality**: ESLint & Prettier

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/razee4315/portfolio.git
```

2. Navigate to project directory
```bash
cd portfolio
```

3. Install dependencies
```bash
npm install
# or
yarn install
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

5. Build for production
```bash
npm run build
# or
yarn build
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── components/      # React components
│   ├── assets/         # Static assets
│   ├── theme/          # MUI theme configuration
│   └── App.tsx         # Main application component
├── public/             # Public assets
├── index.html          # Entry HTML file
└── package.json        # Project dependencies and scripts
```

## 🎨 Customization

1. Theme customization in `src/theme.ts`
2. Content modification in respective component files
3. Add new sections by creating components in `src/components`

## 📄 CV Download

The portfolio includes a CV download button in the hero section. To update your CV:

1. Replace the `SaqlainAbbas_CV.pdf` file in the `public` directory with your updated CV
2. Keep the same filename or update the reference in `HeroSection.tsx`

## 📬 Contact Form

The contact form is integrated with Formspree for email delivery:

1. Messages submitted through the contact form are sent directly to your Gmail
2. Formspree handles spam filtering and email delivery
3. The form includes validation and success/error notifications

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contact

Saqlain Abbas - [LinkedIn](https://www.linkedin.com/in/saqlainrazee)

Project Link: [https://github.com/razee4315/portfolio](https://github.com/razee4315/portfolio)

---
⭐️ If you find this portfolio template helpful, please consider giving it a star!
