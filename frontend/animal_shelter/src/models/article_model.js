class Article {
  constructor({
    article_id = "",
    photo_url = "",
    name = "",
    age = null,
    sex = "",
    health_status = "",
    animal_type = "",
    description = "",
    volunteer_id = "null",
    shelter_id = "",
  } = {}) {
    this.article_id = article_id;
    this.photo_url = photo_url;
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.health_status = health_status;
    this.animal_type = animal_type;
    this.description = description;
    this.volunteer_id = volunteer_id;
    this.shelter_id = shelter_id;
  }

  static fromJSON(json) {
    return new Article({
      article_id: json.article_id,
      photo_url: json.photo_url,
      name: json.name,
      age: json.age,
      sex: json.sex,
      health_status: json.health_status,
      animal_type: json.animal_type,
      description: json.description,
      volunteer_id: json.volunteer_id || null,
      shelter_id: json.shelter_id,
    });
  }

  toJSON() {
    const json = {
      article_id: this.article_id,
      photo_url: this.photo_url,
      name: this.name,
      age: this.age,
      sex: this.sex,
      health_status: this.health_status,
      animal_type: this.animal_type,
      description: this.description,
    };

    if (this.volunteer_id) {
      json.volunteer_id = this.volunteer_id;
    }

    if (this.shelter_id) {
      json.shelter_id = this.shelter_id;
    }

    return json;
  }
}

export default Article;
