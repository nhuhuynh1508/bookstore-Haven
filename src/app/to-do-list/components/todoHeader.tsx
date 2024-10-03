export const ToDoHeader = () => {
    return (
        <div className="flex items-center space-x-3 absolute left-0 top-0 p-4 text-white text-4xl">
            <div>ToDo</div>
            <img
                src="/assets/checkbox.png" alt="checkbox"
                className="w-12 h-12 md:w-10 md:h-10 sm:w-8 sm:h-8"
            />
        </div>
    )
}