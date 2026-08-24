# Trionn Website

A modern and interactive website built with React, GSAP, ScrollTrigger, and Lenis. 
The project focuses on smooth scrolling, immersive animations, responsive layouts, and interactive visual experiences.

## Project Overview

This project is a recreation/inspired implementation of the Trionn website experience, with a strong focus on animation, motion, and modern web design.

The website includes multiple sections with different scroll-based animations and transitions.

## Technologies Used

- React.js
- JavaScript
- GSAP
- GSAP ScrollTrigger
- Lenis Smooth Scroll
- CSS3
- HTML5
- Vite
- React Three Fiber / Three.js

## Main Features

### 1. Responsive Navigation

A responsive navigation bar has been created for the website.

It includes:

- Brand/logo
- Navigation links
- Menu interaction
- Talk button
- Sound control
- Light and dark theme changes depending on the section

The navbar automatically changes its appearance according to the background of different sections.

### 2. Hero Section

The hero section introduces the website with a modern visual layout and animation effects.

The section focuses on:

- Large typography
- Smooth entrance animations
- Interactive visual elements
- Responsive design

### 3. Smooth Scrolling

Lenis has been integrated for smooth scrolling throughout the website.

GSAP ScrollTrigger is synchronized with Lenis so that scroll-based animations remain smooth and properly controlled.

The project uses a custom animation loop to connect Lenis with GSAP.

### 4. Scroll-Based Animations

GSAP and ScrollTrigger are used extensively throughout the website.

Different sections respond to the user's scrolling with:

- Fade animations
- Scale animations
- Position changes
- Horizontal movement
- Pinning
- Scroll-controlled transitions
- Image reveals
- Text transitions

### 5. Key Facts Section

The Key Facts section presents important information using animated layouts.

The section includes:

- Animated typography
- Scroll-based transitions
- Theme changes
- Responsive positioning
- Interactive visual elements

### 6. Selected Work Section

The Selected Work section contains project/work visuals with an interactive scrolling experience.

The section includes:

- Image-based project presentation
- Horizontal scroll effect
- ScrollTrigger pinning
- Animated project elements
- Rotating plus symbol
- Lines and visual connections between elements
- Smooth transitions between projects

The horizontal movement is controlled through GSAP and ScrollTrigger.

### 7. Services Reveal Section

The Services section is one of the main interactive parts of the website.

It includes:

- Background video
- Background sound
- White-to-dark transition
- Animated typography
- Rock image sequence
- Scroll-controlled image transitions
- Service cards
- Service card animations
- Responsive mobile layout

The rock sequence is created using multiple transparent rock images.

Each image appears sequentially to create a continuous motion/frame animation effect while scrolling.

### 8. Background Video

A background video is used inside the Services section.

The video:

- Plays automatically
- Loops continuously
- Remains muted
- Covers the complete viewport
- Transitions smoothly from the initial white screen

### 9. Background Audio

Background audio has also been integrated into the Services section.

The sound system includes:

- Global sound control
- Automatic play when allowed
- Pause when leaving the section
- Audio reset when the section is left
- User interaction fallback for browser autoplay restrictions

### 10. Service Cards

The Services section contains different service cards including:

- Web Development
- Branding
- Product Design
- WordPress Development
- AI Solutions
- Digital Strategy

Each card contains:

- Service title
- Description
- Visual/icon
- Animated entrance and exit
- Different movement directions

On desktop, the cards enter from different directions and move across the screen.

The mobile layout is also responsive so the cards can be displayed properly on smaller screens.

### 11. Responsive Design

The website has responsive layouts for different screen sizes.

Responsive styling has been added for:

- Desktop
- Tablet
- Mobile

The layout, typography, cards, images, and animations adjust according to the screen width.

### 12. Theme Transitions

Different sections use different visual themes.

The navbar and other elements automatically transition between:

- Light theme
- Dark theme

This creates a consistent visual experience while scrolling through the website.

### 13. Interactive Sound Button

A sound toggle has been implemented to control the background audio.

The audio state is connected with the Services section so that sound only plays when appropriate.

### 14. Animation Performance

The animations are optimized using GSAP and CSS properties such as:

- transform
- opacity
- will-change

ScrollTrigger is also configured with smooth scrubbing and refresh handling.

## Project Structure

```text
trionn/
│
├── public/
│   ├── services/
│   │   ├── rock-01_no_bg.png
│   │   ├── rock-02_no_bg.png
│   │   └── ...
│   │
│   ├── services-bg.mp4
│   ├── services-sound.mp3
│   └── other assets
│
├── src/
│   ├── components/
│   │   ├── Navbar
│   │   ├── Hero
        ├── HeroScene
│   │   ├── ContactFooter
        ├── DesignMotion
│   │   ├── ContactFooter
│   │   ├── MenuPanel
│   │   ├── SectionTwo
│   │   ├── SectionThree
│   │   ├── KeyFacts
│   │   ├── SelectedWork
│   │   ├──ServicesReveal
        ├── Stories
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── styles
│
├── index.html
├── package.json
├── vite.config.js
└── README.md