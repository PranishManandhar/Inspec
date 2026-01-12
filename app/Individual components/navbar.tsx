export default function Navbar() {
    return (
        <nav className="bg-slate-950">
            <ul className="flex justify-end gap-4">
                <li className="p-2 text-white">Home</li>
                <li className="p-2">
                    <select 
                        name="Options" 
                        id="options"
                        className="px-2 py-1 border text-white bg-black rounded"
                    >
                        <option value="#">opt1</option>
                        <option value="#">opt2</option>
                        <option value="#">opt3</option>
                        <option value="#">opt4</option>
                    </select>
                </li>
                <li className="p-2 text-white">About</li>
            </ul>
        </nav>
    );
}