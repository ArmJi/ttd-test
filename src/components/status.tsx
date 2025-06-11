import { useEffect, useRef, useState } from "react";
import { category } from "./todolist";

interface Status {
    status: string,
    callBack: (value: category) => void
}

function Status({status, callBack} : Status) {
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

    function setDropdown(value: category) {
        setSelected(value)
        callBack(value)
        setIsOpen(false)
    }

    return (
        <div className="tr status" >
            <div className={`wrap_dropdown ${selected?.value}`} ref={dropdownStatus}>
                <div className={`label_status`} onClick={handleFilter}>{selected?.title}</div>
                <div className={`wrap_dd ${isOpen ? "active" : ""}`} >
                    {
                        category.map((item, index) => {
                            return (
                                <div className="list_dd" key={index} onClick={() => setDropdown(item)}>{item.title}</div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
export default Status;