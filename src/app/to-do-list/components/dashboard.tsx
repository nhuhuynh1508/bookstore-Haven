
export const Dashboard = ({ tasks }) => {
    console.log(tasks)
    const completedTasks = tasks.filter(task => task.isCompleted).length;
    const totalTasks = tasks.length;

    console.log("completeTasks: ", completedTasks)
    console.log("totalTasks: ", totalTasks)

    return (
    <div className="w-full max-w-4xl mx-auto m-8">
        <section className="w-full text-white rounded-md">
            <div className="flex flex-col md:flex-row justify-between items-center border-4 border-green-500 rounded-md p-4 mb-4">
                <div className="text-center md:text-left">
                    <p className="text-2xl md:text-3xl font-semibold text-green-500 ">Task Done</p>
                    <p className="text-lg md:text-xl text-black">Keep it up!</p>
                </div>
                <div className="flex items-center justify-center w-24 h-24 md:w-16 md:h-16 bg-green-600 rounded-full text-2xl md:text-xl">
                    {completedTasks}/{totalTasks}
                </div>
            </div>
        </section>
    </div>
    );
}