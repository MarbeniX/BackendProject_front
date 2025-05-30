import type { AuthGetUser } from "@/types/authTypes";
import { IoIosArrowDown } from "react-icons/io";

type headerCompProps = {
    data: AuthGetUser['username'];
}

export default function headerComp({data} : headerCompProps) {
    return (
        <>
            <header className="bg-gray-200 p-4 flex items-center justify-end">
                <div className=" flex space-x-5 mr-4">
                    <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md cursor-pointer">
                        Let's train
                    </button>

                    <div className="bg-gray-500 text-white px-4 py-2 rounded-md flex items-center space-x-2">
                        <label>{data}</label>
                        <IoIosArrowDown/>
                    </div>
                </div>
            </header>
        </>
    )
}
