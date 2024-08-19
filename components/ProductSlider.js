import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const ProductSlider = ({ products }) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [hoveredProduct, setHoveredProduct] = useState(null)

	const nextProduct = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length)
	}

	const prevProduct = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? products.length - 1 : prevIndex - 1
		)
	}

	return (
		<div className="relative">
			<div className="flex items-center justify-between">
				<button
					onClick={prevProduct}
					className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 focus:outline-none"
				>
					←
				</button>

				<div className="flex justify-center items-center w-full relative overflow-hidden">
					{products.map((product, index) => (
						<motion.div
							key={product.id}
							initial={{ opacity: 0, x: index === 0 ? 0 : 100 }}
							animate={{
								opacity: index === currentIndex ? 1 : 0,
								x: index === currentIndex ? 0 : 100
							}}
							transition={{ duration: 0.5 }}
							className="absolute w-full"
						>
							<div
								className="relative"
								onMouseEnter={() => setHoveredProduct(product)}
								onMouseLeave={() => setHoveredProduct(null)}
							>
								<img
									src={product.logo}
									alt={product.name}
									className="w-full h-full object-contain rounded-md shadow-md glow-effect-image"
								/>
							</div>
						</motion.div>
					))}
				</div>

				<button
					onClick={nextProduct}
					className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 focus:outline-none"
				>
					→
				</button>
			</div>

			<AnimatePresence>
				{hoveredProduct && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.8 }}
							className="bg-white p-6 rounded-lg shadow-lg max-w-xs relative"
							onMouseEnter={() =>
								setHoveredProduct(hoveredProduct)
							}
							onMouseLeave={() => setHoveredProduct(null)}
						>
							<img
								src={hoveredProduct.logo}
								alt={hoveredProduct.name}
								className="w-16 h-16 object-contain mb-4"
							/>
							<h2 className="text-xl font-semibold mb-2">
								{hoveredProduct.name}
							</h2>
							<p className="text-gray-600 mb-4">
								{hoveredProduct.description}
							</p>
							<a
								href={hoveredProduct.link}
								className="text-blue-500 hover:underline"
							>
								Learn More
							</a>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default ProductSlider