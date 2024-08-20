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
					className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white focus:outline-none transform transition-transform hover:scale-110"
				>
					←
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
							className="w-full h-full"
							style={index === currentIndex ? {display: "block"} : { display: "none" }}
						>
							<div
								className="relative"
								onMouseEnter={() => setHoveredProduct(product)}
								onMouseLeave={() => setHoveredProduct(null)}
							>
								<img
									src={product.logo}
									alt={product.name}
									className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-lg"
								/>
							</div>
						</motion.div>
					))}
				</div>

				<button
					onClick={nextProduct}
					className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500 text-white focus:outline-none transform transition-transform hover:scale-110"
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
							className="bg-white p-8 rounded-lg shadow-2xl max-w-md relative transform transition-transform hover:scale-105"
							onMouseEnter={() =>
								setHoveredProduct(hoveredProduct)
							}
							onMouseLeave={() => setHoveredProduct(null)}
						>
							<img
								src={hoveredProduct.logo}
								alt={hoveredProduct.name}
								className="w-20 h-20 object-contain mb-6"
							/>
							<h2 className="text-2xl font-semibold mb-4">
								{hoveredProduct.name}
							</h2>
							<p className="text-gray-700 mb-6">
								{hoveredProduct.description}
							</p>
							<a
								href={hoveredProduct.link}
								className="text-blue-600 hover:text-blue-800 underline"
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