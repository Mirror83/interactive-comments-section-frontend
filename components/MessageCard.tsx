import React from 'react';
import Image from "next/image";

function MessageCard() {
    return (
        <div className={"bg-white p-4 rounded-xl"}>
            <div className={"flex items-center gap-6"}>
                <Image
                    src={"/images/avatars/image-amyrobson.png"}
                    alt={"amyrobson profile"}
                    width={40}
                    height={40}/>
                <span className={"font-bold"}>amyrobson</span>
                <span className={"text-grayish-blue font-light"}>1 month ago</span>
            </div>
            <div className={"py-4 text-grayish-blue"}>
                Impressive! Though it seems the drag feature could be improved. But overall it looks incredible.
                You&#39;ve nailed the design and the responsiveness at various breakpoints works really well.
            </div>
            <div className={"flex justify-between items-center"}>
                <div className={"flex bg-light-gray items-center gap-4 rounded-lg py-2 px-4"}>
                    <button>
                        <Image src={"/images/icon-minus.svg"} alt={"down-vote"} height={10} width={10}/>
                    </button>
                    <span className={"text-moderate-blue font-[500]"}>12</span>
                    <button>
                        <Image src={"/images/icon-plus.svg"} alt={"up-vote"} height={10} width={10}/>
                    </button>
                </div>
                <div className={"flex items-baseline gap-2"}>
                    <Image src={"/images/icon-reply.svg"} alt={""} height={10} width={10}/>
                    <span className={"text-moderate-blue font-[500]"}>Reply</span>
                </div>
            </div>
        </div>
    );
}

export default MessageCard;