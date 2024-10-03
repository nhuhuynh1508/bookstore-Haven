import { useEffect, useState } from "react";

export const Form = ({ tasks, onSubmitTask, onFinishTask, onRemoveTask }) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSubmitTask(inputValue.trim());
            setInputValue('');
        } else {
            alert('Enter a task!');
        }
    };

    useEffect(() => {
        // console.log("Input value changed:", inputValue);
        if (inputValue.length >= 100) {
            alert('Your input is too long, try again!');
        }
    },[inputValue]);
    

    return (
        <div className="w-full max-w-lg mx-auto p-4">
            <form className="flex flex-col sm:flex-row gap-4 -mt-6 mb-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={inputValue}
                    placeholder="Write your next task..."
                    onChange={handleChange}
                    className="flex-grow h-12 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    type="submit"
                    className="w-full sm:w-12 h-12 bg-green-700 text-white flex rounded-md items-center justify-center text-lg font-bold hover:bg-green-500 shadow-md"
                >
                    +
                </button>
            </form>
            <ul className="py-2 rounded-lg shadow-sm space-y-4">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="py-2 pl-3 pr-3 border border-white text-white rounded-md flex items-center justify-between"
                    >
                        <div className="flex items-center gap-2">
                            <button
                                className={`w-6 h-6 rounded-full border-2 ${task.isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
                                onClick={() => onFinishTask(task.id)}
                            >
                            </button>
                            <span>{task.text}</span>
                        </div>
                        <button
                            className="text-white hover:text-gray-200 bg-red-500 px-2 py-1 rounded-md"
                            onClick={() => onRemoveTask(task.id)}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
