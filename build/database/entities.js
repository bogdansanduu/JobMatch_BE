"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENTITIES = void 0;
const user_entity_1 = require("../user/entities/user.entity");
const token_entity_1 = require("../auth/entities/token.entity");
const message_entity_1 = require("../chat/message/entity/message.entity");
const room_entity_1 = require("../chat/room/entities/room.entity");
const user_to_room_entity_1 = require("../chat/room/entities/user-to-room.entity");
const post_entity_1 = require("../posts/entities/post.entity");
const comment_entity_1 = require("../comment/entities/comment.entity");
const like_entity_1 = require("../like/entities/like.entity");
const company_entity_1 = require("../company/entities/company.entity");
const job_entity_1 = require("../job/entities/job.entity");
const job_application_entity_1 = require("../job-application/entities/job-application.entity");
const job_saved_entity_1 = require("../job-saved/entities/job-saved.entity");
exports.ENTITIES = [
    user_entity_1.User,
    token_entity_1.Token,
    message_entity_1.Message,
    room_entity_1.Room,
    user_to_room_entity_1.UserToRoom,
    post_entity_1.Post,
    comment_entity_1.Comment,
    like_entity_1.Like,
    company_entity_1.Company,
    job_entity_1.Job,
    job_application_entity_1.JobApplication,
    job_saved_entity_1.JobSaved,
];
//# sourceMappingURL=entities.js.map