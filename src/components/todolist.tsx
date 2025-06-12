import { useState, useEffect, useRef, ChangeEvent } from "react";
import './layout-test.css'
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Status from "./status";
import image_close from "../assets/close.png";

// ================== type ==================
export interface category {
    title: string;
    value: string;
}
interface TodoItem {
    title: string;
    date: string;
    status: string;
    id: string;
};

interface Form {
    title: string;
    date: string;
}

function TodoList() {
    // ================== all variable ==================
    const [data, setData] = useState<TodoItem[]>([]);
    const [formData, setFormData] = useState<Form>({ title: '', date: '' })
    const [error, setError] = useState<Form>({ title: '', date: '' })
    const LOCAL_STORAGE_KEY = "todoListData";
    const [mockData, setMockData] = useState(() => {
        const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        try {
            return JSON.parse(storedData || "[]")
        } catch {
            return []
        }
    })

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

    // ================== handle submit form ==================

    function generateID() {
        let current = new Date();
        let year = String(current.getFullYear()).padStart(2, '0');
        let date = String(current.getDate()).padStart(2, '0');
        let month = String(current.getMonth()).padStart(2, '0');
        let hour = String(current.getHours()).padStart(2, '0');
        let minute = String(current.getMinutes()).padStart(2, '0');
        let sec = String(current.getSeconds()).padStart(2, '0');
        return 'td' + year + month + date + hour + minute + sec
    }
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let errors: Form = { title: '', date: '' }

        if (!formData['title'].trim()) {
            errors.title = "Title is required"
        }

        if (!formData['date'].trim()) {
            errors.date = "Date is required"
        }

        if (errors.title || errors.date) {
            setError(errors)
            return
        }
        setError({ title: '', date: '' })

        // test post data
        setMockData((prev : TodoItem[]) => [
            ...prev,
            {
                id: generateID(),
                title: formData.title,
                date: formData.date,
                status: "todo"
            }
        ])
    }

    // ================== init date picker ==================
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

    // ================== handle input change ==================
    function handleChange(event: { target: { name: any; value: any; }; }) {
        let name = event.target.name
        let value = event.target.value

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // ================== handle dropdown ==================
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

    // ================== filter handle ==================
    const [filter, setFilter] = useState("");
    function setDropdown(selected: category) {
        setFilter(selected.value)
        setSelected(selected)
        setIsOpen(false)
    }

    const [sort, setSort] = useState(false)

    const [keyword, setKeyword] = useState('')

    function keywordFilter(event: ChangeEvent<HTMLInputElement>) {
        let value = event.target.value
        setKeyword(value)
    }

    // ================== handle status update ==================
    function handleStatus(value: category, id: string) {
        let findIndex = mockData.findIndex((item : TodoItem) => item.id == id)
        let tmp = [...mockData];
        tmp[findIndex] = {
            ...tmp[findIndex],
            status: value.value
        }
        setMockData(tmp)
    }

    function handleDelete(id: string) {
        let newDate = [...mockData].filter(item => item.id !== id);
        setMockData(newDate)
    }

    // ================== simulation fetch ==================
    async function fetchData() {
        return new Promise<TodoItem[]>((resolve) => {
            let res: TodoItem[] = [...mockData]
            if (sort) {
                console.log(sort);
                res = res.sort((a, b) => {
                    let dateA = new Date(a.date);
                    let dateB = new Date(b.date);
                    return dateB.getTime() - dateA.getTime()
                })
            }
            if (filter) {
                res = res.filter(item => item.status === filter)
            }
            if (keyword) {
                res = res.filter(item => item.title.toLowerCase().includes(keyword.toLowerCase()))
            }
            resolve(res)
        })
    }

    useEffect(() => {
        fetchData().then(res => {
            setData(res);
        });
    }, [filter, sort, keyword, mockData]);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(mockData));
        console.log("Data saved to localStorage:", mockData);
    }, [mockData]);

    return (
        <>
            <div className="layout_test">
                <h1 className="main_title">Todo List</h1>
                <form className="form grid gap-[20px]" onSubmit={handleSubmit}>
                    <div className="col grid grid-cols-[1fr_1fr_200px] gap-[20px] items-end">
                        <div className="wrap_input relative grid gap-[6px]">
                            <label htmlFor="title" className="text-xl">Title</label>
                            <input type="text" onChange={handleChange} value={formData.title} className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg border-sixth" name="title" />
                            {
                                error.title &&
                                <div className="error_text">{error.title}</div>
                            }
                        </div>
                        <div className="wrap_input relative grid gap-[6px]">
                            <label htmlFor="date" className="text-xl">Date</label>
                            <input type="text" className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg border-sixth" name="date" ref={datePicker} />
                            {
                                error.date &&
                                <div className="error_text">{error.date}</div>
                            }
                        </div>
                        <button type="submit" className="submit_btn">Submit</button>
                    </div>
                </form>
                <div className="col grid gap-[20px] mt-[20px] items-end">
                    <div className="wrap_input relative grid gap-[6px]">
                        <label htmlFor="date" className="text-xl">Keyword</label>
                        <input type="text" onChange={(e) => keywordFilter(e)} className="rounded-[4px] border-[1px] h-[44px] pl-[12px] text-lg border-sixth" name="keyword" />
                    </div>
                </div>
                <div className="wrap_filter">
                    <button className="filter_date" onClick={() => setSort(true)}>Latest Date</button>
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
                                    <div className="wrap_list" key={item.date + index}>
                                        <div className="tr title text-xl">
                                            <img src={image_close} onClick={() => handleDelete(item.id)} className="delete" alt="delete" />
                                            <span>{item.title}</span>
                                        </div>
                                        <div className="tr date text-xl"><span>{item.date}</span></div>
                                        <Status status={item.status} id={item.id} callBack={(value, id) => { handleStatus(value, id) }} />
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