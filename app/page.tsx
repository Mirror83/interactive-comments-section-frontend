import CommentCard from "@/components/CommentCard";
import {comments, User} from "@/mock-data/data";

export default function Home() {
    const user: User = {
        "image": {
            "png": "/images/avatars/image-juliusomo.png",
            "webp": "/images/avatars/image-juliusomo.webp"
        },
        "username": "juliusomo"
    }
    return (
        <div className={"p-4 flex flex-col h-min-full"}>
            <div className={"flex flex-col gap-4"}>
                {comments.map((comment) => (
                    <CommentCard key={comment.id} user={user} comment={comment}/>
                ))}
            </div>
        </div>
    );
}
