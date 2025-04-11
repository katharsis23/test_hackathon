class Comment {
  constructor(comment_id, volunteer_id, article_id, description) {
    this.comment_id = comment_id;
    this.volunteer_id = volunteer_id;
    this.article_id = article_id;
    this.description = description;
  }

  static fromJSON(json) {
    return new Comment(
      json.comment_id,
      json.volunteer_id,
      json.article_id,
      json.description
    );
  }
}

export default Comment;
