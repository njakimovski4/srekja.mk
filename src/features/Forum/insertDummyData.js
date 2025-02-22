import { addForumPost } from "/addForumPost";

// Dummy questions
const dummyQuestions = [
    { title: "How to secure funding for my startup?", description: "I'm struggling to find investors for my startup. Any advice?", category: "Funding", name: "John Doe", is_anonymous: false },
    { title: "What are the best tools for MVP development?", description: "I need recommendations for building an MVP quickly.", category: "Development", name: "Jane Smith", is_anonymous: false },
    { title: "Is it better to bootstrap or raise VC?", description: "I have a profitable product but unsure if I should seek VC funding.", category: "Business Strategy", name: null, is_anonymous: true },
    { title: "How to validate a startup idea?", description: "What are the best methods to validate an idea before investing too much time?", category: "Idea Validation", name: "Alex Johnson", is_anonymous: false },
    { title: "What are the legal requirements to start a business?", description: "I need guidance on what legal steps to take before launching.", category: "Legal", name: "Michael Brown", is_anonymous: false },
    { title: "How to find a good co-founder?", description: "What should I look for in a potential co-founder?", category: "Team Building", name: null, is_anonymous: true },
    { title: "Best marketing strategies for early-stage startups?", description: "Looking for cost-effective ways to get my product noticed.", category: "Marketing", name: "Sarah Lee", is_anonymous: false },
    { title: "How do I set up an effective sales funnel?", description: "Need help optimizing my sales process.", category: "Sales", name: "David Kim", is_anonymous: false },
    { title: "How to deal with burnout as a founder?", description: "Feeling overwhelmed running my startup. Any tips?", category: "Mental Health", name: "Anonymous", is_anonymous: true },
    { title: "What are the best startup accelerators?", description: "Looking for a good accelerator program for my early-stage startup.", category: "Funding", name: "Lisa Green", is_anonymous: false }
];

// Function to insert all dummy data
export const insertDummyData = async () => {
    for (const post of dummyQuestions) {
        await addForumPost(post.title, post.description, post.category, post.name, post.is_anonymous);
    }
    console.log("Dummy data inserted successfully!");
};
