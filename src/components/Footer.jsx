"use client"

import { useState, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { useRef } from "react"
import {
    FiInstagram,
    FiTwitter,
    FiFacebook,
    FiYoutube,
    FiArrowRight,
    FiMail,
    FiPhone,
    FiChevronUp,
} from "react-icons/fi"

const Footer = () => {
    const [email, setEmail] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [year] = useState(new Date().getFullYear())

    // Refs for scroll animations
    const footerRef = useRef(null)
    const isInView = useInView(footerRef, { once: false, amount: 0.1 })
    const controls = useAnimation()

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    // Handle newsletter submission
    const handleSubmit = (e) => {
        e.preventDefault()
        if (email && email.includes("@") && email.includes(".")) {
            setIsSubmitted(true)
            setEmail("")
            // Reset submission status after 3 seconds
            setTimeout(() => {
                setIsSubmitted(false)
            }, 3000)
        }
    }

    // Trigger animations when footer comes into view
    useEffect(() => {
        if (isInView) {
            controls.start("visible")
        }
    }, [isInView, controls])

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10,
            },
        },
    }

    const logoVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
            },
        },
    }

    const wavePathVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 1.5,
                ease: "easeInOut",
            },
        },
    }

    const floatButtonVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
            },
        },
        hover: {
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: {
                duration: 0.3,
            },
        },
    }

    // Footer links
    const footerLinks = {
        shop: [
            { name: "New Arrivals", href: "/new-arrivals" },
            { name: "Best Sellers", href: "/best-sellers" },
            { name: "Sale Items", href: "/sale" },
            { name: "Men's Collection", href: "/mens" },
            { name: "Women's Collection", href: "/womens" },
        ],
        company: [
            { name: "About Us", href: "/about" },
            { name: "Careers", href: "/careers" },
            { name: "Our Stores", href: "/stores" },
            { name: "Terms & Conditions", href: "/terms" },
            { name: "Privacy Policy", href: "/privacy" },
        ],
        help: [
            { name: "Customer Service", href: "/customer-service" },
            { name: "Track Order", href: "/track-order" },
            { name: "Returns & Exchanges", href: "/returns" },
            { name: "Shipping Info", href: "/shipping" },
            { name: "Contact Us", href: "/contact" },
        ],
    }

    // Social media links
    const socialLinks = [
        { name: "Instagram", icon: FiInstagram, href: "https://instagram.com", color: "hover:text-pink-500" },
        { name: "Twitter", icon: FiTwitter, href: "https://twitter.com", color: "hover:text-blue-400" },
        { name: "Facebook", icon: FiFacebook, href: "https://facebook.com", color: "hover:text-blue-600" },
        { name: "YouTube", icon: FiYoutube, href: "https://youtube.com", color: "hover:text-red-600" },
    ]

    return (
        <footer
            ref={footerRef}
            className="relative bg-gray-100 dark:bg-gray-900 pt-16 pb-8 overflow-hidden"
            aria-labelledby="footer-heading"
        >
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>

            {/* Decorative wave SVG */}
            <div className="absolute top-0 left-0 w-full overflow-hidden">
                <svg
                    className="w-full h-12 -mt-1 text-white dark:text-gray-900 fill-current"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <motion.path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        variants={wavePathVariants}
                        initial="hidden"
                        animate={controls}
                    />
                </svg>
            </div>
            <motion.div
                className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8"
                variants={containerVariants}
                initial="hidden"
                animate={controls}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Brand column */}
                    <div className="lg:col-span-3">
                        <motion.div className="flex items-center mb-6" variants={logoVariants}>
                            <div className="relative">
                                <div className="h-12 w-12 rounded-full border-2 border-teal-600 dark:border-teal-500 flex items-center justify-center">
                                    <div
                                        className="h-8 w-8 bg-teal-600 dark:bg-teal-500"
                                        style={{
                                            clipPath:
                                                "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)",
                                        }}
                                    ></div>
                                </div>
                                <div className="absolute -top-1 -right-1 h-3 w-3 bg-teal-600 dark:bg-teal-500 rounded-full"></div>
                                <div className="absolute -bottom-1 -left-1 h-3 w-3 bg-teal-600 dark:bg-teal-500 rounded-full"></div>
                            </div>
                            <span className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">
                                SHARP<span className="text-teal-600 dark:text-teal-500">STYLE</span>
                            </span>
                        </motion.div>

                        <motion.p className="text-gray-600 dark:text-gray-300 mb-6" variants={itemVariants}>
                            Elevate your style with our premium fashion collections. Designed for those who appreciate quality,
                            comfort, and contemporary aesthetics.
                        </motion.p>

                        <motion.div className="flex space-x-4 mb-8" variants={itemVariants}>
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    className={`text-gray-500 dark:text-gray-400 ${social.color} transition-all duration-300`}
                                    aria-label={social.name}
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <social.icon className="h-6 w-6" />
                                </motion.a>
                            ))}
                        </motion.div>
                    </div>

                    {/* Links columns */}
                    <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-4 gap-8">
                        <motion.div variants={itemVariants}>
                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-4">
                                Shop
                            </h3>
                            <ul className="space-y-3">
                                {footerLinks.shop.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-base text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-500 transition-colors duration-200"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-4">
                                Company
                            </h3>
                            <ul className="space-y-3">
                                {footerLinks.company.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-base text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-500 transition-colors duration-200"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-4">
                                Help
                            </h3>
                            <ul className="space-y-3">
                                {footerLinks.help.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-base text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-500 transition-colors duration-200"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-4">
                                Contact Us
                            </h3>
                            <ul className="space-y-4 mb-6">
                                <li className="flex items-center">
                                    <FiMail className="h-5 w-5 text-teal-600 dark:text-teal-500 mr-3" />
                                    <a
                                        href="mailto:info@sharpstyle.com"
                                        className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-500 transition-colors duration-200"
                                    >
                                        info@sharpstyle.com
                                    </a>
                                </li>
                                <li className="flex items-center">
                                    <FiPhone className="h-5 w-5 text-teal-600 dark:text-teal-500 mr-3" />
                                    <a
                                        href="tel:+12125551234"
                                        className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-500 transition-colors duration-200"
                                    >
                                        +1 (212) 555-1234
                                    </a>
                                </li>
                            </ul>

                            {/* Newsletter subscription */}
                            <div className="mt-4">
                                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                                    Subscribe to our newsletter
                                </h4>
                                {isSubmitted ? (
                                    <motion.div
                                        className="text-green-600 dark:text-green-400 flex items-center"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Thanks for subscribing!
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-2">
                                        <div className="relative">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 dark:bg-gray-700 dark:text-white"
                                                placeholder="Your email address"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-3 text-sm rounded-md transition-colors duration-300 flex items-center justify-center"
                                        >
                                            Subscribe
                                            <FiArrowRight className="ml-2" />
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom section with copyright and payment methods */}
                <motion.div className="mt-12 gap-2 pt-8 border-t border-gray-200 dark:border-gray-700" variants={itemVariants}>
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
                            &copy; 2025 SharpStyle. All rights reserved.
                        </p>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center space-x-4">
                                <img src="https://freelogopng.com/images/all_img/1656235223bkash-logo.png" alt="Visa" className="h-8" />
                                <img src="https://freelogopng.com/images/all_img/1679248787Nagad-Logo.png" alt="Mastercard" className="h-8" />
                                <img src="https://static.vecteezy.com/system/resources/thumbnails/020/975/572/small_2x/visa-logo-visa-icon-transparent-free-png.png" alt="PayPal" className="h-8" />
                            </div>
                            <motion.button
                                onClick={scrollToTop}
                                className="bg-teal-600 hidden lg:flex dark:bg-teal-500 text-white p-4 rounded-full shadow-lg  items-center justify-center group"
                                variants={floatButtonVariants}
                                initial="hidden"
                                animate="visible"
                                whileHover="hover"
                                aria-label="Scroll to top"
                            >
                                <FiChevronUp className="h-6 w-6 group-hover:animate-bounce" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Mobile back to top button */}
                <div className="mt-8 flex justify-center lg:hidden">
                    <motion.button
                        onClick={scrollToTop}
                        className="bg-teal-600 dark:bg-teal-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Scroll to top"
                    >
                        <FiChevronUp className="h-5 w-5" />
                    </motion.button>
                </div>
            </motion.div>
        </footer>
    )
}

export default Footer

