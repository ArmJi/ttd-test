import { useState, useEffect, useRef } from "react";
import './layout-test.css'
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Status from "./status";

export interface category {
    title: string;
    value: string;
}
interface TodoItem {
    title: string;
    date: string;
    status: string;
};

interface Form {
    title: string;
    date: string;
}

function TodoList() {
    const [data, setData] = useState<TodoItem[]>([]);
    const category = [
        {
            title: "All",
            value: ""
        },
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

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("formData", formData);
        setData(prev => [
            ...prev,
            {
                title: formData.title,
                date: formData.date,
                status: "todo"

            }
        ])
    }

    const datePicker = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (datePicker.current) {
            flatpickr(datePicker.current, {
                onChange: function (selectedDates, dateStr, instance) {
                    setFormData(prev => ({
                        ...prev,
                        date: selectedDates[0].toLocaleDateString("sv-SE")
                    }))
                }
            });
        }
    }, []);

    const [formData, setFormData] = useState<Form>({ title: '', date: '' })

    function handleChange(event: { target: { name: any; value: any; }; }) {
        let name = event.target.name
        let value = event.target.value

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const [isOpen, setIsOpen] = useState(false);
    const dropdown = useRef<HTMLDivElement>(null);
    const [selected, setSelected] = useState<category | undefined>(category[0]);

    function handleFilter() {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!dropdown.current?.contains(event.target as Node)) {
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

    function setDropdown(value: category) {
        let sortData = [...data].filter((item) => item.status == value.value)
        setSelected(value)
        setIsOpen(false)
    }

    useEffect(() => {
        setData([
            {
                title: 'test 1',
                date: '2012-06-12',
                status: 'todo'
            },
            {
                title: 'test 2',
                date: '2024-07-30',
                status: 'in_progress'
            },
            {
                title: 'test 3',
                date: '2021-02-30',
                status: 'in_progress'
            },
            {
                title: 'test 4',
                date: '2014-07-23',
                status: 'done'
            },
        ])
    }, [])

    return (
        <>
            <div className="layout_test">
                <h1 className="main_title">Todo List</h1>
                <form className="form grid gap-[20px]" onSubmit={handleSubmit}>
                    <div className="col grid grid-cols-[1fr_1fr_200px] gap-[20px] items-end">
                        <div className="wrap_input relative grid gap-[6px]">
                            <label htmlFor="title" className="text-xl">Title</label>
                            <input type="text" onChange={handleChange} value={formData.title} className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg border-sixth" name="title" />
                        </div>
                        <div className="wrap_input relative grid gap-[6px]">
                            <label htmlFor="date" className="text-xl">Date</label>
                            <input type="text" className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg border-sixth" name="date" ref={datePicker} />
                        </div>
                        <button type="submit" className="submit_btn">Submit</button>
                    </div>
                    {/* <div className="col grid grid-cols-[1fr_200px] gap-[20px] items-end">
                        <div className="wrap_input relative grid gap-[6px]">
                            <label htmlFor="date" className="text-xl">Keyword</label>
                            <input type="text" className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg border-sixth" name="keyword" />
                        </div>
                    </div> */}
                </form>
                <div className="wrap_filter">
                    <button className="filter_date">Latest Date</button>
                    <div className="wrap_dropdown" ref={dropdown}>
                        <div className="label" onClick={handleFilter} >Status : {selected?.title}</div>
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
                <div className="table">
                    <div className="header">
                        <div className="th title text-xl">Title</div>
                        <div className="th date text-xl">Date</div>
                        <div className="th status text-xl">Status</div>
                    </div>
                    <div className="row">
                        {
                            data.length > 0 &&
                            data.map((item, index) => {
                                return (
                                    <div className="wrap_list" key={index}>
                                        <div className="tr title text-xl"><span>{item.title}</span></div>
                                        <div className="tr date text-xl"><span>{item.date}</span></div>
                                        <Status status={item.status} callBack={() => { }} />
                                    </div>
                                )
                            })
                        }
                        {
                            data.length == 0 &&
                            <div className="no_data"><span>NO DATA</span></div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default TodoList;