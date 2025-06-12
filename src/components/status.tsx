import { useEffect, useRef, useState } from "react";
import { category } from "./todolist";

interface Status {
    status: string,
    callBack: (value: category, id: string) => void,
    id: string
}

function Status({status, callBack, id} : Status) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownStatus = useRef<HTMLDivElement>(null);
    const [selected, setSelected] = useState<category | undefined>();

    const category = [
        {
            title: "To Do",
            value: "todo"
        },
        {
            title: "In Progress",
            value: "in_progress"
        },
        {
            title: "Done",
            value: "done"
        }
    ]

    function handleFilter() {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!dropdownStatus.current?.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        if (isOpen) {
            window.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            window.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    useEffect(() => {
        let findValue = category.find(item => item.value == status);
        setSelected(findValue)
    }, [])

    function setDropdown(value: category, id: string) {
        setSelected(value)
        callBack(value, id)
        setIsOpen(false)
    }

    return (
        <div className="tr status" >
            <div className={`wrap_dropdown ${selected?.value}`} onClick={handleFilter} ref={dropdownStatus}>
                <div className={`label_status`}>{selected?.title}</div>
                <div className={`wrap_dd ${isOpen ? "active" : ""}`} >
                    {
                        category.map((item, index) => {
                            return (
                                <div className="list_dd" key={index} onClick={() => setDropdown(item, id)}>{item.title}</div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default Status;