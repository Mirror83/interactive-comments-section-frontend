"use client";

import MessageCard from "@/components/MessageCard";
import {
  Comment,
  comments as allComments,
  Reply,
  User,
} from "@/mock-data/data";
import CommentInput from "@/components/CommentInput";
import { DeleteConfirmationModal } from "@/components/Modal";
import React, { useState } from "react";
import AppContext, { VoteType } from "@/context/app-context";

const user: User = {
  image: {
    png: "/images/avatars/image-juliusomo.png",
    webp: "/images/avatars/image-juliusomo.webp",
  },
  username: "juliusomo",
};

export default function Home() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [comments, setComments] = useState(allComments);

  /**
   * The piece of state below temporarily stores the commentId and replyId
   * of a comment or a reply (if replyId is not undefined).
   * It is used to let the deletion modal know what message (comment or reply)
   * is the target for deletion.
   */
  const [targetMsg, setTargetMsg] = useState<{
    commentId: number;
    replyId: number | undefined;
  }>();

  function closeDeleteModal() {
    setTargetMsg(undefined);
    setIsModalVisible(false);
  }

  function openDeleteModal(commentId: number, replyId: number | undefined) {
    setIsModalVisible(true);
    setTargetMsg({ commentId: commentId, replyId });
    console.log({ commentId, replyId });
  }

  function voteMessage(
    commentId: number,
    replyId: number | undefined,
    voteType?: VoteType,
    currentVoteType?: VoteType
  ) {
    if (replyId) {
      voteReply(commentId, replyId, voteType, currentVoteType);
    } else {
      voteComment(commentId, voteType, currentVoteType);
    }
  }

  function voteComment(
    commentId: number,
    voteType?: VoteType,
    currentVoteType?: VoteType
  ) {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          let score: number;
          if (voteType === currentVoteType) {
            throw new Error("The same vote type cannot be cast twice");
          }
          if (typeof currentVoteType === "undefined") {
            score =
              voteType === VoteType.UP_VOTE
                ? comment.score + 1
                : comment.score - 1;
          } else if (typeof voteType === "undefined") {
            score =
              currentVoteType === VoteType.UP_VOTE
                ? comment.score - 1
                : comment.score + 1;
          } else {
            score =
              voteType === VoteType.UP_VOTE
                ? comment.score + 2
                : comment.score - 2;
          }
          return { ...comment, score };
        } else {
          return comment;
        }
      })
    );
  }

  function voteReply(
    commentId: number,
    replyId: number,
    voteType?: VoteType,
    currentVoteType?: VoteType
  ) {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          const replies = comment.replies.map((reply) => {
            if (reply.id === replyId) {
              let score: number;
              if (voteType === currentVoteType) {
                throw new Error("The same vote type cannot be cast twice");
              }
              if (typeof currentVoteType === "undefined") {
                score =
                  voteType === VoteType.UP_VOTE
                    ? reply.score + 1
                    : reply.score - 1;
              } else if (typeof voteType === "undefined") {
                score =
                  currentVoteType === VoteType.UP_VOTE
                    ? reply.score - 1
                    : reply.score + 1;
              } else {
                score =
                  voteType === VoteType.UP_VOTE
                    ? reply.score + 2
                    : reply.score - 2;
              }
              return { ...reply, score };
            }
            return reply;
          });
          return { ...comment, replies };
        }
        return comment;
      })
    );
  }

  function onEditReply(content: string, commentId: number, replyId: number) {
    setComments((comments) =>
      comments.map((comment) => {
        if (comment.id === commentId) {
          const replies = comment.replies.map((reply) => {
            if (reply.id === replyId) {
              return { ...reply, content };
            }
            return reply;
          });
          return { ...comment, replies };
        }
        return comment;
      })
    );
  }

  function onEditComment(content: string, commentId: number) {
    setComments((comments) =>
      comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, content };
        }
        return comment;
      })
    );
  }

  function deleteComment(id: number) {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    );
  }

  function deleteReply(commentId: number, replyId: number) {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          console.log(comment.replies);
          comment.replies = comment.replies.filter(
            (reply) => reply.id !== replyId
          );
          return comment;
        } else {
          return comment;
        }
      })
    );
  }

  function onConfirmMsgDeletion(
    commentId: number,
    replyId: number | undefined
  ) {
    if (replyId) {
      deleteReply(commentId, replyId);
    } else {
      deleteComment(commentId);
    }
    closeDeleteModal();
  }

  function addComment(content: string) {
    const comment: Comment = {
      user,
      content,
      createdAt: new Date().toISOString(),
      score: 0,
      replies: [],
      id: comments[comments.length - 1].id + 1,
    };
    setComments((prevComments) => [...prevComments, comment]);
  }

  function addReply(content: string, commentId: number) {
    setComments((comments) =>
      comments.map((comment) => {
        if (comment.id === commentId) {
          const replies = [...comment.replies];
          const reply: Reply = {
            user,
            content,
            createdAt: new Date().toISOString(),
            score: 0,
            id: replies.length > 0 ? replies[replies.length - 1].id + 1 : 1,
            replyingTo: comment.user.username,
          };
          replies.push(reply);
          return { ...comment, replies };
        }
        return comment;
      })
    );
  }

  return (
    <AppContext
      value={{
        user: user,
        openDeleteModal,
        onEditComment,
        onEditReply,
        voteMessage,
        addReply,
      }}
    >
      <div className={"p-4 flex flex-col h-screen items-center"}>
        <div className={"md:w-9/12"}>
          <div className={"flex flex-1 flex-col gap-4 overflow-y-scroll"}>
            {comments.map((comment) => (
              <MessageCard comment={comment} user={user} key={comment.id} />
            ))}
          </div>
          <CommentInput user={user} addComment={addComment} />
        </div>
        <DeleteConfirmationModal
          targetMsg={targetMsg}
          isVisible={isModalVisible}
          onClose={closeDeleteModal}
          onConfirm={() =>
            onConfirmMsgDeletion(targetMsg!.commentId, targetMsg!.replyId)
          }
        />
      </div>
    </AppContext>
  );
}
