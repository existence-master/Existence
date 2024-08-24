"use client"

import React, {
	useCallback,
	useContext,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState
} from "react"
import { motion, AnimatePresence, MotionConfig } from "framer-motion"
import { createPortal } from "react-dom"
import useClickOutside from "@hooks/useOutsideClick"
import { XIcon } from "lucide-react"
import clsx from "clsx"
import { twMerge } from "tailwind-merge"

const cn = (...inputs) => {
	return twMerge(clsx(inputs))
}

const DialogContext = React.createContext(null)

function useDialog() {
	const context = useContext(DialogContext)
	if (!context) {
		throw new Error("useDialog must be used within a DialogProvider")
	}
	return context
}

function DialogProvider({ children, transition }) {
	const [isOpen, setIsOpen] = useState(false)
	const uniqueId = useId()
	const triggerRef = useRef(null)

	const contextValue = useMemo(
		() => ({ isOpen, setIsOpen, uniqueId, triggerRef }),
		[isOpen, uniqueId]
	)

	return (
		<DialogContext.Provider value={contextValue}>
			<MotionConfig transition={transition}>{children}</MotionConfig>
		</DialogContext.Provider>
	)
}

function Dialog({ children, transition }) {
	return (
		<DialogProvider>
			<MotionConfig transition={transition}>{children}</MotionConfig>
		</DialogProvider>
	)
}

function DialogTrigger({ children, className, style, triggerRef }) {
	const { setIsOpen, isOpen, uniqueId } = useDialog()

	const handleClick = useCallback(() => {
		setIsOpen(!isOpen)
	}, [isOpen, setIsOpen])

	const handleKeyDown = useCallback(
		(event) => {
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault()
				setIsOpen(!isOpen)
			}
		},
		[isOpen, setIsOpen]
	)

	return (
		<motion.div
			ref={triggerRef}
			layoutId={`dialog-${uniqueId}`}
			className={cn("relative cursor-pointer", className)}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			style={style}
			role="button"
			aria-haspopup="dialog"
			aria-expanded={isOpen}
			aria-controls={`dialog-content-${uniqueId}`}
		>
			{children}
		</motion.div>
	)
}

function DialogContent({ children, className, style }) {
	const { setIsOpen, isOpen, uniqueId, triggerRef } = useDialog()
	const containerRef = useRef(null)
	const [firstFocusableElement, setFirstFocusableElement] = useState(null)
	const [lastFocusableElement, setLastFocusableElement] = useState(null)

	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				setIsOpen(false)
			}
			if (event.key === "Tab") {
				if (!firstFocusableElement || !lastFocusableElement) return

				if (event.shiftKey) {
					if (document.activeElement === firstFocusableElement) {
						event.preventDefault()
						lastFocusableElement.focus()
					}
				} else {
					if (document.activeElement === lastFocusableElement) {
						event.preventDefault()
						firstFocusableElement.focus()
					}
				}
			}
		}

		document.addEventListener("keydown", handleKeyDown)

		return () => {
			document.removeEventListener("keydown", handleKeyDown)
		}
	}, [setIsOpen, firstFocusableElement, lastFocusableElement])

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("overflow-hidden")
			const focusableElements = containerRef.current?.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			)
			if (focusableElements && focusableElements.length > 0) {
				setFirstFocusableElement(focusableElements[0])
				setLastFocusableElement(
					focusableElements[focusableElements.length - 1]
				)
				focusableElements[0].focus()
			}
		} else {
			document.body.classList.remove("overflow-hidden")
			triggerRef.current?.focus()
		}
	}, [isOpen, triggerRef])

	useClickOutside(containerRef, () => {
		if (isOpen) {
			setIsOpen(false)
		}
	})

	return (
		<motion.div
			ref={containerRef}
			layoutId={`dialog-${uniqueId}`}
			className={cn("overflow-hidden", className)}
			style={style}
			role="dialog"
			aria-modal="true"
			aria-labelledby={`dialog-title-${uniqueId}`}
			aria-describedby={`dialog-description-${uniqueId}`}
		>
			{children}
		</motion.div>
	)
}

function DialogContainer({ children }) {
	const { isOpen, uniqueId } = useDialog()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
		return () => setMounted(false)
	}, [])

	if (!mounted) return null

	return createPortal(
		<AnimatePresence initial={false} mode="sync">
			{isOpen && (
				<>
					<motion.div
						key={`backdrop-${uniqueId}`}
						className="fixed inset-0 h-full w-full bg-white/40 backdrop-blur-sm dark:bg-black/40"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					/>
					<div className="fixed inset-0 z-50 flex items-center justify-center">
						{children}
					</div>
				</>
			)}
		</AnimatePresence>,
		document.body
	)
}

function DialogTitle({ children, className, style }) {
	const { uniqueId } = useDialog()

	return (
		<motion.div
			layoutId={`dialog-title-container-${uniqueId}`}
			className={className}
			style={style}
			layout
		>
			{children}
		</motion.div>
	)
}

function DialogSubtitle({ children, className, style }) {
	const { uniqueId } = useDialog()

	return (
		<motion.div
			layoutId={`dialog-subtitle-container-${uniqueId}`}
			className={className}
			style={style}
		>
			{children}
		</motion.div>
	)
}

function DialogDescription({
	children,
	className,
	variants,
	disableLayoutAnimation
}) {
	const { uniqueId } = useDialog()

	return (
		<motion.div
			key={`dialog-description-${uniqueId}`}
			layoutId={
				disableLayoutAnimation
					? undefined
					: `dialog-description-content-${uniqueId}`
			}
			variants={variants}
			className={className}
			initial="initial"
			animate="animate"
			exit="exit"
			id={`dialog-description-${uniqueId}`}
		>
			{children}
		</motion.div>
	)
}

function DialogImage({ src, alt, className, style }) {
	const { uniqueId } = useDialog()

	return (
		<motion.img
			src={src}
			alt={alt}
			className={cn(className)}
			layoutId={`dialog-img-${uniqueId}`}
			style={style}
		/>
	)
}

function DialogClose({ children, className, variants }) {
	const { setIsOpen, uniqueId } = useDialog()

	const handleClose = useCallback(() => {
		setIsOpen(false)
	}, [setIsOpen])

	return (
		<motion.button
			onClick={handleClose}
			type="button"
			aria-label="Close dialog"
			key={`dialog-close-${uniqueId}`}
			className={cn("absolute right-6 top-6", className)}
			initial="initial"
			animate="animate"
			exit="exit"
			variants={variants}
		>
			{children || <XIcon size={24} />}
		</motion.button>
	)
}

export {
	Dialog,
	DialogTrigger,
	DialogContainer,
	DialogContent,
	DialogClose,
	DialogTitle,
	DialogSubtitle,
	DialogDescription,
	DialogImage
}
