"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiSearch, FiShoppingCart, FiUser, FiHeart, FiMenu, FiX, FiSun, FiMoon, FiChevronRight } from "react-icons/fi"
import { NavLink } from "react-router"

const NotFoundSearch = ({ searchQuery }) => {
    const containerVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }
    const itemVariants = {
        initial: { y: 20, opacity: 0 },
        animate: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 25,
            },
        },
    }
    const iconVariants = {
        initial: { scale: 0.5, opacity: 0 },
        animate: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
            },
        },
        hover: {
            scale: 1.1,
            rotate: [0, -10, 10, -10, 0],
            transition: {
                duration: 0.5,
            },
        },
    }
    return (
        <motion.div
            className="flex flex-col items-center justify-center py-8 px-4 bg-white dark:bg-gray-800"
            variants={containerVariants}
            initial="initial"
            animate="animate"
        >
            <motion.div
                className="h-24 w-24 text-gray-300 dark:text-gray-600 mb-4"
                variants={iconVariants}
                whileHover="hover"
            >
                <FiSearch className="h-full w-full" />
            </motion.div>

            <motion.h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center" variants={itemVariants}>
                No results found
            </motion.h2>

            <motion.p className="text-gray-600 dark:text-gray-400 text-center mb-6 max-w-md" variants={itemVariants}>
                We couldn't find any products matching "{searchQuery}". Please try a different search term or browse our
                categories.
            </motion.p>

            <motion.button
                className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md transition-colors duration-200"
                variants={itemVariants}
            >
                Browse Categories
            </motion.button>
        </motion.div>
    )
}

// Book Pin Navigation Component
const BookPinNav = () => {
    const routes = [
        { name: "HOME", path: "/" },
        { name: "PRODUCTS", path: "/products" },
    ]

    const pinVariants = {
        inactive: {
            width: "40px",
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
        active: {
            width: "140px",
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
    }

    const textVariants = {
        inactive: {
            opacity: 0,
            x: -10,
            transition: {
                duration: 0.2,
            },
        },
        active: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.3,
                delay: 0.1,
            },
        },
    }

    return (
        <div className="fixed left-0 top-1/5 -translate-y-1/5 z-40 hidden md:flex flex-col gap-4">
            {routes.map((route) => (
                <NavLink key={route.path} to={route.path} className={({ isActive }) => `relative`}>
                    {({ isActive }) => (
                        <motion.div
                            className={`flex items-center bg-teal-600 text-white rounded-r-full shadow-md overflow-hidden ${isActive ? "pl-3 pr-6" : "pl-2 pr-4"}`}
                            initial="inactive"
                            animate={isActive ? "active" : "inactive"}
                            variants={pinVariants}
                        >
                            <div className="relative flex items-center justify-center min-w-[24px] h-10">
                                <div className="absolute w-3 h-3 rounded-full bg-white"></div>
                                <div
                                    className={`absolute w-5 h-5 rounded-full border-2 border-white ${isActive ? "scale-100" : "scale-75"} transition-transform duration-300`}
                                ></div>
                            </div>
                            <motion.span
                                className="whitespace-nowrap font-medium ml-1"
                                variants={textVariants}
                                initial="inactive"
                                animate={isActive ? "active" : "inactive"}
                            >
                                {route.name}
                            </motion.span>
                        </motion.div>
                    )}
                </NavLink>
            ))}
        </div>
    )
}

const Navbar = () => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [showSearchResults, setShowSearchResults] = useState(false)
    const [noResults, setNoResults] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [prevScrollPos, setPrevScrollPos] = useState(0)
    const [visible, setVisible] = useState(true)
    const [showSidebarSearchResults, setShowSidebarSearchResults] = useState(false)
    const searchRef = useRef(null)
    const cartRef = useRef(null)

    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            const savedMode = localStorage.getItem("darkMode")
            return savedMode === "true"
        }
        return false
    })

    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode
        setIsDarkMode(newDarkMode)
        document.documentElement.setAttribute("data-theme", newDarkMode ? "dark" : "light")
        localStorage.setItem("darkMode", newDarkMode)
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedCartItems = localStorage.getItem("cartItems")
            if (savedCartItems) {
                setCartItems(JSON.parse(savedCartItems))
            } else {
                const demoItems = [
                    {
                        id: 1,
                        name: "Refreshing Perfume Oil Box 2.0 - L",
                        price: 990,
                        quantity: 1,
                        image: "/placeholder.svg",
                    },
                ]
                setCartItems(demoItems)
                localStorage.setItem("cartItems", JSON.stringify(demoItems))
            }

            document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light")
        }
    }, [isDarkMode])

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY
            const visible = prevScrollPos > currentScrollPos || currentScrollPos < 10

            setPrevScrollPos(currentScrollPos)
            setVisible(visible)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [prevScrollPos])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearchResults(false)
            }
            if (cartRef.current && !cartRef.current.contains(event.target) && !event.target.closest(".cart-toggle")) {
                setIsCartOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            if (searchQuery.toLowerCase() === "notfound" || Math.random() > 0.7) {
                setSearchResults([])
                setNoResults(true)
            } else {
                const results = [
                    {
                        id: 1,
                        name: "Full Sleeve Dawah Jersey - SJ15",
                        price: 275,
                        originalPrice: 550,
                        image: "/placeholder.svg",
                    },
                    {
                        id: 2,
                        name: "Full Sleeve Dawah Jersey - SJ16",
                        price: 275,
                        originalPrice: 550,
                        image: "/placeholder.svg",
                    },
                    {
                        id: 3,
                        name: "Full Sleeve Dawah Jersey - SJ17",
                        price: 275,
                        originalPrice: 550,
                        image: "/placeholder.svg",
                    },
                ]
                setSearchResults(results)
                setNoResults(false)
            }
            setShowSearchResults(true)
            setShowSidebarSearchResults(true)
        } else {
            setSearchResults([])
            setShowSearchResults(false)
            setShowSidebarSearchResults(false)
            setNoResults(false)
        }
    }

    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

    const removeFromCart = (id) => {
        const updatedCart = cartItems.filter((item) => item.id !== id)
        setCartItems(updatedCart)
        localStorage.setItem("cartItems", JSON.stringify(updatedCart))
    }

    const categories = [
        { name: "HOME", link: "/" },
        { name: "PRODUCTS", link: "/products" },
    ]

    const navbarVariants = {
        visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
        hidden: { y: -100, opacity: 0, transition: { duration: 0.3 } },
    }

    const logoVariants = {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
    }

    const searchVariants = {
        initial: { width: "90%", opacity: 0 },
        animate: { width: "100%", opacity: 1, transition: { duration: 0.3, delay: 0.2 } },
    }

    const iconVariants = {
        initial: { y: -10, opacity: 0 },
        animate: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.3,
                delay: 0.1 * i,
            },
        }),
        hover: { scale: 1.1, transition: { duration: 0.2 } },
    }

    const cartVariants = {
        hidden: { x: "100%", opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
        exit: { x: "100%", opacity: 0, transition: { duration: 0.2 } },
    }

    const menuVariants = {
        hidden: { x: "-100%", opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } },
        exit: { x: "-100%", opacity: 0, transition: { duration: 0.2 } },
    }

    const searchResultsVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    }

    const emptyCartVariants = {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
        hover: { scale: 1.05, transition: { duration: 0.2 } },
    }

    return (
        <>
            <BookPinNav />
            <header>
                <motion.nav
                    className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md"
                    variants={navbarVariants}
                    initial="visible"
                    animate={visible ? "visible" : "hidden"}
                    aria-label="Main Navigation"
                    itemScope
                    itemType="https://schema.org/SiteNavigationElement"
                >
                    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16 md:h-20">
                            <div className="flex md:hidden">
                                <motion.button
                                    variants={iconVariants}
                                    initial="initial"
                                    animate="animate"
                                    whileHover="hover"
                                    custom={1}
                                    className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400"
                                    onClick={() => setIsMenuOpen(true)}
                                    aria-expanded={isMenuOpen}
                                    aria-controls="mobile-menu"
                                    aria-label="Open menu"
                                >
                                    <FiMenu className="h-6 w-6" />
                                </motion.button>
                            </div>
                            <motion.div
                                className="flex-shrink-0 flex items-center"
                                variants={logoVariants}
                                initial="initial"
                                animate="animate"
                                itemProp="publisher"
                                itemScope
                                itemType="https://schema.org/Organization"
                            >
                                <a href="/" aria-label="Believer's Sign Home" itemProp="url">
                                    <div className="h-10 w-auto flex items-center">
                                        <div className="relative">
                                            <div className="h-10 w-10 rounded-full border-2 border-teal-600 dark:border-teal-500 flex items-center justify-center">
                                                <div
                                                    className="h-7 w-7 bg-teal-600 dark:bg-teal-500"
                                                    style={{
                                                        clipPath:
                                                            "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)",
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="absolute -top-1 -right-1 h-3 w-3 bg-teal-600 dark:bg-teal-500 rounded-full"></div>
                                            <div className="absolute -bottom-1 -left-1 h-3 w-3 bg-teal-600 dark:bg-teal-500 rounded-full"></div>
                                        </div>
                                        <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white uppercase" itemProp="name">
                                            Sharp Style
                                        </span>
                                    </div>
                                </a>
                            </motion.div>

                            <div className="hidden md:flex flex-1 max-w-xl mx-4 relative" ref={searchRef}>
                                <motion.form
                                    className="w-full flex"
                                    variants={searchVariants}
                                    initial="initial"
                                    animate="animate"
                                    onSubmit={handleSearch}
                                    role="search"
                                    aria-label="Site search"
                                >
                                    <label htmlFor="desktop-search" className="sr-only">
                                        Search for products
                                    </label>
                                    <input
                                        id="desktop-search"
                                        type="search"
                                        placeholder="Search for products"
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:text-white"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onFocus={() => searchQuery.trim() && setShowSearchResults(true)}
                                        aria-autocomplete="list"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-r-md transition-colors duration-200"
                                        aria-label="Search"
                                    >
                                        <FiSearch className="h-5 w-5" />
                                    </button>
                                </motion.form>

                                <AnimatePresence>
                                    {showSearchResults && (
                                        <motion.div
                                            className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10"
                                            variants={searchResultsVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            role="listbox"
                                            aria-label="Search results"
                                        >
                                            {noResults ? (
                                                <NotFoundSearch searchQuery={searchQuery} />
                                            ) : (
                                                <div className="p-4">
                                                    {searchResults.map((result) => (
                                                        <div
                                                            key={result.id}
                                                            className="flex items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
                                                            role="option"
                                                        >
                                                            <div className="h-16 w-16 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                                                                <img
                                                                    src={result.image || "/placeholder.svg"}
                                                                    alt={result.name}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                            <div className="ml-4 flex-1">
                                                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{result.name}</h4>
                                                                <div className="flex items-center mt-1">
                                                                    <span className="text-teal-600 dark:text-teal-500 font-bold">{result.price}৳</span>
                                                                    <span className="ml-2 text-gray-500 dark:text-gray-400 line-through text-sm">
                                                                        {result.originalPrice}৳
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {searchResults.length > 0 && (
                                                        <div className="mt-3 text-center">
                                                            <button className="text-teal-600 dark:text-teal-500 font-medium hover:underline">
                                                                VIEW ALL RESULTS
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="flex items-center space-x-4">
                                <motion.button
                                    variants={iconVariants}
                                    initial="initial"
                                    animate="animate"
                                    whileHover="hover"
                                    custom={3}
                                    className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400"
                                    onClick={toggleDarkMode}
                                    aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                                >
                                    <AnimatePresence mode="wait" initial={false}>
                                        {isDarkMode ? (
                                            <motion.div
                                                key="moon"
                                                initial={{ rotate: -90, opacity: 0 }}
                                                animate={{ rotate: 0, opacity: 1 }}
                                                exit={{ rotate: 90, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <FiMoon className="h-6 w-6" />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="sun"
                                                initial={{ rotate: 90, opacity: 0 }}
                                                animate={{ rotate: 0, opacity: 1 }}
                                                exit={{ rotate: -90, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <FiSun className="h-6 w-6" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.button>

                                <motion.a
                                    href="/account"
                                    variants={iconVariants}
                                    initial="initial"
                                    animate="animate"
                                    whileHover="hover"
                                    custom={4}
                                    className="hidden md:block text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400"
                                    aria-label="My account"
                                    itemProp="url"
                                >
                                    <FiUser className="h-6 w-6" />
                                </motion.a>

                                <motion.a
                                    href="/wishlist"
                                    variants={iconVariants}
                                    initial="initial"
                                    animate="animate"
                                    whileHover="hover"
                                    custom={5}
                                    className="hidden md:block text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400"
                                    aria-label="Wishlist"
                                    itemProp="url"
                                >
                                    <FiHeart className="h-6 w-6" />
                                </motion.a>

                                <motion.button
                                    variants={iconVariants}
                                    initial="initial"
                                    animate="animate"
                                    whileHover="hover"
                                    custom={6}
                                    className="cart-toggle relative text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400"
                                    onClick={() => setIsCartOpen(true)}
                                    aria-label={`Shopping cart with ${cartItems.length} items`}
                                    aria-expanded={isCartOpen}
                                    aria-controls="shopping-cart"
                                >
                                    <FiShoppingCart className="h-6 w-6" />
                                    {cartItems.length > 0 && (
                                        <motion.div
                                            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center bg-teal-600 text-white text-xs rounded-full"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            aria-hidden="true"
                                        >
                                            {cartItems.length}
                                        </motion.div>
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.nav>
            </header>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-50 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Main menu"
                    >
                        <motion.div className="fixed inset-0 bg-gray-600 opacity-50" onClick={() => setIsMenuOpen(false)} />
                        <motion.div
                            className="fixed top-0 left-0 bottom-0 w-full max-w-xs bg-white dark:bg-gray-900 shadow-xl flex flex-col"
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                <div className="h-8 w-auto flex items-center">
                                    <div className="relative">
                                        <div className="h-8 w-8 rounded-full border-2 border-teal-600 dark:border-teal-500 flex items-center justify-center">
                                            <div
                                                className="h-5 w-5 bg-teal-600 dark:bg-teal-500"
                                                style={{
                                                    clipPath:
                                                        "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)",
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                    <span className="ml-2 text-sm font-bold text-gray-900 dark:text-white">SHARP STYLE</span>
                                </div>
                                <button
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    onClick={() => setIsMenuOpen(false)}
                                    aria-label="Close menu"
                                >
                                    <FiX className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                <form className="flex" onSubmit={handleSearch} role="search">
                                    <label htmlFor="sidebar-search" className="sr-only">
                                        Search for products
                                    </label>
                                    <input
                                        id="sidebar-search"
                                        type="search"
                                        placeholder="Search for products"
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:text-white"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-r-md transition-colors duration-200"
                                        aria-label="Search"
                                    >
                                        <FiSearch className="h-5 w-5" />
                                    </button>
                                </form>
                            </div>

                            <AnimatePresence>
                                {showSidebarSearchResults && (
                                    <motion.div
                                        className="mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg"
                                        variants={searchResultsVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        role="listbox"
                                        aria-label="Search results"
                                    >
                                        {noResults ? (
                                            <NotFoundSearch searchQuery={searchQuery} />
                                        ) : (
                                            <div className="p-4">
                                                {searchResults.map((result) => (
                                                    <div
                                                        key={result.id}
                                                        className="flex items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
                                                        role="option"
                                                    >
                                                        <div className="h-16 w-16 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
                                                            <img
                                                                src={result.image || "/placeholder.svg"}
                                                                alt={result.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="ml-4 flex-1">
                                                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">{result.name}</h4>
                                                            <div className="flex items-center mt-1">
                                                                <span className="text-teal-600 dark:text-teal-500 font-bold">{result.price}৳</span>
                                                                <span className="ml-2 text-gray-500 dark:text-gray-400 line-through text-sm">
                                                                    {result.originalPrice}৳
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                {searchResults.length > 0 && (
                                                    <div className="mt-3 text-center">
                                                        <button className="text-teal-600 dark:text-teal-500 font-medium hover:underline">
                                                            VIEW ALL RESULTS
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="flex-1 overflow-y-auto">
                                <nav aria-label="Mobile navigation">
                                    {categories.map((category, index) => (
                                        <NavLink
                                            to={category.link}
                                            key={index}
                                            className={({ isActive }) => `flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 ${isActive ? 'bg-teal-50 dark:bg-teal-900/20 border-l-4 border-l-teal-600' : ''}`}
                                        >
                                            <span className="font-medium">
                                                {category.name}
                                            </span>
                                        </NavLink>
                                    ))}

                                    <motion.a
                                        href="/wishlist"
                                        className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: categories.length * 0.05 }}
                                        itemProp="url"
                                    >
                                        <FiHeart className="h-5 w-5 mr-3 text-gray-500" aria-hidden="true" />
                                        <span className="font-medium" itemProp="name">
                                            WISHLIST
                                        </span>
                                    </motion.a>

                                    <motion.a
                                        href="/account"
                                        className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: (categories.length + 1) * 0.05 }}
                                        itemProp="url"
                                    >
                                        <FiUser className="h-5 w-5 mr-3 text-gray-500" aria-hidden="true" />
                                        <span className="font-medium" itemProp="name">
                                            LOGIN / REGISTER
                                        </span>
                                    </motion.a>
                                </nav>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isCartOpen && (
                    <motion.div
                        className="fixed inset-0 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        id="shopping-cart"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Shopping cart"
                    >
                        <motion.div className="fixed inset-0 bg-gray-600 opacity-50" onClick={() => setIsCartOpen(false)} />
                        <motion.div
                            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-md bg-white dark:bg-gray-900 shadow-xl flex flex-col"
                            variants={cartVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            ref={cartRef}
                        >
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Shopping cart</h2>
                                <button
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                    onClick={() => setIsCartOpen(false)}
                                    aria-label="Close cart"
                                >
                                    <span className="flex items-center">
                                        <FiX className="h-6 w-6 mr-1" />
                                        <span className="text-sm">Close</span>
                                    </span>
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                                {cartItems.length > 0 ? (
                                    <div className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {cartItems.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                className="flex p-4"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
                                                    <img
                                                        src={item.image || "/placeholder.svg"}
                                                        alt={item.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                </div>
                                                <div className="ml-4 flex-1">
                                                    <div className="flex justify-between">
                                                        <h4 className="text-sm font-medium text-gray-900 dark:text-white\">{item.name}</h4>
                                                        <button
                                                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                                            onClick={() => removeFromCart(item.id)}
                                                            aria-label={`Remove ${item.name} from cart`}
                                                        >
                                                            <FiX className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                    <div className="mt-1 flex items-center">
                                                        <span className="text-sm text-gray-500 dark:text-gray-400">{item.quantity} ×</span>
                                                        <span className="ml-1 text-teal-600 dark:text-teal-500 font-bold">{item.price}৳</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <motion.div
                                        className="flex flex-col items-center justify-center h-full p-8"
                                        variants={emptyCartVariants}
                                        initial="initial"
                                        animate="animate"
                                    >
                                        <div className="h-24 w-24 text-gray-300 dark:text-gray-600 mb-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M10 14l2 2m0 0l2-2m-2 2V6"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">No products in the cart.</p>
                                        <motion.button
                                            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md transition-colors duration-200"
                                            whileHover="hover"
                                            onClick={() => setIsCartOpen(false)}
                                        >
                                            RETURN TO SHOP
                                        </motion.button>
                                    </motion.div>
                                )}
                            </div>

                            {cartItems.length > 0 && (
                                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex justify-between mb-4">
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">Subtotal:</span>
                                        <span className="text-lg font-bold text-teal-600 dark:text-teal-500">{cartTotal}৳</span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2">
                                        <a
                                            href="/cart"
                                            className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium py-2 rounded-md transition-colors duration-200 text-center"
                                        >
                                            VIEW CART
                                        </a>
                                        <a
                                            href="/checkout"
                                            className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 rounded-md transition-colors duration-200 text-center"
                                        >
                                            CHECKOUT
                                        </a>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="h-16 md:h-20"></div>
        </>
    )
}

export default Navbar

