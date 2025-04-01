import { Reply, User } from "@/mock-data/data";
import React from "react";
import { type Comment } from "@/mock-data/data";

export enum VoteType {
  UP_VOTE,
  DOWN_VOTE,
}

type ADD_COMMENT = "add_comment";
type ADD_REPLY = "add_reply";
type EDIT_COMMENT = "edit_comment";
type EDIT_REPLY = "edit_reply";
type DELETE_COMMENT = "delete_comment";
type DELETE_REPLY = "delete_reply";
type VOTE_COMMENT = "vote_comment";
type VOTE_REPLY = "vote_reply";

type AddCommentAction = {
  type: ADD_COMMENT;
  payload: {
    user: User;
    content: string;
  };
};

type AddReplyAction = {
  type: ADD_REPLY;
  payload: {
    user: User;
    content: string;
    commentId: number;
    replyingTo?: string;
  };
};

type EditCommentAction = {
  type: EDIT_COMMENT;
  payload: {
    content: string;
    commentId: number;
  };
};

type EditReplyAction = {
  type: EDIT_REPLY;
  payload: {
    content: string;
    commentId: number;
    replyId: number;
  };
};

type DeleteCommentAction = {
  type: DELETE_COMMENT;
  payload: {
    commentId: number;
  };
};

type DeleteReplyAction = {
  type: DELETE_REPLY;
  payload: {
    commentId: number;
    replyId: number;
  };
};

type VoteCommentAction = {
  type: VOTE_COMMENT;
  payload: {
    commentId: number;
    voteType?: VoteType;
    currentVoteType?: VoteType;
  };
};

type VoteReplyAction = {
  type: VOTE_REPLY;
  payload: {
    commentId: number;
    replyId: number;
    voteType?: VoteType;
    currentVoteType?: VoteType;
  };
};

type Action =
  | AddCommentAction
  | AddReplyAction
  | EditCommentAction
  | EditReplyAction
  | DeleteCommentAction
  | DeleteReplyAction
  | VoteCommentAction
  | VoteReplyAction;

type CommentContextType = {
  user?: User;
  openDeleteModal: (commentId: number, replyId?: number) => void;
  state: Comment[];
};

export const CommentContext = React.createContext<CommentContextType>({
  user: undefined,
  openDeleteModal() {},
  state: [],
});

type CommentDispatchContextType = {
  dispatch: React.ActionDispatch<[action: Action]>;
};

export const CommentDispatchContext =
  React.createContext<CommentDispatchContextType>({
    dispatch() {},
  });

export function commentReducer(comments: Comment[], action: Action) {
  switch (action.type) {
    case "add_comment": {
      const { user, content } = (action as AddCommentAction).payload;
      const comment: Comment = {
        user,
        content,
        createdAt: new Date().toISOString(),
        score: 0,
        replies: [],
        id: comments[comments.length - 1].id + 1,
      };
      return [...comments, comment];
    }
    case "add_reply": {
      const { user, content, commentId, replyingTo } = (
        action as AddReplyAction
      ).payload;

      return comments.map((comment) => {
        if (comment.id === commentId) {
          const replies = [...comment.replies];
          const reply: Reply = {
            user,
            content,
            createdAt: new Date().toISOString(),
            score: 0,
            id: replies.length > 0 ? replies[replies.length - 1].id + 1 : 1,
            replyingTo: replyingTo ?? comment.user.username,
          };
          replies.push(reply);
          return { ...comment, replies };
        }
        return comment;
      });
    }
    case "edit_comment": {
      const { content, commentId } = (action as EditCommentAction).payload;
      return comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, content };
        }
        return comment;
      });
    }
    case "edit_reply": {
      const { content, commentId, replyId } = (action as EditReplyAction)
        .payload;

      return comments.map((comment) => {
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
      });
    }
    case "delete_comment": {
      const { commentId } = (action as DeleteCommentAction).payload;
      return comments.filter((comment) => comment.id !== commentId);
    }
    case "delete_reply": {
      const { commentId, replyId } = (action as DeleteReplyAction).payload;
      return comments.map((comment) => {
        if (comment.id === commentId) {
          console.log(comment.replies);
          comment.replies = comment.replies.filter(
            (reply) => reply.id !== replyId
          );
          return comment;
        } else {
          return comment;
        }
      });
    }
    case "vote_comment": {
      const { commentId, voteType, currentVoteType } = (
        action as VoteCommentAction
      ).payload;
      return comments.map((comment) => {
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
      });
    }
    case "vote_reply": {
      const { commentId, replyId, voteType, currentVoteType } = (
        action as VoteReplyAction
      ).payload;
      return comments.map((comment) => {
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
      });
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}
