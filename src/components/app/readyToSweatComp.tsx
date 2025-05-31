
const buttons = [
    { label: 'Routine', onclick: () => console.log('Routine clicked') },
    { label: 'Free', onclick: () => console.log('Cardio clicked') },
]

export default function readyToSweatComp() {
    return (
        <>
            <div className="bg-gray-600 rounded-2xl flex flex-col p-5 items-center text-black shadow-md w-full max-w-2xl mx-auto space-y-4">
                <h2 className="text-2xl md:text-3xl text-center">Ready to sweat?</h2>
                <p className="text-center text-sm md:text-base">
                    Choose your workout style for today and let's get moving!
                </p>

                <div className="flex flex-col sm:flex-row sm:space-x-4 w-full justify-center space-y-4 sm:space-y-0">
                    {buttons.map((button) => (
                    <button
                        key={button.label}
                        onClick={button.onclick}
                        className="bg-gray-400 rounded p-4 hover:bg-gray-500 transition-colors w-full sm:w-1/4 cursor-pointer"
                    >
                        {button.label}
                    </button>
                    ))}
                </div>
            </div>
        </>
    )
}
