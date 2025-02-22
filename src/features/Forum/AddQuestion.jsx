import { useState } from "react";
import { addQuestion } from "../../services/apiForum";
import { useQueryClient } from "@tanstack/react-query";

const AddQuestion = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(false);
    const queryClient = useQueryClient();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addQuestion({ title, description, category, name: isAnonymous ? null : name, is_anonymous: isAnonymous });
        queryClient.invalidateQueries(["forum"]);
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
            <input type="text" placeholder="Your Name (optional)" value={name} onChange={(e) => setName(e.target.value)} />
            <label>
                <input type="checkbox" checked={isAnonymous} onChange={() => setIsAnonymous(!isAnonymous)} />
                Post Anonymously?
            </label>
            <button type="submit">Post Question</button>
        </form>
    );
};

export default AddQuestion;
