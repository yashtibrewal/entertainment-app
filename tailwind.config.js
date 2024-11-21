/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        userIconColor: '#ff5252', // Custom color for the MovieCreation icon
        userTextColor: '#4B5563', // Slate color for icons (default)
        userHoverColor: '#ffffff', // Hover effect color for icons
        userAvatarColor: '#FF5722', // Custom color for avatar background
      },
      spacing: {
        userIconSize: '40px', // Custom size for the MovieCreation icon
        userAvatarSize: '40px', // Avatar size
        userIconSpacing: '1.5rem', // Spacing between icons
      }
    },
  },
  plugins: [],
}