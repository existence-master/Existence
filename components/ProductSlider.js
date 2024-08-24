import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogImage,
	DialogSubtitle,
	DialogClose,
	DialogDescription,
	DialogContainer
} from "@components/Dialog"
import { PlusIcon, ArrowRightIcon, ArrowLeftIcon } from "lucide-react"

const DialogSimple = ({ title, imagesrc, desc1, desc2, desc3, link }) => {
	return (
		<Dialog
			transition={{
				type: "spring",
				bounce: 0.05,
				duration: 0.25
			}}
		>
			<DialogTrigger
				style={{
					borderRadius: "12px"
				}}
				className="relative md:w-[300px] md:h-[350px] xs:w-[300px] xs:h-[350px] flex flex-col justify-center items-center overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900"
			>
				<DialogImage
					src={imagesrc}
					alt={title}
					className="w-full h-[200px]"
				/>
				<div className="flex flex-row items-end justify-between p-2 w-full px-4">
					<div>
						<DialogTitle className="text-zinc-950 dark:text-zinc-50">
							{title}
						</DialogTitle>
						<DialogSubtitle className="text-zinc-700 dark:text-zinc-400">
							{desc1}
						</DialogSubtitle>
					</div>
					<button
						type="button"
						className="absolute bottom-4 right-4 ml-1 flex h-6 w-6 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500"
						aria-label="Open dialog"
					>
						<PlusIcon size={12} />
					</button>
				</div>
			</DialogTrigger>
			<DialogContainer>
				<DialogContent
					style={{
						borderRadius: "24px"
					}}
					className="pointer-events-auto relative flex h-auto w-full flex-col items-center justify-center overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px]"
				>
					<DialogImage
						src={imagesrc}
						alt={title}
						className="w-full p-8"
					/>
					<div className="p-6">
						<DialogTitle className="text-2xl text-zinc-950 dark:text-zinc-50">
							{title}
						</DialogTitle>
						<DialogSubtitle className="text-zinc-700 dark:text-zinc-400">
							{desc1}
						</DialogSubtitle>
						<DialogDescription
							disableLayoutAnimation
							variants={{
								initial: {
									opacity: 0,
									scale: 0.8,
									y: 100
								},
								animate: {
									opacity: 1,
									scale: 1,
									y: 0
								},
								exit: {
									opacity: 0,
									scale: 0.8,
									y: 100
								}
							}}
						>
							<p className="mt-2 text-zinc-500 dark:text-zinc-500">
								{desc2}
							</p>
							<p className="text-zinc-500">{desc3}</p>
							<a
								className="mt-2 inline-flex text-zinc-500 underline"
								href={link}
								target="_blank"
								rel="noopener noreferrer"
							>
								Learn More
							</a>
						</DialogDescription>
					</div>
					<DialogClose className="text-zinc-50" />
				</DialogContent>
			</DialogContainer>
		</Dialog>
	)
}

const ProductSlider = ({ products }) => {
	const [currentIndex, setCurrentIndex] = useState(0)

	const nextProduct = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
	}

	const prevProduct = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? products.length - 1 : prevIndex - 1
		)
	}

	return (
		<div className="relative mt-20">
			<div className="flex items-center justify-between xs:overflow-x-hidden md:overflow-auto">
				<button
					onClick={prevProduct}
					className="p-3 xs:ml-1 md:ml-0 rounded-full bg-gradient-to-r from-zinc-500 to-zinc-700 hover:from-zinc-700 hover:to-zinc-500 text-white focus:outline-none transform transition-transform hover:scale-110"
				>
					<ArrowLeftIcon className="xs:w-6 xs:h-6 md:h-8 md:w-8" />
				</button>

				<div className="flex justify-center items-center w-full h-full relative">
					{products.map((product, index) => (
						<motion.div
							key={product.id}
							initial={{ opacity: 0 }}
							animate={{
								opacity: index === currentIndex ? 1 : 0
							}}
							transition={{ duration: 0.5 }}
							className=""
							style={
								index === currentIndex
									? { display: "block" }
									: { display: "none" }
							}
						>
							<DialogSimple
								title={product.name}
								imagesrc={product.logo}
								desc1={product.desc1}
								desc2={product.desc2}
								desc3={product.desc3}
								link={product.link}
							/>
						</motion.div>
					))}
				</div>

				<button
					onClick={nextProduct}
					className="p-3 xs:mr-2 md:mr-0 rounded-full bg-gradient-to-r from-zinc-500 to-zinc-700 hover:from-zinc-700 hover:to-zinc-500 text-white focus:outline-none transform transition-transform hover:scale-110"
				>
					<ArrowRightIcon className="xs:w-6 xs:h-6 md:h-8 md:w-8" />
				</button>
			</div>
		</div>
	)
}

export default ProductSlider
