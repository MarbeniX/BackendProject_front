import SearchBarRoutinesComp from "@/components/forms/SearchBarRoutinesComp"
import { useRoutineFormStore } from "@/stores/routineStore"
import HowDoYouWanToTrainPopUp from "@/components/pop-ups/HowDoYouWantToTrainPopUp"

export default function TrainView() {

    const handleContinueTraining = () => {
        setShowSearchRoutines(false)
        setHowDoYouWantToTrain(false)
    }
    const handleCloseTraining = () => {
        setHowDoYouWantToTrain(true)
        setShowSearchRoutines(false)
    }

    const showSearchBarRoutines = useRoutineFormStore((state) => state.showSearchRoutinesBar)
    const showHowDoYouWantToTrain = useRoutineFormStore((state) => state.showHowDoYouWantToTrainPopUp)
    const setShowSearchRoutines = useRoutineFormStore((state) => state.setShowSearchRoutinesBar)
    const setHowDoYouWantToTrain = useRoutineFormStore((state) => state.setShowHowDoYouWantToTrain)
    return (
        <>
            <div>

            </div>


            {showHowDoYouWantToTrain && (
                <HowDoYouWanToTrainPopUp
                isOpen={showHowDoYouWantToTrain}
                />
            )}

            {showSearchBarRoutines && (
                <SearchBarRoutinesComp
                    isOpen={showSearchBarRoutines}
                    onContinue={handleContinueTraining}
                    onClose={handleCloseTraining}
                />
            )}
        </>
    )
}
