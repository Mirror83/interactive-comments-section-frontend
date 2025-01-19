import {User} from "@/mock-data/data";
import Image from "next/image";

type CommentInputProps = {
    user: User;
}

export default function CommentInput({user}: CommentInputProps) {
    return <div className={"flex flex-col  gap-8 bg-white rounded-xl p-4 mt-4"}>
                    <textarea
                        className={"h-24 border-2 rounded-xl p-4 border-grayish-blue"}
                        name={"comment"}
                        placeholder={"Add a comment..."}/>
        <div className={"flex justify-between items-center gap-4"}>
            <Image src={user.image.png} alt={`${user.username} profile avatar`} height={40} width={40}/>
            <button className={"bg-moderate-blue  text-white rounded-lg"}>
                <div className={"py-2 px-8"}>SEND</div>
            </button>
        </div>
    </div>
}
