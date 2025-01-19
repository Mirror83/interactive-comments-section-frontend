import CommentCard from "@/components/CommentCard";
import {comments, User} from "@/mock-data/data";
import CommentInput from "@/components/CommentInput";

export default function Home() {
    const user: User = {
        "image": {
            "png": "/images/avatars/image-juliusomo.png",
            "webp": "/images/avatars/image-juliusomo.webp"
        },
        "username": "juliusomo"
    }
    return (
        <div className={"p-4 flex flex-col h-[100vh]"}>
            <div className={"flex flex-1 flex-col gap-4 overflow-y-scroll"}>
                {comments.map((comment) => (
                    <CommentCard key={comment.id} user={user} comment={comment}/>
                ))}
            </div>
            <CommentInput user={user}/>
        </div>
    );
}
