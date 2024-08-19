import { useState } from "react"
import { motion } from "framer-motion"
import { Scrollbars } from "@om-tlh/react-custom-scrollbars"

const Roadmap = ({ checkpoints }) => {
	const [activeIndex, setActiveIndex] = useState(0)

	const handleScroll = (event) => {
		const scrollY = event.target.scrollTop
		const index = Math.floor(scrollY / 120) // Adjust based on your item height
		setActiveIndex(index)
	}

	return (
		<div className="flex h-full">
			<Scrollbars
				style={{ width: "40%", height: "40vh" }}
				onScroll={handleScroll}
				autoHide
				renderThumbVertical={({ style, ...props }) => (
					<div
						{...props}
						style={{
							...style,
							backgroundColor: "#6b7280",
							borderRadius: "4px"
						}}
					/>
				)}
			>
				<div className="p-4 space-y-8">
					{checkpoints.map((checkpoint, index) => (
						<div
							key={checkpoint.id}
							className={`flex items-center p-4 space-x-4 rounded-lg transition-all duration-300 
              ${
					index === activeIndex
						? "bg-blue-500 text-white shadow-lg"
						: "bg-gray-200"
				}`}
						>
							<img
								src={checkpoint.icon}
								alt={checkpoint.name}
								className="w-10 h-10 object-contain"
							/>
							<span className="text-lg font-medium">
								{checkpoint.name}
							</span>
						</div>
					))}
				</div>
			</Scrollbars>

			<div className="flex flex-grow items-center relative">
				{checkpoints.map((checkpoint, index) => (
					<motion.img
						key={checkpoint.id}
						src={checkpoint.image}
						alt={checkpoint.name}
						className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-auto object-contain 
                        ${index === activeIndex ? "block" : "hidden"}`}
						initial={{ opacity: 0 }}
						animate={{ opacity: index === activeIndex ? 1 : 0 }}
						transition={{ duration: 0.5 }}
					/>
				))}
			</div>
		</div>
	)
}

export default Roadmap