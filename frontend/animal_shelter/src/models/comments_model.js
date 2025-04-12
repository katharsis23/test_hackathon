class Comments {
  constructor(comment_id, shelter_id, volunteer_id, description) {
    this.comment_id = comment_id;
    this.shelter_id = shelter_id;
    this.volunteer_id = volunteer_id;
    this.description = description;
  }

  static fromJSON(json) {
    return new Comments(
      json.comment_id,
      json.shelter_id,
      json.volunteer_id,
      json.description
    );
  }
}

export default Comments;
