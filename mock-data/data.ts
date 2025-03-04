import {subWeeks, subDays, subMonths} from "date-fns"

export type User = {
    username: string,
    image: {
        webp: string,
        png: string
    }
}

export type Comment = {
    id: number,
    user: User,
    content: string,
    createdAt: string, // An ISO timestamp
    score: number,
    replies: Reply[]
}

export type Reply = Omit<Comment, "replies"> & {
    replyingTo: string, // Temporarily a string
}

export const comments: Comment[] = [
    {
        "id": 1,
        "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        "createdAt": subMonths(new Date(), 1).toISOString(),
        "score": 12,
        "user": {
            "image": {
                "png": "/images/avatars/image-amyrobson.png",
                "webp": "/images/avatars/image-amyrobson.webp"
            },
            "username": "amyrobson"
        },
        "replies": []
    },
    {
        "id": 2,
        "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        "createdAt": subWeeks(new Date(), 2).toISOString(),
        "score": 5,
        "user": {
            "image": {
                "png": "/images/avatars/image-maxblagun.png",
                "webp": "/images/avatars/image-maxblagun.webp"
            },
            "username": "maxblagun"
        },
        "replies": [
            {
                "id": 3,
                "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                "createdAt": subWeeks(new Date(), 1).toISOString(),
                "score": 4,
                "replyingTo": "maxblagun",
                "user": {
                    "image": {
                        "png": "/images/avatars/image-ramsesmiron.png",
                        "webp": "/images/avatars/image-ramsesmiron.webp"
                    },
                    "username": "ramsesmiron"
                }
            },
            {
                "id": 4,
                "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                "createdAt": subDays(new Date(), 2).toISOString(),
                "score": 2,
                "replyingTo": "ramsesmiron",
                "user": {
                    "image": {
                        "png": "/images/avatars/image-juliusomo.png",
                        "webp": "/images/avatars/image-juliusomo.webp"
                    },
                    "username": "juliusomo"
                }
            }
        ]
    }
];