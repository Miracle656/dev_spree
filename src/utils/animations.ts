import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

/**
 * Slide in from bottom animation
 */
export const slideInUp = (element: HTMLElement, options = {}) => {
    return gsap.from(element, {
        y: 60,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        ...options
    });
};

/**
 * Stagger fade-in animation for lists
 */
export const staggerFade = (elements: HTMLElement[] | NodeListOf<Element>, options = {}) => {
    return gsap.from(elements, {
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        ...options
    });
};

/**
 * Button hover animation (shadow shift)
 */
export const buttonHover = (button: HTMLElement) => {
    const handleMouseEnter = () => {
        gsap.to(button, {
            x: -2,
            y: -2,
            boxShadow: '6px 6px 0px #0A0A0A',
            duration: 0.2,
            ease: 'power2.out'
        });
    };

    const handleMouseLeave = () => {
        gsap.to(button, {
            x: 0,
            y: 0,
            boxShadow: '4px 4px 0px #0A0A0A',
            duration: 0.2,
            ease: 'power2.out'
        });
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
    };
};

/**
 * Card lift animation on hover
 */
export const cardLift = (card: HTMLElement) => {
    const handleMouseEnter = () => {
        gsap.to(card, {
            y: -4,
            boxShadow: '6px 6px 0px #0A0A0A',
            duration: 0.3,
            ease: 'power2.out'
        });
    };

    const handleMouseLeave = () => {
        gsap.to(card, {
            y: 0,
            boxShadow: '4px 4px 0px #0A0A0A',
            duration: 0.3,
            ease: 'power2.out'
        });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
    };
};

/**
 * Shadow pulse animation for attention
 */
export const shadowPulse = (element: HTMLElement, options = {}) => {
    return gsap.to(element, {
        boxShadow: '8px 8px 0px #0A0A0A',
        duration: 0.6,
        yoyo: true,
        repeat: -1,
        ease: 'power2.inOut',
        ...options
    });
};

/**
 * Page transition animation
 */
export const pageTransition = (element: HTMLElement, options = {}) => {
    const tl = gsap.timeline();

    tl.from(element, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
        ...options
    });

    return tl;
};

/**
 * Scroll-triggered animation
 */
export const scrollReveal = (element: HTMLElement, options = {}) => {
    return gsap.from(element, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
        ...options
    });
};

export default {
    slideInUp,
    staggerFade,
    buttonHover,
    cardLift,
    shadowPulse,
    pageTransition,
    scrollReveal
};
