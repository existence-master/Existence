const ScrollIndicator = () => {
	return (
		<div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
			<div className="text-gray-300 text-lg font-mono animate-blink glow-effect-text">
				Scroll to live
			</div>
		</div>
	);
};

export default ScrollIndicator;