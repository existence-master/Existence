import { useState } from "react"
import { motion } from "framer-motion"
import { Scrollbars } from "@om-tlh/react-custom-scrollbars"

const Roadmap = ({ checkpoints }) => {
	const [activeIndex, setActiveIndex] = useState(0)

	const handleScroll = (event) => {
		const scrollY = event.target.scrollTop
		const index = Math.floor(scrollY / 50)
		setActiveIndex(index)
	}

	return (
		<>
			<div className="h-full md:hidden xs:flex">
				<Scrollbars
					style={{
						width: "100%",
						height: "60vh"
					}}
					onScroll={handleScroll}
					autoHide
					renderThumbVertical={({ style, ...props }) => (
						<div
							{...props}
							style={{
								...style,
								backgroundColor: "#a1a1aa",
								borderRadius: "10px",
								width: "14px",
								marginRight: "2px"
							}}
						/>
					)}
					renderView={({ style, ...props }) => (
						<div
							{...props}
							style={{
								...style,
								paddingRight: "15px",
								marginRight: "-15px",
								overflowX: "hidden"
							}}
						/>
					)}
				>
					<div className="p-4 space-y-8 font-mono">
						{checkpoints.map((checkpoint, index) => (
							<div key={checkpoint.id}>
								<div className="flex items-center p-4 space-x-4 rounded-lg transition-all duration-300 bg-gradient-to-r from-zinc-500 to-zinc-700 hover:from-zinc-700 hover:to-zinc-500 text-white focus:outline-none transform hover:scale-110">
									<img
										src={checkpoint.icon}
										alt={checkpoint.name}
										className="w-10 h-10 object-contain"
									/>
									<span className="text-lg font-mono font-medium text-black">
										{checkpoint.name}
									</span>
								</div>
								{index === 1 && (
									<div className="flex items-center mt-4">
										<div className="flex-grow border-t border-dotted border-gray-400" />
										<span className="mx-4 text-gray-600">
											we are here
										</span>
										<div className="flex-grow border-t border-dotted border-gray-400" />
									</div>
								)}
							</div>
						))}
					</div>
				</Scrollbars>

				<div className="xs:hidden md:flex flex-grow items-center relative">
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
			<div className="h-full xs:hidden md:flex">
				<Scrollbars
					style={{
						width: "40%",
						height: "60vh"
					}}
					onScroll={handleScroll}
					autoHide
					renderThumbVertical={({ style, ...props }) => (
						<div
							{...props}
							style={{
								...style,
								backgroundColor: "#a1a1aa",
								borderRadius: "10px",
								width: "14px",
								marginRight: "2px"
							}}
						/>
					)}
					renderView={({ style, ...props }) => (
						<div
							{...props}
							style={{
								...style,
								paddingRight: "15px",
								marginRight: "-15px",
								overflowX: "hidden"
							}}
						/>
					)}
				>
					<div className="p-4 space-y-8 font-mono">
						{checkpoints.map((checkpoint, index) => (
							<div key={checkpoint.id}>
								<div className="flex items-center p-4 space-x-4 rounded-lg transition-all duration-300 bg-gradient-to-r from-zinc-500 to-zinc-700 hover:from-zinc-700 hover:to-zinc-500 text-white focus:outline-none transform hover:scale-110">
									<img
										src={checkpoint.icon}
										alt={checkpoint.name}
										className="w-10 h-10 object-contain"
									/>
									<span className="text-lg font-mono font-medium text-black">
										{checkpoint.name}
									</span>
								</div>
								{index === 1 && (
									<div className="flex items-center mt-4">
										<div className="flex-grow border-t border-dotted border-gray-400" />
										<span className="mx-4 text-gray-600">
											we are here
										</span>
										<div className="flex-grow border-t border-dotted border-gray-400" />
									</div>
								)}
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
		</>
	)
}

export default Roadmap
